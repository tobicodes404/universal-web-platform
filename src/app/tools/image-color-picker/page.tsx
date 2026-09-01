import ImageColorPickerTool from "@/components/tools/image-color-picker-tool";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Image Color Picker - Extract HEX, RGB, HSL Codes from Photos",
  description: "Free online image color picker. Click on any pixel to get exact HEX, RGB, and HSL color codes. Perfect for designers and developers. 100% private.",
};

export default function ImageColorPickerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Image Tools" }, { label: "Image Color Picker" }]} />
        </div>

        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Image Color Picker</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Extract exact color codes from any image. Get HEX, RGB, and HSL values instantly with pixel-perfect accuracy.
          </p>
        </div>

        <div className="mb-16">
          <ImageColorPickerTool />
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Pick Colors from Images</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">1</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Upload Image</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Drag and drop any image or click to browse. Supports JPG, PNG, WebP, and more.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">2</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Click to Pick</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Move your mouse to preview colors in real-time. Click on any pixel to select it. Use zoom for precision.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">3</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Copy Code</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Get HEX, RGB, or HSL codes instantly. Click "Copy" to use in your CSS, design tool, or code.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Understanding Color Formats</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-tools-accent rounded-full"></span>
                HEX
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">Hexadecimal color code used in CSS and HTML. Format: #RRGGBB (e.g., #FF5733).</p>
              <p className="text-xs text-text-muted">Most common for web development.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-tools-accent rounded-full"></span>
                RGB
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">Red, Green, Blue values from 0-255. Format: rgb(R, G, B) (e.g., rgb(255, 87, 51)).</p>
              <p className="text-xs text-text-muted">Used in design software and programming.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-tools-accent rounded-full"></span>
                HSL
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">Hue (0-360°), Saturation (0-100%), Lightness (0-100%). More intuitive for humans.</p>
              <p className="text-xs text-text-muted">Great for creating color variations.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">How accurate is the color picking?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Pixel-perfect accuracy. We read the exact RGB values from each pixel using HTML5 Canvas. The zoom feature helps you pick the right pixel even in detailed images.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Can I use this for web design?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Absolutely! This tool is perfect for extracting color palettes from inspiration images, matching brand colors, or creating consistent design systems.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Does it save my color history?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Yes! The last 10 colors you pick are saved in the Color History panel during your session. Click any color to select it again or copy its code.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is my image uploaded anywhere?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">No. All color extraction happens locally in your browser. Your images never leave your device, ensuring complete privacy.</p>
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
            <Link href="/tools/image-format-converter" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Format Converter</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Convert between JPG, PNG, WebP, and BMP.</p>
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
