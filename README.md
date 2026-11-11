# SP Guidelines — C Programming & Problem Solving

[![Live Website](https://img.shields.io/badge/Live_Site-GitHub_Pages-2ea44f?style=for-the-badge&logo=github)](https://reza-05.github.io/sp_guidelines/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Problems](https://img.shields.io/badge/Problems-175_Curated-blueviolet?style=for-the-badge)](https://reza-05.github.io/sp_guidelines/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

A structured problem-solving web application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. Designed for university students and developers transitioning from syntax learning to competitive programming in C.

Every day pairs targeted video lectures with exactly **5 practice problems** ($35 \times 5 = 175$ problems total) starting from **CodeChef 500+ rating** (up to 1150) and **Codeforces 800–1100 rating**.

---

## Key Features

* **Interactive Tracker:** Checkboxes save your progress in browser `localStorage` automatically with real-time percentage indicators.
* **C Pattern Programs Lab (26 Patterns):**
  * Dedicated reference guide for Star, Number, Alphabet, and Hollow patterns based on standard GeeksforGeeks problems.
  * Direct access button in Module 3 (Days 14–17) and top navigation bar.
  * Monospace terminal-style output previews ($n = 5$), row-column logic breakdown, and clean C code with one-click copy.
* **Filter & Search System:**
  * Search by problem name or platform code (e.g. `SPEEDTEST`, `1A`, `LAPIN`, `FLOW014`).
  * Filter by **Module** (Modules 1 to 7).
  * Filter by **Platform** (CodeChef 500+ vs. Codeforces 800–1100).
  * Filter by **Status** (Solved vs. Unsolved).
* **Dual Playlist Video Curation:**
  * [Bangla Coding Tutor C Programming Playlist](https://youtube.com/playlist?list=PLdl6zXgLsy3zwNjSMiYlOZOr20sykTfgo) (Language syntax & fundamentals).
  * [Apna College C++ DSA Playlist](https://youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt) (Algorithmic logic & pattern episodes).
* **Engineering-Grade UI:** Inter and JetBrains Mono typography, full-screen responsive layout, dark and light mode, and print-to-PDF support.

---

## Curriculum Structure (7 Modules • 35 Days • 175 Problems)

### Module 1: Start with C — I/O, Variables, Data Types & Conditionals (Days 01–06)
* **Day 01:** First Steps: Formatted Output & Structure of a C Program (`printf()`, escape sequences)
* **Day 02:** Data Types, Variables & Memory Sizes (`int`, `long long`, format specifiers, overflow)
* **Day 03:** User Input & Interactive Programs with `scanf()`
* **Day 04:** Arithmetic Operators, Precedence & Modulo Mechanics
* **Day 05:** Relational Operators & Basic `if-else` Decisions
* **Day 06:** Multi-Branch Decisions: `else if` Chains & Logical Operators (`&&`, `||`, `!`)

### Module 2: Advanced Branching, Switch-Case & Loop Mechanics (Days 07–13)
* **Day 07:** Nested `if-else` & Boundary Decision Trees
* **Day 08:** Switch-Case & Conversion (Switch to If-Else & If-Else to Switch)
* **Day 09:** The `for` Loop: Step Increments & Iterations
* **Day 10:** The `while` & `do-while` Loops
* **Day 11:** Loop Control Flow: `break`, `continue` & Early Exits
* **Day 12:** Digit Extraction & Mathematical Simulation (`% 10` and `/ 10`)
* **Day 13:** Number Theory: Divisors, Factors & Euclid's GCD Algorithm

### Module 3: Nested Loops & Pattern Printing (Days 14–17)
* **Day 14:** Nested Loops Fundamentals: Row-Column Iterations & Rectangular Shapes
* **Day 15:** Pattern Printing Part 1: Half Pyramids & Triangle Shapes
* **Day 16:** Pattern Printing Part 2: Centered Pyramids, Diamonds & Palindromic Grids
* **Day 17:** Pattern Printing Part 3: Hollow Shapes & Coordinate Boundaries

### Module 4: Division Mechanics, 1D Arrays & Frequency Arrays (Days 18–24)
* **Day 18:** Integer Division vs Float Division, Casting & Modulo Mechanics
* **Day 19:** 1D Arrays Part 1: Declaration, Indexing & Linear Search
* **Day 20:** 1D Arrays Part 2: Extremum Tracking (Min/Max Values & Updates)
* **Day 21:** 1D Arrays Part 3: In-Place Transformations & Swapping Logic
* **Day 22:** Running Prefix Sums & Difference Arrays
* **Day 23:** Frequency Arrays & Element Counting (Hash Buckets)
* **Day 24:** Subarrays & Contiguous Segments

### Module 5: 2D Arrays, Matrices & Multi-Dimensional Data (Days 25–28)
* **Day 25:** 2D Arrays (Matrices) Part 1: Row & Column Traversal
* **Day 26:** 2D Arrays (Matrices) Part 2: Diagonals, Symmetry & Transpose
* **Day 27:** 2D Arrays Part 3: Grid Coordinates & Matrix Operations
* **Day 28:** 3D Arrays & Multi-Dimensional Representation

### Module 6: Character Arrays & Strings (Days 29–31)
* **Day 29:** Character Arrays & ASCII Fundamentals (1D Strings, `\0` Terminator)
* **Day 30:** String Functions (`strlen`, `strcpy`, `strcmp`) & Palindromes
* **Day 31:** 2D Character Arrays (Array of Strings) & Word Processing

### Module 7: Functions, Pointers & Custom Structures (Days 32–35)
* **Day 32:** Custom Functions: Declarations, Parameters & Returns
* **Day 33:** Pointers in C: Address (`&`), Dereference (`*`) & Pointer Arithmetic
* **Day 34:** Pointers with Arrays, Strings & Pass-by-Reference
* **Day 35:** Structures (`struct`), User-Defined Types & Dynamic Memory

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/reza-05/sp_guidelines.git
cd sp_guidelines

# Install dependencies
npm install

# Run Vite development server
npm run dev

# Build for production
npm run build
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
