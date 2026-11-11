import React from 'react';
import {
  Compass,
  Keyboard,
  ShieldAlert,
  Video,
  Globe,
  GraduationCap,
  Users2,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface InstructionsProps {
  onNavigateToCurriculum: () => void;
}

export const Instructions: React.FC<InstructionsProps> = ({ onNavigateToCurriculum }) => {
  return (
    <div className="flex flex-col gap-6 animate-fadeIn w-full max-w-[1200px] mx-auto">
      {/* Top Breadcrumb & Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onNavigateToCurriculum}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer shadow-2xs"
        >
          <ArrowRight className="w-4 h-4 text-sky-600 dark:text-sky-400 rotate-180" />
          <span>← Back to Curriculum</span>
        </button>

        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
          Structured Programming Guidelines
        </span>
      </div>

      {/* Main Hero Header */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-slate-800 shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/60 inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Orientation & Rules
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            7 Essential Guidelines
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Important Guidelines
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-medium">
          Welcome! Before you begin the 35-day roadmap, please read these instructions carefully. Following these habits will help you build solid programming intuition, excel in the Structured Programming (SP) Lab, and develop real problem-solving confidence.
        </p>
      </div>

      {/* Guidelines Grid */}
      <div className="flex flex-col gap-4">
        {/* 1. Target Audience */}
        <section className="bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-md transition-all flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Rule 01
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Who This Roadmap Is For
              </h2>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed pl-1">
            These curated tutorials and problem sets are specifically designed for beginners who are taking their first steps in C programming, preparing for the Structured Programming (SP) Lab, or building problem-solving intuition from scratch. If you already have a strong grasp of fundamentals and active competitive programming experience, feel free to skip this roadmap and focus directly on <span className="font-bold text-slate-900 dark:text-white">Codeforces</span> and <span className="font-bold text-slate-900 dark:text-white">AtCoder</span>.
          </p>
        </section>

        {/* 2. Build Muscle Memory */}
        <section className="bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-md transition-all flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Rule 02
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Build True Muscle Memory (Avoid IDE Autocomplete)
              </h2>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed pl-1">
            If you still hesitate with C syntax, <span className="font-bold text-slate-900 dark:text-white">type every single line of code yourself from scratch</span>. Do not rely on IDE auto-completions (e.g., typing <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs font-bold text-slate-800 dark:text-slate-200">prin</code> and pressing Tab or Enter). You must build muscle memory for every semicolon, format specifier, and curly brace so that basic syntax never slows down your algorithmic thinking during timed exams or contests.
          </p>
        </section>

        {/* 3. Strict Zero-Tolerance AI Policy (Highlighted) */}
        <section className="bg-rose-50/40 dark:bg-rose-950/20 border-2 border-rose-300 dark:border-rose-800/80 rounded-2xl p-5 sm:p-6 shadow-md flex flex-col gap-3 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-black uppercase tracking-wider text-rose-700 dark:text-rose-400">
                  Critical Rule 03
                </span>
                <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-full bg-rose-600 text-white uppercase">
                  Zero Tolerance
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-rose-950 dark:text-rose-200">
                Strict AI Policy & IUTCS Contest Regulations
              </h2>
            </div>
          </div>
          <div className="text-sm sm:text-base text-rose-950 dark:text-rose-100 font-medium leading-relaxed space-y-2 pl-1">
            <p>
              <strong className="text-rose-700 dark:text-rose-300 font-black">NEVER use generative AI (ChatGPT, Claude, Copilot, Gemini, etc.) to generate solutions or write code for you.</strong>
            </p>
            <p>
              You may use AI strictly as a conceptual tutor to explain difficult theory or dry-run your thought process, but never to solve a problem. Be strictly mindful of the IUTCS competitive programming regulations:
            </p>
            <div className="p-3.5 rounded-xl bg-white dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 font-mono text-xs sm:text-sm text-rose-900 dark:text-rose-200 font-bold leading-relaxed">
              ⚠ If you are caught using AI in any intra- or inter-university contest (online or offline), you will be immediately and permanently banned from IUTCS programming activities, and you will never be allowed to participate in any competitive programming contest again.
            </div>
            <p className="text-xs sm:text-sm text-rose-800 dark:text-rose-300">
              Build honest, resilient problem-solving skills right now—shortcuts will only destroy your genuine intellect and career foundation.
            </p>
          </div>
        </section>

        {/* 4. Curated Playlists & C Language Rule */}
        <section className="bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-md transition-all flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-red-600 dark:text-red-400">
                Rule 04
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Curated Video Playlists & C Implementation
              </h2>
            </div>
          </div>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed pl-1 space-y-2">
            <p>
              The two featured video series (<span className="font-bold text-slate-900 dark:text-white">Bangla Coding Tutor</span> and <span className="font-bold text-slate-900 dark:text-white">Apna College</span>) are the exact resources I personally relied on when I was a beginner. You are welcome to explore other channels as well, as long as you learn each topic thoroughly.
            </p>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-semibold flex items-start gap-2">
              <span className="font-black shrink-0">⚡ Special Rule for Apna College:</span>
              <span>Use Apna College strictly to understand algorithmic logic, loop dry-running, and pattern thinking. <strong className="font-bold">Do not code with C++ yet</strong> (ignore features like <code className="font-mono text-xs">std::vector</code>, <code className="font-mono text-xs">cin/cout</code>, or STL)—implement every solution in standard C.</span>
            </div>
          </div>
        </section>

        {/* 5. Online Learning Resources (GFG, W3Schools, Stack Overflow) */}
        <section className="bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-md transition-all flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Rule 05
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Reliable Online Documentation & Resources
              </h2>
            </div>
          </div>
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed pl-1 space-y-2">
            <p>
              Whenever you need syntax clarification, library reference, or conceptual depth, make good use of top online resources like <span className="font-bold text-emerald-600 dark:text-emerald-400">GeeksforGeeks</span>, <span className="font-bold text-emerald-600 dark:text-emerald-400">W3Schools</span>, and <span className="font-bold text-emerald-600 dark:text-emerald-400">Stack Overflow</span>.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Learning how to read technical documentation, search error messages, and understand debugging discussions on Stack Overflow is an indispensable skill for every developer and problem solver.
            </p>
          </div>
        </section>

        {/* 6. Moniruzzaman Sir's Class Preparation */}
        <section className="bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-md transition-all flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Rule 06
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Ace Moniruzzaman Sir's Lectures
              </h2>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed pl-1">
            Pay 100% undivided attention during <span className="font-bold text-slate-900 dark:text-white">Moniruzzaman Sir's</span> classes. A highly effective habit is to preview the relevant topic from YouTube the night before the lecture—it will make classroom discussions and lab exercises infinitely easier to understand, implement, and excel at.
          </p>
        </section>

        {/* 7. Wednesday Training & Senior Mentorship */}
        <section className="bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-md transition-all flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
              <Users2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Rule 07
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Wednesday IUTCS Training & Senior Mentorship
              </h2>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed pl-1">
            If you are enthusiastic about competitive programming, make it a priority to attend the <span className="font-bold text-slate-900 dark:text-white">IUTCS Programming Training sessions every Wednesday</span>. Never hesitate to communicate with and ask questions to your seniors—we have all walked through the exact same initial struggles and are always ready to guide you.
          </p>
        </section>
      </div>

      {/* Motivational Bottom CTA */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 my-4">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-white">
            Ready to Build Your Fundamentals?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-medium leading-relaxed">
            Best wishes on your journey! Consistent daily practice will build an unbreakable base in C and help you excel in your SP Lab. Let's start solving!
          </p>
        </div>
        <button
          onClick={onNavigateToCurriculum}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-sm transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
        >
          <span>Start Curriculum</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
