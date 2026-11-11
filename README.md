# SP Guidelines — C Programming & Problem Solving Bootcamp

[![Live Website](https://img.shields.io/badge/Live_Site-GitHub_Pages-2ea44f?style=for-the-badge&logo=github)](https://reza-05.github.io/sp_guidelines/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Problems](https://img.shields.io/badge/Problems-175_Curated-blueviolet?style=for-the-badge)](https://reza-05.github.io/sp_guidelines/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

A modern, high-performance web application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. Designed for beginners and university students transitioning from syntax learning to competitive problem solving in C.

Every day features targeted video lectures paired with exactly **5 practice problems** ($35 \times 5 = 175$ problems total) starting from **CodeChef 500+ rating** (up to 1150) and **Codeforces 800–1100 rating**.

---

## 🌟 Key Features

* **Interactive Problem Tracker:** Checkboxes save your progress in browser `localStorage` automatically with real-time percentage indicators.
* **Celebration Confetti:** Milestones (every 25 problems solved and 100% completion) trigger confetti animations.
* **🧩 Dedicated C Pattern Programs Lab (GeeksforGeeks Inspired):**
  * Direct access button right after nested loop modules (Day 15 & 16) and top navbar toggle.
  * **26 Complete Patterns** categorized into Star, Number, Alphabet, and Hollow shapes.
  * Real-time search, difficulty tags (Easy, Medium, Hard), and Category pills.
  * Terminal-styled monospace ASCII visual output previews ($n = 5$).
  * Step-by-step nested loop logic breakdown (Outer row loops, space alignment, and inner column loops).
  * Clean, easy-to-understand C source code with one-click **"Copy Code"** clipboard integration.
* **Instant Search & Multi-Filter:**
  * Search by problem name or platform code (e.g. `SPEEDTEST`, `1A`, `LAPIN`, `MISSP`).
  * Filter by **Week** (Weeks 1 to 5).
  * Filter by **Platform** (CodeChef 500+ vs. Codeforces 800–1100).
  * Filter by **Status** (Solved vs. Unsolved).
* **Balanced Daily Video Pacing:** Each day assigns 15–30 minutes of targeted video to prevent cognitive overload.
* **Dual Channel Curation:**
  * [Bangla Coding Tutor C Programming Playlist](https://youtube.com/playlist?list=PLdl6zXgLsy3zwNjSMiYlOZOr20sykTfgo) (Language syntax & fundamentals).
  * [Apna College C++ DSA Playlist](https://youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt) (Algorithmic problem-solving logic).
* **Spoiler-Free Descriptions:** No mathematical formula leaks or code hints—students must think through problem statements themselves.
* **Modern Developer Experience:** Full TypeScript typing (`types/curriculum.ts`), modular React components, Lucide icons, Dark/Light mode, and print-to-PDF support.

---

## 📅 35-Day Curriculum Structure (175 Problems)

### Week 1: Foundations, I/O, Conditionals & Branching (Days 01–07)
* **Day 01:** First Steps: Formatted Output & Structure of a C Program (`printf`, escape sequences)
* **Day 02:** Data Types, Variables & Memory Sizes (`int`, `long long`, format specifiers, overflow)
* **Day 03:** Floats, Double Precision & User Input (`scanf`, address operator `&`, `%f`, `%lf`)
* **Day 04:** Relational Operators & Basic `if-else` Decisions (`<`, `<=`, `>`, `>=`, `==`, `!=`)
* **Day 05:** Multi-Branch Decisions: `else if` Chains & Logical Operators (`&&`, `||`, `!`)
* **Day 06:** Nested Conditionals & Boundary Decision Trees (Interval logic & edge cases)
* **Day 07:** Switch-Case & State Transitions (`switch`, `case`, `break`, `default`, discrete states)

### Week 2: Loops, Number Theory & Primes (Days 08–14)
* **Day 08:** The `for` Loop: Step Increments & Counters
* **Day 09:** The `while` & `do-while` Loops (Indefinite iteration & post-tested loops)
* **Day 10:** Loop Control Flow: `break`, `continue` & Early Exits
* **Day 11:** Digit Extraction & Mathematical Simulation (`% 10`, `/ 10`, place values)
* **Day 12:** Number Theory: Divisors, Factors & Euclid's Algorithm (GCD & LCM)
* **Day 13:** Prime Numbers: Primality Check & Sieve Logic ($O(\sqrt{N})$ efficiency)
* **Day 14:** Loop Simulation & State Accumulation (Turn-based game simulation)

### Week 3: Patterns, Swapping, Bitwise & 1D Arrays (Days 15–21)
* **Day 15:** Pattern Printing Part 1: Nested Loops & Geometric Shapes (Triangles, pyramids)
* **Day 16:** Pattern Printing Part 2: Coordinate Logic & Number Grids (Diagonals, checkerboards)
* **Day 17:** Swapping Techniques & Variables in Memory (Temp variable, math $+/-$, bitwise XOR)
* **Day 18:** Bitwise Operations & Bitmasking Basics (`&`, `|`, `^`, `~`, `<<`, `>>`, parity)
* **Day 19:** 1D Arrays Part 1: Declaration, Indexing & Linear Search (0-based indexing, bounds)
* **Day 20:** 1D Arrays Part 2: Extremum Tracking (Min/Max) & Updates
* **Day 21:** 1D Arrays Part 3: In-Place Transformations & Shifts (In-place reversal, cyclic shifts)

### Week 4: Two Pointers, Frequency Arrays, Subsets & Matrices (Days 22–28)
* **Day 22:** Two-Pointers Technique on Arrays (Opposite-ends traversal `left`, `right`)
* **Day 23:** Frequency Arrays & Element Counting (Hash/bucket arrays in $O(1)$)
* **Day 24:** Subarrays & Contiguous Slices of Arrays (Sliding windows & contiguous runs)
* **Day 25:** Subsets of Arrays & Prefix Sums (Non-contiguous subsets & fast range sum queries)
* **Day 26:** 2D Arrays (Matrices) Part 1: Row & Column Traversal (`mat[R][C]` row-major order)
* **Day 27:** 2D Arrays (Matrices) Part 2: Diagonals, Symmetry & Transpose ($i == j$, $i + j == N - 1$)
* **Day 28:** 2D Arrays Part 3: Grid Simulation & Direction Vectors ($dx, dy$ movements)

### Week 5: Strings, Custom Functions, Pointers & Structures (Days 29–35)
* **Day 29:** Character Arrays & ASCII Fundamentals (Null terminator `\0`, ASCII arithmetic)
* **Day 30:** String Functions & Anagram Validation (`strlen`, `strcpy`, `strcmp`, frequency array)
* **Day 31:** 2D Character Arrays (Array of Strings) & Word Sorting (`char words[N][M]`)
* **Day 32:** 3D Arrays & Multi-Dimensional Representation (`int arr[L][R][C]`, voxel grids)
* **Day 33:** Custom Functions: Declarations, Parameters & Returns (Pass-by-value, modularity)
* **Day 34:** Pointers in C: Address (`&`), Dereference (`*`) & Pass-by-Reference (`void swap(int *a, int *b)`)
* **Day 35:** Dynamic Memory (`malloc`/`free`) & Structures (`struct`) in C (Array of structs, field sorting)

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/reza-05/sp_guidelines.git
cd sp_guidelines

# Install dependencies
npm install

# Start local dev server with HMR
npm run dev

# Build for production
npm run build
```

---

## 🌐 Deploying to GitHub Pages

1. Push your changes to the `main` branch on GitHub:
   ```bash
   git add .
   git commit -m "feat: complete Vite + React + TS + Tailwind app"
   git push -u origin main
   ```
2. In your GitHub repository:
   * Go to **Settings** > **Pages**.
   * Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) will automatically install dependencies, build the Vite app, and publish the live site at:
   ```
   https://reza-05.github.io/sp_guidelines/
   ```

---

## 📜 License

Distributed under the [MIT License](LICENSE).
EOF
