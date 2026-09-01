import CaseConverterTool from "@/components/tools/case-converter-tool";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Case Converter - Convert Text to UPPERCASE, lowercase, Title Case & More",
  description: "Free online case converter. Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and 10+ other formats instantly.",
};

export default function CaseConverterPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools" }, { label: "Case Converter" }]} />
        </div>

        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Case Converter</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Convert text between 14 different case formats instantly. Perfect for writers, developers, and SEO specialists.
          </p>
        </div>

        {/* Tool Interface */}
        <div className="mb-16">
          <CaseConverterTool />
        </div>

        {/* SEO Content: How to Use */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Use the Case Converter</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">1</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Enter Your Text</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Type or paste your text in the input box. The converter works with any text, including sentences, paragraphs, or code.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">2</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Choose a Case Type</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Select from 14 different case formats. The converted text appears instantly in the output box.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">3</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Copy the Result</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Click the copy button or "Copy Result" to get your converted text. Use "Use as Input" to chain conversions.</p>
            </div>
          </div>
        </section>

        {/* Case Types Explained */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Available Case Formats</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-bold text-text-primary mb-2">UPPERCASE & lowercase</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">Convert all letters to capital or small letters. Useful for emphasis, headings, or standardizing text.</p>
              <p className="text-xs font-mono text-text-muted">"hello world" → "HELLO WORLD"</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-bold text-text-primary mb-2">Title Case & Sentence case</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">Title Case capitalizes the first letter of each word. Sentence case capitalizes only the first letter of each sentence.</p>
              <p className="text-xs font-mono text-text-muted">"hello world" → "Hello World"</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-bold text-text-primary mb-2">camelCase & PascalCase</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">Standard programming naming conventions. camelCase starts with lowercase, PascalCase with uppercase. No spaces.</p>
              <p className="text-xs font-mono text-text-muted">"hello world" → "helloWorld" / "HelloWorld"</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-bold text-text-primary mb-2">snake_case & CONSTANT_CASE</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">Words separated by underscores. snake_case is lowercase, CONSTANT_CASE is uppercase. Common in Python and environment variables.</p>
              <p className="text-xs font-mono text-text-muted">"hello world" → "hello_world" / "HELLO_WORLD"</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-bold text-text-primary mb-2">kebab-case & dot.case</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">Words separated by hyphens or dots. kebab-case is common in URLs and CSS, dot.case in package names.</p>
              <p className="text-xs font-mono text-text-muted">"hello world" → "hello-world" / "hello.world"</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-bold text-text-primary mb-2">URL Slug</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">Creates SEO-friendly URLs. Converts to lowercase, replaces spaces with hyphens, removes special characters.</p>
              <p className="text-xs font-mono text-text-muted">"Hello World!" → "hello-world"</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-bold text-text-primary mb-2">aLtErNaTiNg & iNVERSE</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">Fun text transformations. Alternating switches between upper and lower case. Inverse swaps the case of each character.</p>
              <p className="text-xs font-mono text-text-muted">"Hello" → "hElLo" / "hELLO"</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="font-bold text-text-primary mb-2">Reverse</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-2">Reverses the entire string character by character. Useful for puzzles or text manipulation.</p>
              <p className="text-xs font-mono text-text-muted">"Hello" → "olleH"</p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Who Uses Case Converters?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-tools-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Developers
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">Convert variable names between camelCase, snake_case, and kebab-case for different programming languages and frameworks.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-tools-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Writers & Editors
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">Fix inconsistent capitalization in documents. Convert headings to Title Case or standardize sentence structure.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-tools-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                SEO Specialists
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">Generate clean URL slugs for blog posts and web pages. Ensure proper Title Case for meta tags and headings.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">What is the difference between Title Case and Sentence case?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Title Case capitalizes the first letter of every word (e.g., "Hello World"). Sentence case only capitalizes the first letter of each sentence (e.g., "Hello world").</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Can I convert code variable names?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Yes! Use camelCase for JavaScript/Java, snake_case for Python/Ruby, PascalCase for C#/classes, and CONSTANT_CASE for constants and environment variables.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">How does the URL Slug converter work?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">It converts text to lowercase, replaces spaces and special characters with hyphens, and removes any non-alphanumeric characters. Perfect for SEO-friendly URLs.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Can I chain multiple conversions?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Yes! Use the "Use as Input" button to take your converted text and use it as the new input for another conversion. This is useful for complex transformations.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is my text sent to a server?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">No. All conversions happen directly in your browser using JavaScript. Your text is never uploaded anywhere, ensuring complete privacy.</p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/tools/word-counter" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Word Counter</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Count words, characters, and get advanced text analysis.</p>
            </Link>
            <Link href="/tools/json-formatter" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">JSON Formatter</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Beautify, validate, and minify your JSON data.</p>
            </Link>
            <Link href="/tools/image-compressor" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Image Compressor</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Reduce image file size without losing quality.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
