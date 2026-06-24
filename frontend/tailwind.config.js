/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      body: ["Poppins", "Inter", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      default: ["Poppins", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      darkerGrotesque: ["Darker Grotesque", "Poppins", "Inter", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
      plusJakartaSans: ["Plus Jakarta Sans", "Poppins", "sans-serif"],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "24px",
        md: "30px",
        xl: "120px",
      },
    },
    screens: {
      sm: "425px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        biru: "#1D4ED8",
        // primary: "#1C4D8D",
        // primary: "#005461",
        // secondary: "#0C7779",
        // third: "#249E94",
        // fourth: "#3BC1A8",
        primary: "#0F2854",
        secondary: "#1C4D8D",
        third: "#4988C4",
        fourth: "#BDE8F5",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
  ],
};
