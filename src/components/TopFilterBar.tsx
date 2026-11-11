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
    { num: '3', short: 'M3', name: 'Nested Loops', count: 20 },
    { num: '4', short: 'M4', name: 'Arrays & Division', count: 35 },
    { num: '5', short: 'M5', name: '2D Matrices', count: 20 },
    { num: '6', short: 'M6', name: 'Strings', count: 15 },
    { num: '7', short: 'M7', name: 'Functions & Pointers', count: 20 },
  ];

  const hasActiveFilters = moduleFilter !== 'all' || platformFilter !== 'all' || statusFilter !== 'all' || search.trim() !== '';

  return (
    <div className="w-full bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-[0_2px_14px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex flex-col gap-5 no-print">
      {/* 1. Header Row: Progress, Platform Badges & Pattern Lab CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs">
            <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                {percentage}%
              </span>
              <span className="text-sm sm:text-base font-extrabold text-slate-500 dark:text-slate-400 font-mono">
                ({solvedCount} / {totalProblems} Solved)
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/30">
                CodeChef: {solvedCC}/{codechefProblems.length}
              </span>
              <span className="text-xs font-mono font-bold text-sky-700 dark:text-sky-300 bg-sky-500/10 px-2.5 py-0.5 rounded-md border border-sky-500/30">
                Codeforces: {solvedCF}/{codeforcesProblems.length}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onNavigateToPatterns}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-extrabold shadow-xs hover:shadow transition-all shrink-0 self-start sm:self-center"
        >
          <Terminal className="w-4 h-4" />
          <span>Pattern Programs (26) →</span>
        </button>
      </div>

      {/* Progress Track Bar */}
      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* 2. Module Selector Tabs */}
      <div className="flex flex-col gap-2.5 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <span>Modules:</span>
          </span>
          {moduleFilter !== 'all' && (
            <button
              onClick={() => onModuleChange('all')}
              className="text-xs sm:text-sm font-bold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Show All Modules
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar -mx-1 px-1">
          <button
            onClick={() => onModuleChange('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black shrink-0 transition-all ${
              moduleFilter === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            All (175)
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
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black shrink-0 transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{m.short}: {m.name}</span>
                <span className={`font-mono text-xs px-2 py-0.5 rounded-md font-bold ${
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

      {/* 3. Search & Platform / Status Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pt-2 border-t border-slate-200 dark:border-slate-800">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search problems by title or code..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium transition"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear Search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Platform & Status Controls */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Platform Segmented Control */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-300 dark:border-slate-700">
            {[
              { id: 'all', label: 'All' },
              { id: 'CodeChef', label: 'CC' },
              { id: 'Codeforces', label: 'CF' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => onPlatformChange(p.id)}
                className={`text-xs sm:text-sm font-extrabold py-1.5 px-3 rounded-lg transition-all ${
                  platformFilter === p.id
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Status Segmented Control */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-300 dark:border-slate-700">
            {[
              { id: 'all', label: 'All' },
              { id: 'unsolved', label: 'Unsolved' },
              { id: 'solved', label: 'Solved' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => onStatusChange(s.id)}
                className={`text-xs sm:text-sm font-extrabold py-1.5 px-3 rounded-lg transition-all capitalize ${
                  statusFilter === s.id
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                onModuleChange('all');
                onPlatformChange('all');
                onStatusChange('all');
                onSearchChange('');
              }}
              className="text-xs sm:text-sm font-extrabold text-rose-600 dark:text-rose-400 hover:underline px-1 py-1 transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
