import TextLineTools from "@/components/tools/text-line-tools";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Text Line Tools - Sort, Remove Duplicates, Reverse & More",
  description: "Free online text line tools. Sort lines alphabetically or numerically, remove duplicates, reverse line order, trim whitespace, shuffle, add prefix/suffix, and more. Process text line by line instantly.",
};

export default function TextLineToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools" }, { label: "Text Line Tools" }]} />
        </div>

        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Text Line Tools</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Process text line by line. Sort, remove duplicates, reverse, trim, shuffle, add prefixes/suffixes, and more - all in one place.
          </p>
        </div>

        <div className="mb-16">
          <TextLineTools />
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Use Text Line Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">1</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Paste Your Text</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Enter or paste your text with one item per line. The tool will process each line individually.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">2</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Choose an Operation</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Click any operation button to apply it instantly. You can chain multiple operations together.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">3</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Copy or Download</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Copy the processed text to your clipboard or download it as a .txt file for later use.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Available Operations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">Sort & Order</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start gap-2"><span className="text-primary font-bold">↑</span><span>Sort A-Z (alphabetical)</span></li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold">↓</span><span>Sort Z-A (reverse alphabetical)</span></li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold">↕</span><span>Sort by line length</span></li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold">#</span><span>Sort numerically</span></li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold">⇄</span><span>Reverse line order</span></li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold">⚄</span><span>Shuffle randomly</span></li>
              </ul>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">Clean & Filter</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start gap-2"><span className="text-primary font-bold">⊘</span><span>Remove duplicate lines</span></li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold">∅</span><span>Remove empty lines</span></li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold">✂</span><span>Trim whitespace</span></li>
              </ul>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">Transform</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start gap-2"><span className="text-primary font-bold">A</span><span>Convert to UPPERCASE</span></li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold">a</span><span>Convert to lowercase</span></li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold">1.</span><span>Add line numbers</span></li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold">→</span><span>Add custom prefix/suffix</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Common Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">Email Lists & Contacts</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Clean up email lists by removing duplicates and sorting alphabetically. Perfect for preparing mailing lists.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">Keyword Lists</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Organize SEO keywords, hashtags, or tags. Sort them, remove duplicates, or shuffle for random selection.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">Code & Config Files</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Process lists of imports, dependencies, or configuration values. Add prefixes/suffixes for bulk transformations.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">Data Cleaning</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Clean up CSV data, log files, or any line-based data. Remove empty lines, trim whitespace, and format consistently.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Can I apply multiple operations?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Yes! Each operation is applied to the current text. You can chain operations - for example, first remove duplicates, then sort A-Z, then add line numbers.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Does "Sort Numerically" handle decimals?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Yes, it handles both integers and decimal numbers. Lines that aren't valid numbers are treated as 0.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">What does "Trim Whitespace" do?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">It removes leading and trailing spaces, tabs, and other whitespace from each line while preserving the internal spacing.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is there a limit on text size?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">The tool works well with texts up to several thousand lines. For very large files, consider processing them in smaller batches.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is my data safe?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">100% safe. All processing happens directly in your browser. Your text is never uploaded to any server.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/tools/find-replace" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Find & Replace</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Search and replace text with Regex support.</p>
            </Link>
            <Link href="/tools/case-converter" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Case Converter</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Convert text to uppercase, lowercase, title case, and more.</p>
            </Link>
            <Link href="/tools/word-counter" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Word Counter</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Count words, characters, and get advanced text analysis.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
