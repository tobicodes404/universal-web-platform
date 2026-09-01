"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export default function PdfMergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../../../workers/pdf.worker.ts', import.meta.url));
    workerRef.current.onmessage = (event) => {
      const { type, progress, result, error } = event.data;
      if (type === 'PROGRESS') setProgress(progress);
      else if (type === 'SUCCESS') {
        const blob = new Blob([result], { type: 'application/pdf' });
        setResultUrl(URL.createObjectURL(blob));
        setStatus('done');
        setProgress(100);
      } else if (type === 'ERROR') {
        setError(error);
        setStatus('error');
      }
    };
    return () => { workerRef.current?.terminate(); };
  }, []);

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const validFiles: File[] = [];
    Array.from(newFiles).forEach((file) => {
      if (file.type === 'application/pdf') {
        if (file.size > 10 * 1024 * 1024) {
          setError(`${file.name} is too large (Max 10MB).`);
          return;
        }
        validFiles.push(file);
      }
    });
    setFiles(prev => [...prev, ...validFiles]);
    setError(null);
    setStatus('idle');
    setResultUrl(null);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setFiles([]);
    setStatus('idle');
    setResultUrl(null);
    setError(null);
  };

  const mergeFiles = async () => {
    if (files.length < 2) {
      setError('Please add at least 2 PDF files to merge.');
      return;
    }
    setStatus('processing');
    setProgress(0);
    setError(null);
    setResultUrl(null);

    const fileArrayBuffers = await Promise.all(files.map(f => f.arrayBuffer()));
    workerRef.current?.postMessage({ type: 'MERGE', payload: { files: fileArrayBuffers } });
  };

  const downloadResult = () => {
    if (resultUrl) {
      const a = document.createElement('a');
      a.href = resultUrl;
      a.download = 'merged-document.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "PDF Tools" }, { label: "PDF Merge" }]} />
        </div>

        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Merge PDF Files</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Combine multiple PDF files into a single document. Fast, free, and 100% private.
          </p>
        </div>

        <div className="bg-success-bg border border-success-border rounded-lg p-4 mb-8 flex items-start gap-3">
          <svg className="w-5 h-5 text-success mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          <p className="text-sm text-green-800">Your files are processed locally in your browser. Never uploaded to any server.</p>
        </div>

        {/* Upload Area */}
        <div className="mb-8">
          {files.length === 0 ? (
            <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-border rounded-2xl p-16 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
              <svg className="w-16 h-16 text-text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Drop PDF files here</h3>
              <p className="text-text-secondary mb-6">or click to browse (Max 10MB per file)</p>
              <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-colors shadow-sm">Select PDFs</button>
              <input ref={fileInputRef} type="file" accept="application/pdf" multiple className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">Selected Files ({files.length})</h2>
                <div className="flex gap-3">
                  <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">+ Add More</button>
                  <button onClick={clearAll} className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-error hover:bg-error/10 transition-colors">Clear All</button>
                </div>
              </div>
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <svg className="w-8 h-8 text-error" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>
                      <div>
                        <p className="font-medium text-text-primary truncate max-w-[200px] sm:max-w-md">{file.name}</p>
                        <p className="text-xs text-text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button onClick={() => removeFile(index)} className="text-text-muted hover:text-error"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                  </div>
                ))}
              </div>
              <input ref={fileInputRef} type="file" accept="application/pdf" multiple className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
            </div>
          )}
        </div>

        {/* Process Button */}
        {files.length > 0 && (
          <div className="mb-8">
            {error && <div className="bg-error-bg border border-error-border text-error rounded-lg p-4 mb-4">{error}</div>}
            {status === 'processing' && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2"><span className="font-medium text-text-primary">Merging...</span><span className="text-text-muted">{Math.round(progress)}%</span></div>
                <div className="w-full bg-background rounded-full h-2.5"><div className="bg-primary h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }}></div></div>
              </div>
            )}
            {status === 'done' && resultUrl && (
              <div className="bg-success-bg border border-success-border rounded-lg p-6 text-center mb-4">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Success!</h3>
                <button onClick={downloadResult} className="inline-flex items-center gap-2 px-6 py-3 bg-success text-white font-medium rounded-lg hover:bg-green-600">Download Merged PDF</button>
              </div>
            )}
            {status !== 'done' && (
              <button onClick={mergeFiles} disabled={status === 'processing' || files.length < 2} className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md">
                {status === 'processing' ? 'Merging...' : `Merge ${files.length} PDFs`}
              </button>
            )}
          </div>
        )}

        {/* SEO Content */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Merge PDF Files</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">1</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Upload PDFs</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Drag and drop your PDF files or click to select them. You can add multiple files at once.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">2</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Arrange Order</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Files will be merged in the order they appear. Remove or reorder files as needed.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">3</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Download</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Click "Merge PDFs" and download your combined document instantly.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is there a file size limit?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Each PDF file can be up to 10MB. You can merge multiple files, but the total size should not exceed your browser's memory capacity (typically 100-200MB total).</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Can I reorder the files before merging?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Currently, files are merged in the order they are added. To reorder, remove files and add them back in the desired sequence.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Are my files safe?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">100% safe. All merging happens locally in your browser using pdf-lib. Your files are never uploaded to any server, ensuring complete privacy.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Related PDF Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/tools/pdf-split" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">PDF Split</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Extract specific pages from your PDF.</p>
            </Link>
            <Link href="/tools/pdf-compress" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">PDF Compress</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Reduce PDF file size for easier sharing.</p>
            </Link>
            <Link href="/tools/pdf-rotate" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">PDF Rotate</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Rotate PDF pages to correct orientation.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
