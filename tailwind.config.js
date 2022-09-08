/* eslint-disable */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

const rootFontSize = 14;
const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
const rem = (px) => `${round(px / rootFontSize)}rem`;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontSize: {
      xs: [rem(10), { lineHeight: rem(14) }],
      sm: [rem(12), { lineHeight: rem(16) }],
      base: [rem(14), { lineHeight: rem(20) }],
      md: [rem(16), { lineHeight: rem(24) }],
      lg: [rem(18), { lineHeight: rem(28) }],
      xl: [rem(20), { lineHeight: rem(32) }],
      "2xl": [rem(24), { lineHeight: rem(36) }],
      "3xl": [rem(28), { lineHeight: rem(42) }],
      "4xl": [rem(32), { lineHeight: rem(48) }],
      "5xl": [rem(36), { lineHeight: "1" }],
      "6xl": [rem(40), { lineHeight: "1" }],
      "7xl": [rem(44), { lineHeight: "1" }],
      "8xl": [rem(48), { lineHeight: "1" }],
      "9xl": [rem(52), { lineHeight: "1" }],
    },
    extend: {
      fontFamily: {
        sans: ["Be Vietnam Pro", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        76: "19rem",
      },
      minWidth: {
        10: "2.5rem",
        20: "5rem",
        76: "19rem",
      },
      minHeight: {
        10: "2.5rem",
        20: "5rem",
        76: "19rem",
      },
      backgroundImage: {
        "32-bit-color-black-box": "url('/src/assets/images/32-bit-color-black-box.png')",
        "login-carousel-1": "url('/src/assets/images/login-carousel-1.jpeg')",
        "login-carousel-2": "url('/src/assets/images/login-carousel-2.jpeg')",
      },
      keyframes: {
        fade: {
          "0%": { opacity: 0, animationTimingFunction: "ease-in" },
          "25%": { opacity: 1, animationTimingFunction: "ease-out" },
          "50%": { opacity: 1 },
          "75%": { opacity: 0 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    darkTheme: "light",
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#133BBB",
          "primary-content": "#FFFFFF",
          secondary: "#F000B8",
          "secondary-content": "#FFFFFF",
          accent: "#37CDBE",
          "accent-content": "#163835",
          neutral: "#3D4451",
          "neutral-content": "#FFFFFF",
          "base-100": "#F8F8F8",
          "base-200": "#F2F2F2",
          "base-300": "#E5E6E6",
          "base-content": "#1F2937",
          info: "#2196F3",
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=night]"],
          primary: "#38bdf8",
          secondary: "#818CF8",
          accent: "#F471B5",
          neutral: "#1E293B",
          "neutral-focus": "#273449",
          "base-100": "#0F172A",
          info: "#0CA5E9",
          success: "#2DD4BF",
          warning: "#F4BF50",
          error: "#FB7085",
        },
      },
    ],
  },
};
