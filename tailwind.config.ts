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
  safelist: ["opacity-20"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      scrollbar: {
        thin: {
          width: "8px", // Adjust the width here as needed
        },
      },
      borderWidth: {
        1: "1px",
      },
      height: {
        "main-content-height": `calc(100vh - ${navbarHeight})`,
        "navbar-height": `var(--navbar-height)`,
        "card-height": "13rem",
      },
      width: {
        "sidemenu-width-extended": "12rem",
        "sidemenu-width-collapsed": "3rem",
        "card-width": "20rem",
      },
      colors: {
        "main-delete": "#dc5e5ef0",
        "border-light": "#524f4f",
        highlighter: "#0073ea",
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
          from: { left: "100%" },
          to: { left: "0%" },
        },
        "pulse-layer-close": {
          from: { left: "0%" },
          to: { left: "100%" },
        },

        "chat-cont-scroll": {
          from: { "overflow-y": "hidden" },
          to: { "overflow-y": "auto" },
        },
        "chat-cont-heading": {
          from: {
            overflow: "hidden",
            height: "3.7rem",
          },
          to: {
            overflow: "auto",
            height: "fit-content",
          },
        },
        "change-bg-transparency": {
          "0%": { backgroundColor: "transparent" },
          "90%": { backgroundColor: "transparent" },
          "100%": { backgroundColor: "black", opacity: "50%" },
        },
        "unmount-box": {
          from: { height: "4rem", transition: "all 500ms ease-in-out" },
          to: { height: "0rem", transition: "all 500ms ease-in-out" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",

        "accordion-up": "accordion-up 0.2s ease-out",

        fadeIn: "fadeIn 500ms ease-in-out forwards",
        "unmount-box": "unmount-box 500ms ease-in-out forwards",

        "pulse-layer": "pulse-layer 300ms ease-in-out forwards",
        "pulse-layer-close": "pulse-layer-close 300ms ease-in-out forwards",

        "chat-cont-scroll": "chat-cont-scroll 300ms ease-in-out forwards",

        "chat-cont-heading": "chat-cont-heading 300ms ease-in-out forwards",

        "change-bg-transparency":
          "change-bg-transparency 300ms ease-in-out forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("daisyui"),
    function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        ".w-row": {
          display: "flex",
          "flex-direction": "row",
          "align-items": "center",
        },
        ".w-col": {
          display: "flex",
          "flex-direction": "row",
          "align-items": "center",
        },
        ".mask-bottom-blur": {
          "mask-image":
            "linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255 , 20%), rgba(255, 255, 255, 0))",
        },
      });
    },
  ],
} satisfies Config;

export default config;
