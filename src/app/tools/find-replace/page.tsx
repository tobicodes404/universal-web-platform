import FindReplaceTool from "@/components/tools/find-replace-tool";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Find and Replace Text Online - With Regex Support",
  description: "Free online find and replace tool. Search and replace text with case sensitivity, whole word matching, and regular expression (Regex) support. Live match counting.",
};

export default function FindReplacePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools" }, { label: "Find & Replace" }]} />
        </div>

        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Find & Replace Text</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Search and replace text instantly with advanced options. Supports case sensitivity, whole word matching, and Regular Expressions (Regex).
          </p>
        </div>

        <div className="mb-16">
          <FindReplaceTool />
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Use Find & Replace</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">1</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Enter Your Text</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Paste or type the text you want to modify in the main input box.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">2</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Set Find & Replace</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Enter the text to find and the replacement text. Enable Regex or Whole Word for precise control.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">3</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Replace & Copy</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Click "Replace All" to see the result. Copy it to your clipboard or use it as the new input for further edits.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Advanced Options Explained</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-tools-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
                Case Sensitive
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">When enabled, "Apple" and "apple" are treated as different words. When disabled, it matches both.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-tools-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                Whole Word Only
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">Ensures you only match complete words. Searching for "cat" won't match the "cat" in "category".</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-tools-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                Regular Expression
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">Use powerful Regex patterns (e.g., <code className="bg-background px-1 rounded">\d+</code> for numbers) for advanced text manipulation.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Common Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">Code Refactoring</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Rename variables or functions across a block of code quickly. Use Regex to match specific patterns like all variables starting with "temp_".</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">Data Cleaning</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Remove extra spaces, standardize date formats, or strip unwanted characters from CSV data or exported lists.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">Document Editing</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Update company names, change terminology, or fix recurring typos in long articles, reports, or manuscripts.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">Log File Analysis</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Extract or replace specific error codes, IP addresses, or timestamps from server logs using Regex patterns.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Does this tool support Regular Expressions?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Yes! Check the "Use Regular Expression" box. The tool will validate your Regex in real-time and show an error if the pattern is invalid.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Can I chain multiple replacements?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Absolutely. After a replacement, click the "Use as Input" button. This moves the result back to the main text box so you can perform another find and replace operation.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is my text sent to a server?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">No. All processing happens instantly in your browser using JavaScript. Your text and data remain 100% private and secure.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">What does "Whole Word Only" do?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">It ensures the search only matches complete words bounded by spaces or punctuation. For example, searching for "cat" won't accidentally replace the "cat" inside the word "category".</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/tools/text-diff-checker" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Text Diff Checker</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Compare two texts and find differences instantly.</p>
            </Link>
            <Link href="/tools/case-converter" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Case Converter</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Convert text to uppercase, lowercase, title case, and more.</p>
            </Link>
            <Link href="/tools/json-formatter" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">JSON Formatter</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Beautify, validate, and minify your JSON data.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
