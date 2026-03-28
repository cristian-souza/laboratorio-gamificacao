/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#10131a',
        primary: {
          DEFAULT: '#dbfcff',
          container: '#00f0ff',
        },
        secondary: {
          DEFAULT: '#ecb2ff',
          container: '#cf5cff',
        },
        tertiary: {
          DEFAULT: '#ddffd3',
          container: '#00fb40',
        },
        surface: {
          lowest: '#0b0e14',
          low: '#191c22',
          DEFAULT: '#1d2026',
          high: '#272a31',
          highest: '#32353c',
        },
        outline: {
          variant: '#3b494b'
        },
        'on-surface-variant': '#b9cacb'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'progress-bar': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'flicker': {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: 1 },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: 0.4 },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.5, filter: 'brightness(1)' },
          '50%': { opacity: 1, filter: 'brightness(1.5)' },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-20px) translateX(10px)' },
          '66%': { transform: 'translateY(10px) translateX(-15px)' },
        },
        'proton-drift': {
          '0%': { transform: 'translate(-10vw, -10vh) rotate(0deg)', opacity: 0 },
          '10%': { opacity: 0.8 },
          '90%': { opacity: 0.8 },
          '100%': { transform: 'translate(110vw, 110vh) rotate(360deg)', opacity: 0 },
        },
        'proton-pulse': {
          '0%, 100%': { transform: 'scale(1)', filter: 'brightness(1) blur(0px)' },
          '50%': { transform: 'scale(1.5)', filter: 'brightness(1.8) blur(1px)' },
        },
        'nebula-pulse': {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(1.2)' },
        }
      },
      animation: {
        'progress-bar': 'progress-bar linear forwards',
        'flicker': 'flicker 3s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'glitch': 'glitch 0.3s cubic-bezier(.25,.46,.45,.94) both infinite',
        'float': 'float 15s ease-in-out infinite',
        'proton-drift': 'proton-drift 25s linear infinite',
        'proton-pulse': 'proton-pulse 3s ease-in-out infinite',
        'nebula-pulse': 'nebula-pulse 20s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
