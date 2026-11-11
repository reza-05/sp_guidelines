/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        ytRed: {
          DEFAULT: '#ff0000',
          hover: '#cc0000',
        },
        cfBlue: {
          DEFAULT: '#0284c7',
          hover: '#0369a1',
        },
        ccAmber: {
          DEFAULT: '#d97706',
          hover: '#b45309',
        }
      }
    },
  },
  plugins: [],
}
