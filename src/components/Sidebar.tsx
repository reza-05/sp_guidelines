import React, { useState } from 'react';
import { Search, X, CheckCircle2, Layers, Terminal, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { curriculumData } from '../data/curriculumData';

interface SidebarProps {
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

export const Sidebar: React.FC<SidebarProps> = ({
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
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const solvedCount = Object.values(solvedMap).filter(Boolean).length;
  const percentage = Math.round((solvedCount / totalProblems) * 100);

  // Platform breakdown
  const codechefProblems = curriculumData.flatMap(d => d.problems).filter(p => p.platform === 'CodeChef');
  const codeforcesProblems = curriculumData.flatMap(d => d.problems).filter(p => p.platform === 'Codeforces');

  const solvedCC = codechefProblems.filter(p => !!solvedMap[p.id]).length;
  const solvedCF = codeforcesProblems.filter(p => !!solvedMap[p.id]).length;

  // 7 Modules Data
  const modules = [
    { num: '1', short: 'M1', title: 'Module 1: Start with C', range: 'Days 01–06 (30 P)' },
    { num: '2', short: 'M2', title: 'Module 2: Branching & Loops', range: 'Days 07–13 (35 P)' },
    { num: '3', short: 'M3', title: 'Module 3: Nested Loops & Patterns', range: 'Days 14–17 (20 P)' },
    { num: '4', short: 'M4', title: 'Module 4: Division & 1D Arrays', range: 'Days 18–24 (35 P)' },
    { num: '5', short: 'M5', title: 'Module 5: 2D Matrices & Grids', range: 'Days 25–28 (20 P)' },
    { num: '6', short: 'M6', title: 'Module 6: Character Arrays & Strings', range: 'Days 29–31 (15 P)' },
    { num: '7', short: 'M7', title: 'Module 7: Functions & Pointers', range: 'Days 32–35 (20 P)' },
  ];

  return (
    <aside className="w-full no-print" aria-label="Curriculum Sidebar">
      {/* ============================================================ */}
      {/* MOBILE & TABLET COMPACT CONTROLS (< lg)                       */}
      {/* ============================================================ */}
      <div className="lg:hidden flex flex-col gap-3 bg-white dark:bg-[#0C1017] border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-4 shadow-xs mb-6">
        {/* Progress & Quick Stats */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span>Progress:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-extrabold">{percentage}%</span>
                <span className="font-mono text-slate-400 text-[11px]">({solvedCount}/{totalProblems})</span>
              </div>
            </div>
          </div>

          {/* Toggle More Filters Button */}
          <button
            onClick={() => setIsMobileFiltersOpen(prev => !prev)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {isMobileFiltersOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Mini Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Quick Search */}
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search problems by name or code..."
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

        {/* Horizontal Swipeable Module Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar -mx-1 px-1">
          <button
            onClick={() => onModuleChange('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
              moduleFilter === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Modules
          </button>
          {modules.map((m) => (
            <button
              key={m.num}
              onClick={() => onModuleChange(m.num)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                moduleFilter === m.num
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {m.short}
            </button>
          ))}
        </div>

        {/* Collapsible Secondary Filters for Mobile */}
        {isMobileFiltersOpen && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3 animate-fadeIn">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Platform
                </span>
                <div className="grid grid-cols-3 gap-1">
                  {['all', 'CodeChef', 'Codeforces'].map((p) => (
                    <button
                      key={p}
                      onClick={() => onPlatformChange(p)}
                      className={`text-[11px] font-semibold py-1 rounded-md border text-center transition-colors ${
                        platformFilter === p
                          ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {p === 'all' ? 'All' : p === 'CodeChef' ? 'CC' : 'CF'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Status
                </span>
                <div className="grid grid-cols-3 gap-1">
                  {['all', 'unsolved', 'solved'].map((s) => (
                    <button
                      key={s}
                      onClick={() => onStatusChange(s)}
                      className={`text-[11px] font-semibold py-1 rounded-md border text-center transition-colors capitalize ${
                        statusFilter === s
                          ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pattern Lab Quick CTA on Mobile */}
            <button
              onClick={onNavigateToPatterns}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Explore 26 Pattern Programs →</span>
            </button>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* DESKTOP STICKY SIDEBAR (>= lg)                                */}
      {/* ============================================================ */}
      <div className="hidden lg:flex flex-col gap-4 sticky top-20">
        {/* 1. Overall Progress Card */}
        <div className="bg-white dark:bg-[#0C1017] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Curriculum Progress
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-semibold">
              35 Days
            </span>
          </div>

          {/* Counter and Progress Bar */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight">
                {solvedCount}
                <span className="text-sm font-medium text-slate-400 dark:text-slate-500"> / {totalProblems}</span>
              </span>
              <span className="text-base font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                {percentage}%
              </span>
            </div>

            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Platform Breakdown Stats */}
          <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <div className="p-2.5 rounded-xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20">
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                CodeChef (500+)
              </span>
              <span className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100 mt-0.5 block">
                {solvedCC} <span className="text-xs font-normal text-slate-400">/ {codechefProblems.length}</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-sky-500/5 dark:bg-sky-950/20 border border-sky-500/20">
              <span className="text-[10px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider block">
                Codeforces (800+)
              </span>
              <span className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100 mt-0.5 block">
                {solvedCF} <span className="text-xs font-normal text-slate-400">/ {codeforcesProblems.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* 2. Search & Filters Card */}
        <div className="bg-white dark:bg-[#0C1017] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 flex flex-col gap-3.5 shadow-xs">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Search &amp; Filter
          </h4>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search problem title or code..."
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

          {/* Platform Selector */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
              Platform
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'all', label: 'All' },
                { id: 'CodeChef', label: 'CodeChef' },
                { id: 'Codeforces', label: 'Codeforces' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => onPlatformChange(p.id)}
                  className={`text-xs font-semibold py-1.5 px-2 rounded-lg border transition-all text-center ${
                    platformFilter === p.id
                      ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status Selector */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
              Status
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'all', label: 'All' },
                { id: 'unsolved', label: 'Unsolved' },
                { id: 'solved', label: 'Solved' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => onStatusChange(s.id)}
                  className={`text-xs font-semibold py-1.5 px-2 rounded-lg border transition-all text-center capitalize ${
                    statusFilter === s.id
                      ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Modules Navigator */}
        <div className="bg-white dark:bg-[#0C1017] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 flex flex-col gap-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Curriculum Modules
              </h4>
            </div>
            {moduleFilter !== 'all' && (
              <button
                onClick={() => onModuleChange('all')}
                className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => onModuleChange('all')}
              className={`w-full text-left p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                moduleFilter === 'all'
                  ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-50/60 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>All Modules (Days 01–35)</span>
              <span className="font-mono text-[11px] opacity-75">175 P</span>
            </button>

            {modules.map((m) => {
              const modDays = curriculumData.filter((d) => String(d.module) === m.num);
              const modProblems = modDays.flatMap((d) => d.problems);
              const modSolved = modProblems.filter((p) => !!solvedMap[p.id]).length;
              const modPct = Math.round((modSolved / (modProblems.length || 1)) * 100);

              const isSelected = moduleFilter === m.num;

              return (
                <button
                  key={m.num}
                  onClick={() => onModuleChange(m.num)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-sky-500/10 border-sky-500 text-sky-950 dark:text-sky-200 shadow-xs'
                      : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/70 dark:border-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`font-bold ${isSelected ? 'text-sky-700 dark:text-sky-300' : 'text-slate-800 dark:text-slate-200'}`}>
                      {m.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                      {m.range}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full">
                    <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${modPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                      {modSolved}/{modProblems.length} ({modPct}%)
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Pattern Programs Quick Link */}
        <div className="rounded-2xl p-4 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/25 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold text-xs">
            <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Pattern Programs Lab</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            26 curated star, number, alphabet, and hollow patterns with logic and C code.
          </p>
          <button
            onClick={onNavigateToPatterns}
            className="mt-1 w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-xs transition-all text-center"
          >
            Open Pattern Programs →
          </button>
        </div>
      </div>
    </aside>
  );
};
