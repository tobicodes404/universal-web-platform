import TextDiffTool from "@/components/tools/text-diff-tool";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Text Diff Checker - Compare Two Texts and Find Differences",
  description: "Free online text diff tool. Compare two texts side-by-side or unified view. Find added, removed, and changed lines instantly. Perfect for code review and document comparison.",
};

export default function TextDiffCheckerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools" }, { label: "Text Diff Checker" }]} />
        </div>

        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Text Diff Checker</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Compare two texts and find differences instantly. See added, removed, and changed lines with color-coded highlighting.
          </p>
        </div>

        <div className="mb-16">
          <TextDiffTool />
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Compare Texts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">1</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Enter Original Text</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Paste or type the original text in the left box. This will be your baseline for comparison.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">2</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Enter Modified Text</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Paste or type the modified text in the right box. The diff will update automatically as you type.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">3</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Review Differences</h3>
              <p className="text-sm text-text-secondary leading-relaxed">See color-coded differences: green for added, red for removed, yellow for changed lines.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Understanding the Results</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 bg-success-bg border border-success-border rounded"></div>
                <h3 className="font-bold text-text-primary">Added Lines (Green)</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">Lines that exist in the modified text but not in the original. These are new additions.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 bg-error-bg border border-error-border rounded"></div>
                <h3 className="font-bold text-text-primary">Removed Lines (Red)</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">Lines that exist in the original text but not in the modified version. These have been deleted.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 bg-warning-bg border border-warning-border rounded"></div>
                <h3 className="font-bold text-text-primary">Changed Lines (Yellow)</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">Lines that have been modified. The old version is shown in red, the new version in green.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 bg-background border border-border rounded"></div>
                <h3 className="font-bold text-text-primary">Unchanged Lines</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">Lines that are identical in both texts. These provide context for the changes.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">View Modes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">Unified View</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                All changes shown in a single column. Added lines marked with +, removed lines with -. Similar to Git diff output.
              </p>
              <p className="text-xs text-text-muted">Best for: Quick overview, code reviews, patch files</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">Split View</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                Original and modified texts shown side-by-side. Each side shows only its relevant lines with proper highlighting.
              </p>
              <p className="text-xs text-text-muted">Best for: Detailed comparison, document review, long texts</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Common Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-tools-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Code Review
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">Compare different versions of code files to see what changed between commits or pull requests.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-tools-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Document Comparison
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">Compare different versions of contracts, articles, or reports to track edits and revisions.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-tools-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
                Configuration Files
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">Compare config files, environment variables, or settings between different environments.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">How does the diff algorithm work?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">We use the Longest Common Subsequence (LCS) algorithm to find the optimal way to match lines between the two texts. This ensures accurate detection of additions, removals, and changes.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is there a size limit?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">The tool works best with texts up to a few thousand lines. Very large files may take longer to process due to the algorithm's complexity.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Does it detect word-level changes?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Currently, the tool detects line-level changes. If a line is modified in any way, it shows the entire line as changed. For word-level diffs, consider using specialized code editors.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Are my texts sent to a server?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">No. All comparison happens directly in your browser using JavaScript. Your texts are never uploaded anywhere, ensuring complete privacy.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Can I use this for code files?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Yes! The tool works with any text, including source code, configuration files, and scripts. Just paste the content of both files and compare.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/tools/word-counter" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Word Counter</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Count words, characters, and get advanced text analysis.</p>
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
