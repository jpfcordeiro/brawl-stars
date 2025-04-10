/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Nougat', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        'nougat': ['Nougat', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 