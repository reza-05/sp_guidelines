import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center border-t border-slate-200/80 dark:border-slate-800/80 py-8 mt-6 text-xs text-slate-500 dark:text-slate-400 flex flex-col items-center justify-center gap-2 no-print">
      <p className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
        <span>Created by</span>
        <a
          href="https://github.com/reza-05"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 underline underline-offset-4 decoration-slate-300 dark:decoration-slate-700 transition-colors"
        >
          Reza
        </a>
        <span>for basic programming &amp; problem solving</span>
      </p>
    </footer>
  );
};
