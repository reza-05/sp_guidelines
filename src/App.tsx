import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { curriculumData } from './data/curriculumData';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
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
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950 text-slate-900 dark:text-slate-100 py-6 px-3 sm:px-6 flex justify-center transition-colors">
      <div className="document-card w-full max-w-4xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl shadow-xl p-5 sm:p-10 flex flex-col gap-8 transition-colors">
        
        {/* Navigation Bar */}
        <Navbar
          currentView={currentView}
          onChangeView={handleChangeView}
          solvedCount={solvedCount}
          totalCount={TOTAL_PROBLEMS}
          isDark={isDark}
          onToggleTheme={() => setIsDark(prev => !prev)}
          onReset={handleResetProgress}
        />

        {/* Conditional Rendering based on current view */}
        {currentView === 'patterns' ? (
          <PatternLab onBackToCurriculum={() => handleChangeView('curriculum')} />
        ) : (
          <>
            {/* Header Section */}
            <Header />

            {/* Filters & Search */}
            <Filters
              search={search}
              onSearchChange={setSearch}
              weekFilter={weekFilter}
              onWeekChange={setWeekFilter}
              platformFilter={platformFilter}
              onPlatformChange={setPlatformFilter}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
            />

            {/* Curriculum Days List */}
            <main className="flex flex-col gap-6" aria-label="Curriculum content">
              {filteredDays.length === 0 ? (
                <div className="text-center py-16 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                  <SearchX className="w-12 h-12 stroke-[1.5] mb-2" />
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
                        <div className="bg-slate-900 dark:bg-gray-800 text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-between mt-3">
                          <span>{dayData.weekName}</span>
                          <span className="text-[11px] font-semibold text-slate-400">5 Problems Daily</span>
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
          </>
        )}

        {/* Footer */}
        <Footer />

      </div>
    </div>
  );
};

export default App;
