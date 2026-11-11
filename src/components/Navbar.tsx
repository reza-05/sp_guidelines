import React from 'react';
import { Sun, Moon, RotateCcw, Printer, Code2 } from 'lucide-react';

interface NavbarProps {
  solvedCount: number;
  totalCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  solvedCount,
  totalCount,
  isDark,
  onToggleTheme,
  onReset
}) => {
  const percentage = Math.round((solvedCount / totalCount) * 100);

  return (
    <nav className="sticky top-4 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-slate-200 dark:border-gray-800 rounded-xl p-3 shadow-md transition-colors no-print">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
            SP Guidelines
          </span>
        </div>

        {/* Live Progress Pill */}
        <div className="flex items-center gap-2.5 bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200">
          <span>{solvedCount} / {totalCount} Solved ({percentage}%)</span>
          <div className="w-16 h-1.5 bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onToggleTheme}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-gray-700 transition"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
          </button>

          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md bg-slate-100 dark:bg-gray-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-gray-700 transition"
            title="Reset All Progress"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-gray-700 transition"
            title="Print or Save PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
