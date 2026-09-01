"use client";

import { useState, useCallback, useRef } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface TransformedFile {
  id: string;
  originalFile: File;
  previewUrl: string;
  rotation: number; // 0, 90, 180, 270
  flipH: boolean;
  flipV: boolean;
  status: "pending" | "processing" | "done" | "error";
  resultBlob?: Blob;
}

export default function ImageRotatorTool() {
  const [files, setFiles] = useState<TransformedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const validFiles: TransformedFile[] = [];
    Array.from(newFiles).forEach((file) => {
      if (file.type.startsWith("image/")) {
        validFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          originalFile: file,
          previewUrl: URL.createObjectURL(file),
          rotation: 0,
          flipH: false,
          flipV: false,
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

  const updateTransform = (id: string, updates: Partial<TransformedFile>) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates, status: "pending" as const, resultBlob: undefined } : f))
    );
  };

  const applyToAll = (key: "rotation" | "flipH" | "flipV", value: any) => {
    setFiles((prev) =>
      prev.map((f) => ({
        ...f,
        [key]: value,
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
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("Canvas context not found");

          // Calculate dimensions based on rotation
          const isRotated90or270 = fileObj.rotation === 90 || fileObj.rotation === 270;
          canvas.width = isRotated90or270 ? img.height : img.width;
          canvas.height = isRotated90or270 ? img.width : img.height;

          // Move to center
          ctx.translate(canvas.width / 2, canvas.height / 2);
          
          // Rotate
          ctx.rotate((fileObj.rotation * Math.PI) / 180);
          
          // Flip
          ctx.scale(fileObj.flipH ? -1 : 1, fileObj.flipV ? -1 : 1);
          
          // Draw image centered
          ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);

          const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, fileObj.originalFile.type, 0.95)
          );

          return { ...fileObj, resultBlob: blob || undefined, status: "done" as const };
        } catch {
          return { ...fileObj, status: "error" as const };
        }
      })
    );

    setFiles(updatedFiles);
    setIsProcessing(false);
  }, [files, isProcessing]);

  const downloadSingle = (fileObj: TransformedFile) => {
    if (fileObj.resultBlob) {
      const ext = fileObj.resultBlob.type.split("/")[1] || "jpg";
      const name = fileObj.originalFile.name.replace(/\.[^/.]+$/, "") + `-edited.${ext}`;
      saveAs(fileObj.resultBlob, name);
    }
  };

  const downloadAllZip = async () => {
    const doneFiles = files.filter((f) => f.resultBlob);
    if (doneFiles.length === 0) return;

    const zip = new JSZip();
    doneFiles.forEach((f) => {
      const ext = f.resultBlob!.type.split("/")[1] || "jpg";
      const name = f.originalFile.name.replace(/\.[^/.]+$/, "") + `-edited.${ext}`;
      zip.file(name, f.resultBlob!);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "rotated-flipped-images.zip");
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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
          {/* Global Controls */}
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Transformation Controls</h2>
              <div className="flex gap-3">
                <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                  + Add More
                </button>
                <button onClick={clearAll} className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-error hover:bg-error/10 transition-colors">
                  Clear All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <button onClick={() => applyToAll("rotation", (prev: number) => (prev + 90) % 360)} className="flex items-center justify-center gap-2 px-4 py-3 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                <span className="text-sm font-medium">Rotate 90°</span>
              </button>
              <button onClick={() => applyToAll("rotation", 180)} className="flex items-center justify-center gap-2 px-4 py-3 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" style={{ transform: 'rotate(180deg)' }} /></svg>
                <span className="text-sm font-medium">Rotate 180°</span>
              </button>
              <button onClick={() => applyToAll("flipH", (prev: boolean) => !prev)} className="flex items-center justify-center gap-2 px-4 py-3 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                <span className="text-sm font-medium">Flip Horizontal</span>
              </button>
              <button onClick={() => applyToAll("flipV", (prev: boolean) => !prev)} className="flex items-center justify-center gap-2 px-4 py-3 bg-background border border-border rounded-lg hover:border-primary hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                <span className="text-sm font-medium">Flip Vertical</span>
              </button>
              <button onClick={processFiles} disabled={isProcessing} className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover disabled:opacity-50 transition-colors shadow-sm">
                {isProcessing ? "Processing..." : "Apply to All"}
              </button>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
          </div>

          {/* File List */}
          <div className="space-y-4">
            {files.map((fileObj) => (
              <div key={fileObj.id} className="bg-surface border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <img 
                    src={fileObj.previewUrl} 
                    alt={fileObj.originalFile.name} 
                    className="w-full h-full object-cover rounded-lg border border-border"
                    style={{ 
                      transform: `rotate(${fileObj.rotation}deg) scaleX(${fileObj.flipH ? -1 : 1}) scaleY(${fileObj.flipV ? -1 : 1})` 
                    }} 
                  />
                </div>
                
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <p className="font-medium text-text-primary truncate">{fileObj.originalFile.name}</p>
                  <p className="text-xs text-text-muted mt-1">
                    Rotation: {fileObj.rotation}° | Flip H: {fileObj.flipH ? "Yes" : "No"} | Flip V: {fileObj.flipV ? "Yes" : "No"}
                  </p>
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
            ))}
          </div>

          {/* Global Download */}
          {files.some((f) => f.resultBlob) && (
            <div className="flex justify-center pt-4">
              <button 
                onClick={downloadAllZip} 
                className="px-8 py-3 bg-success text-white font-medium rounded-lg hover:bg-green-600 transition-colors shadow-md flex items-center gap-2"
              >
                Download All as ZIP
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
