"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { tools, categories } from "@/lib/data/tools";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tools based on category and search
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Map category IDs to readable names for the UI
  const categoryLabels: Record<string, string> = {
    all: "All Tools",
    pdf: "PDF & Documents",
    image: "Image Processing",
    text: "Text Utilities",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools" }]} />
        </div>

        {/* Page Header */}
        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
            Productivity Suite
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A comprehensive collection of browser-based tools. Process your files instantly without uploading them to any server.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-xl py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border mb-10">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between max-w-7xl mx-auto">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-surface text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.id
                      ? "bg-text-primary text-background shadow-sm"
                      : "bg-surface text-text-secondary border border-border hover:text-text-primary hover:border-text-faint"
                  }`}
                >
                  {categoryLabels[cat.id] || cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="group relative flex flex-col p-6 bg-surface border border-border rounded-xl hover:border-primary/40 hover:shadow-sm transition-all duration-200"
              >
                {/* Top Row: Icon & Arrow */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center group-hover:border-primary/20 transition-colors">
                    <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <svg 
                    className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-text-primary text-base mb-2 tracking-tight">
                  {tool.name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                  {tool.description}
                </p>

                {/* Subtle Category Tag */}
                <div className="mt-auto pt-6">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-text-muted/70">
                    {categoryLabels[tool.category]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-surface border border-border rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">No tools found</h3>
            <p className="text-text-secondary text-sm max-w-md mx-auto">
              We couldn't find any tools matching "{searchQuery}". Try adjusting your search or filter.
            </p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
              className="mt-6 text-sm font-medium text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
