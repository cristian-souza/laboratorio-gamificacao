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
    },
  },
  plugins: [],
}
