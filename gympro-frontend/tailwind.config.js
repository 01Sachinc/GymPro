/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030712",
        card: "rgba(255, 255, 255, 0.05)",
        primary: {
          DEFAULT: "#6366f1",
          hover: "#4f46e5",
        },
        accent: "#a855f7",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
}
