import React, { useState, useMemo } from 'react';
import { patternData } from '../data/patternData';
import { PatternCard } from './PatternCard';
import { PatternCategory } from '../types/pattern';
import {
  ArrowLeft,
  Search,
  ExternalLink,
  Sparkles,
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
    <div className="flex flex-col gap-6 animate-fadeIn w-full">
      {/* Top Breadcrumb & Back Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
        <button
          onClick={onBackToCurriculum}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all active:scale-95 border border-slate-300 dark:border-slate-700 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>← Back to 35-Day Curriculum</span>
        </button>

        <a
          href="https://www.geeksforgeeks.org/c/pattern-programs-in-c/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline"
        >
          <BookOpen className="w-3.5 h-3.5" />
          GeeksforGeeks Pattern Reference Guide
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Hero Banner */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Interactive Nested Loop Masterclass
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            C Pattern Programs Lab
          </h2>
          <p className="text-sm text-emerald-50 mt-2 leading-relaxed">
            Master nested loop control flow with 26 curated visual patterns: Stars, Numbers, Alphabets, and Hollow Geometric Shapes with clean C code and step-by-step logic explanations.
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-5">
            <div className="px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-md text-xs font-mono font-bold">
              Total: {counts.all} Patterns
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-md text-xs font-mono font-bold">
              ⭐ Stars: {counts.star}
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-md text-xs font-mono font-bold">
              🔢 Numbers: {counts.number}
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-md text-xs font-mono font-bold">
              🔤 Alphabet: {counts.character}
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-black/25 backdrop-blur-md text-xs font-mono font-bold">
              🔷 Hollow: {counts.hollow}
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col gap-3 bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xs">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search pattern by name (e.g., Floyd, Diamond, Pascal, Hollow, Pyramid, Butterfly)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500 mr-1">
              Category:
            </span>
            {[
              { id: 'all', label: `All (${counts.all})` },
              { id: 'star', label: `⭐ Star (${counts.star})` },
              { id: 'number', label: `🔢 Number (${counts.number})` },
              { id: 'character', label: `🔤 Character (${counts.character})` },
              { id: 'hollow', label: `🔷 Hollow (${counts.hollow})` },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as PatternCategory)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  category === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Difficulty Level */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500 mr-1">
              Level:
            </span>
            {['all', 'Easy', 'Medium', 'Hard'].map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  difficulty === d
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200'
                }`}
              >
                {d === 'all' ? 'All Levels' : d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Jump Index Chips */}
      <div className="flex flex-wrap items-center gap-1.5 p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
        <span className="text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400 mr-1">
          Quick Jump:
        </span>
        {patternData.map(p => (
          <a
            key={p.id}
            href={`#pattern-${p.id}`}
            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500 transition-colors"
          >
            #{p.num} {p.title.split(' ')[0]}
          </a>
        ))}
      </div>

      {/* Pattern Cards Multi-Column Grid */}
      <main className="grid grid-cols-1 xl:grid-cols-2 gap-6" aria-label="Pattern list">
        {filteredPatterns.length === 0 ? (
          <div className="col-span-full text-center py-20 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 bg-white/60 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
            <FilterX className="w-12 h-12 stroke-[1.5] mb-2 text-slate-400" />
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
              No matching pattern programs found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Try clearing your search query or choosing another category filter.
            </p>
          </div>
        ) : (
          filteredPatterns.map(pattern => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))
        )}
      </main>

      {/* Bottom Back Button */}
      <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex justify-center">
        <button
          onClick={onBackToCurriculum}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to 35-Day Curriculum</span>
        </button>
      </div>
    </div>
  );
};
