import React from 'react';
import { AlertCircle, Code2, CheckCircle2, BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col gap-3.5">
      {/* Top Badge Strip */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          <BookOpen className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          35 Days • 5 Problems Daily
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          <Code2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          CodeChef (500–1150) &amp; Codeforces (800–1100)
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          175 Curated Problems
        </span>
      </div>

      {/* Main Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          C Programming &amp; Problem Solving
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Structured problem set covering C syntax, branching, loops, 1D/2D/3D arrays, frequency counting, subsets, pointers, structs, and custom functions.
        </p>
      </div>

      {/* Apna College Video Guidance */}
      <div className="p-3.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-semibold text-amber-950 dark:text-amber-200">Note on Apna College lectures:</strong>{' '}
          Watch only the linked algorithmic logic and pattern episodes. Ignore C++ specific features (such as <code>std::vector</code>, <code>cin/cout</code>, and STL) and implement all solutions in standard C.
        </div>
      </div>
    </header>
  );
};
