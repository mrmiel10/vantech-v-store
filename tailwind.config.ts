import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        f1208:'1208px'
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    screens: {
      "2xl": "1400px",
      f1208:'1208px',
      f400:'400px',
      f445:"200px",
      sm: "640px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      resnav:"1189px",
      form:"748px",
      pd:'478px',
      f420:'420px',
      gr425:'425px',
      fter592:'592px',
      f700:'531px',
      f600:'600px',
      f1000:'1000px',
      f726:'726px'
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config