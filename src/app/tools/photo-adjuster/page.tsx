import PhotoAdjusterTool from "@/components/tools/photo-adjuster-tool";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Photo Adjuster & Filters - Edit Photos with Professional Filters Online",
  description: "Free online photo editor. Apply Instagram-style filters, adjust brightness, contrast, saturation, and more. 10+ presets, full control, 100% private.",
};

export default function PhotoAdjusterPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Image Tools" }, { label: "Photo Adjuster" }]} />
        </div>

        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Photo Adjuster & Filters</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Transform your photos with professional filters and precise adjustments. Apply Instagram-style presets or fine-tune every detail.
          </p>
        </div>

        <div className="mb-16">
          <PhotoAdjusterTool />
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Edit Your Photos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">1</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Upload Image</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Drag and drop your photo or click to browse. Works with JPG, PNG, WebP, and more.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">2</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Apply Filters or Adjust</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Choose from 10+ preset filters or use the Adjust tab to fine-tune brightness, contrast, saturation, and more.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">3</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Download</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Click "Download Edited Image" to save your enhanced photo in full resolution PNG format.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Available Adjustments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-bold text-text-primary mb-2">Brightness</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Make your photo lighter or darker. Perfect for fixing underexposed or overexposed images.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-bold text-text-primary mb-2">Contrast</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Enhance the difference between light and dark areas. Adds depth and visual impact.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-bold text-text-primary mb-2">Saturation</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Intensify or mute colors. Boost for vibrant photos or reduce for a muted, artistic look.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-bold text-text-primary mb-2">Hue Rotation</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Shift all colors around the color wheel. Create unique color effects and moods.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-bold text-text-primary mb-2">Blur</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Soften the entire image. Great for backgrounds or creating a dreamy, ethereal atmosphere.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-bold text-text-primary mb-2">Grayscale & Sepia</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Convert to black and white or add a warm vintage tone. Classic artistic effects.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Preset Filters Gallery</h2>
          <div className="bg-surface border border-border rounded-xl p-6">
            <p className="text-text-secondary leading-relaxed mb-4">
              We offer 10+ professionally crafted filters inspired by popular photo editing apps. Each filter is carefully tuned to deliver stunning results with a single click:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Vintage", "B&W", "Warm", "Cool", "Dramatic", "Fade", "Noir", "Sunset", "Dreamy", "Sharp"].map((name) => (
                <div key={name} className="bg-background border border-border rounded-lg p-3 text-center">
                  <p className="text-sm font-semibold text-text-primary">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Will editing reduce image quality?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">No. We export in full-resolution PNG format, preserving every detail. The preview is scaled for speed, but the final download is at original quality.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Can I combine multiple adjustments?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Absolutely! Start with a preset filter, then switch to the Adjust tab to fine-tune individual settings. All adjustments stack together in real-time.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">How do I see the original image?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Use the "Hold to See Original" button at the top. Press and hold it to instantly compare your edited version with the unedited original.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is my photo uploaded to a server?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">No. All editing happens locally in your browser using HTML5 Canvas and CSS filters. Your photos never leave your device, ensuring complete privacy.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Can I undo changes?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Yes! Click "Reset All" to return to the original image instantly. You can also reset individual sliders by clicking the ↺ icon next to each value.</p>
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
            <Link href="/tools/image-cropper" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Cropper</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Crop images to perfect ratios for social media.</p>
            </Link>
            <Link href="/tools/image-watermarker" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Watermarker</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Add text watermarks to protect your photos.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
