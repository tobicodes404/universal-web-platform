import Link from "next/link";

interface ComingSoonProps {
  title?: string;
  description?: string;
  backLink?: string;
}

export default function ComingSoon({ 
  title = "Coming Soon", 
  description = "We're working hard to bring you something amazing. Stay tuned!",
  backLink = "/"
}: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20">
          <svg 
            className="w-12 h-12 text-primary animate-pulse" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" 
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
          {title}
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed max-w-xl mx-auto">
          {description}
        </p>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-surface border border-border rounded-xl p-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-text-primary mb-1">Fast & Free</h3>
            <p className="text-sm text-text-muted">Lightning fast processing</p>
          </div>
          
          <div className="bg-surface border border-border rounded-xl p-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold text-text-primary mb-1">100% Private</h3>
            <p className="text-sm text-text-muted">Your data stays with you</p>
          </div>
          
          <div className="bg-surface border border-border rounded-xl p-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-text-primary mb-1">Built with Care</h3>
            <p className="text-sm text-text-muted">Crafted for you</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href={backLink}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary-hover transition-colors shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          
          <Link 
            href="/tools"
            className="inline-flex items-center justify-center px-6 py-3 bg-surface border border-border text-text-primary font-medium rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Explore Tools
          </Link>
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-sm text-text-muted">
          Have questions? <Link href="/contact" className="text-primary hover:underline">Contact us</Link>
        </p>
      </div>
    </div>
  );
}
