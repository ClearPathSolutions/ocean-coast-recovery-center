import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Coastal brand palette — derived from oceancoastrecovery.com
        ocean: {
          50: "#f0f9fc",
          100: "#daeff7",
          200: "#b9e0ef",
          300: "#86c9e2",
          400: "#4fabce",
          500: "#3fa6cd", // primary brand ocean blue (#40a5cc)
          600: "#2b7fa3",
          700: "#256684",
          800: "#24556d",
          900: "#22485c",
          950: "#122e3d",
        },
        navy: {
          DEFAULT: "#113c4c", // deep sea navy (#133b4b)
          light: "#1b4f62",
          dark: "#0c2c38",
          deepest: "#081f28",
        },
        sand: {
          50: "#fdf6ef",
          100: "#fae9d6",
          200: "#f6d3ad",
          300: "#f6b57e", // accent sand (#f9bb7f)
          400: "#f0a25e",
          500: "#e88a3c",
          600: "#d97324",
        },
        cream: "#f8f4ee",
        foam: "#eef6f9",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
        wide: "1320px",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(17, 60, 76, 0.18)",
        card: "0 18px 50px -20px rgba(17, 60, 76, 0.28)",
        lift: "0 24px 60px -24px rgba(17, 60, 76, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "slide-down": "slide-down 0.25s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
