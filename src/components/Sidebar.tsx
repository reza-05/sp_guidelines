import React from 'react';
import { Search, X, Sparkles, Trophy, Flame } from 'lucide-react';
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
    { num: '1', title: 'Week 1: Foundations & Branches', range: 'Days 01–07' },
    { num: '2', title: 'Week 2: Loops & Number Theory', range: 'Days 08–14' },
    { num: '3', title: 'Week 3: Patterns & 1D Arrays', range: 'Days 15–21' },
    { num: '4', title: 'Week 4: Matrices & Subarrays', range: 'Days 22–28' },
    { num: '5', title: 'Week 5: Pointers & Structs', range: 'Days 29–35' },
  ];

  return (
    <aside className="flex flex-col gap-5 sticky top-24 no-print" aria-label="Curriculum Sidebar">
      {/* 1. Overall Progress Hero Card */}
      <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Your Progress
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
            <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
            35 Days
          </span>
        </div>

        {/* Counter and Progress Bar */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {solvedCount}
              <span className="text-base font-bold text-slate-400 dark:text-slate-500"> / {totalProblems}</span>
            </span>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
              {percentage}%
            </span>
          </div>

          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-700/60">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 ease-out shadow-xs"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="p-2 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide block">
              CodeChef (500+)
            </span>
            <span className="text-sm font-black text-amber-900 dark:text-amber-200 mt-0.5 block">
              {solvedCC} / {codechefProblems.length}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-900/40">
            <span className="text-[10px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wide block">
              Codeforces (800+)
            </span>
            <span className="text-sm font-black text-sky-900 dark:text-sky-200 mt-0.5 block">
              {solvedCF} / {codeforcesProblems.length}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Search & Filters Card */}
      <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col gap-3.5">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Search &amp; Filter
        </h4>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search problems by name or code..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
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
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
            Platform:
          </span>
          <div className="grid grid-cols-3 gap-1">
            {[
              { id: 'all', label: 'All' },
              { id: 'CodeChef', label: 'CodeChef' },
              { id: 'Codeforces', label: 'CF 800+' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => onPlatformChange(p.id)}
                className={`text-[11px] font-bold py-1.5 px-2 rounded-lg border transition-all text-center ${
                  platformFilter === p.id
                    ? 'bg-sky-600 border-sky-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Selector */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
            Problem Status:
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
                className={`text-[11px] font-bold py-1.5 px-2 rounded-lg border transition-all text-center ${
                  statusFilter === s.id
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Week Quick Navigator */}
      <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Sprint Timeline
          </h4>
          {weekFilter !== 'all' && (
            <button
              onClick={() => onWeekChange('all')}
              className="text-[11px] text-sky-600 dark:text-sky-400 font-bold hover:underline"
            >
              Reset Week
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => onWeekChange('all')}
            className={`w-full text-left p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
              weekFilter === 'all'
                ? 'bg-sky-600 border-sky-600 text-white shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>Show All 5 Weeks (Days 01–35)</span>
            <span className="text-[11px] opacity-80">175 P</span>
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
                className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 dark:border-sky-500 shadow-xs ring-1 ring-sky-500'
                    : 'bg-slate-50/70 dark:bg-slate-800/30 border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`font-bold ${isSelected ? 'text-sky-900 dark:text-sky-200' : 'text-slate-800 dark:text-slate-200'}`}>
                    {w.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    {w.range}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${weekPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 shrink-0">
                    {weekSolved}/{weekProblems.length} ({weekPct}%)
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Pattern Lab Quick Access Card */}
      <div className="rounded-2xl p-4 bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <h4 className="text-xs font-black uppercase tracking-wider text-emerald-100">
            C Pattern Programs Lab
          </h4>
        </div>
        <p className="text-xs text-emerald-50 leading-relaxed">
          Master nested loops with 26 visual star, number, alphabet &amp; hollow pattern programs from GeeksforGeeks.
        </p>
        <button
          onClick={onNavigateToPatterns}
          className="mt-1 w-full py-2 px-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-black transition-all text-center shadow-xs active:scale-95"
        >
          Explore 26 Patterns ↗
        </button>
      </div>
    </aside>
  );
};
