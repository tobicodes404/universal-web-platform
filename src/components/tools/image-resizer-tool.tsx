"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface ResizedFile {
  id: string;
  originalFile: File;
  originalWidth: number;
  originalHeight: number;
  resizedBlob: Blob | null;
  newWidth: number;
  newHeight: number;
  previewUrl: string;
  status: "pending" | "processing" | "done" | "error";
}

type ResizeMode = "dimensions" | "percentage";

export default function ImageResizerTool() {
  const [files, setFiles] = useState<ResizedFile[]>([]);
  const [mode, setMode] = useState<ResizeMode>("dimensions");
  const [targetWidth, setTargetWidth] = useState(1920);
  const [targetHeight, setTargetHeight] = useState(1080);
  const [percentage, setPercentage] = useState(50);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle File Selection & Get Original Dimensions
  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const validFiles: ResizedFile[] = [];
    Array.from(newFiles).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const img = new Image();
        img.onload = () => {
          validFiles.push({
            id: Math.random().toString(36).substr(2, 9),
            originalFile: file,
            originalWidth: img.width,
            originalHeight: img.height,
            resizedBlob: null,
            newWidth: img.width,
            newHeight: img.height,
            previewUrl: URL.createObjectURL(file),
            status: "pending",
          });
          setFiles((prev) => [...prev, ...validFiles]);
        };
        img.src = URL.createObjectURL(file);
      }
    });
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

  // Calculate new dimensions based on aspect ratio
  useEffect(() => {
    if (files.length === 0 || !maintainAspectRatio) return;

    setFiles((prev) =>
      prev.map((f) => {
        const ratio = f.originalWidth / f.originalHeight;
        let newW = f.originalWidth;
        let newH = f.originalHeight;

        if (mode === "dimensions") {
          newW = targetWidth;
          newH = Math.round(targetWidth / ratio);
        } else {
          newW = Math.round(f.originalWidth * (percentage / 100));
          newH = Math.round(f.originalHeight * (percentage / 100));
        }
        return { ...f, newWidth: newW, newHeight: newH };
      })
    );
  }, [targetWidth, targetHeight, percentage, mode, maintainAspectRatio, files.length]);

  // Core Resizing Logic using Canvas API
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
          canvas.width = fileObj.newWidth;
          canvas.height = fileObj.newHeight;
          const ctx = canvas.getContext("2d");
          
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, 0, 0, fileObj.newWidth, fileObj.newHeight);
            
            const blob = await new Promise<Blob | null>((resolve) => 
              canvas.toBlob(resolve, fileObj.originalFile.type, 0.9)
            );
            
            return { ...fileObj, resizedBlob: blob, status: "done" as const };
          }
          return { ...fileObj, status: "error" as const };
        } catch {
          return { ...fileObj, status: "error" as const };
        }
      })
    );

    setFiles(updatedFiles);
    setIsProcessing(false);
  }, [files, isProcessing]);

  const downloadSingle = (fileObj: ResizedFile) => {
    if (fileObj.resizedBlob) {
      const ext = fileObj.resizedBlob.type.split("/")[1] || "jpg";
      const name = fileObj.originalFile.name.replace(/\.[^/.]+$/, "") + `-${fileObj.newWidth}x${fileObj.newHeight}.${ext}`;
      saveAs(fileObj.resizedBlob, name);
    }
  };

  const downloadAllZip = async () => {
    const doneFiles = files.filter((f) => f.resizedBlob);
    if (doneFiles.length === 0) return;

    const zip = new JSZip();
    doneFiles.forEach((f) => {
      const ext = f.resizedBlob!.type.split("/")[1] || "jpg";
      const name = f.originalFile.name.replace(/\.[^/.]+$/, "") + `-${f.newWidth}x${f.newHeight}.${ext}`;
      zip.file(name, f.resizedBlob!);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "resized-images.zip");
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
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
              <h2 className="text-lg font-semibold text-text-primary">Resize Settings</h2>
              <div className="flex gap-3">
                <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                  + Add More
                </button>
                <button onClick={clearAll} className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-error hover:bg-error/10 transition-colors">
                  Clear All
                </button>
              </div>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-2 mb-6 p-1 bg-background rounded-lg w-fit">
              <button
                onClick={() => setMode("dimensions")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === "dimensions" ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"}`}
              >
                By Dimensions (px)
              </button>
              <button
                onClick={() => setMode("percentage")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === "percentage" ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"}`}
              >
                By Percentage (%)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              {mode === "dimensions" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Width (px)</label>
                    <input type="number" value={targetWidth} onChange={(e) => setTargetWidth(Number(e.target.value))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary/50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Height (px)</label>
                    <input type="number" value={targetHeight} onChange={(e) => setTargetHeight(Number(e.target.value))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary/50 outline-none" />
                  </div>
                  <div className="flex items-center gap-3 pb-2">
                    <button
                      onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                      className={`p-2 rounded-lg border transition-colors ${maintainAspectRatio ? "bg-primary/10 border-primary text-primary" : "bg-background border-border text-text-muted"}`}
                      title={maintainAspectRatio ? "Unlock Aspect Ratio" : "Lock Aspect Ratio"}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {maintainAspectRatio ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        )}
                      </svg>
                    </button>
                    <span className="text-sm text-text-secondary">{maintainAspectRatio ? "Aspect Ratio Locked" : "Aspect Ratio Unlocked"}</span>
                  </div>
                </>
              ) : (
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-text-primary mb-2">Scale: {percentage}%</label>
                  <input type="range" min="10" max="200" step="5" value={percentage} onChange={(e) => setPercentage(Number(e.target.value))} className="w-full accent-primary" />
                  <div className="flex justify-between text-xs text-text-muted mt-1">
                    <span>10%</span>
                    <span>100%</span>
                    <span>200%</span>
                  </div>
                </div>
              )}
            </div>
            
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
          </div>

          {/* File List & Results */}
          <div className="space-y-4">
            {files.map((fileObj) => (
              <div key={fileObj.id} className="bg-surface border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                <img src={fileObj.previewUrl} alt={fileObj.originalFile.name} className="w-16 h-16 object-cover rounded-lg border border-border" />
                
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <p className="font-medium text-text-primary truncate">{fileObj.originalFile.name}</p>
                  <p className="text-xs text-text-muted mt-1">
                    {fileObj.originalWidth} x {fileObj.originalHeight}px 
                    <span className="mx-2 text-text-faint">→</span>
                    <span className="text-tools-accent font-semibold">{fileObj.newWidth} x {fileObj.newHeight}px</span>
                  </p>
                </div>

                <div className="flex gap-2">
                  {fileObj.status === "done" && fileObj.resizedBlob && (
                    <button onClick={() => downloadSingle(fileObj)} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors">
                      Download
                    </button>
                  )}
                  <button onClick={() => removeFile(fileObj.id)} className="p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Global Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button 
              onClick={processFiles} 
              disabled={isProcessing || files.length === 0}
              className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover disabled:opacity-50 transition-colors shadow-md"
            >
              {isProcessing ? "Processing..." : "Resize All Images"}
            </button>
            
            {files.some((f) => f.resizedBlob) && (
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
