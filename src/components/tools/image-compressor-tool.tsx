"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Compressor from "compressorjs";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface CompressedFile {
  id: string;
  originalFile: File;
  compressedBlob: Blob | null;
  previewUrl: string;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

export default function ImageCompressorTool() {
  const [files, setFiles] = useState<CompressedFile[]>([]);
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [maxHeight, setMaxHeight] = useState(1080);
  const [outputFormat, setOutputFormat] = useState("auto"); // auto, image/jpeg, image/png, image/webp
  const [isZipping, setIsZipping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isCompressingRef = useRef(false);

  // Handle File Selection
  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const validFiles: CompressedFile[] = [];
    Array.from(newFiles).forEach((file) => {
      if (file.type.startsWith("image/")) {
        validFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          originalFile: file,
          compressedBlob: null,
          previewUrl: URL.createObjectURL(file),
          status: "pending",
        });
      }
    });
    setFiles((prev) => [...prev, ...validFiles]);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
  };

  const clearAll = () => {
    files.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    setFiles([]);
  };

  // Core Compression Logic
  const compressFiles = useCallback(() => {
    if (files.length === 0 || isCompressingRef.current) return;
    isCompressingRef.current = true;

    setFiles((prev) => prev.map((f) => (f.status === "done" ? f : { ...f, status: "processing" })));

    files.forEach((fileObj) => {
      if (fileObj.status === "done") return;

      new Compressor(fileObj.originalFile, {
        quality: quality,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        mimeType: outputFormat === "auto" ? fileObj.originalFile.type : outputFormat,
        success(result) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileObj.id ? { ...f, compressedBlob: result, status: "done" } : f
            )
          );
        },
        error(err) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileObj.id ? { ...f, status: "error", error: err.message } : f
            )
          );
        },
      });
    });

    setTimeout(() => { isCompressingRef.current = false; }, 1000);
  }, [files, quality, maxWidth, maxHeight, outputFormat]);

  // Auto-compress when settings change (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (files.some((f) => f.status !== "done" && f.status !== "processing")) {
        compressFiles();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [quality, maxWidth, maxHeight, outputFormat, compressFiles]);

  // Download Single
  const downloadSingle = (fileObj: CompressedFile) => {
    if (fileObj.compressedBlob) {
      const ext = fileObj.compressedBlob.type.split("/")[1] || "jpg";
      const name = fileObj.originalFile.name.replace(/\.[^/.]+$/, "") + `-compressed.${ext}`;
      saveAs(fileObj.compressedBlob, name);
    }
  };

  // Download All as ZIP
  const downloadAllZip = async () => {
    const doneFiles = files.filter((f) => f.compressedBlob);
    if (doneFiles.length === 0) return;
    setIsZipping(true);

    const zip = new JSZip();
    doneFiles.forEach((f) => {
      const ext = f.compressedBlob!.type.split("/")[1] || "jpg";
      const name = f.originalFile.name.replace(/\.[^/.]+$/, "") + `-compressed.${ext}`;
      zip.file(name, f.compressedBlob!);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "compressed-images.zip");
    setIsZipping(false);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      {files.length === 0 ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-2xl p-16 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
        >
          <svg className="w-16 h-16 text-text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-xl font-semibold text-text-primary mb-2">Drop your images here</h3>
          <p className="text-text-secondary mb-6">or click to browse (JPG, PNG, WebP)</p>
          <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-colors shadow-sm">
            Select Images
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
        </div>
      ) : (
        <>
          {/* Controls Panel */}
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Compression Settings</h2>
              <div className="flex gap-3">
                <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                  + Add More
                </button>
                <button onClick={clearAll} className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-error hover:bg-error/10 transition-colors">
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Quality */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Quality: {Math.round(quality * 100)}%</label>
                <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-primary" />
              </div>
              {/* Max Width */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Max Width (px)</label>
                <input type="number" value={maxWidth} onChange={(e) => setMaxWidth(Number(e.target.value))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary/50 outline-none" />
              </div>
              {/* Max Height */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Max Height (px)</label>
                <input type="number" value={maxHeight} onChange={(e) => setMaxHeight(Number(e.target.value))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary/50 outline-none" />
              </div>
              {/* Output Format */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Output Format</label>
                <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary/50 outline-none">
                  <option value="auto">Keep Original</option>
                  <option value="image/jpeg">JPEG (Best for photos)</option>
                  <option value="image/png">PNG (Best for graphics)</option>
                  <option value="image/webp">WebP (Best compression)</option>
                </select>
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
          </div>

          {/* File List & Results */}
          <div className="space-y-4">
            {files.map((fileObj) => {
              const originalSize = fileObj.originalFile.size;
              const newSize = fileObj.compressedBlob?.size || originalSize;
              const savings = originalSize > 0 ? Math.round((1 - newSize / originalSize) * 100) : 0;

              return (
                <div key={fileObj.id} className="bg-surface border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                  <img src={fileObj.previewUrl} alt={fileObj.originalFile.name} className="w-16 h-16 object-cover rounded-lg border border-border" />
                  
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <p className="font-medium text-text-primary truncate">{fileObj.originalFile.name}</p>
                    <p className="text-xs text-text-muted mt-1">
                      {formatBytes(originalSize)} 
                      {fileObj.status === "done" && (
                        <span className="ml-2 text-success font-semibold">→ {formatBytes(newSize)} ({savings > 0 ? `-${savings}%` : '0%'})</span>
                      )}
                      {fileObj.status === "processing" && <span className="ml-2 text-primary font-semibold">Compressing...</span>}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {fileObj.status === "done" && fileObj.compressedBlob && (
                      <button onClick={() => downloadSingle(fileObj)} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors">
                        Download
                      </button>
                    )}
                    <button onClick={() => removeFile(fileObj.id)} className="p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Global Actions */}
          {files.some((f) => f.compressedBlob) && (
            <div className="flex justify-center pt-4">
              <button 
                onClick={downloadAllZip} 
                disabled={isZipping}
                className="px-8 py-3 bg-success text-white font-medium rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors shadow-md flex items-center gap-2"
              >
                {isZipping ? "Creating ZIP..." : "Download All as ZIP"}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
