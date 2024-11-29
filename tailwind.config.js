/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        "Jrounded" : ["Kiwi Maru", "serif"],
        "fantasy" : ["Anton", "serif"],
        "Yusei" : ["Yusei Magic", "serif"],
        "Jgothic" : ['Noto Sans', 'sans-serif'],
    },
    boxShadow : {
      "custom-hover" :"none",
      "custom-shadow" : "4px 4px 2px rgba(0, 0, 0, 0.3), -2px -2px 2px rgba(255, 255, 255, 0.6)"

    },
    translate:{
      "1" : "4px",
    }
  },},
    
  plugins: [],
}
