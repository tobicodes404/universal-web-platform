"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface ColorInfo {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

export default function ImageColorPickerTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorInfo | null>(null);
  const [hoverColor, setHoverColor] = useState<ColorInfo | null>(null);
  const [colorHistory, setColorHistory] = useState<ColorInfo[]>([]);
  const [zoom, setZoom] = useState(1);
  const [copied, setCopied] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        setImageSrc(e.target?.result as string);
        setSelectedColor(null);
        setHoverColor(null);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Get color at specific pixel
  const getColorAtPixel = useCallback((x: number, y: number): ColorInfo | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    // RGB to HEX
    const hex = "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("").toUpperCase();

    // RGB to HSL
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6; break;
        case gNorm: h = ((bNorm - rNorm) / d + 2) / 6; break;
        case bNorm: h = ((rNorm - gNorm) / d + 4) / 6; break;
      }
    }

    return {
      hex,
      rgb: { r, g, b },
      hsl: { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
    };
  }, []);

  // Draw image on canvas
  useEffect(() => {
    if (!imageSrc || !canvasRef.current || !imgRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imgRef.current;
    const maxW = 800;
    const scale = Math.min(maxW / img.width, 1);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, [imageSrc]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
    
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsHovering(true);
    
    const color = getColorAtPixel(x, y);
    setHoverColor(color);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoverColor(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
    
    const color = getColorAtPixel(x, y);
    if (color) {
      setSelectedColor(color);
      setColorHistory(prev => {
        const filtered = prev.filter(c => c.hex !== color.hex);
        return [color, ...filtered].slice(0, 10);
      });
    }
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopied(format);
    setTimeout(() => setCopied(null), 2000);
  };

  const reset = () => {
    setImageSrc(null);
    setSelectedColor(null);
    setHoverColor(null);
    setColorHistory([]);
    setZoom(1);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const displayColor = hoverColor || selectedColor;

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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          <h3 className="text-xl font-semibold text-text-primary mb-2">Drop an image to pick colors</h3>
          <p className="text-text-secondary mb-6">Click anywhere on the image to extract its color</p>
          <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-colors shadow-sm">
            Choose Image
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
        </div>
      ) : (
        <>
          {/* Main Grid: Canvas + Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Canvas Area */}
            <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">Pick Colors</h2>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted">Zoom:</span>
                    <button onClick={() => setZoom(Math.max(0.5, zoom - 0.25))} className="w-7 h-7 bg-background border border-border rounded text-text-secondary hover:text-text-primary">−</button>
                    <span className="text-xs font-medium text-text-primary w-10 text-center">{Math.round(zoom * 100)}%</span>
                    <button onClick={() => setZoom(Math.min(3, zoom + 0.25))} className="w-7 h-7 bg-background border border-border rounded text-text-secondary hover:text-text-primary">+</button>
                  </div>
                  <button onClick={reset} className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium text-error hover:bg-error/10 transition-colors">
                    New Image
                  </button>
                </div>
              </div>

              <div className="relative bg-background rounded-xl overflow-hidden border border-border flex items-center justify-center min-h-[300px]">
                <canvas
                  ref={canvasRef}
                  onClick={handleClick}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="cursor-crosshair max-w-full transition-transform"
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
                />
                
                {/* Magnifier */}
                {isHovering && hoverColor && (
                  <div 
                    className="absolute pointer-events-none z-20"
                    style={{
                      left: mousePos.x + 20,
                      top: mousePos.y + 20,
                    }}
                  >
                    <div className="bg-surface border border-border rounded-lg shadow-lg p-2 flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded border border-border"
                        style={{ backgroundColor: hoverColor.hex }}
                      />
                      <div className="text-xs">
                        <p className="font-mono font-bold text-text-primary">{hoverColor.hex}</p>
                        <p className="text-text-muted">RGB({hoverColor.rgb.r}, {hoverColor.rgb.g}, {hoverColor.rgb.b})</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-text-muted mt-3 text-center">Click on the image to pick a color. Move mouse to preview.</p>
            </div>

            {/* Color Info Panel */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-text-primary mb-4">Color Info</h2>
              
              {displayColor ? (
                <div className="space-y-4">
                  {/* Color Preview */}
                  <div 
                    className="w-full h-32 rounded-xl border border-border shadow-inner"
                    style={{ backgroundColor: displayColor.hex }}
                  />
                  
                  {/* HEX */}
                  <div className="bg-background border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-text-muted uppercase">HEX</span>
                      <button 
                        onClick={() => copyToClipboard(displayColor.hex, "hex")}
                        className="text-xs text-primary hover:text-primary-hover font-medium"
                      >
                        {copied === "hex" ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                    <p className="font-mono font-bold text-text-primary text-lg">{displayColor.hex}</p>
                  </div>

                  {/* RGB */}
                  <div className="bg-background border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-text-muted uppercase">RGB</span>
                      <button 
                        onClick={() => copyToClipboard(`rgb(${displayColor.rgb.r}, ${displayColor.rgb.g}, ${displayColor.rgb.b})`, "rgb")}
                        className="text-xs text-primary hover:text-primary-hover font-medium"
                      >
                        {copied === "rgb" ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                    <p className="font-mono font-bold text-text-primary">
                      {displayColor.rgb.r}, {displayColor.rgb.g}, {displayColor.rgb.b}
                    </p>
                  </div>

                  {/* HSL */}
                  <div className="bg-background border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-text-muted uppercase">HSL</span>
                      <button 
                        onClick={() => copyToClipboard(`hsl(${displayColor.hsl.h}, ${displayColor.hsl.s}%, ${displayColor.hsl.l}%)`, "hsl")}
                        className="text-xs text-primary hover:text-primary-hover font-medium"
                      >
                        {copied === "hsl" ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                    <p className="font-mono font-bold text-text-primary">
                      {displayColor.hsl.h}°, {displayColor.hsl.s}%, {displayColor.hsl.l}%
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-background rounded-xl flex items-center justify-center mx-auto mb-3 border border-border">
                    <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <p className="text-sm text-text-muted">Click on the image to pick a color</p>
                </div>
              )}
            </div>
          </div>

          {/* Color History */}
          {colorHistory.length > 0 && (
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">Color History</h2>
                <button 
                  onClick={() => setColorHistory([])}
                  className="text-xs text-text-muted hover:text-error transition-colors"
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {colorHistory.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedColor(color);
                      copyToClipboard(color.hex, "hex");
                    }}
                    className="group relative"
                    title={color.hex}
                  >
                    <div 
                      className="w-14 h-14 rounded-lg border-2 border-border hover:border-primary transition-colors shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {color.hex}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
