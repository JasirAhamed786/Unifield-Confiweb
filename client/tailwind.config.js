/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#059669', // Emerald-600
        secondary: '#f59e0b', // Amber-500
        accent: '#0ea5e9', // Sky-500
      },
    },
  },
  plugins: [],
}
