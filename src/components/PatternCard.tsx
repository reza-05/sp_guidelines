import React, { useState } from 'react';
import { PatternItem } from '../types/pattern';
import { Copy, Check, Terminal, Code2, List } from 'lucide-react';

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
    Easy: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-800/60',
    Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-300/80 dark:border-amber-800/60',
    Hard: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-300/80 dark:border-rose-800/60',
  }[pattern.difficulty];

  const categoryLabels = {
    star: 'Star Pattern',
    number: 'Number Pattern',
    character: 'Character Pattern',
    hollow: 'Hollow Pattern',
  }[pattern.category];

  return (
    <article
      id={`pattern-${pattern.id}`}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 transition-colors flex flex-col gap-3.5"
    >
      {/* Header Info */}
      <div className="flex flex-wrap items-start justify-between gap-3 pb-2.5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-slate-800 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
            {String(pattern.num).padStart(2, '0')}
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
              {pattern.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {pattern.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {categoryLabels}
          </span>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${difficultyColors}`}>
            {pattern.difficulty}
          </span>
        </div>
      </div>

      {/* Logic Summary Box */}
      <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-xs text-slate-700 dark:text-slate-300">
        <h4 className="font-semibold text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
          <List className="w-3.5 h-3.5 text-slate-500" />
          Nested Loop Logic:
        </h4>
        <ul className="list-disc list-inside space-y-1">
          {pattern.logic.map((step, idx) => (
            <li key={idx} className="leading-relaxed">
              <span className="text-slate-700 dark:text-slate-300">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Grid: Output Preview & C Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
        {/* Output Preview Window */}
        <div className="lg:col-span-5 flex flex-col bg-slate-950 text-emerald-400 rounded-lg p-3 border border-slate-800">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-emerald-500" />
              Output (n = 5)
            </span>
          </div>
          <pre className="font-mono text-xs leading-relaxed whitespace-pre overflow-x-auto my-auto py-1">
            {pattern.outputPreview}
          </pre>
        </div>

        {/* C Code Box */}
        <div className="lg:col-span-7 flex flex-col bg-slate-900 text-slate-200 rounded-lg border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950/80 border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-xs font-mono font-medium text-sky-400">
              <Code2 className="w-3 h-3" />
              solution.c
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors border border-slate-700"
              title="Copy C Code"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="p-3 overflow-x-auto text-xs font-mono leading-relaxed bg-[#0d1117]">
            <pre className="text-slate-300">
              {pattern.code}
            </pre>
          </div>
        </div>
      </div>
    </article>
  );
};
