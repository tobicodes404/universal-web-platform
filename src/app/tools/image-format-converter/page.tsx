import ImageFormatConverterTool from "@/components/tools/image-format-converter-tool";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Image Format Converter - Convert JPG, PNG, WebP Online",
  description: "Free online image format converter. Convert images between JPG, PNG, WebP, and BMP instantly. 100% private, batch processing supported.",
};

export default function ImageFormatConverterPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Image Tools" }, { label: "Image Format Converter" }]} />
        </div>

        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Image Format Converter</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Convert your images between JPG, PNG, WebP, and BMP formats instantly. Perfect for web optimization and software compatibility.
          </p>
        </div>

        <div className="mb-16">
          <ImageFormatConverterTool />
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Convert Image Formats</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">1</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Upload Images</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Drag and drop your images or click to browse. You can convert multiple files at once.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">2</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Choose Format</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Select your target format (JPG, PNG, WebP, or BMP) and adjust the quality slider if needed.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">3</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Download</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Click "Convert All Images" and download them individually or as a single ZIP file.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Which Format Should You Choose?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-tools-accent rounded-full"></span>
                JPG / JPEG
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">Best for photographs and complex images with many colors. Offers good compression with adjustable quality.</p>
              <p className="text-xs text-text-muted">Does not support transparency.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-tools-accent rounded-full"></span>
                PNG
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">Perfect for graphics, logos, and images that need transparency. Lossless compression preserves every detail.</p>
              <p className="text-xs text-text-muted">Larger file sizes than JPG.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-tools-accent rounded-full"></span>
                WebP
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">Modern format developed by Google. Offers superior compression (25-35% smaller than JPG) with both lossy and lossless options.</p>
              <p className="text-xs text-text-muted">Best for websites and modern apps.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-tools-accent rounded-full"></span>
                BMP
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">Uncompressed bitmap format. Preserves every pixel exactly as is, but results in very large file sizes.</p>
              <p className="text-xs text-text-muted">Use only when required by specific software.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Will converting from JPG to PNG improve quality?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">No. Converting from a lossy format (JPG) to a lossless format (PNG) won't restore lost details. However, it will prevent further quality loss if you need to edit the image multiple times.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Why is WebP recommended for websites?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">WebP offers 25-35% smaller file sizes compared to JPG with the same visual quality. This means faster page loads, better SEO, and reduced bandwidth costs.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Can I convert transparent PNGs to JPG?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Yes! When converting transparent PNGs to JPG, the transparent areas will automatically be filled with a white background since JPG doesn't support transparency.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is my data safe?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">100% safe. All conversions happen locally in your browser using HTML5 Canvas. Your images are never uploaded to any server.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/tools/image-compressor" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Compressor</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Reduce file size without losing visual quality.</p>
            </Link>
            <Link href="/tools/image-resizer" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Resizer</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Resize images to exact pixel dimensions or percentages.</p>
            </Link>
            <Link href="/tools/image-cropper" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Cropper</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Crop images to perfect ratios for social media.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
