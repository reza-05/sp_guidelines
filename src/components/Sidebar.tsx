import React from 'react';
import { Search, X, CheckCircle2, Calendar, Terminal } from 'lucide-react';
import { curriculumData } from '../data/curriculumData';

interface SidebarProps {
  solvedMap: Record<string, boolean>;
  totalProblems: number;
  search: string;
  onSearchChange: (val: string) => void;
  weekFilter: string;
  onWeekChange: (week: string) => void;
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
  weekFilter,
  onWeekChange,
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

  // Weeks data
  const weeks = [
    { num: '1', title: 'Week 1: Syntax & Conditionals', range: 'Days 01–07' },
    { num: '2', title: 'Week 2: Loops & Number Theory', range: 'Days 08–14' },
    { num: '3', title: 'Week 3: Patterns & 1D Arrays', range: 'Days 15–21' },
    { num: '4', title: 'Week 4: Matrices & Subarrays', range: 'Days 22–28' },
    { num: '5', title: 'Week 5: Pointers & Structures', range: 'Days 29–35' },
  ];

  return (
    <aside className="flex flex-col gap-4 sticky top-20 no-print" aria-label="Curriculum Sidebar">
      {/* 1. Overall Progress */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Curriculum Progress
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            35 Days
          </span>
        </div>

        {/* Counter and Progress Bar */}
        <div>
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">
              {solvedCount}
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400"> / {totalProblems}</span>
            </span>
            <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {percentage}%
            </span>
          </div>

          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block">
              CodeChef (500+)
            </span>
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-200 mt-0.5 block">
              {solvedCC} / {codechefProblems.length}
            </span>
          </div>

          <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide block">
              Codeforces (800+)
            </span>
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-200 mt-0.5 block">
              {solvedCF} / {codeforcesProblems.length}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Search & Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-3">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
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
            className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 transition"
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
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1">
            Platform:
          </span>
          <div className="grid grid-cols-3 gap-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'CodeChef', label: 'CodeChef' },
              { id: 'Codeforces', label: 'Codeforces' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => onPlatformChange(p.id)}
                className={`text-[11px] font-semibold py-1 px-1.5 rounded border transition-colors text-center ${
                  platformFilter === p.id
                    ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Selector */}
        <div>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1">
            Status:
          </span>
          <div className="grid grid-cols-3 gap-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'unsolved', label: 'Unsolved' },
              { id: 'solved', label: 'Solved' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => onStatusChange(s.id)}
                className={`text-[11px] font-semibold py-1 px-1.5 rounded border transition-colors text-center ${
                  statusFilter === s.id
                    ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Weekly Schedule */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Weekly Schedule
            </h4>
          </div>
          {weekFilter !== 'all' && (
            <button
              onClick={() => onWeekChange('all')}
              className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold hover:underline"
            >
              Reset
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <button
            onClick={() => onWeekChange('all')}
            className={`w-full text-left p-2 rounded-lg border text-xs font-semibold transition-colors flex items-center justify-between ${
              weekFilter === 'all'
                ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900'
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            <span>All Weeks (Days 01–35)</span>
            <span className="font-mono text-[11px] opacity-75">175 P</span>
          </button>

          {weeks.map((w) => {
            const weekDays = curriculumData.filter((d) => String(d.week) === w.num);
            const weekProblems = weekDays.flatMap((d) => d.problems);
            const weekSolved = weekProblems.filter((p) => !!solvedMap[p.id]).length;
            const weekPct = Math.round((weekSolved / (weekProblems.length || 1)) * 100);

            const isSelected = weekFilter === w.num;

            return (
              <button
                key={w.num}
                onClick={() => onWeekChange(w.num)}
                className={`w-full text-left p-2 rounded-lg border text-xs transition-colors flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 text-sky-950 dark:text-sky-200'
                    : 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`font-semibold ${isSelected ? 'text-sky-900 dark:text-sky-200' : 'text-slate-800 dark:text-slate-200'}`}>
                    {w.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    {w.range}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                      style={{ width: `${weekPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400 shrink-0">
                    {weekSolved}/{weekProblems.length} ({weekPct}%)
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Pattern Programs Link */}
      <div className="rounded-xl p-3.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-semibold text-xs">
          <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Pattern Programs Lab</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          26 standard star, number, alphabet, and hollow pattern programs with logic and C code.
        </p>
        <button
          onClick={onNavigateToPatterns}
          className="mt-1 w-full py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold transition-colors text-center"
        >
          Open Pattern Programs →
        </button>
      </div>
    </aside>
  );
};
