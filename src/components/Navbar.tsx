import React from 'react';
import { Sun, Moon, RotateCcw, Printer, Code2, Sparkles, CalendarDays } from 'lucide-react';

interface NavbarProps {
  currentView: 'curriculum' | 'patterns';
  onChangeView: (view: 'curriculum' | 'patterns') => void;
  solvedCount: number;
  totalCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onChangeView,
  solvedCount,
  totalCount,
  isDark,
  onToggleTheme,
  onReset
}) => {
  const percentage = Math.round((solvedCount / totalCount) * 100);

  return (
    <nav className="sticky top-4 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-slate-200 dark:border-gray-800 rounded-xl p-2.5 sm:p-3 shadow-md transition-colors no-print flex flex-col gap-2.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Page Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onChangeView('curriculum')}>
            <Code2 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight">
              SP Guidelines
            </span>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-gray-800 p-0.5 rounded-lg border border-slate-200 dark:border-gray-700">
            <button
              onClick={() => onChangeView('curriculum')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                currentView === 'curriculum'
                  ? 'bg-white dark:bg-gray-900 text-sky-600 dark:text-sky-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>35-Day Curriculum</span>
            </button>

            <button
              onClick={() => onChangeView('patterns')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                currentView === 'patterns'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Pattern Lab</span>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-200 dark:text-emerald-100 px-1 py-0.2 rounded font-mono">
                26
              </span>
            </button>
          </div>
        </div>

        {/* Action Controls & Progress */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* Live Progress Pill (Curriculum Mode) */}
          {currentView === 'curriculum' && (
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200">
              <span className="hidden sm:inline">{solvedCount}/{totalCount}</span>
              <span>{percentage}%</span>
              <div className="w-12 sm:w-16 h-1.5 bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )}

          <button
            onClick={onToggleTheme}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-gray-700 transition"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
          </button>

          {currentView === 'curriculum' && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md bg-slate-100 dark:bg-gray-800 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-gray-700 transition"
              title="Reset All Progress"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

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
