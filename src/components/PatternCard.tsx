import React, { useState } from 'react';
import { PatternItem } from '../types/pattern';
import { Copy, Check, Terminal, Code2, ListOrdered } from 'lucide-react';

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
      className="bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-200 flex flex-col gap-4 sm:gap-5"
    >
      {/* Header Info */}
      <div className="flex flex-wrap items-start justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-mono font-black text-xs sm:text-base flex items-center justify-center shrink-0 shadow-sm">
            {String(pattern.num).padStart(2, '0')}
          </div>
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {pattern.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium mt-0.5">
              {pattern.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {categoryLabels}
          </span>
          <span className={`text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 rounded-lg border ${difficultyColors}`}>
            {pattern.difficulty}
          </span>
        </div>
      </div>

      {/* Logic Summary Box */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 sm:p-5 text-slate-700 dark:text-slate-300">
        <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-2">
          <ListOrdered className="w-4 h-4 text-slate-500" />
          Nested Loop Logic:
        </h4>
        <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base font-medium leading-relaxed">
          {pattern.logic.map((step, idx) => (
            <li key={idx}>
              <span className="text-slate-800 dark:text-slate-200">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Output Preview (Stacked on top) */}
      <div className="flex flex-col bg-[#0B0F17] rounded-xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 bg-slate-950/80 border-b border-slate-800">
          <span className="flex items-center gap-2 font-mono font-bold text-xs sm:text-sm text-emerald-400">
            <Terminal className="w-4 h-4 text-emerald-400" />
            Expected Output (n = 5)
          </span>
          <span className="text-[11px] font-mono text-slate-500">Console Preview</span>
        </div>
        <div className="p-3.5 sm:p-5 overflow-x-auto">
          <pre className="font-mono text-xs sm:text-sm leading-relaxed whitespace-pre text-emerald-400 font-bold">
            {pattern.outputPreview}
          </pre>
        </div>
      </div>

      {/* C Code Solution (Stacked below Output - Full Width) */}
      <div className="flex flex-col bg-[#0D1117] rounded-xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 bg-slate-950/90 border-b border-slate-800">
          <span className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-sky-400">
            <Code2 className="w-4 h-4 text-sky-400 shrink-0" />
            solution.c (Standard C)
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs font-bold transition-all border border-slate-700 cursor-pointer shadow-xs shrink-0"
            title="Copy C Code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
                <span className="text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
        <div className="p-3.5 sm:p-5 overflow-x-auto bg-[#0A0D12]">
          <pre className="text-slate-100 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre">
            {pattern.code}
          </pre>
        </div>
      </div>
    </article>
  );
};
