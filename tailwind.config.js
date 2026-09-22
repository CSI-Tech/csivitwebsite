/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#efe8db",
        cream: "#f5efe1",
        beige: "#e6dcc4",
        ink: "#111015",
        coal: "#1c1a17",
        sepia: "#3a2a1a",
        brown: "#7a4a24",
        sienna: "#a4562a",
        rust: "#c56a2b",
        ochre: "#d99453",
        navy: "#1e2a44",
        muted: "#6a5b47",
        line: "#2a2116"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        stencil: ["var(--font-stencil)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        body: ["var(--font-body)", "serif"],
        hand: ["var(--font-hand)", "cursive"]
      },
      letterSpacing: {
        widest2: "0.25em"
      },
      boxShadow: {
        ticket: "0 30px 60px -30px rgba(20, 12, 4, 0.55), 0 8px 20px -10px rgba(20, 12, 4, 0.35)"
      },
      keyframes: {
        grain: {
          "0%,100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-5%,-2%)" },
          "20%": { transform: "translate(-8%,3%)" },
          "30%": { transform: "translate(4%,-3%)" },
          "40%": { transform: "translate(-2%,6%)" },
          "50%": { transform: "translate(-3%,-4%)" },
          "60%": { transform: "translate(6%,1%)" },
          "70%": { transform: "translate(-6%,-2%)" },
          "80%": { transform: "translate(3%,5%)" },
          "90%": { transform: "translate(-4%,-4%)" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        slowPan: {
          "0%": { transform: "scale(1.1) translate(0,0)" },
          "50%": { transform: "scale(1.15) translate(-1.5%, -1%)" },
          "100%": { transform: "scale(1.1) translate(0,0)" }
        }
      },
      animation: {
        grain: "grain 1.4s steps(6) infinite",
        fadeUp: "fadeUp 0.8s ease-out both",
        slowPan: "slowPan 24s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
