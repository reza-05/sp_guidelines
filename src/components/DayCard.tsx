import React from 'react';
import { DayCurriculum, Problem } from '../types/curriculum';
import { ProblemRow } from './ProblemRow';
import { Play, Terminal, ArrowRight, CheckCircle2, Video, Code2 } from 'lucide-react';

interface DayCardProps {
  dayData: DayCurriculum;
  visibleProblems: Problem[];
  solvedMap: Record<string, boolean>;
  onToggleProblem: (id: string) => void;
  onNavigateToPatterns?: () => void;
}

export const DayCard: React.FC<DayCardProps> = ({
  dayData,
  visibleProblems,
  solvedMap,
  onToggleProblem,
  onNavigateToPatterns
}) => {
  const dayNumStr = String(dayData.day).padStart(2, '0');
  const isNestedLoopDay = dayData.module === 3;
  const hasVideos = (dayData.bct && dayData.bct.length > 0) || (dayData.ac && dayData.ac.length > 0);

  // Day Solved Progress
  const totalDayProblems = dayData.problems.length;
  const solvedInThisDay = dayData.problems.filter(p => !!solvedMap[p.id]).length;
  const isDayCompleted = totalDayProblems > 0 && solvedInThisDay === totalDayProblems;

  return (
    <section
      id={`day${dayData.day}`}
      className={`day-card bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-md transition-all duration-200 flex flex-col gap-5 relative overflow-hidden ${dayData.theme}`}
    >
      {/* 1. Day Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="day-badge w-12 h-12 rounded-xl flex items-center justify-center font-mono text-lg font-black text-white shrink-0 shadow-sm ring-2 ring-white/20">
            {dayNumStr}
          </div>
          <div className="min-w-0">
            <h3 className="day-title text-base sm:text-lg font-extrabold tracking-tight leading-snug">
              {dayData.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed font-medium">
              {dayData.tagline}
            </p>
          </div>
        </div>

        {/* Day Completion Badge & Visual 5-Segment Track */}
        <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
          {/* 5-segment mini progress indicator */}
          <div className="hidden sm:flex items-center gap-1" title={`${solvedInThisDay} of ${totalDayProblems} solved`}>
            {dayData.problems.map((p, i) => (
              <span
                key={p.id || i}
                className={`w-3 h-1.5 rounded-full transition-all duration-200 ${
                  solvedMap[p.id]
                    ? 'bg-emerald-500 scale-105'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
            isDayCompleted
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700 shadow-2xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
          }`}>
            {isDayCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                <span>Completed (5/5)</span>
              </>
            ) : (
              <span className="font-mono text-[11px]">{solvedInThisDay} / {totalDayProblems} Solved</span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Tutorial Section: Balanced 2-Column Grid (No giant stretched void) */}
      {hasVideos && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Tutorial Lectures</span>
              </span>
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 shrink-0">
              {(dayData.bct?.length || 0) + (dayData.ac?.length || 0)} Videos
            </span>
          </div>

          {/* Balanced 2-Column Responsive Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {dayData.bct?.map((v) => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-red-50/30 dark:bg-slate-900/70 dark:hover:bg-red-950/20 border border-slate-200 hover:border-red-400 dark:border-slate-800 dark:hover:border-red-500/60 transition-all duration-150 group shadow-2xs hover:shadow-xs"
              >
                <div className="flex flex-col min-w-0 pr-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    Bangla Coding Tutor
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors truncate mt-0.5">
                    {v.title}
                  </span>
                </div>

                <div className="watch-btn shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[#ff0000] group-hover:bg-[#cc0000] active:scale-95 text-white text-xs font-bold rounded-lg shadow-xs transition-all">
                  <Play className="w-2.5 h-2.5 fill-white text-white shrink-0" />
                  <span>Watch</span>
                </div>
              </a>
            ))}

            {dayData.ac?.map((v) => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-purple-50/30 dark:bg-slate-900/70 dark:hover:bg-purple-950/20 border border-slate-200 hover:border-purple-400 dark:border-slate-800 dark:hover:border-purple-500/60 transition-all duration-150 group shadow-2xs hover:shadow-xs"
              >
                <div className="flex flex-col min-w-0 pr-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    Apna College
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate mt-0.5">
                    {v.title}
                  </span>
                </div>

                <div className="watch-btn shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[#ff0000] group-hover:bg-[#cc0000] active:scale-95 text-white text-xs font-bold rounded-lg shadow-xs transition-all">
                  <Play className="w-2.5 h-2.5 fill-white text-white shrink-0" />
                  <span>Watch</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Special Nested Loop Pattern Lab Callout */}
      {isNestedLoopDay && onNavigateToPatterns && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/30 dark:border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 sm:mt-0">
              <Terminal className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Pattern Programs Guide
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
                  26 Patterns
                </span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                Practice nested loops with 26 star, number, alphabet, and hollow patterns with logic and C source code.
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToPatterns}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg text-xs font-bold shrink-0 shadow-sm transition-all"
          >
            <span>Open Pattern Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3. Generous Space & Divider between Tutorial and Problems */}
      {hasVideos && (
        <div className="my-1 border-t border-slate-200 dark:border-slate-800" />
      )}

      {/* 4. Related Problems Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Related Practice Problems</span>
            </span>
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
          </div>
          <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 shrink-0">
            {visibleProblems.length} Problems
          </span>
        </div>

        {/* Problem Cards Stack */}
        <div className="flex flex-col gap-2.5" role="list" aria-label={`${dayData.title} Problems`}>
          {visibleProblems.map(problem => (
            <ProblemRow
              key={problem.id}
              problem={problem}
              isSolved={!!solvedMap[problem.id]}
              onToggle={onToggleProblem}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
