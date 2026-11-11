import React from 'react';
import { DayCurriculum, Problem } from '../types/curriculum';
import { ProblemRow } from './ProblemRow';
import { Play, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';

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

  // Day Solved Progress
  const totalDayProblems = dayData.problems.length;
  const solvedInThisDay = dayData.problems.filter(p => !!solvedMap[p.id]).length;
  const isDayCompleted = totalDayProblems > 0 && solvedInThisDay === totalDayProblems;

  return (
    <section
      id={`day${dayData.day}`}
      className={`day-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 transition-colors flex flex-col gap-3.5 ${dayData.theme}`}
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="day-badge w-10 h-10 rounded-lg flex items-center justify-center font-mono text-base font-bold text-white shrink-0">
            {dayNumStr}
          </div>
          <div>
            <h3 className="day-title text-base sm:text-lg font-bold tracking-tight leading-snug">
              {dayData.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {dayData.tagline}
            </p>
          </div>
        </div>

        {/* Day Completion Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium border ${
            isDayCompleted
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
          }`}>
            {isDayCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold">Completed (5/5)</span>
              </>
            ) : (
              <span className="font-mono">{solvedInThisDay} / {totalDayProblems} Solved</span>
            )}
          </div>
        </div>
      </div>

      {/* Video Strip with SOLID RED Watch Buttons matching Image 4 */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-950/50 p-2.5 border border-slate-200 dark:border-slate-800 rounded-lg">
        {dayData.bct && dayData.bct.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
              Bangla Coding Tutor
            </span>
            {dayData.bct.map(v => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-btn inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#ff0000] hover:bg-[#cc0000] active:scale-95 text-white font-bold text-xs rounded-md shadow-xs transition-all duration-150 shrink-0 cursor-pointer"
              >
                <Play className="w-2.5 h-2.5 fill-white text-white shrink-0" />
                <span>{v.title}</span>
              </a>
            ))}
          </div>
        )}

        {dayData.ac && dayData.ac.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-violet-100 dark:bg-violet-950/70 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-900">
              Apna College
            </span>
            {dayData.ac.map(v => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-btn inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#ff0000] hover:bg-[#cc0000] active:scale-95 text-white font-bold text-xs rounded-md shadow-xs transition-all duration-150 shrink-0 cursor-pointer"
              >
                <Play className="w-2.5 h-2.5 fill-white text-white shrink-0" />
                <span>{v.title}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Special Nested Loop Pattern Lab Callout */}
      {isNestedLoopDay && onNavigateToPatterns && (
        <div className="p-3.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-300/80 dark:border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-2">
                Pattern Programs Guide
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors"
          >
            <span>Open Pattern Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Problem Cards Stack */}
      <div className="flex flex-col gap-2" role="list" aria-label={`${dayData.title} Problems`}>
        {visibleProblems.map(problem => (
          <ProblemRow
            key={problem.id}
            problem={problem}
            isSolved={!!solvedMap[problem.id]}
            onToggle={onToggleProblem}
          />
        ))}
      </div>
    </section>
  );
};
