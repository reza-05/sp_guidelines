import React, { useState, useMemo } from 'react';
import { patternData } from '../data/patternData';
import { PatternCard } from './PatternCard';
import { PatternCategory } from '../types/pattern';
import {
  ArrowLeft,
  Search,
  ExternalLink,
  BookOpen,
  FilterX,
  Rows,
  LayoutGrid
} from 'lucide-react';

interface PatternLabProps {
  onBackToCurriculum: () => void;
}

export const PatternLab: React.FC<PatternLabProps> = ({ onBackToCurriculum }) => {
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<PatternCategory>('all');
  const [difficulty, setDifficulty] = useState<string>('all');
  const [layout, setLayout] = useState<'single' | 'grid'>('grid');

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
    <div className="flex flex-col gap-6 animate-fadeIn w-full">
      {/* Top Breadcrumb & Back Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onBackToCurriculum}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
          <span>Back to Curriculum</span>
        </button>

        <a
          href="https://www.geeksforgeeks.org/c/pattern-programs-in-c/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline"
        >
          <BookOpen className="w-4 h-4" />
          <span>GeeksforGeeks Pattern Reference</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Glowing Instruction Callout: Solve only after completing Nested Loops */}
      <div className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-400/60 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(245,158,11,0.25)] animate-pulse">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] shrink-0" />
        <span>গুরুত্বপূর্ণ: নেস্টেড লুপ (Module 3) শেষ হওয়ার পরেই কেবল এই প্যাটার্ন প্রবলেমগুলো সমাধান করবে!</span>
      </div>

      {/* Header Banner - Clean, Modern & Consistent */}
      <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-slate-800 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 inline-flex items-center gap-1.5">
            Nested Loops Practice
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            26 Patterns
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          C Pattern Problems
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed font-medium">
          Standard star, number, alphabet, and hollow pattern problems in C with complete row-column logic breakdown and tested C solutions.
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs sm:text-sm font-bold">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
            Total: {counts.all}
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
            Stars: {counts.star}
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
            Numbers: {counts.number}
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
            Alphabets: {counts.character}
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
            Hollow: {counts.hollow}
          </span>
        </div>
      </div>

      {/* Search, Filter Pills & View Mode */}
      <div className="flex flex-col gap-4 bg-white dark:bg-[#0C1017] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search pattern by name (e.g., Floyd, Diamond, Pascal, Hollow)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-sm sm:text-base rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all font-medium"
          />
        </div>

        {/* Filter Pills & View Mode */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
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
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  category === cat.id
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Difficulty Level */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
                Level:
              </span>
              {['all', 'Easy', 'Medium', 'Hard'].map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    difficulty === d
                      ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {d === 'all' ? 'All' : d}
                </button>
              ))}
            </div>

            {/* Layout Toggle (1 Column vs 2 Columns) */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setLayout('single')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  layout === 'single'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Single Column View (Maximum Width)"
              >
                <Rows className="w-3.5 h-3.5" />
                <span>1 Column</span>
              </button>
              <button
                onClick={() => setLayout('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  layout === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Two Column Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>2 Columns</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pattern Cards List */}
      <main
        className={
          layout === 'single'
            ? 'flex flex-col gap-6'
            : 'grid grid-cols-1 xl:grid-cols-2 gap-6'
        }
        aria-label="Pattern list"
      >
        {filteredPatterns.length === 0 ? (
          <div className="col-span-full text-center py-16 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 bg-white dark:bg-[#0C1017] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <FilterX className="w-12 h-12 stroke-[1.5] mb-2 text-slate-400" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No matching pattern programs found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
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
      <div className="pt-6 pb-2 border-t border-slate-200 dark:border-slate-800 flex justify-center">
        <button
          onClick={onBackToCurriculum}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-sm font-bold transition-colors cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Curriculum</span>
        </button>
      </div>
    </div>
  );
};
