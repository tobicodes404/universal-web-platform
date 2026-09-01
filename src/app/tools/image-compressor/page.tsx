import ImageCompressorTool from "@/components/tools/image-compressor-tool";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Image Compressor - Reduce Image Size Without Losing Quality",
  description: "Compress JPG, PNG, and WebP images online for free. Reduce file size up to 90% without losing quality. 100% private, processed in your browser.",
};

export default function ImageCompressorPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Image Tools" }, { label: "Image Compressor" }]} />
        </div>

        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Image Compressor</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Reduce image file size without losing quality. Perfect for websites, emails, and social media. 100% private and free.
          </p>
        </div>

        {/* Tool Interface */}
        <div className="mb-16">
          <ImageCompressorTool />
        </div>

        {/* SEO Content: How to Use */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Compress Images</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">1</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Upload Images</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Drag and drop your JPG, PNG, or WebP images into the box, or click to select them from your device.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">2</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Adjust Settings</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Use the quality slider to balance size and clarity. You can also convert images to WebP for maximum compression.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">3</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Download</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Download your compressed images individually or grab them all at once in a single ZIP file.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is my image data safe?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Absolutely. All compression happens directly in your browser. Your images are never uploaded to our servers, ensuring 100% privacy.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Which format gives the best compression?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">WebP generally offers the best compression-to-quality ratio. You can use the "Output Format" dropdown to convert your JPG or PNG images to WebP.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Does it support batch processing?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Yes! You can upload and compress multiple images at the same time, and download them all together as a ZIP file.</p>
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
            <Link href="/tools/image-cropper" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Cropper</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Crop images to perfect ratios for social media and web.</p>
            </Link>
            <Link href="/tools/pdf?op=compress" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">PDF Compressor</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Reduce the file size of your PDF documents.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
