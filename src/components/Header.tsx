import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col gap-1.5 pb-1">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
        C Problem Solving Guidelines
      </h1>
      <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
        35 Days Structured Curriculum • 175 Curated Problems
      </p>
    </header>
  );
};
