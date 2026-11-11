import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center border-t border-slate-200 dark:border-gray-800 pt-6 mt-4 text-xs text-slate-500 dark:text-slate-400 flex flex-col gap-2">
      <div className="flex justify-center gap-3 font-semibold">
        <a
          href="https://github.com/reza-05/sp_guidelines"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 dark:text-sky-400 hover:underline"
        >
          GitHub Repository
        </a>
        <span>•</span>
        <a
          href="https://www.codechef.com/practice-old"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 dark:text-sky-400 hover:underline"
        >
          CodeChef Practice
        </a>
        <span>•</span>
        <a
          href="https://codeforces.com/problemset"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 dark:text-sky-400 hover:underline"
        >
          Codeforces Problemset
        </a>
      </div>
      <p>Created for beginners and university students mastering C Language &amp; Competitive Programming.</p>
    </footer>
  );
};
