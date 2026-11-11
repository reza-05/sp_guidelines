import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center flex flex-col items-center gap-2 mt-2">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-tight">
        C Programming &amp; Problem Solving
      </h1>
      <h2 className="text-sm sm:text-base font-bold text-sky-600 dark:text-sky-400">
        35-Day Complete Structured Curriculum • 175 Curated Problems (500+ Rating)
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
        From basic C syntax and conditionals to Pointers, Structures, Custom Functions, Frequency Arrays, Subsets, and 2D/3D Matrices.
        Featuring 5 non-trivial problems daily from <strong>CodeChef</strong> (500+ rating) and <strong>Codeforces</strong> (800–1100 rating).
      </p>

      {/* Guidance Notice Box */}
      <div className="w-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 border-l-4 border-l-amber-500 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3 text-left mt-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-amber-800 dark:text-amber-300">Guidance for Apna College DSA Playlist:</strong>{' '}
          You do <em>not</em> need to watch the full 144-video playlist! Only watch the linked fundamental logic, pattern, and problem-solving lectures.
          Disregard C++ specific features (such as <code>std::vector</code>, <code>cin/cout</code>, STL classes) and write all code strictly in{' '}
          <strong>C language</strong> using standard arrays, pointers, structs, functions, loops, and <code>printf</code> / <code>scanf</code>.
        </div>
      </div>
    </header>
  );
};
