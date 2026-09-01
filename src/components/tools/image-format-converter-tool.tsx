"use client";

import { useState, useCallback, useRef } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface ConvertedFile {
  id: string;
  originalFile: File;
  previewUrl: string;
  targetFormat: string;
  quality: number;
  status: "pending" | "processing" | "done" | "error";
  resultBlob?: Blob;
  error?: string;
}

const FORMATS = [
  { value: "image/jpeg", label: "JPG", ext: "jpg", description: "Best for photos" },
  { value: "image/png", label: "PNG", ext: "png", description: "Best for graphics" },
  { value: "image/webp", label: "WebP", ext: "webp", description: "Modern & small" },
  { value: "image/bmp", label: "BMP", ext: "bmp", description: "Uncompressed" },
];

export default function ImageFormatConverterTool() {
  const [files, setFiles] = useState<ConvertedFile[]>([]);
  const [globalFormat, setGlobalFormat] = useState("image/webp");
  const [globalQuality, setGlobalQuality] = useState(0.9);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const validFiles: ConvertedFile[] = [];
    Array.from(newFiles).forEach((file) => {
      if (file.type.startsWith("image/")) {
        validFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          originalFile: file,
          previewUrl: URL.createObjectURL(file),
          targetFormat: globalFormat,
          quality: globalQuality,
          status: "pending",
        });
      }
    });
    setFiles((prev) => [...prev, ...validFiles]);
  }, [globalFormat, globalQuality]);

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

  const updateFileFormat = (id: string, format: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, targetFormat: format, status: "pending" as const, resultBlob: undefined } : f))
    );
  };

  const applyGlobalFormat = () => {
    setFiles((prev) =>
      prev.map((f) => ({
        ...f,
        targetFormat: globalFormat,
        quality: globalQuality,
        status: "pending" as const,
        resultBlob: undefined,
      }))
    );
  };

  const processFiles = useCallback(async () => {
    if (files.length === 0 || isProcessing) return;
    setIsProcessing(true);

    setFiles((prev) => prev.map((f) => ({ ...f, status: "processing" })));

    const updatedFiles = await Promise.all(
      files.map(async (fileObj) => {
        try {
          const img = new Image();
          img.src = fileObj.previewUrl;
          await new Promise((resolve) => (img.onload = resolve));

          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          
          if (!ctx) throw new Error("Canvas context not found");

          // White background for JPEG (since it doesn't support transparency)
          if (fileObj.targetFormat === "image/jpeg") {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          ctx.drawImage(img, 0, 0);

          const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, fileObj.targetFormat, fileObj.quality)
          );

          if (!blob) throw new Error("Conversion failed");

          return { ...fileObj, resultBlob: blob, status: "done" as const };
        } catch (err) {
          return { ...fileObj, status: "error" as const, error: err instanceof Error ? err.message : "Unknown error" };
        }
      })
    );

    setFiles(updatedFiles);
    setIsProcessing(false);
  }, [files, isProcessing]);

  const downloadSingle = (fileObj: ConvertedFile) => {
    if (fileObj.resultBlob) {
      const format = FORMATS.find((f) => f.value === fileObj.targetFormat);
      const ext = format?.ext || "jpg";
      const name = fileObj.originalFile.name.replace(/\.[^/.]+$/, "") + `-converted.${ext}`;
      saveAs(fileObj.resultBlob, name);
    }
  };

  const downloadAllZip = async () => {
    const doneFiles = files.filter((f) => f.resultBlob);
    if (doneFiles.length === 0) return;

    const zip = new JSZip();
    doneFiles.forEach((f) => {
      const format = FORMATS.find((fmt) => fmt.value === f.targetFormat);
      const ext = format?.ext || "jpg";
      const name = f.originalFile.name.replace(/\.[^/.]+$/, "") + `-converted.${ext}`;
      zip.file(name, f.resultBlob!);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "converted-images.zip");
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFormatLabel = (mimeType: string) => {
    return FORMATS.find((f) => f.value === mimeType)?.label || mimeType.split("/")[1].toUpperCase();
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <h3 className="text-xl font-semibold text-text-primary mb-2">Drop your images here</h3>
          <p className="text-text-secondary mb-6">or click to browse (JPG, PNG, WebP, BMP)</p>
          <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-colors shadow-sm">
            Select Images
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
        </div>
      ) : (
        <>
          {/* Global Controls */}
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Conversion Settings</h2>
              <div className="flex gap-3">
                <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                  + Add More
                </button>
                <button onClick={clearAll} className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-error hover:bg-error/10 transition-colors">
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Target Format */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">Convert To</label>
                <div className="grid grid-cols-2 gap-2">
                  {FORMATS.map((format) => (
                    <button
                      key={format.value}
                      onClick={() => setGlobalFormat(format.value)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        globalFormat === format.value
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background hover:border-text-faint"
                      }`}
                    >
                      <p className="font-semibold text-text-primary text-sm">{format.label}</p>
                      <p className="text-xs text-text-muted mt-0.5">{format.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Control */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Quality: {Math.round(globalQuality * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={globalQuality}
                  onChange={(e) => setGlobalQuality(Number(e.target.value))}
                  className="w-full accent-primary mb-3"
                />
                <button
                  onClick={applyGlobalFormat}
                  className="w-full px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Apply to All Images
                </button>
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
          </div>

          {/* File List */}
          <div className="space-y-4">
            {files.map((fileObj) => {
              const originalSize = fileObj.originalFile.size;
              const newSize = fileObj.resultBlob?.size || originalSize;
              const savings = originalSize > 0 && fileObj.resultBlob ? Math.round((1 - newSize / originalSize) * 100) : 0;

              return (
                <div key={fileObj.id} className="bg-surface border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                  <img src={fileObj.previewUrl} alt={fileObj.originalFile.name} className="w-16 h-16 object-cover rounded-lg border border-border" />
                  
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <p className="font-medium text-text-primary truncate">{fileObj.originalFile.name}</p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                      <span className="text-xs text-text-muted">
                        {getFormatLabel(fileObj.originalFile.type)} → 
                      </span>
                      <select
                        value={fileObj.targetFormat}
                        onChange={(e) => updateFileFormat(fileObj.id, e.target.value)}
                        className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded px-2 py-1 outline-none"
                      >
                        {FORMATS.map((f) => (
                          <option key={f.value} value={f.value}>{f.label}</option>
                        ))}
                      </select>
                      {fileObj.status === "done" && fileObj.resultBlob && (
                        <span className="text-xs text-success font-semibold">
                          {formatBytes(originalSize)} → {formatBytes(newSize)} ({savings > 0 ? `-${savings}%` : savings < 0 ? `+${Math.abs(savings)}%` : '0%'})
                        </span>
                      )}
                      {fileObj.status === "processing" && (
                        <span className="text-xs text-primary font-semibold">Converting...</span>
                      )}
                      {fileObj.status === "error" && (
                        <span className="text-xs text-error font-semibold">Error: {fileObj.error}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {fileObj.status === "done" && fileObj.resultBlob && (
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
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button 
              onClick={processFiles} 
              disabled={isProcessing || files.length === 0}
              className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover disabled:opacity-50 transition-colors shadow-md"
            >
              {isProcessing ? "Converting..." : "Convert All Images"}
            </button>
            
            {files.some((f) => f.resultBlob) && (
              <button 
                onClick={downloadAllZip} 
                className="px-8 py-3 bg-success text-white font-medium rounded-lg hover:bg-green-600 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                Download All as ZIP
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
