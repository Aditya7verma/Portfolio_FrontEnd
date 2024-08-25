/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#264653",
        secondary: "#e76f51",
        tertiary: "#2a9d8f",
      },
    },
    screens: {
      lg: { max: "2023px" },

      // For Mobile devices
      sm: { max: "1000px" },
    },
  },
  plugins: [],
};
