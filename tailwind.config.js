/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        domine: ["Domine", "Georgia", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#004f97",
          dark: "#002f5b",
          light: "#3b82f6",
        },
      },
    },
  },
  plugins: [],
};
