"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed === "" ? 0 : trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = trimmed === "" ? 0 : trimmed.split(/\n+/).filter(p => p.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200); // Avg 200 wpm

    return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime };
  }, [text]);

  const statCards = [
    { label: "Words", value: stats.words, color: "text-tools-accent" },
    { label: "Characters", value: stats.characters, color: "text-primary" },
    { label: "No Spaces", value: stats.charactersNoSpaces, color: "text-games-accent" },
    { label: "Sentences", value: stats.sentences, color: "text-learn-accent" },
    { label: "Paragraphs", value: stats.paragraphs, color: "text-warning" },
    { label: "Read Time", value: `${stats.readingTime} min`, color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "Text Tools" }, { label: "Word Counter" }]} />
        </div>

        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-3">Word Counter</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Instantly count words, characters, sentences, and paragraphs. Perfect for writers, students, and professionals.
          </p>
        </div>

        {/* Tool Interface */}
        <div className="bg-surface border border-border rounded-2xl shadow-sm p-6 md:p-8 mb-16">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {statCards.map((stat) => (
              <div key={stat.label} className="bg-background border border-border rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-text-primary mb-1">{stat.value}</p>
                <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here..."
              className="w-full h-64 p-4 bg-background border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none transition-all text-base leading-relaxed"
            />
            {text && (
              <button
                onClick={() => setText("")}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                title="Clear text"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <p className="text-sm text-text-muted">Auto-saves locally in your browser.</p>
            <button 
              onClick={() => navigator.clipboard.writeText(text)}
              disabled={!text}
              className="btn-transition px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-text-faint disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
              Copy Text
            </button>
          </div>
        </div>

        {/* SEO Content: How to Use */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">How to Use the Word Counter</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">1</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Paste or Type</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Paste your text into the box above or start typing directly. The counter updates instantly.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">2</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">View Statistics</h3>
              <p className="text-sm text-text-secondary leading-relaxed">See real-time counts for words, characters, sentences, paragraphs, and estimated reading time.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="w-10 h-10 bg-tools-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-tools-accent">3</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Copy & Export</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Use the copy button to quickly grab your text, or clear it to start fresh with a new document.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">How is reading time calculated?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">Reading time is estimated based on an average reading speed of 200 words per minute for silent reading.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">Does this tool save my text?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">No. All processing happens directly in your browser. Your text is never sent to any server, ensuring complete privacy.</p>
            </div>
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="font-semibold text-text-primary mb-2">What is the difference between characters and characters without spaces?</h3>
              <p className="text-sm text-text-secondary leading-relaxed">"Characters" includes all spaces, tabs, and line breaks. "Characters (no spaces)" counts only the visible letters, numbers, and punctuation.</p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/tools/case-converter" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">Case Converter</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Convert text to uppercase, lowercase, title case, and more.</p>
            </Link>
            <Link href="/tools/pdf?op=merge" className="card-hover block p-5 border border-border rounded-xl bg-surface hover:border-tools-accent/50">
              <h3 className="font-semibold text-text-primary mb-1">PDF Merge</h3>
              <p className="text-sm text-text-secondary line-clamp-2">Combine multiple PDF files into a single document.</p>
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
