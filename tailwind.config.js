/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ukNavy: '#0F2942',
        ukNavyDark: '#091A2B',
        ukSaffron: '#E65100',
        ukSaffronLight: '#F47920',
        ukEmerald: '#047857',
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
