import LoremIpsumTool from "@/components/tools/lorem-ipsum-tool";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata = {
  title: "Lorem Ipsum Generator - Create Placeholder Text in 4 Unique Flavors",
  description: "Free online lorem ipsum generator with 4 unique flavors: Classic Latin, Hipster, Tech, and Business. Generate paragraphs, sentences, words, or bytes instantly.",
};

export default function LoremIpsumGeneratorPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools" }, { label: "Lorem Ipsum Generator" }]} />
        </div>

        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Lorem Ipsum Generator</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Generate placeholder text in 4 unique flavors. Perfect for designers, developers, and content creators.
          </p>
        </div>

        <div className="mb-16">
          <LoremIpsumTool />
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">What is Lorem Ipsum?</h2>
          <div className="bg-surface border border-border rounded-xl p-6">
            <p className="text-text-secondary leading-relaxed mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Lorem Ipsum has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">4 Unique Flavors</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">Classic</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                Traditional Latin lorem ipsum text that has been used for centuries. Perfect for classic designs and traditional layouts.
              </p>
              <p className="text-xs font-mono text-text-muted bg-background p-3 rounded-lg">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
              </p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">Hipster</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                Modern, trendy words for contemporary designs. Great for lifestyle brands, cafes, and modern web applications.
              </p>
              <p className="text-xs font-mono text-text-muted bg-background p-3 rounded-lg">
                "Artisan organic sustainable craft vintage aesthetic..."
              </p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">Tech</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                Developer and technology terminology. Perfect for tech startups, SaaS products, and software documentation.
              </p>
              <p className="text-xs font-mono text-text-muted bg-background p-3 rounded-lg">
                "Algorithm API blockchain cloud database devops..."
              </p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold text-text-primary mb-3">Business</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                Corporate jargon and business terminology. Ideal for corporate websites, presentations, and business proposals.
              </p>
              <p className="text-xs font-mono text-text-muted bg-background p-3 rounded-lg">
                "Synergy leverage stakeholder scalability ROI..."
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Use the Generator</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">1</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Choose a Flavor</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Select from Classic, Hipster, Tech, or Business flavors based on your project's tone and audience.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">2</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Set Quantity</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Choose to generate by paragraphs, sentences, words, or bytes. Adjust the count to your needs.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">3</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Copy or Download</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Copy the generated text to clipboard or download as a .txt file. Use HTML output for web projects.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">When to Use Lorem Ipsum</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">Web Design & Development</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Fill layouts with realistic text during the design phase. Helps clients visualize the final product without getting distracted by actual content.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">Typography & Font Testing</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Test how different fonts and typefaces look with realistic text. Lorem ipsum provides varied word lengths and letter combinations.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">Print Design</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Create mockups for brochures, magazines, and books. See how text flows in columns and pages before final content is ready.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-bold text-text-primary mb-3">UI/UX Prototyping</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Build interactive prototypes with realistic content. Helps stakeholders understand the user experience without waiting for final copy.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Why use different flavors?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Different flavors help match the tone of your project. Tech flavor works great for software mockups, Business for corporate presentations, Hipster for lifestyle brands, and Classic for traditional designs.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">What is HTML output?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">HTML output wraps each paragraph in &lt;p&gt; tags, making it ready to paste directly into your HTML code. Perfect for web developers who need properly formatted content.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Can I generate a specific number of bytes?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Yes! Switch to "Bytes" mode and enter the exact number of bytes you need. This is useful when you have strict space constraints in your design.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Is the generated text random?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Yes, each generation is completely random. Click "Regenerate" to get new text with the same settings. This ensures variety and prevents repetitive patterns.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Can I use this for commercial projects?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Absolutely! Lorem ipsum text is completely free to use for any purpose, including commercial projects. There are no copyright restrictions.</p>
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
