/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}",
            "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'], // Add Satoshi font
      },
      colors: {
        maroon: {
          800: '#800000', // Customize maroon color here
        }
      }
    },
  },
  plugins: [],
}