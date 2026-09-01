"use client";

import { useState, useMemo } from "react";

export default function FindReplaceTool() {
  const [text, setText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [resultText, setResultText] = useState("");
  const [regexError, setRegexError] = useState<string | null>(null);

  const matchCount = useMemo(() => {
    if (!findText || !text) return 0;
    try {
      let flags = "g";
      if (!caseSensitive) flags += "i";
      
      let pattern = findText;
      if (useRegex) {
        new RegExp(pattern, flags); // Validate regex
        setRegexError(null);
      } else {
        pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special chars
        setRegexError(null);
      }

      if (wholeWord) {
        pattern = `\\b(?:${pattern})\\b`;
      }

      const regex = new RegExp(pattern, flags);
      const matches = text.match(regex);
      return matches ? matches.length : 0;
    } catch (e) {
      setRegexError("Invalid regular expression");
      return 0;
    }
  }, [text, findText, caseSensitive, wholeWord, useRegex]);

  const handleReplaceAll = () => {
    if (!findText || !text || regexError) {
      setResultText(text);
      return;
    }
    try {
      let flags = "g";
      if (!caseSensitive) flags += "i";
      
      let pattern = findText;
      if (!useRegex) {
        pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      if (wholeWord) {
        pattern = `\\b(?:${pattern})\\b`;
      }

      const regex = new RegExp(pattern, flags);
      setResultText(text.replace(regex, replaceText));
    } catch (e) {
      setRegexError("Invalid regular expression");
    }
  };

  const copyResult = () => {
    const textToCopy = resultText || text;
    navigator.clipboard.writeText(textToCopy);
  };

  const useResultAsInput = () => {
    if (resultText) {
      setText(resultText);
      setResultText("");
    }
  };

  const clearAll = () => {
    setText("");
    setFindText("");
    setReplaceText("");
    setResultText("");
    setRegexError(null);
  };

  return (
    <div className="space-y-6">
      {/* Input Area */}
      <div className="bg-surface border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-text-primary">Original Text</label>
          <span className="text-xs text-text-muted">{text.split("\n").filter(l => l).length} lines</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full h-48 p-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none transition-all text-sm font-mono leading-relaxed"
        />
      </div>

      {/* Find & Replace Controls */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-semibold text-text-primary">Find & Replace Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Find</label>
            <input
              type="text"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              placeholder="Text or regex to find..."
              className={`w-full px-4 py-2.5 bg-background border rounded-lg text-text-primary focus:ring-2 focus:ring-primary/50 outline-none ${regexError ? 'border-error focus:ring-error/50' : 'border-border focus:border-primary'}`}
            />
            {regexError && <p className="text-xs text-error mt-1.5 flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{regexError}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Replace With</label>
            <input
              type="text"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder="Replacement text..."
              className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-text-primary focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
            />
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-wrap gap-4 pt-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="w-4 h-4 accent-primary rounded" />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">Case Sensitive</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" checked={wholeWord} onChange={(e) => setWholeWord(e.target.checked)} className="w-4 h-4 accent-primary rounded" />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">Whole Word Only</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} className="w-4 h-4 accent-primary rounded" />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">Use Regular Expression (Regex)</span>
          </label>
        </div>

        {/* Stats & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-primary">Matches found:</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${matchCount > 0 ? 'bg-primary/10 text-primary' : 'bg-background text-text-muted border border-border'}`}>
              {matchCount}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button onClick={clearAll} className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-error hover:border-error/50 transition-colors">
              Clear All
            </button>
            <button 
              onClick={handleReplaceAll} 
              disabled={!findText || !text || !!regexError}
              className="flex-1 sm:flex-none px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Replace All
            </button>
          </div>
        </div>
      </div>

      {/* Result Area */}
      {resultText && (
        <div className="bg-surface border border-border rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-success flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Result
            </label>
            <div className="flex gap-2">
              <button onClick={useResultAsInput} className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Use as Input
              </button>
              <button onClick={copyResult} className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary-hover transition-colors flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                Copy
              </button>
            </div>
          </div>
          <textarea
            value={resultText}
            readOnly
            className="w-full h-48 p-3 bg-background border border-success-border rounded-lg text-text-primary resize-none text-sm font-mono leading-relaxed"
          />
        </div>
      )}
    </div>
  );
}
