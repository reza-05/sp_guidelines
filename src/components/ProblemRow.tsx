import React from 'react';
import { Problem } from '../types/curriculum';
import { ExternalLink } from 'lucide-react';

interface ProblemRowProps {
  problem: Problem;
  isSolved: boolean;
  onToggle: (id: string) => void;
}

export const ProblemRow: React.FC<ProblemRowProps> = ({ problem, isSolved, onToggle }) => {
  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-gray-800/60 transition-colors border-b border-slate-100 dark:border-gray-800/80 last:border-b-0">
      <td className="w-8 text-center p-2.5 sm:p-3">
        <input
          type="checkbox"
          checked={isSolved}
          onChange={() => onToggle(problem.id)}
          aria-label={`Mark ${problem.title} as solved`}
          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-gray-600 dark:bg-gray-700 cursor-pointer accent-emerald-600"
        />
      </td>

      <td className="w-12 text-xs font-bold text-slate-400 dark:text-slate-500 p-2.5 sm:p-3 whitespace-nowrap">
        {problem.numId}
      </td>

      <td className={`w-48 sm:w-60 text-xs sm:text-sm font-bold p-2.5 sm:p-3 ${isSolved ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
        {problem.title}
      </td>

      <td className="text-xs text-slate-600 dark:text-slate-300 p-2.5 sm:p-3">
        <span
          className={`inline-block text-[11px] font-black px-1.5 py-0.5 rounded border mr-2 whitespace-nowrap ${
            problem.platform === 'CodeChef'
              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800'
              : 'bg-sky-100 dark:bg-sky-950/60 text-sky-900 dark:text-sky-300 border-sky-300 dark:border-sky-800'
          }`}
        >
          {problem.badgeText}
        </span>
        <span className="hidden sm:inline">{problem.desc}</span>
      </td>

      <td className="w-20 text-right p-2.5 sm:p-3 whitespace-nowrap">
        <a
          href={problem.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded transition tracking-wide ${
            problem.platform === 'CodeChef'
              ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600'
              : 'bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-600'
          }`}
        >
          SOLVE <ExternalLink className="w-3 h-3" />
        </a>
      </td>
    </tr>
  );
};
