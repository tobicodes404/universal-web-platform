import ImageResizerTool from "@/components/tools/image-resizer-tool";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Image Resizer - Resize Images to Exact Dimensions Online",
  description: "Resize JPG, PNG, and WebP images by pixels or percentage. Maintain aspect ratio automatically. 100% free, private, and processed in your browser.",
};

export default function ImageResizerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Image Tools" }, { label: "Image Resizer" }]} />
        </div>

        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Image Resizer</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Resize your images to exact pixel dimensions or scale them by percentage. Perfect for social media, web optimization, and printing.
          </p>
        </div>

        {/* Tool Interface */}
        <div className="mb-16">
          <ImageResizerTool />
        </div>

        {/* SEO Content: How to Use */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Resize Images</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">1</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Upload Images</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Select or drag and drop your images. The tool automatically detects their original dimensions.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">2</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Set New Size</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Choose to resize by exact pixels or percentage. Toggle the lock icon to maintain the original aspect ratio.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">3</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Download</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Click "Resize All Images" and download them individually or as a single ZIP file.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">What does "Maintain Aspect Ratio" mean?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">When locked, changing the width will automatically calculate the correct height so your image doesn't look stretched or squashed.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Will resizing reduce image quality?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Downscaling (making smaller) usually improves perceived sharpness. Upscaling (making larger) might cause slight blurriness, but we use high-quality canvas rendering to minimize this.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is it safe for private photos?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">100% safe. All processing happens locally in your browser. Your images never leave your device.</p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/tools/image-compressor" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Compressor</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Reduce file size without losing visual quality.</p>
            </Link>
            <Link href="/tools/image-cropper" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Cropper</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Crop images to perfect ratios for social media.</p>
            </Link>
            <Link href="/tools/image-rotator" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Rotator</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Rotate and flip your images easily.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
