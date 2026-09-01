"use client";

import { useState, useMemo } from "react";

type SortType = "az" | "za" | "length-asc" | "length-desc" | "numeric";

export default function TextLineTools() {
  const [text, setText] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [copied, setCopied] = useState(false);

  const lineCount = useMemo(() => {
    if (!text) return 0;
    return text.split("\n").length;
  }, [text]);

  const processText = (operation: string) => {
    if (!text) return;
    let lines = text.split("\n");

    switch (operation) {
      case "remove-duplicates":
        lines = Array.from(new Set(lines));
        break;
      case "sort-az":
        lines = [...lines].sort((a, b) => a.localeCompare(b));
        break;
      case "sort-za":
        lines = [...lines].sort((a, b) => b.localeCompare(a));
        break;
      case "sort-length-asc":
        lines = [...lines].sort((a, b) => a.length - b.length);
        break;
      case "sort-length-desc":
        lines = [...lines].sort((a, b) => b.length - a.length);
        break;
      case "sort-numeric":
        lines = [...lines].sort((a, b) => {
          const numA = parseFloat(a) || 0;
          const numB = parseFloat(b) || 0;
          return numA - numB;
        });
        break;
      case "reverse":
        lines = lines.reverse();
        break;
      case "remove-empty":
        lines = lines.filter(line => line.trim() !== "");
        break;
      case "trim":
        lines = lines.map(line => line.trim());
        break;
      case "shuffle":
        lines = [...lines].sort(() => Math.random() - 0.5);
        break;
      case "add-prefix":
        if (prefix) lines = lines.map(line => prefix + line);
        break;
      case "add-suffix":
        if (suffix) lines = lines.map(line => line + suffix);
        break;
      case "add-line-numbers":
        lines = lines.map((line, idx) => `${idx + 1}. ${line}`);
        break;
      case "uppercase":
        lines = lines.map(line => line.toUpperCase());
        break;
      case "lowercase":
        lines = lines.map(line => line.toLowerCase());
        break;
    }

    setText(lines.join("\n"));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsTxt = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "processed-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setText("");
    setPrefix("");
    setSuffix("");
  };

  const operationGroups = [
    {
      title: "Sort & Order",
      operations: [
        { id: "sort-az", label: "Sort A-Z", icon: "↑" },
        { id: "sort-za", label: "Sort Z-A", icon: "↓" },
        { id: "sort-length-asc", label: "Sort by Length (Short→Long)", icon: "↕" },
        { id: "sort-length-desc", label: "Sort by Length (Long→Short)", icon: "↕" },
        { id: "sort-numeric", label: "Sort Numerically", icon: "#" },
        { id: "reverse", label: "Reverse Lines", icon: "⇄" },
        { id: "shuffle", label: "Shuffle Lines", icon: "⚄" },
      ],
    },
    {
      title: "Clean & Filter",
      operations: [
        { id: "remove-duplicates", label: "Remove Duplicates", icon: "⊘" },
        { id: "remove-empty", label: "Remove Empty Lines", icon: "∅" },
        { id: "trim", label: "Trim Whitespace", icon: "✂" },
      ],
    },
    {
      title: "Transform",
      operations: [
        { id: "uppercase", label: "UPPERCASE", icon: "A" },
        { id: "lowercase", label: "lowercase", icon: "a" },
        { id: "add-line-numbers", label: "Add Line Numbers", icon: "1." },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Input Area */}
      <div className="bg-surface border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-text-primary">Input Text</label>
          <span className="text-xs text-text-muted">{lineCount} lines</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here (one item per line)..."
          className="w-full h-56 p-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none transition-all text-sm font-mono leading-relaxed"
        />
      </div>

      {/* Operations */}
      {text && (
        <div className="space-y-5">
          {operationGroups.map((group) => (
            <div key={group.title} className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">{group.title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {group.operations.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => processText(op.id)}
                    className="flex items-center gap-2 px-3 py-2.5 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
                  >
                    <span className="text-primary font-bold w-5 text-center">{op.icon}</span>
                    <span className="truncate">{op.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Prefix/Suffix */}
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Add Prefix / Suffix</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">Prefix</label>
                <input
                  type="text"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  placeholder="e.g., - "
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">Suffix</label>
                <input
                  type="text"
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                  placeholder="e.g., ;"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary text-sm focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => processText("add-prefix")}
                disabled={!prefix}
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Prefix to All Lines
              </button>
              <button
                onClick={() => processText("add-suffix")}
                disabled={!suffix}
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Suffix to All Lines
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {text && (
        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center gap-2"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Result
              </>
            )}
          </button>
          <button
            onClick={downloadAsTxt}
            className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-text-faint transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download .txt
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-error hover:border-error/50 transition-colors"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
