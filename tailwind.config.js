/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Paleta inspirada na Landing Page do Rei do Bafo
        bafo: {
          black: "#0B0B0B",
          coal: "#151515",
          smoke: "#1C1C1C",
          navy: "#1a1502",
          royal: {
            DEFAULT: "#3C3FA6",
            deep: "#2A2D7A",
            light: "#5559C9",
          },
          gold: {
            DEFAULT: "#F2C230",
            light: "#FFD55C",
            dark: "#C99A1F",
          },
          cream: "#F5F5F2",
          ash: "#9A9A95",
          red: "#E3322A",
          lime: "#B9D93A",
        },
        border: "rgba(255, 255, 255, 0.08)",
        input: "rgba(255, 255, 255, 0.08)",
        ring: "#F2C230",
        background: "#0B0B0B",
        foreground: "#F5F5F2",
        primary: {
          DEFAULT: "#F2C230",
          foreground: "#0B0B0B",
        },
        secondary: {
          DEFAULT: "#1C1C1C",
          foreground: "#F5F5F2",
        },
        destructive: {
          DEFAULT: "#E3322A",
          foreground: "#F5F5F2",
        },
        muted: {
          DEFAULT: "#1C1C1C",
          foreground: "#9A9A95",
        },
        accent: {
          DEFAULT: "#3C3FA6",
          foreground: "#F5F5F2",
        },
        popover: {
          DEFAULT: "#151515",
          foreground: "#F5F5F2",
        },
        card: {
          DEFAULT: "#151515",
          foreground: "#F5F5F2",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
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
        "shine": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(242, 194, 48, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(242, 194, 48, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shine": "shine 3s linear infinite",
        "float": "float 4s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
      },
      backgroundImage: {
        "gold-shine":
          "linear-gradient(110deg, #F2C230 0%, #FFD55C 40%, #FFF6D5 50%, #FFD55C 60%, #F2C230 100%)",
        "royal-fade":
          "linear-gradient(180deg, #2A2D7A 0%, #1C1C1C 50%, #0B0B0B 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
