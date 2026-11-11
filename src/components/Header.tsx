import React from 'react';
import { AlertCircle, Code2, CheckCircle2, Calendar } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col gap-3.5">
      {/* Top Pill Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
          <Calendar className="w-3.5 h-3.5" />
          35 Days Curriculum
        </span>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
          <Code2 className="w-3.5 h-3.5" />
          CodeChef (500–1150) &amp; Codeforces (800–1100)
        </span>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" />
          175 Curated Problems
        </span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          C Programming &amp; Problem Solving
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Structured problem set covering C fundamentals, branch logic, loops, 1D/2D/3D arrays, frequency tables, prefix sums, pointers, structures, and custom functions.
        </p>
      </div>

      {/* Apna College Video Guidance */}
      <div className="p-3 sm:p-3.5 rounded-xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 dark:border-amber-800/40 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-semibold text-amber-950 dark:text-amber-200">Apna College Note:</strong>{' '}
          Follow the algorithmic logic and pattern episodes. Ignore C++ specific features (like <code>std::vector</code>, <code>cin/cout</code>, and STL) and implement all solutions in standard C.
        </div>
      </div>
    </header>
  );
};
