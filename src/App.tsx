import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { curriculumData } from './data/curriculumData';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DayCard } from './components/DayCard';
import { PatternLab } from './components/PatternLab';
import { Footer } from './components/Footer';
import { SearchX } from 'lucide-react';

const STORAGE_KEY = 'sp_guidelines_progress';
const THEME_KEY = 'sp_guidelines_theme';
const TOTAL_PROBLEMS = 175;

export const App: React.FC = () => {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem(THEME_KEY) === 'dark';
  });

  // Navigation View state ('curriculum' | 'patterns')
  const [currentView, setCurrentView] = useState<'curriculum' | 'patterns'>(() => {
    return window.location.hash.startsWith('#patterns') ? 'patterns' : 'curriculum';
  });

  // Progress state
  const [solvedMap, setSolvedMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Filter states
  const [search, setSearch] = useState<string>('');
  const [weekFilter, setWeekFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Handle URL Hash Synchronization
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.startsWith('#patterns')) {
        setCurrentView('patterns');
      } else if (window.location.hash.startsWith('#curriculum') || window.location.hash === '') {
        setCurrentView('curriculum');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle Switching View
  const handleChangeView = (view: 'curriculum' | 'patterns') => {
    setCurrentView(view);
    window.location.hash = view === 'patterns' ? '#patterns' : '#curriculum';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [isDark]);

  // Handle Solved Toggle
  const handleToggleProblem = (id: string) => {
    setSolvedMap(prev => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

      // Trigger confetti on progress milestone!
      const count = Object.values(next).filter(Boolean).length;
      if (count === TOTAL_PROBLEMS || count % 25 === 0) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 }
        });
      }

      return next;
    });
  };

  // Reset Progress
  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all your problem solving progress?')) {
      setSolvedMap({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const solvedCount = useMemo(() => {
    return Object.values(solvedMap).filter(Boolean).length;
  }, [solvedMap]);

  // Filtered curriculum days
  const filteredDays = useMemo(() => {
    const q = search.trim().toLowerCase();

    return curriculumData
      .map(day => {
        // Week filter
        if (weekFilter !== 'all' && String(day.week) !== weekFilter) {
          return null;
        }

        // Filter individual problems
        const matchingProblems = day.problems.filter(p => {
          // Platform filter
          if (platformFilter !== 'all' && p.platform !== platformFilter) {
            return false;
          }

          // Status filter
          const isSolved = !!solvedMap[p.id];
          if (statusFilter === 'solved' && !isSolved) return false;
          if (statusFilter === 'unsolved' && isSolved) return false;

          // Search query
          if (q) {
            const inTitle = p.title.toLowerCase().includes(q);
            const inNumId = p.numId.toLowerCase().includes(q);
            const inDesc = p.desc.toLowerCase().includes(q);
            const inBadge = p.badgeText.toLowerCase().includes(q);
            if (!inTitle && !inNumId && !inDesc && !inBadge) {
              return false;
            }
          }

          return true;
        });

        if (matchingProblems.length === 0) return null;

        return {
          dayData: day,
          visibleProblems: matchingProblems
        };
      })
      .filter((item): item is { dayData: typeof curriculumData[0]; visibleProblems: typeof curriculumData[0]['problems'] } => item !== null);
  }, [search, weekFilter, platformFilter, statusFilter, solvedMap]);

  // Group by week for section banners
  let currentWeek = '';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors flex flex-col font-sans antialiased">
      {/* Full-Width Modern Navbar */}
      <Navbar
        currentView={currentView}
        onChangeView={handleChangeView}
        solvedCount={solvedCount}
        totalCount={TOTAL_PROBLEMS}
        isDark={isDark}
        onToggleTheme={() => setIsDark(prev => !prev)}
        onReset={handleResetProgress}
      />

      {/* Main Container: Full Screen / 1600px Max-Width with Fluid Layout */}
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 flex flex-col gap-8">
        {currentView === 'patterns' ? (
          <PatternLab onBackToCurriculum={() => handleChangeView('curriculum')} />
        ) : (
          <div className="lg:grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Sticky Sidebar on Desktop */}
            <div className="lg:col-span-4 xl:col-span-3.5 mb-6 lg:mb-0">
              <Sidebar
                solvedMap={solvedMap}
                totalProblems={TOTAL_PROBLEMS}
                search={search}
                onSearchChange={setSearch}
                weekFilter={weekFilter}
                onWeekChange={setWeekFilter}
                platformFilter={platformFilter}
                onPlatformChange={setPlatformFilter}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                onNavigateToPatterns={() => handleChangeView('patterns')}
              />
            </div>

            {/* Right Main Content Area */}
            <main className="lg:col-span-8 xl:col-span-8.5 flex flex-col gap-6" aria-label="Curriculum content">
              <Header />

              {/* Active Filter Pill Bar (When filters are applied) */}
              {(weekFilter !== 'all' || platformFilter !== 'all' || statusFilter !== 'all' || search) && (
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5 text-sky-900 dark:text-sky-200">
                    <span className="font-extrabold">Active Filters:</span>
                    {weekFilter !== 'all' && (
                      <span className="px-2 py-0.5 rounded-md bg-sky-200 dark:bg-sky-900 font-bold">Week {weekFilter}</span>
                    )}
                    {platformFilter !== 'all' && (
                      <span className="px-2 py-0.5 rounded-md bg-sky-200 dark:bg-sky-900 font-bold">{platformFilter}</span>
                    )}
                    {statusFilter !== 'all' && (
                      <span className="px-2 py-0.5 rounded-md bg-sky-200 dark:bg-sky-900 font-bold uppercase">{statusFilter}</span>
                    )}
                    {search && (
                      <span className="px-2 py-0.5 rounded-md bg-sky-200 dark:bg-sky-900 font-bold">"{search}"</span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setWeekFilter('all');
                      setPlatformFilter('all');
                      setStatusFilter('all');
                      setSearch('');
                    }}
                    className="font-bold text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Days List */}
              {filteredDays.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 bg-white/60 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <SearchX className="w-12 h-12 stroke-[1.5] mb-2 text-slate-400" />
                  <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">No matching problems found</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Try clearing your search query or adjusting your filters.
                  </p>
                </div>
              ) : (
                filteredDays.map(({ dayData, visibleProblems }) => {
                  const showWeekBanner = dayData.weekName !== currentWeek;
                  if (showWeekBanner) {
                    currentWeek = dayData.weekName;
                  }

                  return (
                    <React.Fragment key={dayData.day}>
                      {showWeekBanner && (
                        <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-between shadow-sm mt-3">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-sky-400" />
                            {dayData.weekName}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-300 dark:text-slate-400">
                            5 Problems Daily
                          </span>
                        </div>
                      )}

                      <DayCard
                        dayData={dayData}
                        visibleProblems={visibleProblems}
                        solvedMap={solvedMap}
                        onToggleProblem={handleToggleProblem}
                        onNavigateToPatterns={() => handleChangeView('patterns')}
                      />
                    </React.Fragment>
                  );
                })
              )}
            </main>
          </div>
        )}

        {/* Global Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
