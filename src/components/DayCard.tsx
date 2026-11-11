import React from 'react';
import { DayCurriculum, Problem } from '../types/curriculum';
import { ProblemRow } from './ProblemRow';
import { Play, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

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
  const isNestedLoopDay = dayData.day === 15 || dayData.day === 16;

  // Day Solved Progress
  const totalDayProblems = dayData.problems.length;
  const solvedInThisDay = dayData.problems.filter(p => !!solvedMap[p.id]).length;
  const isDayCompleted = totalDayProblems > 0 && solvedInThisDay === totalDayProblems;

  return (
    <section
      id={`day${dayData.day}`}
      className={`day-card bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 sm:p-6 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col gap-4 ${dayData.theme}`}
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="day-badge w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black text-white shrink-0 shadow-md">
            {dayNumStr}
          </div>
          <div>
            <h3 className="day-title text-base sm:text-lg font-extrabold tracking-tight leading-snug">
              {dayData.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {dayData.tagline}
            </p>
          </div>
        </div>

        {/* Day Completion Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
            isDayCompleted
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}>
            {isDayCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Day Completed! (5/5)</span>
              </>
            ) : (
              <span>{solvedInThisDay} / {totalDayProblems} Solved</span>
            )}
          </div>
        </div>
      </div>

      {/* Video Strip with RED Watch Buttons */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-950/60 p-3 border border-slate-200/80 dark:border-slate-800/80 rounded-xl">
        {dayData.bct && dayData.bct.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
              Bangla Coding Tutor
            </span>
            {dayData.bct.map(v => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-btn"
              >
                <Play className="w-2.5 h-2.5 fill-white stroke-none" />
                {v.title}
              </a>
            ))}
          </div>
        )}

        {dayData.ac && dayData.ac.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded bg-violet-100 dark:bg-violet-950/70 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-900">
              Apna College
            </span>
            {dayData.ac.map(v => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-btn"
              >
                <Play className="w-2.5 h-2.5 fill-white stroke-none" />
                {v.title}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Special Nested Loop Pattern Lab Callout */}
      {isNestedLoopDay && onNavigateToPatterns && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10 border-2 border-emerald-500/40 dark:border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-emerald-950 dark:text-emerald-200 flex items-center gap-2">
                C Pattern Programs Lab (GeeksforGeeks Curated)
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                  26 Patterns
                </span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                Mastered nested loop iterations? Explore 26 visual star, number, alphabet &amp; hollow pattern programs with ASCII previews and easy C code.
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToPatterns}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs font-bold shrink-0 transition-all shadow-md shadow-emerald-600/20"
          >
            <span>Open Pattern Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Problem Cards Stack (Modern Responsive List) */}
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
    </section>
  );
};
