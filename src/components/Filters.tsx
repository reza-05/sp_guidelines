import React from 'react';
import { Search, X } from 'lucide-react';

interface FiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  weekFilter: string;
  onWeekChange: (week: string) => void;
  platformFilter: string;
  onPlatformChange: (platform: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  search,
  onSearchChange,
  weekFilter,
  onWeekChange,
  platformFilter,
  onPlatformChange,
  statusFilter,
  onStatusChange
}) => {
  return (
    <div className="flex flex-col gap-3 bg-slate-50 dark:bg-gray-900/60 p-3 sm:p-4 border border-slate-200 dark:border-gray-800 rounded-xl no-print">
      {/* Search Input */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search problems by name or code (e.g. SPEEDTEST, 1A, LAPIN, Array)..."
          className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-lg bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
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

      {/* Week Filters */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-extrabold uppercase text-slate-400 dark:text-slate-500 mr-1">Weeks:</span>
        {[
          { id: 'all', label: 'All' },
          { id: '1', label: 'W1: Syntax' },
          { id: '2', label: 'W2: Loops' },
          { id: '3', label: 'W3: Arrays' },
          { id: '4', label: 'W4: Matrices' },
          { id: '5', label: 'W5: Pointers & Structs' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => onWeekChange(item.id)}
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition ${
              weekFilter === item.id
                ? 'bg-sky-600 border-sky-600 text-white'
                : 'bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 text-slate-700 dark:text-slate-300 hover:border-sky-500'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Platform & Status Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-extrabold uppercase text-slate-400 dark:text-slate-500 mr-1">Platform:</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'CodeChef', label: 'CodeChef (500+)' },
            { id: 'Codeforces', label: 'Codeforces (800-1100)' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => onPlatformChange(item.id)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition ${
                platformFilter === item.id
                  ? 'bg-sky-600 border-sky-600 text-white'
                  : 'bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 text-slate-700 dark:text-slate-300 hover:border-sky-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:ml-auto">
          <span className="text-[11px] font-extrabold uppercase text-slate-400 dark:text-slate-500 mr-1">Status:</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'solved', label: 'Solved' },
            { id: 'unsolved', label: 'Unsolved' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => onStatusChange(item.id)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition ${
                statusFilter === item.id
                  ? 'bg-sky-600 border-sky-600 text-white'
                  : 'bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 text-slate-700 dark:text-slate-300 hover:border-sky-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
