import ImageWatermarkerTool from "@/components/tools/image-watermarker-tool";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Image Watermarker - Add Text Watermark to Photos Online",
  description: "Free online image watermarker. Add custom text watermarks to your photos with full control over position, size, color, and opacity. 100% private and batch processing supported.",
};

export default function ImageWatermarkerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Image Tools" }, { label: "Image Watermarker" }]} />
        </div>

        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Image Watermarker</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Protect your photos and add branding with custom text watermarks. Full control over position, size, color, and transparency.
          </p>
        </div>

        <div className="mb-16">
          <ImageWatermarkerTool />
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Add Watermarks to Images</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">1</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Upload Images</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Drag and drop your photos or click to select them. You can watermark multiple images at once.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">2</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Customize Watermark</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Enter your text, choose position, adjust font size, color, opacity, and rotation. See live preview instantly.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">3</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Download</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Click "Apply to All Images" and download your watermarked photos individually or as a single ZIP file.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Why Use Watermarks?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-tools-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Copyright Protection
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">Protect your original photography and artwork from unauthorized use by adding a visible copyright notice.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-tools-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                Brand Identity
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">Build brand recognition by consistently adding your logo, website, or business name to all your visual content.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-tools-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                Social Media Sharing
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">Share your work on social platforms while ensuring proper attribution and preventing others from claiming your content.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-tools-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Draft Marking
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">Mark images as "Draft", "Confidential", or "Sample" before final approval or distribution.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Can I add a logo instead of text?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Currently, this tool supports text watermarks only. For logo watermarks, you can use our Image Cropper tool to prepare your logo, then use it as text (though for actual image logos, you'd need a more advanced editor).</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Will the watermark affect image quality?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">No. We use high-quality canvas rendering at full resolution. The watermark is applied without degrading the original image quality.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Can I remove a watermark later?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Once applied, a watermark becomes part of the image pixels and cannot be easily removed. This is by design to protect your content. Always keep original unwatermarked copies.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is my data safe?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">100% safe. All watermarking happens locally in your browser. Your images are never uploaded to any server.</p>
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
