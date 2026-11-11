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
  
  // Build serial tutorial video list in optimal learning order (Bangla theory first, then deep-dive practice)
  const allTutorials = [
    ...(dayData.bct || []).map(v => ({
      ...v,
      source: 'Bangla Coding Tutor' as const,
      color: 'rose',
    })),
    ...(dayData.ac || []).map(v => ({
      ...v,
      source: 'Apna College' as const,
      color: 'purple',
    })),
  ];
  const hasVideos = allTutorials.length > 0;

  // Day Solved Progress
  const totalDayProblems = dayData.problems.length;
  const solvedInThisDay = dayData.problems.filter(p => !!solvedMap[p.id]).length;
  const isDayCompleted = totalDayProblems > 0 && solvedInThisDay === totalDayProblems;

  return (
    <section
      id={`day${dayData.day}`}
      className={`day-card bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-[0_2px_14px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-lg transition-all duration-200 flex flex-col gap-6 relative overflow-hidden ${dayData.theme}`}
    >
      {/* 1. Day Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4 min-w-0">
          <div className="day-badge w-14 h-14 rounded-2xl flex items-center justify-center font-mono text-xl font-black text-white shrink-0 shadow-md ring-4 ring-white/20">
            {dayNumStr}
          </div>
          <div className="min-w-0">
            <h3 className="day-title text-lg sm:text-xl md:text-2xl font-black tracking-tight leading-snug">
              {dayData.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-medium">
              {dayData.tagline}
            </p>
          </div>
        </div>

        {/* Day Completion Badge & Visual 5-Segment Track */}
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
          {/* 5-segment mini progress indicator */}
          <div className="hidden sm:flex items-center gap-1.5" title={`${solvedInThisDay} of ${totalDayProblems} solved`}>
            {dayData.problems.map((p, i) => (
              <span
                key={p.id || i}
                className={`w-3.5 h-2 rounded-full transition-all duration-200 ${
                  solvedMap[p.id]
                    ? 'bg-emerald-500 scale-105'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold border transition-colors ${
            isDayCompleted
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700 shadow-2xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
          }`}>
            {isDayCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                <span>Completed (5/5)</span>
              </>
            ) : (
              <span className="font-mono">{solvedInThisDay} / {totalDayProblems} Solved</span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Tutorial Section: Sequential 1-by-1 List with Numbering */}
      {hasVideos && (
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-slate-900 dark:text-white flex items-center gap-2">
                <Video className="w-4.5 h-4.5 text-rose-600 dark:text-rose-400" />
                <span>Tutorial Lectures (Watch in Sequence)</span>
              </span>
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
            </div>
            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 shrink-0">
              {allTutorials.length} Videos
            </span>
          </div>

          {/* Sequential 1-by-1 Video List with Explicit Step Numbering */}
          <div className="flex flex-col gap-2.5" role="list" aria-label="Tutorial Lectures">
            {allTutorials.map((v, idx) => {
              const stepNum = idx + 1;
              const isFirst = idx === 0;
              const isLast = idx === allTutorials.length - 1 && allTutorials.length > 1;

              return (
                <a
                  key={v.id}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/60 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-150 group shadow-2xs hover:shadow-xs"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    {/* Serial Step Badge */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-mono font-black text-xs sm:text-sm flex flex-col items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold opacity-60 leading-none">
                        STEP
                      </span>
                      <span className="leading-none mt-0.5 font-black text-xs sm:text-sm">
                        {String(stepNum).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-0 pr-1">
                      {/* Serial Order & Source Metadata */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${
                          v.source === 'Bangla Coding Tutor'
                            ? 'text-rose-600 dark:text-rose-400'
                            : 'text-purple-600 dark:text-purple-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            v.source === 'Bangla Coding Tutor' ? 'bg-rose-500' : 'bg-purple-500'
                          } shrink-0`} />
                          {v.source}
                        </span>

                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                          {isFirst
                            ? '1st: Start Here'
                            : isLast
                            ? `Step ${stepNum}: Deep Dive`
                            : `Step ${stepNum}: Watch Next`}
                        </span>
                      </div>

                      {/* Video Title */}
                      <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors truncate mt-1">
                        {v.title}
                      </span>
                    </div>
                  </div>

                  {/* Watch CTA Button */}
                  <div className="watch-btn shrink-0 flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-[#ff0000] group-hover:bg-[#cc0000] active:scale-95 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-xs transition-all">
                    <Play className="w-3.5 h-3.5 fill-white text-white shrink-0" />
                    <span className="hidden sm:inline">Watch Lecture</span>
                    <span className="sm:hidden">Watch</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Special Nested Loop Pattern Lab Callout */}
      {isNestedLoopDay && onNavigateToPatterns && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 dark:border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 sm:mt-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                Pattern Programs Guide
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-extrabold border border-emerald-300 dark:border-emerald-800">
                  26 Patterns
                </span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-medium">
                Practice nested loops with 26 star, number, alphabet, and hollow patterns with logic and C source code.
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToPatterns}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-extrabold shrink-0 shadow-sm transition-all cursor-pointer"
          >
            <span>Open Pattern Lab</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3. Generous Space & Divider between Tutorial and Problems */}
      {hasVideos && (
        <div className="my-2 sm:my-3 border-t border-slate-200 dark:border-slate-800" />
      )}

      {/* 4. Related Problems Section */}
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-slate-900 dark:text-white flex items-center gap-2">
              <Code2 className="w-4.5 h-4.5 text-sky-600 dark:text-sky-400" />
              <span>Related Practice Problems</span>
            </span>
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
          </div>
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 shrink-0">
            {visibleProblems.length} Problems
          </span>
        </div>

        {/* Problem Cards Stack */}
        <div className="flex flex-col gap-3" role="list" aria-label={`${dayData.title} Problems`}>
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
