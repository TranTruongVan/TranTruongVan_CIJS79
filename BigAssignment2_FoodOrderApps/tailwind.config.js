/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brown-primary": "#802408",
        "black-primary": "#383638"
      }
    },
  },
  plugins: [],
}