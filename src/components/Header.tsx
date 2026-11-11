import React from 'react';
import { AlertCircle, Code2, CheckCircle2, Calendar } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col gap-4">
      {/* Top Pill Badges */}
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/25">
          <Calendar className="w-4 h-4" />
          35 Days Curriculum
        </span>

        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/25">
          <Code2 className="w-4 h-4" />
          CodeChef (500–1150) &amp; Codeforces (800–1100)
        </span>

        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
          <CheckCircle2 className="w-4 h-4" />
          175 Curated Problems
        </span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          C Programming &amp; Problem Solving
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-medium">
          Structured problem set covering C fundamentals, branch logic, loops, 1D/2D/3D arrays, frequency tables, prefix sums, pointers, structures, and custom functions.
        </p>
      </div>

      {/* Apna College Video Guidance */}
      <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 dark:border-amber-800/50 flex items-start gap-3 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed font-medium">
          <strong className="font-extrabold text-amber-950 dark:text-amber-200">Apna College Note:</strong>{' '}
          Follow the algorithmic logic and pattern episodes. Ignore C++ specific features (like <code>std::vector</code>, <code>cin/cout</code>, and STL) and implement all solutions in standard C.
        </div>
      </div>
    </header>
  );
};
