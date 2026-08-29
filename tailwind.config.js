/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#090b10',
        surface: '#10141d',
        'surface-2': '#161c28',
        cyan: {
          DEFAULT: '#5eead4',
          dim: '#2dd4bf',
          glow: 'rgba(94,234,212,0.15)',
        },
        amber: {
          DEFAULT: '#f5b942',
          dim: '#d4a017',
        },
        muted: '#8a94a6',
        'muted-2': '#5a6478',
        border: '#1e2535',
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'cursor-blink': 'cursorBlink 1.1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(94,234,212,0.2), 0 0 60px rgba(94,234,212,0.05)' },
          '50%': { boxShadow: '0 0 30px rgba(94,234,212,0.35), 0 0 80px rgba(94,234,212,0.1)' },
        },
      },
    },
  },
  plugins: [],
}