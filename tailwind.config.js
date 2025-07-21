/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },images: {
    domains: ['i.pravatar.cc', 'image.tmdb.org'], // 👈 Add TMDB too if using
  },
  darkMode: 'class', // 👈 for dark mode support
  plugins: [],
}
