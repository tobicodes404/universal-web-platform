"use client";

import { useState, useMemo, useEffect } from "react";

type GenerateMode = "paragraphs" | "sentences" | "words" | "bytes";
type Flavor = "classic" | "hipster" | "tech" | "business";

const WORD_LISTS = {
  classic: [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum", "perspiciatis", "unde",
    "omnis", "iste", "natus", "error", "voluptatem", "accusantium", "doloremque",
    "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo",
    "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta",
    "explicabo", "nemo", "ipsam", "quia", "voluptas", "aspernatur", "aut", "odit",
    "fugit", "consequuntur", "magni", "dolores", "eos", "ratione", "sequi", "nesciunt"
  ],
  hipster: [
    "artisan", "organic", "sustainable", "craft", "vintage", "aesthetic", "minimalist",
    "curated", "bespoke", "authentic", "mindful", "intentional", "slow", "local",
    "handmade", "ethical", "eco-friendly", "plant-based", "zero-waste", "holistic",
    "wellness", "mindfulness", "self-care", "community", "connection", "creativity",
    "expression", "journey", "transformation", "growth", "discovery", "exploration",
    "adventure", "wanderlust", "bohemian", "free-spirited", "eclectic", "unique",
    "one-of-a-kind", "limited-edition", "small-batch", "farm-to-table", "locally-sourced",
    "seasonal", "fresh", "natural", "pure", "simple", "clean", "wholesome", "nourishing",
    "balanced", "harmonious", "serene", "tranquil", "peaceful", "calm", "zen",
    "meditative", "reflective", "contemplative", "introspective", "soulful", "heartfelt",
    "genuine", "sincere", "meaningful", "purposeful", "inspired", "passionate",
    "enthusiastic", "dedicated", "committed", "driven", "motivated", "focused",
    "determined", "resilient", "adaptable", "flexible", "versatile", "dynamic",
    "innovative", "creative", "imaginative", "visionary", "forward-thinking",
    "progressive", "evolving", "emerging", "trending", "influential", "impactful"
  ],
  tech: [
    "algorithm", "api", "blockchain", "cloud", "database", "devops", "framework",
    "infrastructure", "kubernetes", "microservices", "network", "protocol", "query",
    "repository", "server", "stack", "system", "technology", "variable", "webhook",
    "agile", "backend", "compiler", "debug", "encryption", "frontend", "git", "hash",
    "integration", "javascript", "kernel", "latency", "middleware", "node", "oauth",
    "python", "queue", "runtime", "schema", "token", "unicode", "virtualization",
    "webpack", "xml", "yaml", "z-index", "authentication", "bandwidth", "cache",
    "deployment", "endpoint", "function", "gateway", "http", "index", "json",
    "lambda", "module", "namespace", "object", "pipeline", "recursion", "socket",
    "thread", "utility", "version", "widget", "async", "binary", "container",
    "distributed", "event-driven", "functional", "immutable", "iterative", "linear",
    "modular", "native", "optimized", "parallel", "reactive", "scalable", "typed",
    "universal", "virtual", "web-based", "cross-platform", "open-source", "proprietary",
    "enterprise", "startup", "saas", "paas", "iaas", "ci-cd", "containerization",
    "orchestration", "automation", "monitoring", "logging", "analytics", "telemetry"
  ],
  business: [
    "synergy", "leverage", "stakeholder", "scalability", "roi", "kpi", "benchmark",
    "deliverable", "milestone", "pipeline", "bandwidth", "alignment", "paradigm",
    "strategy", "initiative", "implementation", "optimization", "innovation",
    "collaboration", "communication", "engagement", "empowerment", "excellence",
    "growth", "impact", "leadership", "performance", "productivity", "quality",
    "results", "success", "transformation", "value", "vision", "agile", "customer-centric",
    "data-driven", "future-proof", "holistic", "integrated", "proactive", "responsive",
    "sustainable", "transparent", "accountable", "actionable", "best-in-class",
    "competitive", "cost-effective", "cutting-edge", "differentiated", "efficient",
    "effective", "flexible", "global", "innovative", "market-leading", "measurable",
    "mission-critical", "next-generation", "outcome-focused", "partnership",
    "process-driven", "profitable", "reliable", "robust", "seamless", "strategic",
    "streamlined", "superior", "tailored", "transformative", "turnkey", "unified",
    "world-class", "blueprint", "ecosystem", "framework", "methodology", "platform",
    "roadmap", "solution", "toolkit", "accelerate", "capitalize", "cultivate",
    "drive", "enable", "facilitate", "generate", "identify", "implement", "maximize"
  ]
};

const LOREM_IPSUM_START = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const generateSentence = (words: string[], minWords = 6, maxWords = 14): string => {
  const length = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const sentence: string[] = [];
  
  for (let i = 0; i < length; i++) {
    const word = words[Math.floor(Math.random() * words.length)];
    sentence.push(word);
  }
  
  sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
  
  if (length > 8 && Math.random() > 0.5) {
    const commaPos = Math.floor(length / 2);
    sentence[commaPos] = sentence[commaPos] + ",";
  }
  
  return sentence.join(" ") + ".";
};

const generateParagraph = (words: string[], minSentences = 3, maxSentences = 7): string => {
  const sentenceCount = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
  const sentences: string[] = [];
  
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence(words));
  }
  
  return sentences.join(" ");
};

export default function LoremIpsumTool() {
  const [mode, setMode] = useState<GenerateMode>("paragraphs");
  const [count, setCount] = useState(3);
  const [flavor, setFlavor] = useState<Flavor>("classic");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [htmlOutput, setHtmlOutput] = useState(false);
  const [copied, setCopied] = useState(false);
  const [seed, setSeed] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const generatedText = useMemo(() => {
    if (!isMounted) return ""; // Prevent hydration mismatch by returning empty on server

    const words = WORD_LISTS[flavor];
    let result = "";

    if (mode === "paragraphs") {
      const paragraphs: string[] = [];
      for (let i = 0; i < count; i++) {
        paragraphs.push(generateParagraph(words));
      }
      result = paragraphs.join("\n\n");
    } else if (mode === "sentences") {
      const sentences: string[] = [];
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence(words));
      }
      result = sentences.join(" ");
    } else if (mode === "words") {
      const selectedWords: string[] = [];
      for (let i = 0; i < count; i++) {
        selectedWords.push(words[Math.floor(Math.random() * words.length)]);
      }
      if (selectedWords.length > 0) {
        selectedWords[0] = selectedWords[0].charAt(0).toUpperCase() + selectedWords[0].slice(1);
      }
      result = selectedWords.join(" ") + ".";
    } else if (mode === "bytes") {
      let currentBytes = 0;
      const selectedWords: string[] = [];
      while (currentBytes < count) {
        const word = words[Math.floor(Math.random() * words.length)] + " ";
        if (currentBytes + word.length > count) break;
        selectedWords.push(word);
        currentBytes += word.length;
      }
      result = selectedWords.join("").trim();
      if (result.length > 0) {
        result = result.charAt(0).toUpperCase() + result.slice(1);
        if (!result.endsWith(".")) result += ".";
      }
    }

    if (startWithLorem && flavor === "classic" && result.length > 0) {
      result = LOREM_IPSUM_START + " " + result;
    }

    if (htmlOutput && mode === "paragraphs") {
      result = result.split("\n\n").map(p => `<p>${p}</p>`).join("\n");
    }

    return result;
  }, [mode, count, flavor, startWithLorem, htmlOutput, seed, isMounted]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsTxt = () => {
    const blob = new Blob([generatedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lorem-ipsum-${flavor}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const regenerate = () => setSeed(s => s + 1);

  const wordCount = generatedText.trim() ? generatedText.trim().split(/\s+/).length : 0;
  const charCount = generatedText.length;

  const modeOptions = [
    { id: "paragraphs" as const, label: "Paragraphs", min: 1, max: 50, default: 3 },
    { id: "sentences" as const, label: "Sentences", min: 1, max: 200, default: 10 },
    { id: "words" as const, label: "Words", min: 1, max: 1000, default: 50 },
    { id: "bytes" as const, label: "Bytes", min: 100, max: 10000, default: 1000 },
  ];

  const flavorOptions = [
    { id: "classic" as const, label: "Classic", desc: "Traditional Latin" },
    { id: "hipster" as const, label: "Hipster", desc: "Modern & trendy" },
    { id: "tech" as const, label: "Tech", desc: "Developer terms" },
    { id: "business" as const, label: "Business", desc: "Corporate jargon" },
  ];

  const currentMode = modeOptions.find(m => m.id === mode)!;

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text-primary mb-5">Generate Settings</h2>
        
        {/* Flavor Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-3">Flavor</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {flavorOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => setFlavor(f.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  flavor === f.id
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-border bg-background hover:border-text-faint"
                }`}
              >
                <p className={`text-sm font-bold ${flavor === f.id ? "text-primary" : "text-text-primary"}`}>
                  {f.label}
                </p>
                <p className="text-xs text-text-muted mt-1">{f.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-3">Generate By</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {modeOptions.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setMode(m.id);
                  setCount(m.default);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  mode === m.id
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-background border-border text-text-secondary hover:text-text-primary"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
                {currentMode.label} Count
              </label>
              <input
                type="number"
                min={currentMode.min}
                max={currentMode.max}
                value={count}
                onChange={(e) => setCount(Math.max(currentMode.min, Math.min(currentMode.max, Number(e.target.value))))}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
                Range
              </label>
              <p className="px-4 py-2.5 bg-background border border-border rounded-lg text-sm text-text-secondary">
                {currentMode.min} - {currentMode.max}
              </p>
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg cursor-pointer hover:border-text-faint transition-colors">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <div>
              <p className="text-sm font-medium text-text-primary">Start with "Lorem ipsum..."</p>
              <p className="text-xs text-text-muted">Classic opening phrase</p>
            </div>
          </label>
          
          <label className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg cursor-pointer hover:border-text-faint transition-colors">
            <input
              type="checkbox"
              checked={htmlOutput}
              onChange={(e) => setHtmlOutput(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <div>
              <p className="text-sm font-medium text-text-primary">HTML Output</p>
              <p className="text-xs text-text-muted">Wrap in &lt;p&gt; tags</p>
            </div>
          </label>
        </div>
      </div>

      {/* Output Area */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Generated Text</h2>
          <span className="text-xs text-text-muted">
            {wordCount} words • {charCount} chars
          </span>
        </div>

        <div className="relative">
          <textarea
            value={generatedText}
            readOnly
            className="w-full h-80 p-4 bg-background border border-border rounded-xl text-text-primary text-sm leading-relaxed resize-none font-mono"
            placeholder={isMounted ? "Generated text will appear here..." : "Loading..."}
          />
          {generatedText && (
            <button
              onClick={copyToClipboard}
              className="absolute top-3 right-3 p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
              title="Copy to clipboard"
            >
              {copied ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={regenerate}
            className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-text-faint transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Regenerate
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!generatedText}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {copied ? "Copied!" : "Copy Text"}
          </button>
          <button
            onClick={downloadAsTxt}
            disabled={!generatedText}
            className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-text-faint disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download .txt
          </button>
        </div>
      </div>
    </div>
  );
}
