import React from 'react';
import { DayCurriculum, Problem } from '../types/curriculum';
import { ProblemRow } from './ProblemRow';
import { Play } from 'lucide-react';

interface DayCardProps {
  dayData: DayCurriculum;
  visibleProblems: Problem[];
  solvedMap: Record<string, boolean>;
  onToggleProblem: (id: string) => void;
}

export const DayCard: React.FC<DayCardProps> = ({
  dayData,
  visibleProblems,
  solvedMap,
  onToggleProblem
}) => {
  const dayNumStr = String(dayData.day).padStart(2, '0');

  return (
    <section className={`day-card flex flex-col gap-3 pt-5 border-t border-dashed border-slate-200 dark:border-gray-800 first:border-t-0 first:pt-0 ${dayData.theme}`} id={`day${dayData.day}`}>
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="day-badge w-11 h-11 rounded-xl flex items-center justify-center text-lg font-black text-white shrink-0 shadow-sm">
          {dayNumStr}
        </div>
        <div className="flex flex-col">
          <h3 className="day-title text-base sm:text-lg font-extrabold tracking-tight leading-snug">
            {dayData.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {dayData.tagline}
          </p>
        </div>
      </div>

      {/* Video Strip with RED Watch Buttons */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-gray-900/60 p-2.5 sm:p-3 border border-slate-200 dark:border-gray-800 rounded-lg">
        {dayData.bct && dayData.bct.length > 0 && (
          <>
            <span className="text-[10px] font-extrabold uppercase px-2 py-1 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
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
          </>
        )}

        {dayData.ac && dayData.ac.length > 0 && (
          <>
            <span className="text-[10px] font-extrabold uppercase px-2 py-1 rounded bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-900">
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
          </>
        )}
      </div>

      {/* Data Table */}
      <div
        className="overflow-x-auto border border-slate-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 focus-visible:outline-2 focus-visible:outline-sky-500"
        role="region"
        tabIndex={0}
        aria-label={`${dayData.title} Problems Table`}
      >
        <table className="w-full border-collapse text-left text-xs sm:text-sm">
          <tbody>
            {visibleProblems.map(problem => (
              <ProblemRow
                key={problem.id}
                problem={problem}
                isSolved={!!solvedMap[problem.id]}
                onToggle={onToggleProblem}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
