import React from 'react';
import { AlertCircle, Code, ShieldCheck, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col gap-4">
      {/* Top Badge Strip */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 shadow-2xs">
          <Zap className="w-3.5 h-3.5 text-sky-500 fill-sky-500" />
          35-Day Intensive Bootcamp
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shadow-2xs">
          <Code className="w-3.5 h-3.5 text-amber-500" />
          175 Curated Problems (500+ Rating)
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Zero Spoilers &amp; Pure C Focus
        </span>
      </div>

      {/* Main Hero Title */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          C Programming &amp; Problem Solving Masterclass
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Transition smoothly from basic C syntax to algorithmic thinking, Pointers, Structs, Custom Functions, 
          Frequency Arrays, Subsets, and 2D/3D Matrices with exactly <strong>5 handpicked problems daily</strong> from CodeChef and Codeforces.
        </p>
      </div>

      {/* Apna College C++ vs C Guidance Notice */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200 shadow-2xs">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-amber-900 dark:text-amber-200 font-bold">Apna College Video Guidance:</strong>{' '}
          You only need to watch the linked algorithmic logic and pattern episodes.
          Ignore C++ specific keywords (like <code>std::vector</code>, <code>cin/cout</code>, STL classes) and solve everything strictly in{' '}
          <strong>pure C</strong> using standard arrays, pointers, structs, functions, loops, and <code>printf</code> / <code>scanf</code>.
        </div>
      </div>
    </header>
  );
};
