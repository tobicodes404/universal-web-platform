"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export default function PdfRotatePage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageRange, setPageRange] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../../../workers/pdf.worker.ts', import.meta.url));
    workerRef.current.onmessage = (event) => {
      const { type, result, error, pageCount } = event.data;
      if (type === 'INFO_SUCCESS') setPageCount(pageCount);
      else if (type === 'SUCCESS') {
        const blob = new Blob([result], { type: 'application/pdf' });
        setResultUrl(URL.createObjectURL(blob));
        setStatus('done');
      } else if (type === 'ERROR') { setError(error); setStatus('error'); }
    };
    return () => { workerRef.current?.terminate(); };
  }, []);

  const handleFile = useCallback((f: File) => {
    if (f.type !== 'application/pdf') { setError('Please select a valid PDF file.'); return; }
    if (f.size > 10 * 1024 * 1024) { setError('File too large (Max 10MB).'); return; }
    setFile(f); setError(null); setStatus('idle'); setResultUrl(null); setPageRange('');
    f.arrayBuffer().then(buffer => workerRef.current?.postMessage({ type: 'GET_INFO', payload: { file: buffer, id: 'main' } }));
  }, []);

  const parsePageRange = (rangeStr: string): number[] => {
    const pages = new Set<number>();
    rangeStr.split(',').map(s => s.trim()).filter(s => s).forEach(part => {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        for (let i = start; i <= end; i++) if (i >= 1 && i <= pageCount) pages.add(i - 1);
      } else {
        const num = Number(part);
        if (num >= 1 && num <= pageCount) pages.add(num - 1);
      }
    });
    return Array.from(pages).sort((a, b) => a - b);
  };

  const processFile = async () => {
    if (!file) return;
    const selectedPages = parsePageRange(pageRange);
    if (selectedPages.length === 0) { setError('Invalid page range.'); return; }
    setStatus('processing'); setError(null); setResultUrl(null);
    const buffer = await file.arrayBuffer();
    workerRef.current?.postMessage({ type: 'ROTATE', payload: { file: buffer, pages: selectedPages, angle: 90 } });
  };

  const downloadResult = () => {
    if (resultUrl) {
      const a = document.createElement('a'); a.href = resultUrl; a.download = 'rotated-document.pdf';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6"><Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "PDF Tools" }, { label: "PDF Rotate" }]} /></div>
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Rotate PDF Pages</h1>
          <p className="text-lg text-text-secondary max-w-2xl">Rotate specific pages of your PDF by 90 degrees. Fast, free, and 100% private.</p>
        </div>
        <div className="bg-success-bg border border-success-border rounded-lg p-4 mb-8 flex items-start gap-3">
          <svg className="w-5 h-5 text-success mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          <p className="text-sm text-green-800">Your files are processed locally in your browser. Never uploaded.</p>
        </div>

        <div className="mb-8">
          {!file ? (
            <div onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) => e.preventDefault()} onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-border rounded-2xl p-16 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
              <svg className="w-16 h-16 text-text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Drop your PDF here</h3>
              <p className="text-text-secondary mb-6">or click to browse (Max 10MB)</p>
              <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-colors shadow-sm">Select PDF</button>
              <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium text-text-primary">{file.name}</p>
                  <p className="text-sm text-text-muted">{pageCount || 'Loading...'} pages • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button onClick={() => { setFile(null); setPageCount(0); setResultUrl(null); setStatus('idle'); }} className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-error hover:bg-error/10 transition-colors">Remove</button>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Pages to Rotate (e.g., 1, 3, 5-8)</label>
                <input type="text" value={pageRange} onChange={(e) => setPageRange(e.target.value)} placeholder="1, 3, 5-8" className="w-full px-4 py-3 border border-border rounded-lg bg-background text-text-primary focus:ring-2 focus:ring-primary/50 outline-none" />
                <p className="text-xs text-text-muted mt-2">Each selected page will be rotated 90° clockwise.</p>
              </div>
            </div>
          )}
        </div>

        {file && (
          <div className="mb-8">
            {error && <div className="bg-error-bg border border-error-border text-error rounded-lg p-4 mb-4">{error}</div>}
            {status === 'done' && resultUrl && (
              <div className="bg-success-bg border border-success-border rounded-lg p-6 text-center mb-4">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Success!</h3>
                <button onClick={downloadResult} className="inline-flex items-center gap-2 px-6 py-3 bg-success text-white font-medium rounded-lg hover:bg-green-600">Download Rotated PDF</button>
              </div>
            )}
            {status !== 'done' && (
              <button onClick={processFile} disabled={status === 'processing'} className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover disabled:opacity-50 transition-colors shadow-md">
                {status === 'processing' ? 'Rotating...' : 'Rotate Pages'}
              </button>
            )}
          </div>
        )}

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Rotate PDF Pages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6"><div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4"><span className="text-lg font-bold text-tools-accent">1</span></div><h3 className="font-semibold text-text-primary mb-2">Upload PDF</h3><p className="text-sm text-text-secondary leading-relaxed">Select your PDF file. The tool will detect the total number of pages.</p></div>
            <div className="bg-surface border border-border rounded-xl p-6"><div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4"><span className="text-lg font-bold text-tools-accent">2</span></div><h3 className="font-semibold text-text-primary mb-2">Select Pages</h3><p className="text-sm text-text-secondary leading-relaxed">Enter the page numbers you want to rotate (e.g., 1, 3, 5-8).</p></div>
            <div className="bg-surface border border-border rounded-xl p-6"><div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4"><span className="text-lg font-bold text-tools-accent">3</span></div><h3 className="font-semibold text-text-primary mb-2">Download</h3><p className="text-sm text-text-secondary leading-relaxed">Click "Rotate Pages" and download your corrected PDF.</p></div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6"><h3 className="font-semibold text-text-primary mb-2">Which direction does it rotate?</h3><p className="text-sm text-text-secondary leading-relaxed">Pages are rotated 90° clockwise. To rotate 180°, click the button twice. For 270°, click three times.</p></div>
            <div className="bg-surface border border-border rounded-xl p-6"><h3 className="font-semibold text-text-primary mb-2">Can I rotate all pages at once?</h3><p className="text-sm text-text-secondary leading-relaxed">Yes! Enter "1-{pageCount || 'N'}" in the page range field to rotate every page in the document.</p></div>
            <div className="bg-surface border border-border rounded-xl p-6"><h3 className="font-semibold text-text-primary mb-2">Does rotation affect quality?</h3><p className="text-sm text-text-secondary leading-relaxed">No. PDF rotation is a lossless operation. Your content remains perfectly sharp.</p></div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Related PDF Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/tools/pdf-merge" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50"><h3 className="font-semibold text-text-primary mb-1">PDF Merge</h3><p className="text-sm text-text-secondary line-clamp-2">Combine multiple PDFs into one file.</p></Link>
            <Link href="/tools/pdf-split" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50"><h3 className="font-semibold text-text-primary mb-1">PDF Split</h3><p className="text-sm text-text-secondary line-clamp-2">Extract specific pages from your PDF.</p></Link>
            <Link href="/tools/pdf-reorder" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50"><h3 className="font-semibold text-text-primary mb-1">PDF Reorder</h3><p className="text-sm text-text-secondary line-clamp-2">Change the order of PDF pages.</p></Link>
          </div>
        </section>
      </div>
    </div>
  );
}
