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

    // Delay slightly for smooth page entrance, then slide down safely below navbar
    const timer = setTimeout(() => {
      setShow(true);
    }, 600);

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
      className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-[60] w-[92%] sm:w-[540px] max-w-[95vw] transition-all duration-300 drop-shadow-2xl"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/95 dark:bg-[#0C1017]/95 backdrop-blur-xl border border-sky-500/40 dark:border-sky-500/40 shadow-2xl p-4 sm:p-5">
        {/* Subtle accent glow line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500" />

        <div className="flex items-start gap-3 sm:gap-4">
          {/* Icon Badge */}
          <div className="w-10 h-10 rounded-xl bg-sky-500/15 dark:bg-sky-500/25 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30 shadow-xs mt-0.5">
            <BookOpen className="w-5 h-5 stroke-[2.2]" />
          </div>

          {/* Text & Actions */}
          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30">
                Notice
              </span>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                Read guidelines before starting!
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-medium">
              Please review our recommended learning methods, strict no-AI policy, and class guidelines before you start solving.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
              <button
                onClick={handleRead}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <span>Read Guidelines</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
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
