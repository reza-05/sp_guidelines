import React, { useState } from 'react';
import { PatternItem } from '../types/pattern';
import { Copy, Check, Terminal, Code2, Sparkles } from 'lucide-react';

interface PatternCardProps {
  pattern: PatternItem;
}

export const PatternCard: React.FC<PatternCardProps> = ({ pattern }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pattern.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const difficultyColors = {
    Easy: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    Medium: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    Hard: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900',
  }[pattern.difficulty];

  const categoryLabels = {
    star: '⭐ Star Pattern',
    number: '🔢 Number Pattern',
    character: '🔤 Character Pattern',
    hollow: '🔷 Hollow Shape',
  }[pattern.category];

  return (
    <article
      id={`pattern-${pattern.id}`}
      className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
    >
      {/* Header Info */}
      <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
            {String(pattern.num).padStart(2, '0')}
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              {pattern.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {pattern.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-gray-700">
            {categoryLabels}
          </span>
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${difficultyColors}`}>
            {pattern.difficulty}
          </span>
        </div>
      </div>

      {/* Logic Summary Box */}
      <div className="bg-slate-50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-800 rounded-lg p-3 sm:p-4 text-xs text-slate-700 dark:text-slate-300">
        <h4 className="font-extrabold text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Nested Loop Breakdown & Logic:
        </h4>
        <ul className="list-disc list-inside space-y-1">
          {pattern.logic.map((step, idx) => (
            <li key={idx} className="leading-relaxed">
              <span className="text-slate-800 dark:text-slate-200 font-medium">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Grid: Output Preview & C Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Output Preview Window */}
        <div className="lg:col-span-5 flex flex-col bg-slate-950 text-emerald-400 rounded-lg p-3.5 border border-slate-800 shadow-inner">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-500" />
              Pattern Output (n = 5)
            </span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">Preview</span>
          </div>
          <pre className="font-mono text-xs leading-relaxed whitespace-pre overflow-x-auto my-auto py-2">
            {pattern.outputPreview}
          </pre>
        </div>

        {/* C Code Box */}
        <div className="lg:col-span-7 flex flex-col bg-slate-900 text-slate-200 rounded-lg border border-slate-800 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-3.5 py-2 bg-slate-950/80 border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-400">
              <Code2 className="w-3.5 h-3.5" />
              solution.c
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium transition-colors border border-slate-700"
              title="Copy C Code"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
          <div className="p-3.5 overflow-x-auto text-xs font-mono leading-relaxed bg-[#0d1117]">
            <pre className="text-slate-300">
              {pattern.code}
            </pre>
          </div>
        </div>
      </div>
    </article>
  );
};
