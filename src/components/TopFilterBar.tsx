import React from 'react';
import { Search, X, CheckCircle2, Terminal, SlidersHorizontal } from 'lucide-react';
import { curriculumData } from '../data/curriculumData';

interface TopFilterBarProps {
  solvedMap: Record<string, boolean>;
  totalProblems: number;
  search: string;
  onSearchChange: (val: string) => void;
  moduleFilter: string;
  onModuleChange: (mod: string) => void;
  platformFilter: string;
  onPlatformChange: (platform: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  onNavigateToPatterns: () => void;
}

export const TopFilterBar: React.FC<TopFilterBarProps> = ({
  solvedMap,
  totalProblems,
  search,
  onSearchChange,
  moduleFilter,
  onModuleChange,
  platformFilter,
  onPlatformChange,
  statusFilter,
  onStatusChange,
  onNavigateToPatterns
}) => {
  const solvedCount = Object.values(solvedMap).filter(Boolean).length;
  const percentage = Math.round((solvedCount / totalProblems) * 100);

  // Platform breakdown
  const codechefProblems = curriculumData.flatMap(d => d.problems).filter(p => p.platform === 'CodeChef');
  const codeforcesProblems = curriculumData.flatMap(d => d.problems).filter(p => p.platform === 'Codeforces');

  const solvedCC = codechefProblems.filter(p => !!solvedMap[p.id]).length;
  const solvedCF = codeforcesProblems.filter(p => !!solvedMap[p.id]).length;

  // 7 Modules Metadata
  const modules = [
    { num: '1', short: 'M1', name: 'Start with C', count: 30 },
    { num: '2', short: 'M2', name: 'Branching & Loops', count: 35 },
    { num: '3', short: 'M3', name: 'Nested Loops & Patterns', count: 20 },
    { num: '4', short: 'M4', name: 'Division & 1D Arrays', count: 35 },
    { num: '5', short: 'M5', name: '2D Matrices & Grids', count: 20 },
    { num: '6', short: 'M6', name: 'Strings', count: 15 },
    { num: '7', short: 'M7', name: 'Functions & Pointers', count: 20 },
  ];

  const hasActiveFilters = moduleFilter !== 'all' || platformFilter !== 'all' || statusFilter !== 'all' || search.trim() !== '';

  return (
    <div className="w-full flex flex-col gap-4 no-print" aria-label="Curriculum Filter and Progress Bar">
      {/* 1. Top Progress & Platform Summary Card */}
      <div className="bg-white dark:bg-[#0C1017] border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Overall Progress Stat */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
                {percentage}%
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 font-mono">
                ({solvedCount} / {totalProblems} Solved)
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                CC: {solvedCC}/{codechefProblems.length}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-sky-700 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
                CF: {solvedCF}/{codeforcesProblems.length}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Slim Animated Progress Track */}
        <div className="flex-1 max-w-md hidden md:flex flex-col gap-1.5 px-4">
          <div className="flex justify-between text-[11px] font-mono font-medium text-slate-400">
            <span>Overall Roadmap Completion</span>
            <span>{solvedCount} / {totalProblems}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Right: Pattern Programs Lab Direct CTA */}
        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={onNavigateToPatterns}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-xs hover:shadow transition-all"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Pattern Programs (26) →</span>
          </button>
        </div>
      </div>

      {/* 2. Top Filter Controls (Modules + Search + Platform + Status) */}
      <div className="bg-white dark:bg-[#0C1017] border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-4">
        {/* Module Filter Chips Carousel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Filter By Module:</span>
            </span>
            {moduleFilter !== 'all' && (
              <button
                onClick={() => onModuleChange('all')}
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                Show All Modules
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar -mx-1 px-1">
            <button
              onClick={() => onModuleChange('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                moduleFilter === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              All Modules ({totalProblems})
            </button>

            {modules.map((m) => {
              const modDays = curriculumData.filter((d) => String(d.module) === m.num);
              const modProblems = modDays.flatMap((d) => d.problems);
              const modSolved = modProblems.filter((p) => !!solvedMap[p.id]).length;
              const isSelected = moduleFilter === m.num;

              return (
                <button
                  key={m.num}
                  onClick={() => onModuleChange(m.num)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{m.short}: {m.name}</span>
                  <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded-md ${
                    isSelected
                      ? 'bg-sky-700 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}>
                    {modSolved}/{m.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 dark:bg-slate-800/80" />

        {/* Search, Platform & Status Filters in a Single Responsive Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search problem title or code (e.g. 1A, CHEFTRANS)..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-7 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 transition"
            />
            {search && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Platform & Status Filters */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Platform Segmented Control */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Platform:
              </span>
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'CodeChef', label: 'CodeChef' },
                  { id: 'Codeforces', label: 'Codeforces' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onPlatformChange(p.id)}
                    className={`text-xs font-bold py-1 px-2.5 rounded-lg transition-all ${
                      platformFilter === p.id
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Segmented Control */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Status:
              </span>
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'unsolved', label: 'Unsolved' },
                  { id: 'solved', label: 'Solved' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onStatusChange(s.id)}
                    className={`text-xs font-bold py-1 px-2.5 rounded-lg transition-all capitalize ${
                      statusFilter === s.id
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear All Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={() => {
                  onModuleChange('all');
                  onPlatformChange('all');
                  onStatusChange('all');
                  onSearchChange('');
                }}
                className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline px-1 py-1 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
