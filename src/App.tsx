import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { curriculumData } from './data/curriculumData';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { TopFilterBar } from './components/TopFilterBar';
import { DayCard } from './components/DayCard';
import { PatternLab } from './components/PatternLab';
import { Instructions } from './components/Instructions';
import { InstructionPopup } from './components/InstructionPopup';
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

  // Navigation View state ('curriculum' | 'patterns' | 'instructions')
  const [currentView, setCurrentView] = useState<'curriculum' | 'patterns' | 'instructions'>(() => {
    if (window.location.hash.startsWith('#patterns')) return 'patterns';
    if (window.location.hash.startsWith('#instructions') || window.location.hash.startsWith('#guidelines')) return 'instructions';
    return 'curriculum';
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
  const [moduleFilter, setModuleFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Handle URL Hash Synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#patterns')) {
        setCurrentView('patterns');
      } else if (hash.startsWith('#instructions') || hash.startsWith('#guidelines')) {
        setCurrentView('instructions');
      } else if (hash.startsWith('#curriculum') || hash === '') {
        setCurrentView('curriculum');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle Switching View
  const handleChangeView = (view: 'curriculum' | 'patterns' | 'instructions') => {
    setCurrentView(view);
    if (view === 'patterns') {
      window.location.hash = '#patterns';
    } else if (view === 'instructions') {
      window.location.hash = '#instructions';
    } else {
      window.location.hash = '#curriculum';
    }
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
      const isMarkingAsSolved = !prev[id];
      const next = { ...prev, [id]: isMarkingAsSolved };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

      // Trigger celebration ONLY when marking a problem as SOLVED (never when unchecking)
      if (isMarkingAsSolved) {
        // Check if all problems in this day are now completed
        const parentDay = curriculumData.find(d => d.problems.some(p => p.id === id));
        const dayProblems = parentDay ? parentDay.problems : [];
        const isDayNowCompleted = dayProblems.length > 0 && dayProblems.every(p => !!next[p.id]);

        if (isDayNowCompleted) {
          // Grand celebration burst when completing all 5 problems of a day
          confetti({
            particleCount: 110,
            spread: 70,
            ticks: 250,
            gravity: 1.0,
            origin: { y: 0.6 }
          });
        } else {
          // Instant satisfying celebration burst when marking a problem as solved
          confetti({
            particleCount: 40,
            spread: 50,
            ticks: 180,
            gravity: 1.1,
            decay: 0.94,
            startVelocity: 28,
            origin: { y: 0.72 }
          });
        }
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
        // Module filter
        if (moduleFilter !== 'all' && String(day.module) !== moduleFilter) {
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
  }, [search, moduleFilter, platformFilter, statusFilter, solvedMap]);

  // Group by module for section banners
  let currentModule = '';

  return (
    <div className="min-h-screen bg-white dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors flex flex-col font-sans antialiased">
      {/* First-visit slide-down prompt for instructions */}
      <InstructionPopup
        currentView={currentView}
        onOpenInstructions={() => handleChangeView('instructions')}
      />

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

      {/* Main Container: Wide, Spacious Layout */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 flex-1 flex flex-col gap-6">
        {currentView === 'patterns' ? (
          <PatternLab onBackToCurriculum={() => handleChangeView('curriculum')} />
        ) : currentView === 'instructions' ? (
          <Instructions onNavigateToCurriculum={() => handleChangeView('curriculum')} />
        ) : (
          <main className="flex flex-col gap-6" aria-label="Curriculum content">
            <Header />

            {/* Clean Top Filter & Progress Controls */}
            <TopFilterBar
              solvedMap={solvedMap}
              totalProblems={TOTAL_PROBLEMS}
              search={search}
              onSearchChange={setSearch}
              moduleFilter={moduleFilter}
              onModuleChange={setModuleFilter}
              platformFilter={platformFilter}
              onPlatformChange={setPlatformFilter}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              onNavigateToPatterns={() => handleChangeView('patterns')}
            />

              {/* Active Filter Pill Bar */}
              {(moduleFilter !== 'all' || platformFilter !== 'all' || statusFilter !== 'all' || search) && (
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-white dark:bg-[#0C1017] border border-slate-200/90 dark:border-slate-800/90 shadow-2xs text-xs">
                  <div className="flex flex-wrap items-center gap-1.5 text-slate-800 dark:text-slate-200">
                    <span className="font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">Active Filters:</span>
                    {moduleFilter !== 'all' && (
                      <span className="px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/25 font-bold">
                        Module {moduleFilter}
                      </span>
                    )}
                    {platformFilter !== 'all' && (
                      <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/25 font-bold">
                        {platformFilter}
                      </span>
                    )}
                    {statusFilter !== 'all' && (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 font-bold uppercase">
                        {statusFilter}
                      </span>
                    )}
                    {search && (
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold">
                        "{search}"
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setModuleFilter('all');
                      setPlatformFilter('all');
                      setStatusFilter('all');
                      setSearch('');
                    }}
                    className="font-bold text-xs text-rose-600 dark:text-rose-400 hover:underline px-2 py-1 rounded-md transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Days List */}
              {filteredDays.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 bg-white dark:bg-[#0C1017] rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
                  <SearchX className="w-12 h-12 stroke-[1.5] mb-3 text-slate-300 dark:text-slate-600" />
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No matching problems found</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                    Try adjusting your search query, or clear your platform and status filters to see more days.
                  </p>
                  <button
                    onClick={() => {
                      setModuleFilter('all');
                      setPlatformFilter('all');
                      setStatusFilter('all');
                      setSearch('');
                    }}
                    className="mt-4 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold shadow-xs hover:bg-slate-800 transition"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                filteredDays.map(({ dayData, visibleProblems }) => {
                  const showModuleBanner = dayData.moduleName !== currentModule;
                  const isFirstModule = currentModule === '';
                  if (showModuleBanner) {
                    currentModule = dayData.moduleName;
                  }

                  // Module stats for the banner
                  const moduleDays = curriculumData.filter(d => d.module === dayData.module);
                  const totalModuleProblems = moduleDays.reduce((acc, d) => acc + d.problems.length, 0);
                  const solvedModuleProblems = moduleDays.reduce(
                    (acc, d) => acc + d.problems.filter(p => !!solvedMap[p.id]).length,
                    0
                  );
                  const firstDayOfModule = moduleDays[0]?.day || dayData.day;
                  const lastDayOfModule = moduleDays[moduleDays.length - 1]?.day || dayData.day;
                  const dayRangeStr = `Days ${String(firstDayOfModule).padStart(2, '0')}–${String(lastDayOfModule).padStart(2, '0')}`;
                  const modulePct = totalModuleProblems > 0 ? Math.round((solvedModuleProblems / totalModuleProblems) * 100) : 0;

                  return (
                    <React.Fragment key={dayData.day}>
                      {showModuleBanner && (
                        <div className={`w-full flex flex-col ${isFirstModule ? 'mt-1 mb-2' : 'pt-14 sm:pt-20 mt-6 mb-3'}`}>
                          {/* Generous spacing & transition divider when a previous module ends */}
                          {!isFirstModule && (
                            <div className="w-full flex items-center gap-4 pb-6">
                              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
                              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-500 dark:text-slate-400 shadow-2xs">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Module Milestone</span>
                                <span className="text-slate-300 dark:text-slate-600">•</span>
                                <span className="text-slate-800 dark:text-slate-200 font-black">Next Module Begins</span>
                              </div>
                              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
                            </div>
                          )}

                          {/* Upgraded Modern Module Banner */}
                          <div className="bg-slate-900 dark:bg-[#0E131F] text-white p-5 sm:p-6 rounded-3xl shadow-md border border-slate-800 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3.5 min-w-0">
                              <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center font-mono font-black text-base shadow-sm shrink-0">
                                M{dayData.module}
                              </span>
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-xs font-mono font-black uppercase tracking-wider text-sky-400">
                                    Module {dayData.module}
                                  </span>
                                  <span className="text-slate-500">•</span>
                                  <span className="text-xs font-mono text-slate-300 font-bold">
                                    {dayRangeStr} ({totalModuleProblems} Problems)
                                  </span>
                                </div>
                                <h2 className="font-black text-base sm:text-lg md:text-xl tracking-tight text-white mt-0.5 truncate">
                                  {dayData.moduleName}
                                </h2>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 shrink-0 self-start sm:self-center">
                              <div className="text-right">
                                <div className="text-xs font-mono font-bold text-slate-300">
                                  {solvedModuleProblems} / {totalModuleProblems} Solved ({modulePct}%)
                                </div>
                                <div className="w-32 sm:w-40 h-2 bg-slate-800 rounded-full mt-1.5 overflow-hidden border border-slate-700/50">
                                  <div
                                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                                    style={{ width: `${modulePct}%` }}
                                  />
                                </div>
                              </div>
                              {modulePct === 100 && (
                                <span className="hidden sm:inline-flex px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
                                  Completed ✓
                                </span>
                              )}
                            </div>
                          </div>
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
        )}

        {/* Global Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
