/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17120d",
        mist: "#f7f4ea",
        border: "#e6dcc1",
        accent: {
          50: "#fff8e6",
          100: "#f8e7b0",
          200: "#edd27a",
          300: "#dfbc45",
          400: "#cfa22a",
          500: "#b68510",
          600: "#8f6808",
          700: "#604605",
          800: "#3d2c03",
          900: "#241a02",
        },
        teal: {
          50: "#f8f3e4",
          100: "#f0eddc",
          200: "#e3d7b0",
          300: "#d4c58c",
          400: "#b89f5d",
          500: "#9f8543",
          600: "#816a31",
          700: "#695621",
          800: "#4e3f17",
          900: "#33290f",
        },
        plum: {
          50: "#faf3eb",
          100: "#efe6db",
          200: "#dfccb4",
          300: "#c8a887",
          400: "#ab7f55",
          500: "#8a5f34",
          600: "#6e4a28",
          700: "#583b1f",
          800: "#402916",
        },
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
        body: ["Aptos", "Trebuchet MS", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        panel: "0 16px 40px rgba(15, 23, 42, 0.08)",
        glow: "0 0 0 1px rgba(182, 133, 16, 0.12), 0 12px 32px rgba(182, 133, 16, 0.18)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.9" },
          "50%": { transform: "scale(1.04)", opacity: "1" },
        },
        floatUp: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        reveal: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        float: "floatUp 6s ease-in-out infinite",
        reveal: "reveal 600ms ease-out both",
      },
    },
  },
  plugins: [],
};
