"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export default function PdfReorderPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [newOrder, setNewOrder] = useState('');
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
    setFile(f); setError(null); setStatus('idle'); setResultUrl(null); setNewOrder('');
    f.arrayBuffer().then(buffer => workerRef.current?.postMessage({ type: 'GET_INFO', payload: { file: buffer, id: 'main' } }));
  }, []);

  const parseOrder = (orderStr: string): number[] => {
    return orderStr.split(',').map(s => s.trim()).filter(s => s).map(Number).filter(n => n >= 1 && n <= pageCount).map(n => n - 1);
  };

  const processFile = async () => {
    if (!file) return;
    const order = parseOrder(newOrder);
    if (order.length !== pageCount) { setError(`Please enter all ${pageCount} pages in the new order (e.g., 3,1,2,4).`); return; }
    const uniquePages = new Set(order);
    if (uniquePages.size !== pageCount) { setError('Each page number must appear exactly once.'); return; }
    setStatus('processing'); setError(null); setResultUrl(null);
    const buffer = await file.arrayBuffer();
    workerRef.current?.postMessage({ type: 'REORDER', payload: { file: buffer, order } });
  };

  const downloadResult = () => {
    if (resultUrl) {
      const a = document.createElement('a'); a.href = resultUrl; a.download = 'reordered-document.pdf';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6"><Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "PDF Tools" }, { label: "PDF Reorder" }]} /></div>
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Reorder PDF Pages</h1>
          <p className="text-lg text-text-secondary max-w-2xl">Change the order of pages in your PDF document. Fast, free, and 100% private.</p>
        </div>
        <div className="bg-success-bg border border-success-border rounded-lg p-4 mb-8 flex items-start gap-3">
          <svg className="w-5 h-5 text-success mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          <p className="text-sm text-green-800">Your files are processed locally in your browser. Never uploaded.</p>
        </div>

        <div className="mb-8">
          {!file ? (
            <div onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }} onDragOver={(e) => e.preventDefault()} onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-border rounded-2xl p-16 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
              <svg className="w-16 h-16 text-text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
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
                <label className="block text-sm font-medium text-text-primary mb-2">New Page Order</label>
                <input type="text" value={newOrder} onChange={(e) => setNewOrder(e.target.value)} placeholder={`e.g., 3,1,2,4 (must include all ${pageCount || '?'} pages)`} className="w-full px-4 py-3 border border-border rounded-lg bg-background text-text-primary focus:ring-2 focus:ring-primary/50 outline-none" />
                <p className="text-xs text-text-muted mt-2">Enter all page numbers separated by commas in your desired order.</p>
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
                <button onClick={downloadResult} className="inline-flex items-center gap-2 px-6 py-3 bg-success text-white font-medium rounded-lg hover:bg-green-600">Download Reordered PDF</button>
              </div>
            )}
            {status !== 'done' && (
              <button onClick={processFile} disabled={status === 'processing'} className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover disabled:opacity-50 transition-colors shadow-md">
                {status === 'processing' ? 'Reordering...' : 'Reorder Pages'}
              </button>
            )}
          </div>
        )}

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Reorder PDF Pages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6"><div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4"><span className="text-lg font-bold text-tools-accent">1</span></div><h3 className="font-semibold text-text-primary mb-2">Upload PDF</h3><p className="text-sm text-text-secondary leading-relaxed">Select your PDF file. The tool will detect the total number of pages.</p></div>
            <div className="bg-surface border border-border rounded-xl p-6"><div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4"><span className="text-lg font-bold text-tools-accent">2</span></div><h3 className="font-semibold text-text-primary mb-2">Enter New Order</h3><p className="text-sm text-text-secondary leading-relaxed">Type all page numbers in your desired order (e.g., 3,1,2,4).</p></div>
            <div className="bg-surface border border-border rounded-xl p-6"><div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4"><span className="text-lg font-bold text-tools-accent">3</span></div><h3 className="font-semibold text-text-primary mb-2">Download</h3><p className="text-sm text-text-secondary leading-relaxed">Click "Reorder Pages" and download your reorganized PDF.</p></div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6"><h3 className="font-semibold text-text-primary mb-2">Do I need to include all pages?</h3><p className="text-sm text-text-secondary leading-relaxed">Yes! You must enter every page number exactly once. For example, if your PDF has 4 pages, enter something like "3,1,2,4".</p></div>
            <div className="bg-surface border border-border rounded-xl p-6"><h3 className="font-semibold text-text-primary mb-2">Can I duplicate pages?</h3><p className="text-sm text-text-secondary leading-relaxed">No. Each page number must appear exactly once. To duplicate pages, use the Split tool first, then Merge them back in your desired order.</p></div>
            <div className="bg-surface border border-border rounded-xl p-6"><h3 className="font-semibold text-text-primary mb-2">Is my PDF safe?</h3><p className="text-sm text-text-secondary leading-relaxed">100% safe. All processing happens locally in your browser. Your files are never uploaded to any server.</p></div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Related PDF Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/tools/pdf-rotate" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50"><h3 className="font-semibold text-text-primary mb-1">PDF Rotate</h3><p className="text-sm text-text-secondary line-clamp-2">Rotate PDF pages to correct orientation.</p></Link>
            <Link href="/tools/pdf-split" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50"><h3 className="font-semibold text-text-primary mb-1">PDF Split</h3><p className="text-sm text-text-secondary line-clamp-2">Extract specific pages from your PDF.</p></Link>
            <Link href="/tools/pdf-merge" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50"><h3 className="font-semibold text-text-primary mb-1">PDF Merge</h3><p className="text-sm text-text-secondary line-clamp-2">Combine multiple PDFs into one file.</p></Link>
          </div>
        </section>
      </div>
    </div>
  );
}
