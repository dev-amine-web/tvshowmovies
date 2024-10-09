/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '150': '150px',
      },
      brightness: {
        70: '0.7',
      },
    },
  },
  plugins: [],
}


