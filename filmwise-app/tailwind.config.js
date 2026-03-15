/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      filmBlack: "#0B0B0B",
      filmGold: "#C6A75E",
      filmRed: "#7A1C1C",
      filmGray: "#1C1C1C"
    }
  },
},
  plugins: [],
}

