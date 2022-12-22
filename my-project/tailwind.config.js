/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "purple-primary": "#897BDA",
        "purple-secondary": "#862796",
      }
    },
  },
  plugins: [],
}