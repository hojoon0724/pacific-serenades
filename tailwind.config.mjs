import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/navbar.js",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: {
          50: "hsl(192 95 98)",
          100: "hsl(191 95 95)",
          200: "hsl(189 95 85)",
          300: "hsl(189 95 75)",
          400: "hsl(189 95 65)",
          500: "hsl(191 95 55)",
          600: "hsl(193 95 45)",
          700: "hsl(197 91 35)",
          800: "hsl(201 86 25)",
          900: "hsl(207 81 15)",
          DEFAULT: "hsl(193 96 45)",
        },
        teal: {
          50: "hsl(172 95 95)",
          100: "hsl(171 95 95)",
          200: "hsl(169 95 89)",
          300: "hsl(168 95 79)",
          400: "hsl(168 95 69)",
          500: "hsl(169 95 59)",
          600: "hsl(171 95 49)",
          700: "hsl(174 95 39)",
          800: "hsl(178 95 29)",
          900: "hsl(183 90 19)",
          DEFAULT: "hsl(174 100 39)",
        },
        green: {
          50: "hsl(113 69 98)",
          100: "hsl(113 64 95)",
          200: "hsl(112 59 86)",
          300: "hsl(113 54 76)",
          400: "hsl(114 49 66)",
          500: "hsl(117 44 56)",
          600: "hsl(120 39 46)",
          700: "hsl(125 34 36)",
          800: "hsl(130 29 26)",
          900: "hsl(137 24 16)",
          DEFAULT: "hsl(114 49 66)",
        },
        yellow: {
          50: "hsl(61 76 95)",
          100: "hsl(61 71 93)",
          200: "hsl(60 66 83)",
          300: "hsl(61 61 73)",
          400: "hsl(62 56 63)",
          500: "hsl(65 51 53)",
          600: "hsl(68 46 43)",
          700: "hsl(73 41 33)",
          800: "hsl(78 36 23)",
          900: "hsl(85 31 13)",
          DEFAULT: "hsl(62 56 63)",
        },
      },

      fontSize: {
        h1: ["6rem", { lineHeight: "1.167", letterSpacing: "-1.5px" }],
        h2: ["3.75rem", { lineHeight: "1.2", letterSpacing: "-0.5px" }],
        h3: ["3rem", { lineHeight: "1.167" }],
        h4: ["2.125rem", { lineHeight: "1.235", letterSpacing: "0.25px" }],
        h5: ["1.5rem", { lineHeight: "1.334" }],
        h6: ["1.25rem", { lineHeight: "1.6", letterSpacing: "0.15px" }],
        subtitle1: ["1.5rem", { lineHeight: "1.75", letterSpacing: "0.15px" }],
        subtitle2: ["0.875rem", { lineHeight: "1.57", letterSpacing: "0.1px" }],
        body1: ["1rem", { lineHeight: "1.5", letterSpacing: "0.5px" }],
        body2: ["0.875rem", { lineHeight: "1.43", letterSpacing: "0.25px" }],
        button: ["0.875rem", { lineHeight: "1.75", letterSpacing: "1.25px" }],
        caption: ["0.75rem", { lineHeight: "1.66", letterSpacing: "0.4px" }],
        overline: ["0.625rem", { lineHeight: "1.66", letterSpacing: "1.5px" }],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
      },
      typography: {
        subtitle1: {
          css: {
            textTransform: "uppercase",
          },
        },
      },
    },
  },
  plugins: [nextui()],
};

export default config;
