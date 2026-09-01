import ImageBase64Tool from "@/components/tools/image-base64-tool";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Image to Base64 Converter - Convert Images to Base64 Strings Online",
  description: "Free online tool to convert images to Base64 encoded strings. Perfect for embedding images in HTML, CSS, and JSON. 100% private, instant conversion.",
};

export default function ImageBase64Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Image Tools" }, { label: "Image to Base64" }]} />
        </div>

        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Image to Base64 Converter</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Convert any image to a Base64 encoded string instantly. Perfect for embedding images directly in HTML, CSS, JSON, or source code.
          </p>
        </div>

        <div className="mb-16">
          <ImageBase64Tool />
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Convert Images to Base64</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">1</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Upload Image</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Drag and drop your image or click to browse. Supports JPG, PNG, WebP, GIF, and SVG.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">2</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Choose Format</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Toggle the prefix option to include or exclude the "data:image/..." header based on your needs.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">3</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Copy or Download</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Copy the Base64 string to clipboard or download it as a .txt file for later use.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">What is Base64 Encoding?</h2>
          <div className="bg-surface border border-border rounded-xl p-6 mb-6">
            <p className="text-text-secondary leading-relaxed mb-4">
              Base64 is a binary-to-text encoding scheme that represents binary data (like images) in an ASCII string format. It's commonly used to embed images directly in HTML, CSS, JSON, or source code without needing separate image files.
            </p>
            <p className="text-text-secondary leading-relaxed">
              The encoded string starts with a data URI scheme like <code className="bg-background px-2 py-0.5 rounded text-sm font-mono text-primary">data:image/png;base64,</code> followed by the encoded data.
            </p>
          </div>

          <h3 className="text-xl font-bold text-text-primary mb-4">Common Use Cases</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-surface border border-border rounded-xl p-5">
              <h4 className="font-semibold text-text-primary mb-2">HTML Embedding</h4>
              <p className="text-sm text-text-secondary leading-relaxed">Embed small images directly in HTML without external file requests. Perfect for email templates and single-file documents.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h4 className="font-semibold text-text-primary mb-2">CSS Backgrounds</h4>
              <p className="text-sm text-text-secondary leading-relaxed">Use Base64 images as CSS background-image values. Great for small icons and decorative elements.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h4 className="font-semibold text-text-primary mb-2">JSON APIs</h4>
              <p className="text-sm text-text-secondary leading-relaxed">Send images as Base64 strings in JSON payloads. Useful for APIs that don't support multipart file uploads.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h4 className="font-semibold text-text-primary mb-2">Source Code</h4>
              <p className="text-sm text-text-secondary leading-relaxed">Embed small images directly in source code files (React, Vue, etc.) without managing separate asset files.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Performance Considerations</h2>
          <div className="bg-warning-bg border border-warning-border rounded-xl p-6">
            <h3 className="font-bold text-warning mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              Important: Base64 Increases File Size
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">
              Base64 encoding increases the file size by approximately 33%. This means a 100KB image becomes ~133KB when encoded.
            </p>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-success mt-1">✓</span>
                <span><strong>Use for:</strong> Small images (icons, logos under 10KB), single-file documents, email templates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-error mt-1">✗</span>
                <span><strong>Avoid for:</strong> Large photos, websites with many images (use regular image files with CDN instead)</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">What is the "prefix" option?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">The prefix is the data URI scheme header (e.g., "data:image/png;base64,"). Include it when embedding in HTML/CSS. Exclude it when you need just the raw Base64 data for APIs or custom processing.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is there a file size limit?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Technically, there's no hard limit, but we recommend keeping images under 5MB for best performance. Very large Base64 strings can slow down browsers and increase memory usage.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Can I convert Base64 back to an image?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Yes! Simply use the Base64 string as the src attribute in an HTML img tag, or decode it back to binary using your programming language's Base64 decoder.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is my image uploaded to a server?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">No. All conversion happens locally in your browser using JavaScript's FileReader API. Your images never leave your device, ensuring complete privacy.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/tools/image-format-converter" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Format Converter</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Convert between JPG, PNG, WebP, and BMP.</p>
            </Link>
            <Link href="/tools/image-compressor" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Compressor</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Reduce file size without losing visual quality.</p>
            </Link>
            <Link href="/tools/image-color-picker" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Color Picker</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Extract HEX, RGB, HSL codes from images.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
