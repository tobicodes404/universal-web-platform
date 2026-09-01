"use client";

import { useState, useMemo } from "react";

interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
  speakingTime: number;
  avgWordLength: number;
  longestWord: string;
  uniqueWords: number;
  topKeywords: { word: string; count: number; density: number }[];
}

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
  'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
  'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that',
  'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me',
  'him', 'her', 'us', 'them', 'my', 'your', 'his', 'its', 'our', 'their'
]);

export default function WordCounterTool() {
  const [text, setText] = useState("");

  const stats = useMemo<TextStats>(() => {
    const trimmed = text.trim();
    
    if (trimmed === "") {
      return {
        words: 0, characters: 0, charactersNoSpaces: 0,
        sentences: 0, paragraphs: 0, readingTime: 0, speakingTime: 0,
        avgWordLength: 0, longestWord: "", uniqueWords: 0, topKeywords: []
      };
    }

    const words = trimmed.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    
    const sentences = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = trimmed.split(/\n+/).filter(p => p.trim().length > 0).length;
    
    const readingTime = Math.ceil(wordCount / 200);
    const speakingTime = Math.ceil(wordCount / 130);
    
    // Word analysis
    const cleanWords = words.map(w => w.toLowerCase().replace(/[^a-z0-9]/g, "")).filter(w => w.length > 0);
    const avgWordLength = cleanWords.length > 0 
      ? cleanWords.reduce((sum, w) => sum + w.length, 0) / cleanWords.length 
      : 0;
    
    const longestWord = cleanWords.reduce((longest, w) => w.length > longest.length ? w : longest, "");
    
    // Unique words
    const uniqueWordsSet = new Set(cleanWords);
    const uniqueWords = uniqueWordsSet.size;
    
    // Keyword density (excluding stop words)
    const wordFreq: Record<string, number> = {};
    cleanWords.forEach(w => {
      if (!STOP_WORDS.has(w) && w.length > 2) {
        wordFreq[w] = (wordFreq[w] || 0) + 1;
      }
    });
    
    const topKeywords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({
        word,
        count,
        density: (count / wordCount) * 100
      }));

    return {
      words: wordCount,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      avgWordLength: Math.round(avgWordLength * 10) / 10,
      longestWord,
      uniqueWords,
      topKeywords
    };
  }, [text]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const formatTime = (minutes: number) => {
    if (minutes === 0) return "0 sec";
    if (minutes < 1) return `${Math.round(minutes * 60)} sec`;
    return `${minutes} min`;
  };

  const statCards = [
    { label: "Words", value: stats.words, color: "text-tools-accent", icon: "📝" },
    { label: "Characters", value: stats.characters, color: "text-primary", icon: "🔤" },
    { label: "No Spaces", value: stats.charactersNoSpaces, color: "text-games-accent", icon: "📏" },
    { label: "Sentences", value: stats.sentences, color: "text-learn-accent", icon: "💬" },
    { label: "Paragraphs", value: stats.paragraphs, color: "text-warning", icon: "📄" },
    { label: "Reading", value: formatTime(stats.readingTime), color: "text-success", icon: "👁️" },
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-surface border border-border rounded-xl p-4 text-center hover:shadow-md transition-shadow">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <p className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
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
          className="w-full h-64 p-4 bg-surface border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none transition-all text-base leading-relaxed"
        />
        {text && (
          <button
            onClick={() => setText("")}
            className="absolute top-4 right-4 p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-lg transition-colors"
            title="Clear text"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Advanced Analysis */}
      {text.trim() && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Stats */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-tools-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Detailed Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-sm text-text-secondary">Speaking Time</span>
                <span className="font-semibold text-text-primary">{formatTime(stats.speakingTime)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-sm text-text-secondary">Avg Word Length</span>
                <span className="font-semibold text-text-primary">{stats.avgWordLength} chars</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-sm text-text-secondary">Unique Words</span>
                <span className="font-semibold text-text-primary">{stats.uniqueWords}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-text-secondary">Longest Word</span>
                <span className="font-semibold text-text-primary truncate max-w-[150px]" title={stats.longestWord}>
                  {stats.longestWord || "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Keyword Density */}
          {stats.topKeywords.length > 0 && (
            <div className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-tools-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Top Keywords
              </h3>
              <div className="space-y-2">
                {stats.topKeywords.map((keyword, i) => (
                  <div key={keyword.word} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-text-muted w-5">{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-text-primary">{keyword.word}</span>
                        <span className="text-xs text-text-muted">{keyword.count}× ({keyword.density.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-1.5">
                        <div 
                          className="bg-tools-accent h-1.5 rounded-full transition-all"
                          style={{ width: `${Math.min(keyword.density * 10, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <p className="text-sm text-text-muted">
          {text.trim() ? `${stats.words} words analyzed` : "Start typing to see analysis"}
        </p>
        <button 
          onClick={copyToClipboard}
          disabled={!text}
          className="btn-transition px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-text-faint disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy Text
        </button>
      </div>
    </div>
  );
}
