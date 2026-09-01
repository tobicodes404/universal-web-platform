import ImageCropperTool from "@/components/tools/image-cropper-tool";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Image Cropper - Crop Images to Perfect Ratios Online",
  description: "Free online image cropper. Crop photos to 1:1, 16:9, 4:3, or custom sizes. Perfect for Instagram, YouTube, and web. 100% private and free.",
};

export default function ImageCropperPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Image Tools" }, { label: "Image Cropper" }]} />
        </div>

        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Image Cropper</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Crop your images to perfect aspect ratios for social media, presentations, or web. Simple, fast, and 100% private.
          </p>
        </div>

        {/* Tool Interface */}
        <div className="mb-16">
          <ImageCropperTool />
        </div>

        {/* SEO Content: How to Use */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Crop Images</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">1</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Upload Image</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Select any JPG, PNG, or WebP image from your device. It loads instantly in the editor.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">2</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Choose Ratio & Zoom</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Select a preset ratio (like 1:1 for Instagram) or crop freely. Use the zoom slider to focus on the perfect area.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">3</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Download</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Click "Download Cropped Image" to save your perfectly cropped photo in high-quality PNG format.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Which aspect ratio should I use for Instagram?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">For standard Instagram posts, use 1:1 (Square). For Stories and Reels, use 9:16 (Portrait). For landscape posts, 1.91:1 or 16:9 works best.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Does cropping reduce image quality?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Cropping removes parts of the image but does not reduce the quality of the remaining pixels. We export in high-quality PNG to ensure sharpness.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is my image uploaded to a server?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">No. All cropping happens directly in your browser using advanced HTML5 Canvas technology. Your photos remain 100% private.</p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/tools/image-resizer" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Resizer</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Resize images to exact pixel dimensions or percentages.</p>
            </Link>
            <Link href="/tools/image-compressor" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Compressor</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Reduce file size without losing visual quality.</p>
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
