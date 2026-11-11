/**
 * SP Guidelines Web Application
 * Interactive 35-Day C Programming & Problem Solving Tracker
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'sp_guidelines_progress';
  const THEME_KEY = 'sp_guidelines_theme';
  const TOTAL_PROBLEMS = 175;

  let state = {
    search: '',
    week: 'all',
    platform: 'all',
    status: 'all',
    theme: localStorage.getItem(THEME_KEY) || 'light',
    solved: getSavedProgress()
  };

  function getSavedProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.solved));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark'
        ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> Light'
        : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> Dark';
    }
  }

  function toggleTheme() {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  }

  function updateStats() {
    const solvedCount = Object.values(state.solved).filter(Boolean).length;
    const pct = Math.round((solvedCount / TOTAL_PROBLEMS) * 100);

    const countElem = document.getElementById('progressCount');
    const fillElem = document.getElementById('progressFill');

    if (countElem) {
      countElem.innerText = `${solvedCount} / ${TOTAL_PROBLEMS} Solved (${pct}%)`;
    }
    if (fillElem) {
      fillElem.style.width = `${pct}%`;
    }
  }

  function filterProblems(problems) {
    const q = state.search.trim().toLowerCase();

    return problems.filter(p => {
      // Platform filter
      if (state.platform !== 'all' && p.platform !== state.platform) {
        return false;
      }

      // Status filter
      const isSolved = !!state.solved[p.id];
      if (state.status === 'solved' && !isSolved) return false;
      if (state.status === 'unsolved' && isSolved) return false;

      // Search query filter (search in title, numId, desc, badgeText)
      if (q) {
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchId = p.numId.toLowerCase().includes(q);
        const matchDesc = p.desc.toLowerCase().includes(q);
        const matchBadge = p.badgeText.toLowerCase().includes(q);
        if (!matchTitle && !matchId && !matchDesc && !matchBadge) {
          return false;
        }
      }

      return true;
    });
  }

  function renderCurriculum() {
    const container = document.getElementById('curriculumContainer');
    const emptyState = document.getElementById('emptyState');
    if (!container || !window.CURRICULUM_DATA) return;

    let html = '';
    let currentWeek = '';
    let totalVisibleProblems = 0;

    window.CURRICULUM_DATA.forEach(dayData => {
      // Week filter
      if (state.week !== 'all' && String(dayData.week) !== String(state.week)) {
        return;
      }

      const visibleProblems = filterProblems(dayData.problems);
      if (visibleProblems.length === 0) {
        return;
      }

      totalVisibleProblems += visibleProblems.length;

      // Add week banner if needed
      if (dayData.weekName !== currentWeek) {
        currentWeek = dayData.weekName;
        html += `
          <div class="week-banner" id="week${dayData.week}">
            ${dayData.weekName}
            <span>5 Problems Daily • CodeChef &amp; Codeforces</span>
          </div>
        `;
      }

      const dayNumStr = String(dayData.day).padStart(2, '0');

      // Video items (Red Watch Buttons)
      let videoPillsHtml = '';
      if (dayData.bct && dayData.bct.length > 0) {
        videoPillsHtml += '<span class="source-tag tag-bct">Bangla Coding Tutor</span>';
        dayData.bct.forEach(v => {
          videoPillsHtml += `
            <a href="${v.url}" target="_blank" rel="noopener noreferrer" class="watch-btn">
              <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              ${v.title}
            </a>
          `;
        });
      }

      if (dayData.ac && dayData.ac.length > 0) {
        videoPillsHtml += '<span class="source-tag tag-ac">Apna College</span>';
        dayData.ac.forEach(v => {
          videoPillsHtml += `
            <a href="${v.url}" target="_blank" rel="noopener noreferrer" class="watch-btn">
              <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              ${v.title}
            </a>
          `;
        });
      }

      // Problem rows
      let rowsHtml = '';
      visibleProblems.forEach(p => {
        const isChecked = !!state.solved[p.id];
        const titleClass = isChecked ? 'topic-col solved-title' : 'topic-col';

        rowsHtml += `
          <tr>
            <td class="check-col">
              <input type="checkbox" id="${p.id}" ${isChecked ? 'checked' : ''} aria-label="Mark ${p.title} as solved" data-pid="${p.id}">
            </td>
            <td class="id-col">${p.numId}</td>
            <td class="${titleClass}">${p.title}</td>
            <td class="desc-col">
              <span class="rating-badge ${p.badgeClass}">${p.badgeText}</span>
              ${p.desc}
            </td>
            <td class="btn-col">
              <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="solve-btn ${p.btnClass}">SOLVE ↗</a>
            </td>
          </tr>
        `;
      });

      html += `
        <section class="section-block ${dayData.theme}" id="day${dayData.day}">
          <div class="section-header-box">
            <div class="num-box">${dayNumStr}</div>
            <div class="section-heading-text">
              <h3 class="section-title">${dayData.title}</h3>
              <p class="section-tagline">${dayData.tagline}</p>
            </div>
          </div>

          <div class="video-strip">
            ${videoPillsHtml}
          </div>

          <div class="table-wrapper" role="region" tabindex="0" aria-labelledby="day-${dayData.day}-title">
            <table class="data-table">
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>
        </section>
      `;
    });

    container.innerHTML = html;

    if (emptyState) {
      emptyState.style.display = totalVisibleProblems === 0 ? 'block' : 'none';
    }

    updateStats();
  }

  function handleCheckboxChange(e) {
    if (e.target.matches('input[type="checkbox"][data-pid]')) {
      const pid = e.target.getAttribute('data-pid');
      state.solved[pid] = e.target.checked;
      saveProgress();

      const titleNode = e.target.closest('tr').querySelector('.topic-col');
      if (titleNode) {
        if (e.target.checked) {
          titleNode.classList.add('solved-title');
        } else {
          titleNode.classList.remove('solved-title');
        }
      }

      updateStats();
    }
  }

  function resetAllProgress() {
    if (confirm('Are you sure you want to reset all your problem solving progress?')) {
      state.solved = {};
      saveProgress();
      renderCurriculum();
    }
  }

  function setupEvents() {
    // Theme toggle
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // Reset progress
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetAllProgress);
    }

    // Print
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }

    // Search input
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    if (searchInput) {
      searchInput.addEventListener('input', e => {
        state.search = e.target.value;
        if (clearSearchBtn) {
          clearSearchBtn.style.display = state.search ? 'block' : 'none';
        }
        renderCurriculum();
      });
    }

    if (clearSearchBtn && searchInput) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        state.search = '';
        clearSearchBtn.style.display = 'none';
        searchInput.focus();
        renderCurriculum();
      });
    }

    // Week filters
    document.querySelectorAll('[data-filter-week]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filter-week]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.week = btn.getAttribute('data-filter-week');
        renderCurriculum();
      });
    });

    // Platform filters
    document.querySelectorAll('[data-filter-platform]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filter-platform]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.platform = btn.getAttribute('data-filter-platform');
        renderCurriculum();
      });
    });

    // Status filters
    document.querySelectorAll('[data-filter-status]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filter-status]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.status = btn.getAttribute('data-filter-status');
        renderCurriculum();
      });
    });

    // Checkbox delegations
    const container = document.getElementById('curriculumContainer');
    if (container) {
      container.addEventListener('change', handleCheckboxChange);
    }
  }

  // Initialization
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(state.theme);
    setupEvents();
    renderCurriculum();
  });

})();
