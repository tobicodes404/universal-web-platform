import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/analytics";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Universal Platform - Tools, Games & Learning",
    template: "%s | Universal Platform",
  },
  description: "Free online platform with 24+ productivity tools, interactive games, and learning resources. 100% private, no signup required.",
  keywords: ["online tools", "PDF tools", "image tools", "text tools", "free tools", "browser tools"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://universal-platform.vercel.app",
    siteName: "Universal Platform",
    title: "Universal Platform - Tools, Games & Learning",
    description: "Free online platform with 24+ productivity tools, interactive games, and learning resources.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Universal Platform - Tools, Games & Learning",
    description: "Free online platform with 24+ productivity tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Universal Platform",
  "url": "https://universal-platform.vercel.app",
  "description": "Free online platform with 24+ productivity tools, interactive games, and learning resources.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://universal-platform.vercel.app/tools?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        {/* Moved to body to prevent hydration mismatch from browser extensions injecting into <head> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <Analytics />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
