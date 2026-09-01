"use client";

import { useState, useMemo, Fragment } from "react";

type DiffType = "unchanged" | "added" | "removed" | "changed";

interface DiffLine {
  type: DiffType;
  oldLine?: string;
  newLine?: string;
  oldNum?: number;
  newNum?: number;
}

const computeDiff = (oldText: string, newText: string): DiffLine[] => {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");
  
  const m = oldLines.length;
  const n = newLines.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  const result: DiffLine[] = [];
  let i = m, j = n;
  const stack: DiffLine[] = [];
  
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      stack.push({ type: "unchanged", oldLine: oldLines[i - 1], newLine: newLines[j - 1], oldNum: i, newNum: j });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      stack.push({ type: "added", newLine: newLines[j - 1], newNum: j });
      j--;
    } else if (i > 0) {
      stack.push({ type: "removed", oldLine: oldLines[i - 1], oldNum: i });
      i--;
    }
  }
  
  stack.reverse().forEach((line) => {
    result.push({ ...line });
  });
  
  for (let k = 0; k < result.length - 1; k++) {
    if (result[k].type === "removed" && result[k + 1].type === "added") {
      result[k] = { 
        type: "changed", 
        oldLine: result[k].oldLine, 
        newLine: result[k + 1].newLine,
        oldNum: result[k].oldNum,
        newNum: result[k + 1].newNum
      };
      result.splice(k + 1, 1);
    }
  }
  
  return result;
};

export default function TextDiffTool() {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [viewMode, setViewMode] = useState<"unified" | "split">("unified");

  const diff = useMemo(() => {
    if (!oldText && !newText) return [];
    return computeDiff(oldText, newText);
  }, [oldText, newText]);

  const stats = useMemo(() => {
    let added = 0, removed = 0, changed = 0, unchanged = 0;
    diff.forEach(line => {
      if (line.type === "added") added++;
      else if (line.type === "removed") removed++;
      else if (line.type === "changed") changed++;
      else unchanged++;
    });
    return { added, removed, changed, unchanged };
  }, [diff]);

  const swapTexts = () => {
    setOldText(newText);
    setNewText(oldText);
  };

  const clearAll = () => {
    setOldText("");
    setNewText("");
  };

  const hasContent = oldText || newText;

  return (
    <div className="space-y-6">
      {/* Input Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-text-primary">Original Text</label>
            <span className="text-xs text-text-muted">{oldText.split("\n").filter(l => l).length} lines</span>
          </div>
          <textarea
            value={oldText}
            onChange={(e) => setOldText(e.target.value)}
            placeholder="Paste or type the original text here..."
            className="w-full h-48 p-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none transition-all text-sm font-mono leading-relaxed"
          />
        </div>

        <div className="bg-surface border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-text-primary">Modified Text</label>
            <span className="text-xs text-text-muted">{newText.split("\n").filter(l => l).length} lines</span>
          </div>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Paste or type the modified text here..."
            className="w-full h-48 p-3 bg-background border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none transition-all text-sm font-mono leading-relaxed"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={swapTexts}
          disabled={!oldText && !newText}
          className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-text-faint disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Swap Texts
        </button>
        <button
          onClick={clearAll}
          disabled={!oldText && !newText}
          className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-error hover:border-error/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Diff Results */}
      {hasContent && (
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
          {/* Stats & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-success-bg border border-success-border rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-xs font-semibold text-green-800">{stats.added} added</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-error-bg border border-error-border rounded-lg">
                <div className="w-2 h-2 bg-error rounded-full"></div>
                <span className="text-xs font-semibold text-red-800">{stats.removed} removed</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-warning-bg border border-warning-border rounded-lg">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-xs font-semibold text-amber-800">{stats.changed} changed</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-lg">
                <div className="w-2 h-2 bg-text-muted rounded-full"></div>
                <span className="text-xs font-semibold text-text-secondary">{stats.unchanged} unchanged</span>
              </div>
            </div>

            <div className="flex gap-1 p-1 bg-background rounded-lg">
              <button
                onClick={() => setViewMode("unified")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === "unified" ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
                }`}
              >
                Unified
              </button>
              <button
                onClick={() => setViewMode("split")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === "split" ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
                }`}
              >
                Split
              </button>
            </div>
          </div>

          {/* Diff Display */}
          {diff.length === 0 && oldText === newText && oldText !== "" ? (
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-success mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-text-primary font-medium">Texts are identical</p>
              <p className="text-sm text-text-muted mt-1">No differences found</p>
            </div>
          ) : viewMode === "unified" ? (
            <div className="bg-background border border-border rounded-xl overflow-hidden">
              <div className="max-h-[500px] overflow-auto">
                <table className="w-full text-sm font-mono">
                  <tbody>
                    {diff.map((line, idx) => {
                      if (line.type === "unchanged") {
                        return (
                          <tr key={idx} className="border-b border-border/30">
                            <td className="px-2 py-1 text-right text-text-muted w-10 select-none text-xs">{line.oldNum}</td>
                            <td className="px-2 py-1 text-right text-text-muted w-10 select-none text-xs">{line.newLine !== undefined ? line.newNum : ""}</td>
                            <td className="px-3 py-1 text-text-secondary whitespace-pre-wrap">{line.oldLine}</td>
                          </tr>
                        );
                      } else if (line.type === "added") {
                        return (
                          <tr key={idx} className="bg-success-bg border-b border-success-border/30">
                            <td className="px-2 py-1 text-right text-text-muted w-10 select-none text-xs"></td>
                            <td className="px-2 py-1 text-right text-success w-10 select-none text-xs font-bold">{line.newNum}</td>
                            <td className="px-3 py-1 text-green-900 whitespace-pre-wrap">
                              <span className="text-success font-bold mr-2">+</span>
                              {line.newLine}
                            </td>
                          </tr>
                        );
                      } else if (line.type === "removed") {
                        return (
                          <tr key={idx} className="bg-error-bg border-b border-error-border/30">
                            <td className="px-2 py-1 text-right text-error w-10 select-none text-xs font-bold">{line.oldNum}</td>
                            <td className="px-2 py-1 text-right text-text-muted w-10 select-none text-xs"></td>
                            <td className="px-3 py-1 text-red-900 whitespace-pre-wrap">
                              <span className="text-error font-bold mr-2">-</span>
                              {line.oldLine}
                            </td>
                          </tr>
                        );
                      } else if (line.type === "changed") {
                        return (
                          <Fragment key={idx}>
                            <tr className="bg-error-bg border-b border-error-border/30">
                              <td className="px-2 py-1 text-right text-error w-10 select-none text-xs font-bold">{line.oldNum}</td>
                              <td className="px-2 py-1 text-right text-text-muted w-10 select-none text-xs"></td>
                              <td className="px-3 py-1 text-red-900 whitespace-pre-wrap">
                                <span className="text-error font-bold mr-2">-</span>
                                {line.oldLine}
                              </td>
                            </tr>
                            <tr className="bg-success-bg border-b border-success-border/30">
                              <td className="px-2 py-1 text-right text-text-muted w-10 select-none text-xs"></td>
                              <td className="px-2 py-1 text-right text-success w-10 select-none text-xs font-bold">{line.newNum}</td>
                              <td className="px-3 py-1 text-green-900 whitespace-pre-wrap">
                                <span className="text-success font-bold mr-2">+</span>
                                {line.newLine}
                              </td>
                            </tr>
                          </Fragment>
                        );
                      }
                      return null;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Old Text Side */}
              <div className="bg-background border border-border rounded-xl overflow-hidden">
                <div className="px-3 py-2 bg-error-bg border-b border-error-border text-xs font-semibold text-red-800 uppercase tracking-wider">
                  Original
                </div>
                <div className="max-h-[500px] overflow-auto">
                  <table className="w-full text-sm font-mono">
                    <tbody>
                      {diff.map((line, idx) => {
                        if (line.type === "unchanged") {
                          return (
                            <tr key={idx} className="border-b border-border/30">
                              <td className="px-2 py-1 text-right text-text-muted w-10 select-none text-xs">{line.oldNum}</td>
                              <td className="px-3 py-1 text-text-secondary whitespace-pre-wrap">{line.oldLine}</td>
                            </tr>
                          );
                        } else if (line.type === "removed") {
                          return (
                            <tr key={idx} className="bg-error-bg border-b border-error-border/30">
                              <td className="px-2 py-1 text-right text-error w-10 select-none text-xs font-bold">{line.oldNum}</td>
                              <td className="px-3 py-1 text-red-900 whitespace-pre-wrap">{line.oldLine}</td>
                            </tr>
                          );
                        } else if (line.type === "changed") {
                          return (
                            <Fragment key={idx}>
                              <tr className="bg-error-bg border-b border-error-border/30">
                                <td className="px-2 py-1 text-right text-error w-10 select-none text-xs font-bold">{line.oldNum}</td>
                                <td className="px-3 py-1 text-red-900 whitespace-pre-wrap">{line.oldLine}</td>
                              </tr>
                            </Fragment>
                          );
                        }
                        return null;
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* New Text Side */}
              <div className="bg-background border border-border rounded-xl overflow-hidden">
                <div className="px-3 py-2 bg-success-bg border-b border-success-border text-xs font-semibold text-green-800 uppercase tracking-wider">
                  Modified
                </div>
                <div className="max-h-[500px] overflow-auto">
                  <table className="w-full text-sm font-mono">
                    <tbody>
                      {diff.map((line, idx) => {
                        if (line.type === "unchanged") {
                          return (
                            <tr key={idx} className="border-b border-border/30">
                              <td className="px-2 py-1 text-right text-text-muted w-10 select-none text-xs">{line.newNum}</td>
                              <td className="px-3 py-1 text-text-secondary whitespace-pre-wrap">{line.newLine}</td>
                            </tr>
                          );
                        } else if (line.type === "added") {
                          return (
                            <tr key={idx} className="bg-success-bg border-b border-success-border/30">
                              <td className="px-2 py-1 text-right text-success w-10 select-none text-xs font-bold">{line.newNum}</td>
                              <td className="px-3 py-1 text-green-900 whitespace-pre-wrap">{line.newLine}</td>
                            </tr>
                          );
                        } else if (line.type === "changed") {
                          return (
                            <Fragment key={idx}>
                              <tr className="bg-success-bg border-b border-success-border/30">
                                <td className="px-2 py-1 text-right text-success w-10 select-none text-xs font-bold">{line.newNum}</td>
                                <td className="px-3 py-1 text-green-900 whitespace-pre-wrap">{line.newLine}</td>
                              </tr>
                            </Fragment>
                          );
                        }
                        return null;
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
