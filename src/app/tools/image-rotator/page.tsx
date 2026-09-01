import ImageRotatorTool from "@/components/tools/image-rotator-tool";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Image Rotator & Flipper - Rotate and Mirror Images Online",
  description: "Free online tool to rotate images by 90, 180, or 270 degrees, and flip them horizontally or vertically. Fast, private, and high-quality.",
};

export default function ImageRotatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Image Tools" }, { label: "Image Rotator" }]} />
        </div>

        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Image Rotator & Flipper</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Easily rotate your images by 90° or 180°, or flip them horizontally and vertically. Perfect for fixing orientation or creating mirror effects.
          </p>
        </div>

        <div className="mb-16">
          <ImageRotatorTool />
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Rotate or Flip Images</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">1</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Upload Images</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Drag and drop your photos or click to select them. You can process multiple images at once.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">2</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Apply Transformations</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Use the global controls to rotate by 90°/180° or flip horizontally/vertically. See a live preview instantly.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">3</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Download</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Click "Apply to All" to process, then download your corrected images individually or as a single ZIP file.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Does rotating an image reduce its quality?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">No. Rotating by 90, 180, or 270 degrees is a lossless operation. We use high-quality canvas rendering to ensure your image remains sharp.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">What is the difference between flipping and rotating?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Rotating turns the image around its center (like a wheel). Flipping creates a mirror image, either horizontally (left-to-right) or vertically (top-to-bottom).</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is my data safe?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">100% safe. All transformations happen locally in your browser. Your images are never uploaded to any server.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/tools/image-cropper" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Cropper</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Crop images to perfect ratios for social media and web.</p>
            </Link>
            <Link href="/tools/image-resizer" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Resizer</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Resize images to exact pixel dimensions or percentages.</p>
            </Link>
            <Link href="/tools/image-compressor" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Compressor</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Reduce file size without losing visual quality.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
