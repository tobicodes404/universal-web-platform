"use client";

import { useState, useMemo } from "react";

type CaseType = 
  | "uppercase"
  | "lowercase"
  | "titlecase"
  | "sentencecase"
  | "camelcase"
  | "pascalcase"
  | "snakecase"
  | "constantcase"
  | "kebabcase"
  | "dotcase"
  | "alternating"
  | "inverse"
  | "reverse"
  | "slug";

interface CaseOption {
  id: CaseType;
  label: string;
  example: string;
  description: string;
}

const CASE_OPTIONS: CaseOption[] = [
  { id: "uppercase", label: "UPPERCASE", example: "HELLO WORLD", description: "All capital letters" },
  { id: "lowercase", label: "lowercase", example: "hello world", description: "All small letters" },
  { id: "titlecase", label: "Title Case", example: "Hello World", description: "First letter of each word capitalized" },
  { id: "sentencecase", label: "Sentence case", example: "Hello world", description: "First letter of sentence capitalized" },
  { id: "camelcase", label: "camelCase", example: "helloWorld", description: "First word lowercase, rest capitalized (no spaces)" },
  { id: "pascalcase", label: "PascalCase", example: "HelloWorld", description: "First letter of each word capitalized (no spaces)" },
  { id: "snakecase", label: "snake_case", example: "hello_world", description: "Lowercase with underscores" },
  { id: "constantcase", label: "CONSTANT_CASE", example: "HELLO_WORLD", description: "Uppercase with underscores" },
  { id: "kebabcase", label: "kebab-case", example: "hello-world", description: "Lowercase with hyphens" },
  { id: "dotcase", label: "dot.case", example: "hello.world", description: "Lowercase with dots" },
  { id: "alternating", label: "aLtErNaTiNg", example: "hElLo WoRlD", description: "Alternating upper and lower case" },
  { id: "inverse", label: "iNVERSE", example: "hELLO wORLD", description: "Swap case of each character" },
  { id: "reverse", label: "Reverse", example: "dlroW olleH", description: "Reverse the entire string" },
  { id: "slug", label: "URL Slug", example: "hello-world", description: "URL-friendly lowercase with hyphens" },
];

// Helper: Split text into words (handles spaces, punctuation, underscores, hyphens)
const splitIntoWords = (text: string): string[] => {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase
    .split(/[\s_\-\.]+/)
    .filter(w => w.length > 0);
};

// Conversion functions
const convertText = (text: string, caseType: CaseType): string => {
  if (!text) return "";
  
  switch (caseType) {
    case "uppercase":
      return text.toUpperCase();
    
    case "lowercase":
      return text.toLowerCase();
    
    case "titlecase":
      return text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    
    case "sentencecase":
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    
    case "camelcase": {
      const words = splitIntoWords(text);
      return words.map((w, i) => 
        i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()
      ).join("");
    }
    
    case "pascalcase": {
      const words = splitIntoWords(text);
      return words.map(w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()).join("");
    }
    
    case "snakecase":
      return splitIntoWords(text).map(w => w.toLowerCase()).join("_");
    
    case "constantcase":
      return splitIntoWords(text).map(w => w.toUpperCase()).join("_");
    
    case "kebabcase":
      return splitIntoWords(text).map(w => w.toLowerCase()).join("-");
    
    case "dotcase":
      return splitIntoWords(text).map(w => w.toLowerCase()).join(".");
    
    case "alternating": {
      let result = "";
      let isUpper = false;
      for (const char of text) {
        if (/[a-zA-Z]/.test(char)) {
          result += isUpper ? char.toUpperCase() : char.toLowerCase();
          isUpper = !isUpper;
        } else {
          result += char;
        }
      }
      return result;
    }
    
    case "inverse":
      return text.split("").map(c => {
        if (c === c.toUpperCase()) return c.toLowerCase();
        return c.toUpperCase();
      }).join("");
    
    case "reverse":
      return text.split("").reverse().join("");
    
    case "slug":
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    
    default:
      return text;
  }
};

export default function CaseConverterTool() {
  const [text, setText] = useState("");
  const [activeCase, setActiveCase] = useState<CaseType>("uppercase");
  const [copied, setCopied] = useState(false);

  const convertedText = useMemo(() => convertText(text, activeCase), [text, activeCase]);

  const copyToClipboard = () => {
    if (!convertedText) return;
    navigator.clipboard.writeText(convertedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapText = () => {
    setText(convertedText);
  };

  return (
    <div className="space-y-6">
      {/* Case Type Selector */}
      <div className="bg-surface border border-border rounded-xl p-4">
        <label className="block text-sm font-medium text-text-primary mb-3">Select Case Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {CASE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveCase(option.id)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                activeCase === option.id
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-border bg-background hover:border-text-faint"
              }`}
              title={option.description}
            >
              <p className={`text-sm font-bold truncate ${activeCase === option.id ? "text-primary" : "text-text-primary"}`}>
                {option.label}
              </p>
              <p className="text-xs text-text-muted truncate mt-0.5 font-mono">
                {option.example}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Input & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-text-primary">Original Text</label>
            <span className="text-xs text-text-muted">{text.length} chars</span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-48 p-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none transition-all text-sm leading-relaxed"
          />
        </div>

        {/* Output */}
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-text-primary">
              Converted ({CASE_OPTIONS.find(o => o.id === activeCase)?.label})
            </label>
            <span className="text-xs text-text-muted">{convertedText.length} chars</span>
          </div>
          <div className="relative">
            <textarea
              value={convertedText}
              readOnly
              className="w-full h-48 p-3 bg-background border border-border rounded-lg text-text-primary resize-none text-sm leading-relaxed"
              placeholder="Converted text will appear here..."
            />
            {convertedText && (
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
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
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setText("")}
          disabled={!text}
          className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-error hover:border-error/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Clear Input
        </button>
        <button
          onClick={swapText}
          disabled={!convertedText}
          className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-text-faint disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          title="Use converted text as new input"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Use as Input
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!convertedText}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {copied ? "✓ Copied!" : "Copy Result"}
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-info-bg border border-info-border rounded-xl p-4">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-info shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-text-secondary">
            <p className="font-medium text-text-primary mb-1">
              {CASE_OPTIONS.find(o => o.id === activeCase)?.label}
            </p>
            <p>{CASE_OPTIONS.find(o => o.id === activeCase)?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
