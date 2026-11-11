import React from 'react';
import { Problem } from '../types/curriculum';
import { ExternalLink, Check, Star } from 'lucide-react';

interface ProblemRowProps {
  problem: Problem;
  isSolved: boolean;
  onToggle: (id: string) => void;
}

export const ProblemRow: React.FC<ProblemRowProps> = ({ problem, isSolved, onToggle }) => {
  const isCodeChef = problem.platform === 'CodeChef';

  return (
    <div
      onClick={() => onToggle(problem.id)}
      className={`group relative flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
        isSolved
          ? 'bg-emerald-500/[0.04] dark:bg-emerald-950/20 border-emerald-500/30 dark:border-emerald-500/25 shadow-xs'
          : 'bg-white dark:bg-slate-900/70 border-slate-200/90 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md hover:-translate-y-0.5'
      }`}
    >
      {/* Left: Checkbox, ID, Title, Badges */}
      <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
        {/* Custom Tactile Checkbox */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(problem.id);
          }}
          aria-label={`Mark ${problem.title} as ${isSolved ? 'unsolved' : 'solved'}`}
          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150 border-2 mt-0.5 sm:mt-0 ${
            isSolved
              ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm shadow-emerald-600/30 scale-105'
              : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 group-hover:border-emerald-500/60'
          }`}
        >
          {isSolved && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Problem Num ID */}
        <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500 shrink-0 w-9">
          {problem.numId}
        </span>

        {/* Title & Description Container */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 flex-1 min-w-0">
          <span
            className={`text-sm font-bold tracking-tight transition-colors truncate ${
              isSolved
                ? 'line-through text-slate-400 dark:text-slate-500'
                : 'text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400'
            }`}
          >
            {problem.title}
          </span>

          {/* Rating Badge */}
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-md border shrink-0 tracking-wide ${
              isCodeChef
                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800/60'
                : 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-800/60'
            }`}
          >
            {isCodeChef && <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />}
            {problem.badgeText}
          </span>

          {/* Problem Topic / Description */}
          <span className="text-xs text-slate-500 dark:text-slate-400 truncate hidden xl:inline">
            {problem.desc}
          </span>
        </div>
      </div>

      {/* Right: Topic for smaller screens & Solve Action Button */}
      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
        <span className="text-xs text-slate-500 dark:text-slate-400 truncate xl:hidden max-w-[200px]">
          {problem.desc}
        </span>

        <a
          href={problem.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-150 tracking-wider shadow-xs hover:shadow-md hover:scale-105 active:scale-95 ${
            isCodeChef
              ? 'bg-amber-600 hover:bg-amber-500 text-white'
              : 'bg-sky-600 hover:bg-sky-500 text-white'
          }`}
        >
          <span>SOLVE</span>
          <ExternalLink className="w-3 h-3 stroke-[2.5]" />
        </a>
      </div>
    </div>
  );
};
