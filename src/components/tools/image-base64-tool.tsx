"use client";

import { useState, useRef, useCallback } from "react";

interface ConversionResult {
  base64: string;
  base64WithPrefix: string;
  mimeType: string;
  originalSize: number;
  base64Size: number;
}

export default function ImageBase64Tool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [includePrefix, setIncludePrefix] = useState(true);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    
    const previewUrl = URL.createObjectURL(file);
    setImageSrc(previewUrl);

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64WithPrefix = e.target?.result as string;
      const base64 = base64WithPrefix.split(",")[1];
      
      setResult({
        base64,
        base64WithPrefix,
        mimeType: file.type,
        originalSize: file.size,
        base64Size: base64.length,
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const copyToClipboard = () => {
    const text = includePrefix ? result?.base64WithPrefix : result?.base64;
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsTxt = () => {
    const text = includePrefix ? result?.base64WithPrefix : result?.base64;
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "image-base64.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setImageSrc(null);
    setResult(null);
    setCopied(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const displayText = includePrefix ? result?.base64WithPrefix : result?.base64;
  const increasePercent = result ? Math.round((result.base64Size / result.originalSize - 1) * 100) : 0;

  return (
    <div className="space-y-8">
      {!imageSrc ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-2xl p-16 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
        >
          <svg className="w-16 h-16 text-text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <h3 className="text-xl font-semibold text-text-primary mb-2">Drop an image to convert</h3>
          <p className="text-text-secondary mb-6">Supports JPG, PNG, WebP, GIF, SVG</p>
          <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-colors shadow-sm">
            Choose Image
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
        </div>
      ) : (
        <>
          {/* Main Grid: Preview + Output */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Preview */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">Original Image</h2>
                <button onClick={reset} className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium text-error hover:bg-error/10 transition-colors">
                  New Image
                </button>
              </div>
              <div className="bg-background rounded-xl overflow-hidden border border-border flex items-center justify-center min-h-[300px] p-4">
                <img src={imageSrc} alt="Preview" className="max-w-full max-h-[400px] object-contain" />
              </div>
              {result && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-background border border-border rounded-lg p-3">
                    <p className="text-xs text-text-muted uppercase mb-1">Original Size</p>
                    <p className="font-mono font-bold text-text-primary">{formatBytes(result.originalSize)}</p>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-3">
                    <p className="text-xs text-text-muted uppercase mb-1">Base64 Size</p>
                    <p className="font-mono font-bold text-primary">{formatBytes(result.base64Size)}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Output Panel */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">Base64 Output</h2>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includePrefix}
                      onChange={(e) => setIncludePrefix(e.target.checked)}
                      className="w-4 h-4 accent-primary"
                    />
                    Include prefix
                  </label>
                </div>
              </div>

              {result && (
                <>
                  <div className="bg-background border border-border rounded-lg p-3 mb-4">
                    <p className="text-xs text-text-muted mb-1">MIME Type</p>
                    <p className="font-mono text-sm text-text-primary">{result.mimeType}</p>
                  </div>

                  <div className="bg-background border border-border rounded-lg p-3 mb-4 max-h-[200px] overflow-y-auto">
                    <p className="text-xs text-text-muted mb-2">Base64 String (preview)</p>
                    <p className="font-mono text-xs text-text-primary break-all leading-relaxed">
                      {displayText?.substring(0, 200)}...
                    </p>
                  </div>

                  <div className="bg-warning-bg border border-warning-border rounded-lg p-3 mb-4">
                    <p className="text-xs text-warning font-medium">
                      ⚠ Base64 is ~{increasePercent}% larger than original. Use for small images only.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
                    >
                      {copied ? "✓ Copied!" : "Copy to Clipboard"}
                    </button>
                    <button
                      onClick={downloadAsTxt}
                      className="px-4 py-2.5 bg-background border border-border text-text-primary text-sm font-medium rounded-lg hover:border-text-faint transition-colors"
                    >
                      Download .txt
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Usage Examples */}
          {result && (
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-text-primary mb-4">How to Use</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-background border border-border rounded-lg p-4">
                  <p className="text-xs font-semibold text-text-muted uppercase mb-2">HTML Image Tag</p>
                  <code className="text-xs text-text-primary break-all font-mono">
                    &lt;img src="{result.base64WithPrefix.substring(0, 50)}..." /&gt;
                  </code>
                </div>
                <div className="bg-background border border-border rounded-lg p-4">
                  <p className="text-xs font-semibold text-text-muted uppercase mb-2">CSS Background</p>
                  <code className="text-xs text-text-primary break-all font-mono">
                    background-image: url("{result.base64WithPrefix.substring(0, 50)}...");
                  </code>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
