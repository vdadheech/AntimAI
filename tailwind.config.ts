import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        academia: {
          bg: "#1C1714",
          "bg-alt": "#251E19",
          fg: "#E8DFD4",
          muted: "#3D332B",
          "muted-fg": "#9C8B7A",
          border: "#4A3F35",
          accent: "#C9A962",
          "accent-sec": "#8B2635",
          "accent-fg": "#1C1714",
        },
        navy: {
          900: "#1C1714", // mapping old navy to new background for compatibility
        },
        urgency: {
          immediate: "#8B2635", // Crimson
          "30days": "#C9A962", // Brass
          "90days": "#4A3F35", // Wood
          anytime: "#3D332B",
        },
      },
      fontFamily: {
        heading: ["'Cormorant Garamond'", "serif"],
        body: ["'Crimson Pro'", "serif"],
        display: ["'Cinzel'", "serif"],
        sans: ["'Crimson Pro'", "serif"], // Fallback sans to Crimson Pro temporarily
      },
      borderRadius: {
        arch: "40% 40% 0 0 / 20% 20% 0 0",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "brass-gradient": "linear-gradient(180deg, #D4B872 0%, #C9A962 50%, #B8953F 100%)",
      },
      boxShadow: {
        "engraved": "inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.3)",
        "wax-seal": "inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.4)",
        "card-lift": "0 8px 24px rgba(0,0,0,0.3)",
      },
      transitionDuration: {
        "fast": "150ms",
        "base": "300ms",
        "slow": "500ms",
        "dramatic": "700ms",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "brass-pulse": "brassPulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        brassPulse: {
          "0%, 100%": { filter: "brightness(100%)" },
          "50%": { filter: "brightness(110%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
