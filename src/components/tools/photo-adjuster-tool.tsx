"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface Adjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  blur: number;
  grayscale: number;
  sepia: number;
  invert: number;
  opacity: number;
}

interface FilterPreset {
  name: string;
  adjustments: Adjustments;
}

const DEFAULT_ADJUSTMENTS: Adjustments = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  hue: 0,
  blur: 0,
  grayscale: 0,
  sepia: 0,
  invert: 0,
  opacity: 100,
};

const FILTER_PRESETS: FilterPreset[] = [
  { name: "Original", adjustments: { ...DEFAULT_ADJUSTMENTS } },
  { name: "Vintage", adjustments: { brightness: 110, contrast: 85, saturation: 70, hue: 0, blur: 0, grayscale: 0, sepia: 40, invert: 0, opacity: 100 } },
  { name: "B&W", adjustments: { brightness: 100, contrast: 110, saturation: 0, hue: 0, blur: 0, grayscale: 100, sepia: 0, invert: 0, opacity: 100 } },
  { name: "Warm", adjustments: { brightness: 105, contrast: 105, saturation: 120, hue: 10, blur: 0, grayscale: 0, sepia: 15, invert: 0, opacity: 100 } },
  { name: "Cool", adjustments: { brightness: 100, contrast: 110, saturation: 90, hue: 200, blur: 0, grayscale: 0, sepia: 0, invert: 0, opacity: 100 } },
  { name: "Dramatic", adjustments: { brightness: 90, contrast: 150, saturation: 130, hue: 0, blur: 0, grayscale: 0, sepia: 0, invert: 0, opacity: 100 } },
  { name: "Fade", adjustments: { brightness: 120, contrast: 80, saturation: 80, hue: 0, blur: 0, grayscale: 20, sepia: 10, invert: 0, opacity: 90 } },
  { name: "Noir", adjustments: { brightness: 95, contrast: 140, saturation: 0, hue: 0, blur: 0, grayscale: 100, sepia: 20, invert: 0, opacity: 100 } },
  { name: "Sunset", adjustments: { brightness: 110, contrast: 110, saturation: 140, hue: 350, blur: 0, grayscale: 0, sepia: 20, invert: 0, opacity: 100 } },
  { name: "Dreamy", adjustments: { brightness: 115, contrast: 90, saturation: 110, hue: 0, blur: 2, grayscale: 0, sepia: 10, invert: 0, opacity: 95 } },
  { name: "Sharp", adjustments: { brightness: 100, contrast: 130, saturation: 110, hue: 0, blur: 0, grayscale: 0, sepia: 0, invert: 0, opacity: 100 } },
];

export default function PhotoAdjusterTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalSrc, setOriginalSrc] = useState<string | null>(null);
  const [adjustments, setAdjustments] = useState<Adjustments>(DEFAULT_ADJUSTMENTS);
  const [activePreset, setActivePreset] = useState("Original");
  const [showOriginal, setShowOriginal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<"filters" | "adjust">("filters");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        setImageSrc(url);
        setOriginalSrc(url);
        setAdjustments(DEFAULT_ADJUSTMENTS);
        setActivePreset("Original");
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const updateAdjustment = (key: keyof Adjustments, value: number) => {
    setAdjustments((prev) => ({ ...prev, [key]: value }));
    setActivePreset("Custom");
  };

  const applyPreset = (preset: FilterPreset) => {
    setAdjustments(preset.adjustments);
    setActivePreset(preset.name);
  };

  const resetAll = () => {
    setAdjustments(DEFAULT_ADJUSTMENTS);
    setActivePreset("Original");
  };

  // Generate CSS filter string for live preview
  const getFilterString = (adj: Adjustments) => {
    return `brightness(${adj.brightness}%) contrast(${adj.contrast}%) saturate(${adj.saturation}%) hue-rotate(${adj.hue}deg) blur(${adj.blur}px) grayscale(${adj.grayscale}%) sepia(${adj.sepia}%) invert(${adj.invert}%) opacity(${adj.opacity}%)`;
  };

  const processAndDownload = useCallback(async () => {
    if (!imgRef.current || isProcessing) return;
    setIsProcessing(true);

    try {
      const img = imgRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) throw new Error("Canvas context not found");

      ctx.filter = getFilterString(adjustments);
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png", 1)
      );

      if (!blob) throw new Error("Processing failed");

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `edited-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }, [adjustments, isProcessing]);

  const reset = () => {
    setImageSrc(null);
    setOriginalSrc(null);
    setAdjustments(DEFAULT_ADJUSTMENTS);
    setActivePreset("Original");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-xl font-semibold text-text-primary mb-2">Drop an image to edit</h3>
          <p className="text-text-secondary mb-6">Apply filters, adjust colors, and enhance your photos</p>
          <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-colors shadow-sm">
            Choose Image
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
        </div>
      ) : (
        <>
          {/* Top Controls */}
          <div className="bg-surface border border-border rounded-2xl p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button onClick={reset} className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary transition-colors">
                  New Image
                </button>
                <button onClick={resetAll} className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary transition-colors">
                  Reset All
                </button>
                <button 
                  onMouseDown={() => setShowOriginal(true)}
                  onMouseUp={() => setShowOriginal(false)}
                  onMouseLeave={() => setShowOriginal(false)}
                  className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  {showOriginal ? "Showing Original" : "Hold to See Original"}
                </button>
              </div>
              <button
                onClick={processAndDownload}
                disabled={isProcessing}
                className="px-5 py-2 bg-success text-white text-sm font-medium rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors shadow-sm flex items-center gap-2"
              >
                {isProcessing ? "Processing..." : "Download Edited Image"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
            </div>
          </div>

          {/* Main Grid: Canvas + Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Canvas Area */}
            <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <div className="relative bg-background rounded-xl overflow-hidden border border-border flex items-center justify-center min-h-[400px]">
                <img
                  src={showOriginal ? originalSrc! : imageSrc}
                  alt="Preview"
                  className="max-w-full max-h-[500px] object-contain transition-all duration-200"
                  style={!showOriginal ? { filter: getFilterString(adjustments) } : undefined}
                />
                {activePreset !== "Original" && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                    {activePreset}
                  </div>
                )}
              </div>
            </div>

            {/* Controls Panel */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              {/* Tabs */}
              <div className="flex gap-1 p-1 bg-background rounded-lg mb-6">
                <button
                  onClick={() => setActiveTab("filters")}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "filters" ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  Filters
                </button>
                <button
                  onClick={() => setActiveTab("adjust")}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "adjust" ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  Adjust
                </button>
              </div>

              {/* Filters Tab */}
              {activeTab === "filters" && (
                <div className="grid grid-cols-2 gap-2 max-h-[500px] overflow-y-auto pr-1">
                  {FILTER_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className={`relative p-2 rounded-lg border-2 transition-all ${
                        activePreset === preset.name
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-text-faint"
                      }`}
                    >
                      <div className="aspect-square rounded-md overflow-hidden mb-2 bg-background">
                        <img
                          src={imageSrc}
                          alt={preset.name}
                          className="w-full h-full object-cover"
                          style={{ filter: getFilterString(preset.adjustments) }}
                        />
                      </div>
                      <p className="text-xs font-medium text-text-primary text-center">{preset.name}</p>
                    </button>
                  ))}
                </div>
              )}

              {/* Adjust Tab */}
              {activeTab === "adjust" && (
                <div className="space-y-5 max-h-[500px] overflow-y-auto pr-1">
                  <SliderControl
                    label="Brightness"
                    value={adjustments.brightness}
                    min={0}
                    max={200}
                    defaultValue={100}
                    unit="%"
                    onChange={(v) => updateAdjustment("brightness", v)}
                  />
                  <SliderControl
                    label="Contrast"
                    value={adjustments.contrast}
                    min={0}
                    max={200}
                    defaultValue={100}
                    unit="%"
                    onChange={(v) => updateAdjustment("contrast", v)}
                  />
                  <SliderControl
                    label="Saturation"
                    value={adjustments.saturation}
                    min={0}
                    max={200}
                    defaultValue={100}
                    unit="%"
                    onChange={(v) => updateAdjustment("saturation", v)}
                  />
                  <SliderControl
                    label="Hue Rotate"
                    value={adjustments.hue}
                    min={0}
                    max={360}
                    defaultValue={0}
                    unit="°"
                    onChange={(v) => updateAdjustment("hue", v)}
                  />
                  <SliderControl
                    label="Blur"
                    value={adjustments.blur}
                    min={0}
                    max={20}
                    defaultValue={0}
                    unit="px"
                    onChange={(v) => updateAdjustment("blur", v)}
                  />
                  <SliderControl
                    label="Grayscale"
                    value={adjustments.grayscale}
                    min={0}
                    max={100}
                    defaultValue={0}
                    unit="%"
                    onChange={(v) => updateAdjustment("grayscale", v)}
                  />
                  <SliderControl
                    label="Sepia"
                    value={adjustments.sepia}
                    min={0}
                    max={100}
                    defaultValue={0}
                    unit="%"
                    onChange={(v) => updateAdjustment("sepia", v)}
                  />
                  <SliderControl
                    label="Invert"
                    value={adjustments.invert}
                    min={0}
                    max={100}
                    defaultValue={0}
                    unit="%"
                    onChange={(v) => updateAdjustment("invert", v)}
                  />
                  <SliderControl
                    label="Opacity"
                    value={adjustments.opacity}
                    min={0}
                    max={100}
                    defaultValue={100}
                    unit="%"
                    onChange={(v) => updateAdjustment("opacity", v)}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

// Slider Control Component
function SliderControl({
  label,
  value,
  min,
  max,
  defaultValue,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  defaultValue: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const isModified = value !== defaultValue;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono ${isModified ? "text-primary font-bold" : "text-text-muted"}`}>
            {value}{unit}
          </span>
          {isModified && (
            <button
              onClick={() => onChange(defaultValue)}
              className="text-[10px] text-text-muted hover:text-primary transition-colors"
              title="Reset to default"
            >
              ↺
            </button>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
    </div>
  );
}
