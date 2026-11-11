import React, { useState, useMemo } from 'react';
import { patternData } from '../data/patternData';
import { PatternCard } from './PatternCard';
import { PatternCategory } from '../types/pattern';
import {
  ArrowLeft,
  Search,
  ExternalLink,
  BookOpen,
  FilterX
} from 'lucide-react';

interface PatternLabProps {
  onBackToCurriculum: () => void;
}

export const PatternLab: React.FC<PatternLabProps> = ({ onBackToCurriculum }) => {
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<PatternCategory>('all');
  const [difficulty, setDifficulty] = useState<string>('all');

  const filteredPatterns = useMemo(() => {
    const q = search.trim().toLowerCase();

    return patternData.filter(pattern => {
      // Category filter
      if (category !== 'all' && pattern.category !== category) {
        return false;
      }

      // Difficulty filter
      if (difficulty !== 'all' && pattern.difficulty !== difficulty) {
        return false;
      }

      // Search query
      if (q) {
        const inTitle = pattern.title.toLowerCase().includes(q);
        const inDesc = pattern.description.toLowerCase().includes(q);
        const inLogic = pattern.logic.some(l => l.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inLogic) {
          return false;
        }
      }

      return true;
    });
  }, [search, category, difficulty]);

  // Counts
  const counts = useMemo(() => {
    return {
      all: patternData.length,
      star: patternData.filter(p => p.category === 'star').length,
      number: patternData.filter(p => p.category === 'number').length,
      character: patternData.filter(p => p.category === 'character').length,
      hollow: patternData.filter(p => p.category === 'hollow').length,
    };
  }, []);

  return (
    <div className="flex flex-col gap-5 animate-fadeIn w-full">
      {/* Top Breadcrumb & Back Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onBackToCurriculum}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-colors border border-slate-300 dark:border-slate-700"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>← Back to 35-Day Curriculum</span>
        </button>

        <a
          href="https://www.geeksforgeeks.org/c/pattern-programs-in-c/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline"
        >
          <BookOpen className="w-3.5 h-3.5" />
          GeeksforGeeks Pattern Reference
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Header Banner */}
      <div className="rounded-xl p-5 sm:p-6 bg-slate-900 text-white dark:bg-slate-800 border border-slate-800 dark:border-slate-700 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 dark:bg-slate-700 text-slate-300 border border-slate-700 dark:border-slate-600">
            Nested Loops Reference
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            26 Patterns
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          C Pattern Programs
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-400 max-w-3xl leading-relaxed">
          Standard star, number, alphabet, and hollow pattern programs in C. Includes row-column logic breakdown and complete C code.
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-slate-800 dark:bg-slate-700/80 text-slate-300">
            Total: {counts.all}
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 dark:bg-slate-700/80 text-slate-300">
            Stars: {counts.star}
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 dark:bg-slate-700/80 text-slate-300">
            Numbers: {counts.number}
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 dark:bg-slate-700/80 text-slate-300">
            Alphabets: {counts.character}
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 dark:bg-slate-700/80 text-slate-300">
            Hollow: {counts.hollow}
          </span>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search pattern by name (e.g., Floyd, Diamond, Pascal, Hollow)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold uppercase text-slate-400 dark:text-slate-500 mr-1">
              Category:
            </span>
            {[
              { id: 'all', label: `All (${counts.all})` },
              { id: 'star', label: `Stars (${counts.star})` },
              { id: 'number', label: `Numbers (${counts.number})` },
              { id: 'character', label: `Alphabets (${counts.character})` },
              { id: 'hollow', label: `Hollow (${counts.hollow})` },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as PatternCategory)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  category === cat.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Difficulty Level */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold uppercase text-slate-400 dark:text-slate-500 mr-1">
              Level:
            </span>
            {['all', 'Easy', 'Medium', 'Hard'].map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  difficulty === d
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                {d === 'all' ? 'All' : d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Jump Index Chips */}
      <div className="flex flex-wrap items-center gap-1.5 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <span className="text-[11px] font-semibold uppercase text-slate-400 dark:text-slate-500 mr-1">
          Index:
        </span>
        {patternData.map(p => (
          <a
            key={p.id}
            href={`#pattern-${p.id}`}
            className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400 transition-colors"
          >
            #{p.num} {p.title.split(' ')[0]}
          </a>
        ))}
      </div>

      {/* Pattern Cards Grid */}
      <main className="grid grid-cols-1 xl:grid-cols-2 gap-4" aria-label="Pattern list">
        {filteredPatterns.length === 0 ? (
          <div className="col-span-full text-center py-16 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <FilterX className="w-10 h-10 stroke-[1.5] mb-2 text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No matching pattern programs found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Try adjusting your search query or category filter.
            </p>
          </div>
        ) : (
          filteredPatterns.map(pattern => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))
        )}
      </main>

      {/* Bottom Back Button */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-center">
        <button
          onClick={onBackToCurriculum}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Curriculum</span>
        </button>
      </div>
    </div>
  );
};
