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
      className={`group relative flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all duration-150 cursor-pointer select-none ${
        isSolved
          ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/60 shadow-2xs'
          : 'bg-slate-50 hover:bg-slate-100/90 dark:bg-slate-900/80 dark:hover:bg-slate-800/80 border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 shadow-2xs hover:shadow-xs'
      }`}
    >
      {/* Main Content Area */}
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
        {/* Custom Tactile Checkbox */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(problem.id);
          }}
          aria-label={`Mark ${problem.title} as ${isSolved ? 'unsolved' : 'solved'}`}
          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150 border mt-0.5 sm:mt-0 ${
            isSolved
              ? 'bg-emerald-600 dark:bg-emerald-500 border-emerald-600 dark:border-emerald-500 text-white shadow-xs scale-105'
              : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-hover:border-emerald-500 dark:group-hover:border-emerald-400 group-hover:scale-105'
          }`}
        >
          {isSolved && <Check className="w-4 h-4 stroke-[3]" />}
        </button>

        {/* Problem Num ID */}
        <span className="font-mono text-xs sm:text-sm font-bold text-slate-400 dark:text-slate-500 shrink-0 w-8 sm:w-10 pt-0.5 sm:pt-0">
          {problem.numId}
        </span>

        {/* Title, Badge & Description */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-sm sm:text-base font-extrabold tracking-tight transition-all duration-150 ${
                isSolved
                  ? 'line-through text-slate-400 dark:text-slate-500'
                  : 'text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400'
              }`}
            >
              {problem.title}
            </span>

            {/* Rating Monospace Pill */}
            <span
              className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-md border shrink-0 tracking-tight transition-colors ${
                isCodeChef
                  ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
                  : 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30'
              }`}
            >
              {cleanBadgeText}
            </span>
          </div>

          {/* Context / Scenario Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2 sm:line-clamp-1 font-medium">
            {problem.desc}
          </p>
        </div>
      </div>

      {/* Action / Solve Button (Prominent, High-Contrast Action Button) */}
      <div className="shrink-0 self-center">
        <a
          href={problem.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-extrabold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all duration-150 tracking-wide group/btn shrink-0 shadow-xs active:scale-95 ${
            isCodeChef
              ? 'bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white shadow-amber-600/25'
              : 'bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white shadow-sky-600/25'
          }`}
        >
          <span>SOLVE</span>
          <ExternalLink className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-150 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
};
