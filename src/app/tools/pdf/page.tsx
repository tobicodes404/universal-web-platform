"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import dynamic from 'next/dynamic';
import { generateThumbnails, PageThumbnail } from '@/lib/pdf-thumbnails';

// SSR এরর এড়াতে ডায়নামিক ইমপোর্ট
const VisualGrid = dynamic(() => import('@/components/pdf/visual-grid'), { ssr: false });

type Operation = 'merge' | 'split' | 'rotate' | 'delete' | 'metadata' | 'watermark' | 'reorder' | 'pagenumbers' | 'compress';
type Status = 'idle' | 'processing' | 'done' | 'error';

interface PdfFile {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount?: number;
}

const OPERATIONS: { id: Operation; label: string; desc: string; needsVisual?: boolean }[] = [
  { id: 'merge', label: 'Merge', desc: 'Combine PDFs' },
  { id: 'split', label: 'Split', desc: 'Extract pages', needsVisual: true },
  { id: 'reorder', label: 'Reorder', desc: 'Change order', needsVisual: true },
  { id: 'rotate', label: 'Rotate', desc: 'Rotate 90°', needsVisual: true },
  { id: 'delete', label: 'Delete', desc: 'Remove pages', needsVisual: true },
  { id: 'pagenumbers', label: 'Page Numbers', desc: 'Add numbers' },
  { id: 'watermark', label: 'Watermark', desc: 'Add text mark' },
  { id: 'metadata', label: 'Metadata', desc: 'Edit info' },
  { id: 'compress', label: 'Compress', desc: 'Optimize size' },
];

export default function PdfWorkspace() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [operation, setOperation] = useState<Operation>('merge');
  const [status, setStatus] = useState<Status>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultFilename, setResultFilename] = useState<string>('');
  
  // Visual States
  const [thumbnails, setThumbnails] = useState<PageThumbnail[]>([]);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [reorderMap, setReorderMap] = useState<number[]>([]);
  const [isGeneratingThumbnails, setIsGeneratingThumbnails] = useState(false);

  // Form States
  const [metaTitle, setMetaTitle] = useState('');
  const [metaAuthor, setMetaAuthor] = useState('');
  const [metaSubject, setMetaSubject] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkSize, setWatermarkSize] = useState(50);
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.3);
  const [pageNumPosition, setPageNumPosition] = useState('bottom-center');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const op = params.get('op');
    if (op && OPERATIONS.map(o => o.id).includes(op as Operation)) {
      setOperation(op as Operation);
    }
  }, []);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../../../workers/pdf.worker.ts', import.meta.url));
    workerRef.current.onmessage = (event) => {
      const { type, progress, result, filename, error } = event.data;
      if (type === 'PROGRESS') setProgress(progress);
      else if (type === 'SUCCESS') {
        const blob = new Blob([result], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setResultUrl(url);
        setResultFilename(filename);
        setStatus('done');
        setProgress(100);
      } 
      else if (type === 'ERROR') {
        setError(error);
        setStatus('error');
      }
    };
    return () => { workerRef.current?.terminate(); };
  }, []);

  const validateAndAddFiles = useCallback(async (newFiles: FileList | File[]) => {
    const validFiles: PdfFile[] = [];
    Array.from(newFiles).forEach((file) => {
      if (file.type !== 'application/pdf') { setError(`${file.name} is not a valid PDF.`); return; }
      if (file.size > 10 * 1024 * 1024) { setError(`${file.name} is too large (Max 10MB).`); return; }
      const id = Math.random().toString(36).substr(2, 9);
      validFiles.push({ id, file, name: file.name, size: file.size });
    });

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      setError(null); setStatus('idle'); setResultUrl(null);
      
      // Generate thumbnails for the first file (for visual operations)
      if (validFiles.length === 1 && files.length === 0) {
        setIsGeneratingThumbnails(true);
        try {
          const { thumbnails, totalPages } = await generateThumbnails(validFiles[0].file);
          setThumbnails(thumbnails);
          setFiles(prev => prev.map(f => f.id === validFiles[0].id ? { ...f, pageCount: totalPages } : f));
          setReorderMap(thumbnails.map(t => t.pageNumber));
        } catch (err) {
          setError('Failed to generate PDF preview.');
        } finally {
          setIsGeneratingThumbnails(false);
        }
      }
    }
  }, [files]);

  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); if (e.dataTransfer.files) validateAndAddFiles(e.dataTransfer.files); };
  const removeFile = (id: string) => { setFiles(files.filter(f => f.id !== id)); setStatus('idle'); setResultUrl(null); setThumbnails([]); setSelectedPages([]); };
  const clearAll = () => { setFiles([]); setStatus('idle'); setResultUrl(null); setProgress(0); setError(null); setThumbnails([]); setSelectedPages([]); setReorderMap([]); };

  const processFiles = async () => {
    if (files.length === 0) return;
    setStatus('processing'); setProgress(0); setError(null); setResultUrl(null);

    const fileArrayBuffers = await Promise.all(files.map(f => f.file.arrayBuffer()));
    const currentOp = OPERATIONS.find(o => o.id === operation);

    if (operation === 'merge') {
      if (files.length < 2) { setError('Merge requires at least 2 PDFs.'); setStatus('idle'); return; }
      workerRef.current?.postMessage({ type: 'MERGE', payload: { files: fileArrayBuffers } });
    } 
    else if (currentOp?.needsVisual) {
      if (operation === 'split' || operation === 'rotate' || operation === 'delete') {
        if (selectedPages.length === 0) { setError('Please select at least one page from the preview.'); setStatus('idle'); return; }
        // Convert 1-based page numbers to 0-based indices for the worker
        const zeroBasedPages = selectedPages.map(p => p - 1);
        
        if (operation === 'split') workerRef.current?.postMessage({ type: 'SPLIT', payload: { file: fileArrayBuffers[0], pages: zeroBasedPages, mode: 'extract' } });
        else if (operation === 'rotate') workerRef.current?.postMessage({ type: 'ROTATE', payload: { file: fileArrayBuffers[0], pages: zeroBasedPages, angle: 90 } });
        else if (operation === 'delete') workerRef.current?.postMessage({ type: 'DELETE', payload: { file: fileArrayBuffers[0], pagesToDelete: zeroBasedPages } });
      } 
      else if (operation === 'reorder') {
        if (reorderMap.length === 0) { setError('Invalid page order.'); setStatus('idle'); return; }
        const zeroBasedOrder = reorderMap.map(p => p - 1);
        workerRef.current?.postMessage({ type: 'REORDER', payload: { file: fileArrayBuffers[0], order: zeroBasedOrder } });
      }
    }
    else if (operation === 'metadata') {
      workerRef.current?.postMessage({ type: 'METADATA', payload: { file: fileArrayBuffers[0], title: metaTitle, author: metaAuthor, subject: metaSubject, keywords: metaKeywords } });
    } 
    else if (operation === 'watermark') {
      workerRef.current?.postMessage({ type: 'WATERMARK', payload: { file: fileArrayBuffers[0], text: watermarkText, size: watermarkSize, opacity: watermarkOpacity } });
    }
    else if (operation === 'pagenumbers') {
      workerRef.current?.postMessage({ type: 'PAGE_NUMBERS', payload: { file: fileArrayBuffers[0], position: pageNumPosition } });
    }
    else if (operation === 'compress') {
      workerRef.current?.postMessage({ type: 'COMPRESS', payload: { file: fileArrayBuffers[0], originalSize: files[0].size } });
    }
  };

  const downloadResult = () => {
    if (resultUrl) {
      const a = document.createElement('a'); a.href = resultUrl; a.download = resultFilename; document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
  };

  const currentOp = OPERATIONS.find(o => o.id === operation);
  const isVisualMode = currentOp?.needsVisual && thumbnails.length > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "PDF Workspace" }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">PDF Workspace</h1>
        <p className="text-text-secondary">9 powerful PDF operations. 100% private, processed in your browser.</p>
      </div>

      <div className="bg-success-bg border border-success-border rounded-lg p-4 mb-8 flex items-start gap-3">
        <svg className="w-5 h-5 text-success mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        <p className="text-sm text-green-800">Your files are processed locally in your browser. Never uploaded.</p>
      </div>

      {/* Step 1: Upload */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4">1. Select PDF Files</h2>
        {files.length === 0 ? (
          <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
            <svg className="w-12 h-12 text-text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <p className="text-lg font-medium text-text-primary mb-1">Drag & drop PDFs here</p>
            <p className="text-sm text-text-secondary">or click to browse (Max 10MB per file)</p>
            <input ref={fileInputRef} type="file" accept="application/pdf" multiple className="hidden" onChange={(e) => e.target.files && validateAndAddFiles(e.target.files)} />
          </div>
        ) : (
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-surface border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <svg className="w-8 h-8 text-error" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>
                  <div>
                    <p className="font-medium text-text-primary truncate max-w-[200px] sm:max-w-md">{file.name}</p>
                    <p className="text-xs text-text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB {file.pageCount ? `• ${file.pageCount} pages` : '• Loading...'}</p>
                  </div>
                </div>
                <button onClick={() => removeFile(file.id)} className="text-text-muted hover:text-error"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={() => fileInputRef.current?.click()} className="text-sm text-primary font-medium">+ Add more</button>
              <button onClick={clearAll} className="text-sm text-error font-medium">Clear all</button>
            </div>
            <input ref={fileInputRef} type="file" accept="application/pdf" multiple className="hidden" onChange={(e) => e.target.files && validateAndAddFiles(e.target.files)} />
          </div>
        )}
      </div>

      {/* Step 2: Operation */}
      {files.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-text-primary mb-4">2. Choose Operation</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
            {OPERATIONS.map((op) => (
              <button key={op.id} onClick={() => { setOperation(op.id); setStatus('idle'); setResultUrl(null); setError(null); setSelectedPages([]); }} className={`p-3 rounded-lg border-2 text-left transition-all ${operation === op.id ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-surface text-text-secondary hover:border-text-faint'}`}>
                <p className="font-semibold text-xs">{op.label}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Visual Preview (If applicable) */}
      {isVisualMode && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">
              3. {operation === 'reorder' ? 'Drag to Reorder Pages' : 'Select Pages'}
            </h2>
            {operation !== 'reorder' && (
              <p className="text-sm text-text-muted">{selectedPages.length} page(s) selected</p>
            )}
          </div>
          
          {isGeneratingThumbnails ? (
            <div className="text-center py-12">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-secondary">Generating page previews...</p>
            </div>
          ) : (
            <VisualGrid 
              thumbnails={thumbnails}
              selectedPages={selectedPages}
              onSelectionChange={setSelectedPages}
              onReorder={setReorderMap}
              mode={operation === 'reorder' ? 'reorder' : 'select'}
            />
          )}
        </div>
      )}

      {/* Step 4: Configure & Process (For non-visual ops) */}
      {files.length > 0 && !isVisualMode && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-text-primary mb-4">3. Configure & Process</h2>
          
          {operation === 'metadata' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div><label className="block text-sm font-medium text-text-primary mb-1">Title</label><input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-text-primary" /></div>
              <div><label className="block text-sm font-medium text-text-primary mb-1">Author</label><input type="text" value={metaAuthor} onChange={(e) => setMetaAuthor(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-text-primary" /></div>
              <div><label className="block text-sm font-medium text-text-primary mb-1">Subject</label><input type="text" value={metaSubject} onChange={(e) => setMetaSubject(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-text-primary" /></div>
              <div><label className="block text-sm font-medium text-text-primary mb-1">Keywords</label><input type="text" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-text-primary" /></div>
            </div>
          )}

          {operation === 'watermark' && (
            <div className="space-y-4 mb-4">
              <div><label className="block text-sm font-medium text-text-primary mb-1">Watermark Text</label><input type="text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-text-primary" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-text-primary mb-1">Font Size: {watermarkSize}</label><input type="range" min="20" max="150" value={watermarkSize} onChange={(e) => setWatermarkSize(Number(e.target.value))} className="w-full" /></div>
                <div><label className="block text-sm font-medium text-text-primary mb-1">Opacity: {watermarkOpacity}</label><input type="range" min="0.1" max="1" step="0.1" value={watermarkOpacity} onChange={(e) => setWatermarkOpacity(Number(e.target.value))} className="w-full" /></div>
              </div>
            </div>
          )}

          {operation === 'pagenumbers' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">Position</label>
              <select value={pageNumPosition} onChange={(e) => setPageNumPosition(e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg bg-surface text-text-primary">
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="top-center">Top Center</option>
              </select>
            </div>
          )}

          {error && <div className="bg-error-bg border border-error-border text-error rounded-lg p-4 mb-4">{error}</div>}

          {status === 'processing' && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2"><span className="font-medium text-text-primary">Processing...</span><span className="text-text-muted">{Math.round(progress)}%</span></div>
              <div className="w-full bg-background rounded-full h-2.5"><div className="bg-primary h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }}></div></div>
            </div>
          )}

          {status === 'done' && resultUrl && (
            <div className="bg-success-bg border border-success-border rounded-lg p-6 text-center mb-4">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Success!</h3>
              <button onClick={downloadResult} className="inline-flex items-center gap-2 px-6 py-3 bg-success text-white font-medium rounded-lg hover:bg-green-600">Download {resultFilename}</button>
            </div>
          )}

          {status !== 'done' && (
            <button onClick={processFiles} disabled={status === 'processing'} className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover disabled:bg-text-faint disabled:cursor-not-allowed transition-colors shadow-md">
              {status === 'processing' ? 'Processing...' : `Process ${currentOp?.label || operation}`}
            </button>
          )}
        </div>
      )}

      {/* Process Button for Visual Mode */}
      {isVisualMode && status !== 'done' && (
        <div className="mb-8">
           {error && <div className="bg-error-bg border border-error-border text-error rounded-lg p-4 mb-4">{error}</div>}
           {status === 'processing' && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2"><span className="font-medium text-text-primary">Processing...</span><span className="text-text-muted">{Math.round(progress)}%</span></div>
              <div className="w-full bg-background rounded-full h-2.5"><div className="bg-primary h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }}></div></div>
            </div>
          )}
          <button onClick={processFiles} disabled={status === 'processing'} className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover disabled:bg-text-faint disabled:cursor-not-allowed transition-colors shadow-md">
            {status === 'processing' ? 'Processing...' : `Process ${currentOp?.label || operation}`}
          </button>
        </div>
      )}

      {status === 'done' && isVisualMode && resultUrl && (
         <div className="bg-success-bg border border-success-border rounded-lg p-6 text-center mb-4">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Success!</h3>
            <button onClick={downloadResult} className="inline-flex items-center gap-2 px-6 py-3 bg-success text-white font-medium rounded-lg hover:bg-green-600">Download {resultFilename}</button>
         </div>
      )}
    </div>
  );
}
