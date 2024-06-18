import type { Config } from "tailwindcss";
const navbarHeight = "3rem";
const main_bg_fg = "#1C1F3B";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      height: {
        "main-content-height": `calc(100vh - ${navbarHeight})`,
        "navbar-height": navbarHeight,
        "card-height": "13rem",
      },
      width: {
        "sidemenu-width-extended": "12rem",
        "sidemenu-width-collapsed": "3rem",
        "card-width": "20rem",
      },
      colors: {
        "border-light": "#524f4f",
        "pulse-divider": "#747171",
        "main-active": "#0073EA",
        "main-active-dark": "#133774",
        "main-light": "#30324E",
        "main-bg": "#292F4C",
        "main-fg": main_bg_fg,
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0.3", filter: `blur(0.4px)` },
          "100%": { opacity: "1", filter: `blur(0px)` },
        },
        //resizable Split layer animations
        "pulse-layer": {
          "0%": { left: "100%" },
          "100%": { left: "0%" },
        },
        "change-bg-transparency": {
          "0%": { backgroundColor: "transparent" },
          "90%": { backgroundColor: "transparent" },
          "100%": { backgroundColor: "black",opacity:'50%' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 500ms ease-in-out",
        "pulse-layer": "pulse-layer 500ms ease-in-out forwards",
        "change-bg-transparency":
          "change-bg-transparency 500ms ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
} satisfies Config;

export default config;
