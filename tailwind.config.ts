import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        noise: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "rotate-orbit": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "spin-reverse-slow": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        "line-extend": {
          "0%, 100%": { y2: "10" },
          "50%": { y2: "90" },
        },
        "circle-pulse": {
          "0%, 100%": { r: "30" },
          "50%": { r: "40" },
        },
      },
      animation: {
        scroll: "scroll 20s linear infinite",
        "rotate-orbit": "rotate-orbit 10s linear infinite",
        "rotate-orbit-reverse": "rotate-orbit 10s linear infinite reverse",
        "spin-slow": "spin-slow 60s linear infinite",
        "spin-slower": "spin-slow 15s linear infinite",
        "spin-reverse-slower": "spin-reverse-slow 20s linear infinite",
        "spin-fast": "spin-slow 15s linear infinite",
        "spin-faster": "spin-slow 8s linear infinite",
        "line-extend": "line-extend 2s ease-in-out infinite",
        "circle-pulse": "circle-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [
    typography,
  ],
};
export default config;