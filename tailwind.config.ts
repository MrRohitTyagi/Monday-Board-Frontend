import type { Config } from "tailwindcss";
const navbarHeight = "3rem";

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
    screens: {
      "2xl": { max: "1535px" },

      xl: { max: "1279px" },

      lg: { max: "1023px" },

      md: { max: "767px" },

      sm: { max: "639px" },
    },
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
          width: "8px",
        },
        none: {
          width: "0px",
        },
      },
      borderWidth: {
        1: "1px",
      },
      height: {
        "main-content-height": `calc(100vh - ${navbarHeight})`,
        "navbar-height": `var(--navbar-height)`,
        "collapsed-sprint-height": `var(--collapsed-sprint-height)`,
        "card-height": "13rem",
      },
      width: {
        "sidemenu-width-extended": "12rem",
        "sidemenu-width-collapsed": "3rem",
        "card-width": "20rem",
      },
      colors: {
        "layer-bg": `var(--layer-bg)`,
        "main-delete": `var(--main-delete)`,
        "border-light": `var(--border-light)`,
        highlighter: `var(--highlighter)`,
        "highlighter-dark": `var(--highlighter-dark)`,
        "main-bg": `var(--main-bg)`,
        "text-color": `var(--text-color)`,
        "main-fg": `var(--main-fg)`,
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
          from: { height: "4.5rem" },
          to: { height: "0rem" },
        },
        "pulse-height": {
          "0%": {
            "max-height": "0rem",
            "min-height": "0rem",
            opacity: "0",
          },

          "80%": {
            opacity: "0.2",
          },
          "100%": {
            opacity: "1",
            "max-height": "var(--pulse-height)",
            "min-height": "var(--pulse-height)",
          },
        },

        "pulse-height-rev": {
          "0%": {
            "max-height": "var(--pulse-height)",
            "min-height": "var(--pulse-height)",
            overflow: "hidden",
            opacity: "0",
          },

          "100%": {
            overflow: "hidden",
            "max-height": "0rem",
            "min-height": "0rem",
            display: "none",
            opacity: "0",
          },
        },
        "layer-up": {
          "0%": { top: "100%" },
          "100%": { top: "0" },
        },
        "layer-down": {
          "0%": { top: "0" },
          "100%": { top: "100%" },
        },
        "selected-pupup-up": {
          //
          "0%": { bottom: "-4rem" },
          "100%": { bottom: "5rem" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",

        "accordion-up": "accordion-up 0.2s ease-out",

        fadeIn: "fadeIn 300ms ease-in-out forwards",

        "layer-up": "layer-up 300ms ease-in-out forwards",
        "layer-down": "layer-down 300ms ease-in-out forwards",

        "selected-pupup-up": "selected-pupup-up 300ms ease-in-out forwards",

        "unmount-box": "unmount-box 500ms ease-in-out forwards",

        "pulse-layer": "pulse-layer 150ms ease-in-out forwards",
        "pulse-layer-close": "pulse-layer-close 300ms ease-in-out forwards",

        "chat-cont-scroll": "chat-cont-scroll 300ms ease-in-out forwards",

        "chat-cont-heading": "chat-cont-heading 300ms ease-in-out forwards",

        "change-bg-transparency":
          "change-bg-transparency 300ms ease-in-out forwards",

        "pulse-height": "pulse-height 50ms ease-in-out forwards",
        "pulse-height-rev": "pulse-height-rev 150ms ease forwards",
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
          "flex-direction": "column",
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
