"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface WatermarkedFile {
  id: string;
  originalFile: File;
  previewUrl: string;
  status: "pending" | "processing" | "done" | "error";
  resultBlob?: Blob;
}

type Position = "top-left" | "top-center" | "top-right" | "middle-left" | "center" | "middle-right" | "bottom-left" | "bottom-center" | "bottom-right";

export default function ImageWatermarkerTool() {
  const [files, setFiles] = useState<WatermarkedFile[]>([]);
  const [watermarkText, setWatermarkText] = useState("© Your Name");
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#FFFFFF");
  const [opacity, setOpacity] = useState(0.5);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState<Position>("bottom-right");
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const validFiles: WatermarkedFile[] = [];
    Array.from(newFiles).forEach((file) => {
      if (file.type.startsWith("image/")) {
        validFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          originalFile: file,
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
    setPreviewUrl(null);
  };

  // Generate preview with watermark
  useEffect(() => {
    if (files.length === 0) {
      setPreviewUrl(null);
      return;
    }

    const generatePreview = async () => {
      const img = new Image();
      img.src = files[0].previewUrl;
      await new Promise((resolve) => (img.onload = resolve));

      const canvas = document.createElement("canvas");
      const scale = Math.min(800 / img.width, 600 / img.height, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Apply watermark
      const scaledFontSize = fontSize * scale;
      const fontStyle = `${italic ? "italic " : ""}${bold ? "bold " : ""}${scaledFontSize}px Arial`;
      ctx.font = fontStyle;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.save();
      
      // Calculate position
      let x = canvas.width / 2;
      let y = canvas.height / 2;
      const padding = 20 * scale;

      if (position.includes("left")) x = padding;
      else if (position.includes("right")) x = canvas.width - padding;

      if (position.includes("top")) y = padding;
      else if (position.includes("bottom")) y = canvas.height - padding;

      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.fillText(watermarkText, 0, 0);
      ctx.restore();

      setPreviewUrl(canvas.toDataURL("image/jpeg", 0.9));
    };

    generatePreview();
  }, [files, watermarkText, fontSize, color, opacity, rotation, position, bold, italic]);

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

          ctx.drawImage(img, 0, 0);

          // Apply watermark at full resolution
          const fontStyle = `${italic ? "italic " : ""}${bold ? "bold " : ""}${fontSize}px Arial`;
          ctx.font = fontStyle;
          ctx.fillStyle = color;
          ctx.globalAlpha = opacity;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          ctx.save();
          
          let x = canvas.width / 2;
          let y = canvas.height / 2;
          const padding = 40;

          if (position.includes("left")) x = padding;
          else if (position.includes("right")) x = canvas.width - padding;

          if (position.includes("top")) y = padding;
          else if (position.includes("bottom")) y = canvas.height - padding;

          ctx.translate(x, y);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.fillText(watermarkText, 0, 0);
          ctx.restore();

          const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, fileObj.originalFile.type, 0.95)
          );

          if (!blob) throw new Error("Processing failed");

          return { ...fileObj, resultBlob: blob, status: "done" as const };
        } catch {
          return { ...fileObj, status: "error" as const };
        }
      })
    );

    setFiles(updatedFiles);
    setIsProcessing(false);
  }, [files, isProcessing, watermarkText, fontSize, color, opacity, rotation, position, bold, italic]);

  const downloadSingle = (fileObj: WatermarkedFile) => {
    if (fileObj.resultBlob) {
      const ext = fileObj.resultBlob.type.split("/")[1] || "jpg";
      const name = fileObj.originalFile.name.replace(/\.[^/.]+$/, "") + `-watermarked.${ext}`;
      saveAs(fileObj.resultBlob, name);
    }
  };

  const downloadAllZip = async () => {
    const doneFiles = files.filter((f) => f.resultBlob);
    if (doneFiles.length === 0) return;

    const zip = new JSZip();
    doneFiles.forEach((f) => {
      const ext = f.resultBlob!.type.split("/")[1] || "jpg";
      const name = f.originalFile.name.replace(/\.[^/.]+$/, "") + `-watermarked.${ext}`;
      zip.file(name, f.resultBlob!);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "watermarked-images.zip");
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
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
          {/* Controls & Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Controls Panel */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-text-primary">Watermark Settings</h2>
                <div className="flex gap-2">
                  <button onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary transition-colors">
                    + Add
                  </button>
                  <button onClick={clearAll} className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium text-error hover:bg-error/10 transition-colors">
                    Clear
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                {/* Text Input */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Watermark Text</label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="© Your Name"
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary/50 outline-none"
                  />
                </div>

                {/* Font Size & Color */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Font Size: {fontSize}px</label>
                    <input
                      type="range"
                      min="12"
                      max="120"
                      step="2"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Color</label>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full h-10 bg-background border border-border rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Opacity & Rotation */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Opacity: {Math.round(opacity * 100)}%</label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={opacity}
                      onChange={(e) => setOpacity(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Rotation: {rotation}°</label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      step="5"
                      value={rotation}
                      onChange={(e) => setRotation(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                </div>

                {/* Style Toggles */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setBold(!bold)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-colors border ${
                      bold ? "bg-primary/10 border-primary text-primary" : "bg-background border-border text-text-secondary"
                    }`}
                  >
                    Bold
                  </button>
                  <button
                    onClick={() => setItalic(!italic)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm italic transition-colors border ${
                      italic ? "bg-primary/10 border-primary text-primary" : "bg-background border-border text-text-secondary"
                    }`}
                  >
                    Italic
                  </button>
                </div>

                {/* Position Grid */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Position</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["top-left", "top-center", "top-right", "middle-left", "center", "middle-right", "bottom-left", "bottom-center", "bottom-right"] as Position[]).map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setPosition(pos)}
                        className={`p-2 rounded-lg text-xs font-medium transition-colors border ${
                          position === pos ? "bg-primary/10 border-primary text-primary" : "bg-background border-border text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        {pos.split("-").map(w => w[0].toUpperCase()).join("")}
                      </button>
                    ))}
                  </div>
                </div>

                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
              </div>
            </div>

            {/* Preview Panel */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Live Preview</h2>
              <div className="relative bg-background rounded-xl overflow-hidden border border-border aspect-video flex items-center justify-center">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                ) : (
                  <p className="text-text-muted">No preview available</p>
                )}
              </div>
              <p className="text-xs text-text-muted mt-3 text-center">Preview shows first image. Final output will be full resolution.</p>
            </div>
          </div>

          {/* File List */}
          <div className="space-y-4">
            {files.map((fileObj) => (
              <div key={fileObj.id} className="bg-surface border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                <img src={fileObj.previewUrl} alt={fileObj.originalFile.name} className="w-16 h-16 object-cover rounded-lg border border-border" />
                
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <p className="font-medium text-text-primary truncate">{fileObj.originalFile.name}</p>
                  <p className="text-xs text-text-muted mt-1">
                    {fileObj.status === "done" && <span className="text-success font-semibold">✓ Watermarked</span>}
                    {fileObj.status === "processing" && <span className="text-primary font-semibold">Processing...</span>}
                    {fileObj.status === "pending" && <span>Ready</span>}
                    {fileObj.status === "error" && <span className="text-error font-semibold">Error</span>}
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

          {/* Global Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button 
              onClick={processFiles} 
              disabled={isProcessing || files.length === 0}
              className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover disabled:opacity-50 transition-colors shadow-md"
            >
              {isProcessing ? "Applying Watermark..." : "Apply to All Images"}
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
