import React from 'react';
import { Problem } from '../types/curriculum';
import { ExternalLink, Check } from 'lucide-react';

interface ProblemRowProps {
  problem: Problem;
  isSolved: boolean;
  onToggle: (id: string) => void;
}

export const ProblemRow: React.FC<ProblemRowProps> = ({
  problem,
  isSolved,
  onToggle
}) => {
  const isCodeChef = problem.platform === 'CodeChef';
  // Strip any accidental stars or emojis to keep badge clean and professional
  const cleanBadgeText = (problem.badgeText || '').replace(/^★\s*|★/g, '').trim();

  return (
    <div
      onClick={() => onToggle(problem.id)}
      className={`group relative flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl border transition-all duration-150 cursor-pointer select-none ${
        isSolved
          ? 'bg-emerald-500/[0.04] dark:bg-emerald-950/20 border-emerald-500/30 dark:border-emerald-500/25 shadow-2xs'
          : 'bg-white dark:bg-[#0E131F] border-slate-200/90 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs'
      }`}
    >
      {/* Main Content Area */}
      <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
        {/* Custom Tactile Checkbox */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(problem.id);
          }}
          aria-label={`Mark ${problem.title} as ${isSolved ? 'unsolved' : 'solved'}`}
          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all duration-150 border mt-0.5 sm:mt-0 ${
            isSolved
              ? 'bg-emerald-600 dark:bg-emerald-500 border-emerald-600 dark:border-emerald-500 text-white shadow-xs scale-105'
              : 'border-slate-300 dark:border-slate-600 bg-slate-50/80 dark:bg-slate-800/80 group-hover:border-emerald-500 dark:group-hover:border-emerald-400 group-hover:scale-105'
          }`}
        >
          {isSolved && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Problem Num ID */}
        <span className="font-mono text-xs font-semibold text-slate-400 dark:text-slate-500 shrink-0 w-7 sm:w-8 pt-0.5 sm:pt-0">
          {problem.numId}
        </span>

        {/* Title, Badge & Description */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span
              className={`text-xs sm:text-sm font-bold tracking-tight transition-all duration-150 ${
                isSolved
                  ? 'line-through text-slate-400 dark:text-slate-500'
                  : 'text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400'
              }`}
            >
              {problem.title}
            </span>

            {/* Rating Monospace Pill */}
            <span
              className={`font-mono text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md border shrink-0 tracking-tight transition-colors ${
                isCodeChef
                  ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
                  : 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30'
              }`}
            >
              {cleanBadgeText}
            </span>
          </div>

          {/* Context / Scenario Description (Responsive line-clamp to never break layout) */}
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed line-clamp-2 sm:line-clamp-1">
            {problem.desc}
          </p>
        </div>
      </div>

      {/* Action / Solve Button (Solid, vibrant, and aligned cleanly on the right) */}
      <div className="shrink-0 self-center">
        <a
          href={problem.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-150 tracking-wide group/btn shrink-0 shadow-xs active:scale-95 ${
            isCodeChef
              ? 'bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white shadow-amber-600/20'
              : 'bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white shadow-sky-600/20'
          }`}
        >
          <span>SOLVE</span>
          <ExternalLink className="w-3 h-3 stroke-[2.5] transition-transform duration-150 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
};
