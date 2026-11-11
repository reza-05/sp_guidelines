import React from 'react';
import { Sun, Moon, RotateCcw, Printer, Code2, CalendarDays, Terminal, BookOpen } from 'lucide-react';

interface NavbarProps {
  currentView: 'curriculum' | 'patterns' | 'instructions';
  onChangeView: (view: 'curriculum' | 'patterns' | 'instructions') => void;
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
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/85 dark:bg-[#07090E]/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors no-print shadow-2xs">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => onChangeView('curriculum')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center font-mono font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
              <Code2 className="w-4.5 h-4.5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                SP Guidelines
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-normal mt-0.5">
                C Problem Solving
              </span>
            </div>
          </div>

          {/* View Mode Segmented Tabs (Desktop) */}
          <nav className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800/90 p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 ml-3 shadow-2xs">
            <button
              onClick={() => onChangeView('curriculum')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentView === 'curriculum'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5 text-sky-500" />
              <span>Curriculum</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                175
              </span>
            </button>

            <button
              onClick={() => onChangeView('patterns')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentView === 'patterns'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-500" />
              <span>Pattern Programs</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                26
              </span>
            </button>

            <button
              onClick={() => onChangeView('instructions')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentView === 'instructions'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>Instructions</span>
            </button>
          </nav>
        </div>

        {/* Mobile View Switcher */}
        <div className="flex md:hidden items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 w-full sm:w-auto order-3 sm:order-2 shadow-2xs">
          <button
            onClick={() => onChangeView('curriculum')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentView === 'curriculum'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <CalendarDays className="w-3 h-3 text-sky-500" />
            <span>Curriculum</span>
          </button>

          <button
            onClick={() => onChangeView('patterns')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentView === 'patterns'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Terminal className="w-3 h-3 text-emerald-500" />
            <span>Patterns</span>
          </button>

          <button
            onClick={() => onChangeView('instructions')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentView === 'instructions'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <BookOpen className="w-3 h-3 text-amber-500" />
            <span>Instructions</span>
          </button>
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center gap-2 order-2 sm:order-3">
          {/* Header Solved Counter (Responsive) */}
          {currentView === 'curriculum' && (
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="font-mono text-[11px] hidden sm:inline">{solvedCount}/{totalCount}</span>
              <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">{percentage}%</span>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer shadow-2xs"
            title="Toggle Theme"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 stroke-[2.2]" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 stroke-[2.2]" />
            )}
          </button>

          {/* Reset Progress Button */}
          <button
            onClick={onReset}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer shadow-2xs"
            title="Reset All Progress"
            aria-label="Reset All Progress"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.2]" />
          </button>

          {/* Print Checklist Button */}
          <button
            onClick={() => window.print()}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer shadow-2xs"
            title="Print / Save PDF"
            aria-label="Print / Save PDF"
          >
            <Printer className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

      </div>
    </header>
  );
};
