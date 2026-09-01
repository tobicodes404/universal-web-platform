import Link from "next/link";
import { tools } from "@/lib/data/tools";

export const metadata = {
  title: "Universal Web Platform - Tools, Games & Learning",
  description: "Free online platform with 24+ tools, interactive games, and learning resources. 100% private, no signup required.",
};

export default function HomePage() {
  const featuredTools = tools.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-background to-indigo-50 dark:from-violet-950/20 dark:via-background dark:to-indigo-950/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary tracking-tight mb-6 leading-[1.05]">
              One Platform,
              <br />
              <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                Everything You Need
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
              Productivity tools, interactive games, and learning resources — all free, all private, all in your browser.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools"
                className="group px-8 py-4 bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-600 hover:to-indigo-700 transition-all shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 flex items-center justify-center gap-2"
              >
                Get Started
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars - Tools, Games, Learn */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">What We Offer</h2>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">
              Three powerful sections designed to help you work, play, and grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tools */}
            <Link
              href="/tools"
              className="group bg-surface border border-border rounded-2xl p-8 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:from-violet-500/20 group-hover:to-indigo-500/20 transition-all">
                <svg className="w-7 h-7 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">Tools</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                24+ free online tools for PDF, Image, and Text processing. All private, all instant.
              </p>
              <div className="flex items-center text-sm font-medium text-violet-500 group-hover:gap-2 transition-all">
                Browse Tools
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Games */}
            <Link
              href="/games"
              className="group bg-surface border border-border rounded-2xl p-8 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:from-violet-500/20 group-hover:to-indigo-500/20 transition-all">
                <svg className="w-7 h-7 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">Games</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                Interactive games and challenges to help you practice and have fun while learning.
              </p>
              <div className="inline-flex items-center px-3 py-1 bg-violet-500/10 text-violet-500 text-xs font-semibold rounded-full border border-violet-500/20">
                Coming Soon
              </div>
            </Link>

            {/* Learn */}
            <Link
              href="/learn"
              className="group bg-surface border border-border rounded-2xl p-8 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:from-violet-500/20 group-hover:to-indigo-500/20 transition-all">
                <svg className="w-7 h-7 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">Learn</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                Guides, tutorials, and educational content to help you make the most of our platform.
              </p>
              <div className="inline-flex items-center px-3 py-1 bg-violet-500/10 text-violet-500 text-xs font-semibold rounded-full border border-violet-500/20">
                Coming Soon
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="border-b border-border bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3 tracking-tight">Featured Tools</h2>
              <p className="text-text-secondary text-lg">Our most popular tools, ready to use right now.</p>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-background border border-border text-text-primary font-medium rounded-xl hover:border-violet-500/50 transition-all text-sm"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="group bg-background border border-border rounded-2xl p-6 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <svg className="w-5 h-5 text-text-muted group-hover:text-violet-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-text-primary mb-2 text-base">{tool.name}</h3>
                <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">Why Universal Platform?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface border border-border rounded-2xl p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-text-primary mb-2 text-lg">100% Private</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Your files never leave your browser. All processing happens locally on your device.
              </p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-text-primary mb-2 text-lg">Instant Results</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                No server uploads. Get results in milliseconds, directly in your browser.
              </p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-text-primary mb-2 text-lg">Free Forever</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                No hidden fees, no subscriptions. All features are completely free to use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="relative bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 rounded-3xl p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
                Start Using It Now
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-10 text-lg">
                No signup required. Pick a tool and get started instantly.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-600 font-semibold rounded-xl hover:bg-white/90 transition-all shadow-xl text-base"
              >
                Explore Tools
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
