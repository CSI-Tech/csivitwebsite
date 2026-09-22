// Poster is a stylized placeholder used when an event has no real image.
// Each `variant` produces a distinct printed-poster look built purely from CSS/SVG.
// Keeps the site self-contained (no external image API required).

const palettes = {
  codecrush: { bg: "#efe4c9", ink: "#3a2a1a", accent: "#b25a25", tag: "CODE / RUSH" },
  hackathon: { bg: "#e6dcc4", ink: "#1e2a44", accent: "#a4562a", tag: "24 HOURS" },
  ideathon: { bg: "#f0e6cf", ink: "#2b1a10", accent: "#c56a2b", tag: "PITCH DECK" },
  techtalks: { bg: "#e6d9b8", ink: "#3a2a1a", accent: "#b25a25", tag: "LECTURE" },
  novacode: { bg: "#f5efe1", ink: "#1e2a44", accent: "#d99453", tag: "BEGINNERS" }
};

export default function Poster({ variant = "codecrush", title, category, date }) {
  const p = palettes[variant] || palettes.codecrush;

  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden border border-sepia/40"
      style={{ background: p.bg, color: p.ink }}
    >
      {/* halftone corner */}
      <div className="halftone absolute inset-0 opacity-40" />

      {/* decorative border */}
      <div
        className="absolute inset-3 border pointer-events-none"
        style={{ borderColor: p.ink, opacity: 0.35 }}
      />
      <div
        className="absolute inset-5 border pointer-events-none"
        style={{ borderColor: p.ink, opacity: 0.15 }}
      />

      {/* top bar */}
      <div className="absolute left-6 right-6 top-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest2">
        <span>CSI VIT · POSTER</span>
        <span style={{ color: p.accent }}>{p.tag}</span>
      </div>

      {/* massive title */}
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2">
        <p className="font-mono text-[11px] uppercase tracking-widest2 opacity-60">
          {category || "Programme"}
        </p>
        <h3
          className="mt-2 font-stencil text-5xl leading-[0.9] tracking-widest md:text-[5.5rem]"
          style={{ fontFamily: "var(--font-stencil)", color: p.ink }}
        >
          {title}
        </h3>
        <div
          className="mt-4 h-[3px] w-24"
          style={{ background: p.accent }}
        />
      </div>

      {/* bottom */}
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between font-mono text-[10px] uppercase tracking-widest">
        <span>{date}</span>
        <span>VIT · MUMBAI</span>
      </div>

      {/* film-grain overlay */}
      <div className="film-grain absolute inset-0" />
    </div>
  );
}
