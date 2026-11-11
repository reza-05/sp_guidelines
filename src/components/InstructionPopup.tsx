import React, { useState, useEffect } from 'react';
import { BookOpen, X, ArrowRight } from 'lucide-react';

const STORAGE_KEY = 'sp_guidelines_first_visit_prompt_seen';

interface InstructionPopupProps {
  onOpenInstructions: () => void;
  currentView: 'curriculum' | 'patterns' | 'instructions';
}

export const InstructionPopup: React.FC<InstructionPopupProps> = ({
  onOpenInstructions,
  currentView
}) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    // If the user already dismissed or saw it before, never show again
    const hasSeen = localStorage.getItem(STORAGE_KEY);
    if (hasSeen === 'true') {
      return;
    }

    // If user lands directly on instructions page, mark as seen
    if (currentView === 'instructions') {
      localStorage.setItem(STORAGE_KEY, 'true');
      return;
    }

    // Delay slightly for smooth page entrance, then slide down
    const timer = setTimeout(() => {
      setShow(true);
    }, 700);

    return () => clearTimeout(timer);
  }, [currentView]);

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleRead = () => {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, 'true');
    onOpenInstructions();
  };

  if (!show) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl transition-all duration-300"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/95 dark:bg-[#0C1017]/95 backdrop-blur-md border-2 border-sky-500/40 dark:border-sky-500/40 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.25)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.7)] p-4 sm:p-5">
        {/* Subtle accent glow line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500" />

        <div className="flex items-start gap-3.5 sm:gap-4">
          {/* Icon Badge with gentle pulse */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-sky-500/15 dark:bg-sky-500/25 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30 shadow-xs mt-0.5">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </div>

          {/* Text & Actions */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 pr-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30">
                  New Here?
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  Read our guidelines before solving problems!
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-medium">
              Review our learning strategy, strict no-AI policy, and mentor advice to build strong C programming fundamentals.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 mt-3.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <button
                onClick={handleRead}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <span>Read Guidelines</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={handleDismiss}
                className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>

          {/* Close X Button in top corner */}
          <button
            onClick={handleDismiss}
            aria-label="Close notification"
            className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
