// VintagePosterArt renders an art-directed 1940s–1970s Old Bombay printed event poster.
// Styles reflect archival cinema bills, railway gazettes, Irani cafe dispatches,
// and colonial-era academic notices with halftone printing, newsprint texture, and ink stamps.

function formatDateParts(dateStr) {
  if (!dateStr) return { day: "TBA", month: "2026", weekday: "NOTICE", year: "2026" };
  try {
    const d = new Date(dateStr);
    return {
      day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
      month: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
      weekday: d.toLocaleDateString("en-GB", { weekday: "short" }).toUpperCase(),
      year: String(d.getFullYear())
    };
  } catch {
    return { day: "15", month: "OCT", weekday: "FRI", year: "2026" };
  }
}

export default function VintagePosterArt({ event, size = "board", isHovered = false }) {
  if (!event) return null;

  if (event.image) {
    return (
      <article
        className="relative flex h-full w-full select-none flex-col justify-between overflow-hidden rounded-[7px] border-2 border-ink shadow-sm bg-[#161412]"
        aria-label={`Vintage event notice for ${event.title}`}
      >
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-contain"
        />
        <div className="pointer-events-none absolute inset-0 bg-sepia/10 mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 film-grain opacity-20" />
      </article>
    );
  }

  const dateParts = formatDateParts(event.date);
  const slug = (event.slug || "").toLowerCase();

  // Pick bespoke art direction palette and motifs based on event identity
  let theme = {
    paperBg: "#f2ece0",
    ink: "#141210",
    accent: "#b25a25",
    secondary: "#3a2a1a",
    halftoneColor: "rgba(20, 18, 16, 0.22)",
    variantName: "REGISTRATION DISPATCH",
    gazetteVol: "VOL. XVIII",
    stampCode: "BOM / 26"
  };

  if (slug.includes("chaos")) {
    theme = {
      paperBg: "#fced9f",
      ink: "#120e06",
      accent: "#d93f18",
      secondary: "#3a280e",
      halftoneColor: "rgba(217, 63, 24, 0.24)",
      variantName: "CHAOTIC UI EXPERIMENT",
      gazetteVol: "SPECIAL DISPATCH",
      stampCode: "EVIL UX · 13 OCT"
    };
  } else if (slug.includes("sync")) {
    theme = {
      paperBg: "#e5edf3",
      ink: "#0f1c24",
      accent: "#1f6e8c",
      secondary: "#183241",
      halftoneColor: "rgba(15, 28, 36, 0.25)",
      variantName: "ASYMMETRIC COMMS & TECH TRIAL",
      gazetteVol: "SPECIAL TRIAL",
      stampCode: "SYNC · 14 OCT"
    };
  } else if (slug.includes("codecrush")) {
    theme = {
      paperBg: "#efe5d0",
      ink: "#11100f",
      accent: "#a84b1d",
      secondary: "#2c2419",
      halftoneColor: "rgba(17, 16, 15, 0.26)",
      variantName: "ALGORITHMIC COMBAT",
      gazetteVol: "SERIES 01",
      stampCode: "SPRINT · 06H"
    };
  } else if (slug.includes("hackathon")) {
    theme = {
      paperBg: "#e7ddc5",
      ink: "#121a2c",
      accent: "#b05524",
      secondary: "#1f2a40",
      halftoneColor: "rgba(18, 26, 44, 0.28)",
      variantName: "NOCTURNAL OVERNIGHT SPRINT",
      gazetteVol: "EXPEDITION 02",
      stampCode: "24-HR SHIFT"
    };
  } else if (slug.includes("ideathon")) {
    theme = {
      paperBg: "#f4edd9",
      ink: "#23160e",
      accent: "#99501a",
      secondary: "#4a301e",
      halftoneColor: "rgba(35, 22, 14, 0.24)",
      variantName: "CHAMBER OF PRODUCT IDEATION",
      gazetteVol: "GAZETTE 03",
      stampCode: "PATENT DELIB."
    };
  } else if (slug.includes("tech-talks") || slug.includes("techtalks")) {
    theme = {
      paperBg: "#ece0c4",
      ink: "#1e1d1b",
      accent: "#ab5421",
      secondary: "#3f3b35",
      halftoneColor: "rgba(30, 29, 27, 0.25)",
      variantName: "CONVOCATION OF THEORISTS",
      gazetteVol: "BROADCAST 04",
      stampCode: "AUDITORIUM"
    };
  } else if (slug.includes("novacode")) {
    theme = {
      paperBg: "#f6f1e5",
      ink: "#14211b",
      accent: "#c26d2e",
      secondary: "#253b30",
      halftoneColor: "rgba(20, 33, 27, 0.22)",
      variantName: "APPRENTICE GUILD PERMIT",
      gazetteVol: "FOUNDATION 05",
      stampCode: "BEGINNERS"
    };
  }

  return (
    <article
      className="relative flex h-full w-full select-none flex-col justify-between overflow-hidden rounded-[7px] border-[2px] shadow-sm transition-transform duration-300"
      style={{
        backgroundColor: theme.paperBg,
        color: theme.ink,
        borderColor: theme.ink
      }}
      aria-label={`Vintage event notice for ${event.title}`}
    >
      {/* Paper micro-texture & Halftone background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(${theme.halftoneColor} 1.2px, transparent 1.2px)`,
          backgroundSize: "4px 4px"
        }}
      />

      {/* Subtle aged paper creases & vignette */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 40%, rgba(58,42,26,0.2) 100%), radial-gradient(circle at 50% 50%, transparent 60%, rgba(30,20,10,0.3) 100%)"
        }}
      />

      {/* Pinned corners / registration marks */}
      <div className="pointer-events-none absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-ink/40" />
      <div className="pointer-events-none absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-ink/40" />
      <div className="pointer-events-none absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-ink/40" />
      <div className="pointer-events-none absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-ink/40" />

      {/* INNER BORDER (Dual Rule) */}
      <div className="relative z-10 flex h-full flex-col justify-between p-2.5 sm:p-3.5">
        {/* MASTHEAD / TOP DISPATCH BAR */}
        <header className="border-b border-ink/80 pb-1.5">
          <div className="flex items-center justify-between font-mono text-[7px] font-bold uppercase tracking-widest sm:text-[9px]">
            <span className="flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 bg-ink" />
              CSI VIT · BOMBAY
            </span>
            <span className="tracking-widest" style={{ color: theme.accent }}>
              {theme.gazetteVol}
            </span>
            <span className="hidden sm:inline">2026–27</span>
          </div>

          <div className="mt-1 flex items-center justify-between border-t border-dotted border-ink/40 pt-1">
            <p className="font-mono text-[6.5px] uppercase tracking-wider text-ink/75 sm:text-[8px]">
              {theme.variantName}
            </p>
            <span className="border border-ink/60 px-1 py-0.2 font-mono text-[6px] font-bold uppercase tracking-widest text-ink sm:text-[7.5px]">
              {theme.stampCode}
            </span>
          </div>
        </header>

        {/* MAIN EDITORIAL POSTER TITLE */}
        <div className="my-auto py-1 text-center sm:py-2">
          <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-ink/80 sm:text-[9px]">
            {event.category || "GENERAL PROGRAMME"}
          </p>

          <h2
            className="mt-0.5 font-stencil text-2xl font-black leading-[0.88] tracking-wider sm:text-4xl md:text-5xl"
            style={{
              fontFamily: "var(--font-stencil)",
              color: theme.ink,
              textShadow: "1px 1px 0px rgba(0,0,0,0.12)"
            }}
          >
            {(event.title || "").toUpperCase()}
          </h2>

          <div className="mx-auto my-1.5 flex w-3/4 items-center justify-center gap-2">
            <span className="h-px flex-1 bg-ink/60" />
            <span
              className="font-mono text-[6.5px] uppercase tracking-widest sm:text-[8px]"
              style={{ color: theme.accent }}
            >
              ★ OFFICIAL DISPATCH ★
            </span>
            <span className="h-px flex-1 bg-ink/60" />
          </div>

          <p
            className="line-clamp-2 px-1 font-body text-[8px] italic leading-tight text-ink/85 sm:text-[10.5px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            "{event.tagline || event.shortDescription}"
          </p>
        </div>

        {/* MIDDLE ENGRAVING / HALFTONE MOTIF PANEL */}
        <div className="my-1 overflow-hidden border border-ink/60 bg-ink/5 p-1 sm:p-1.5">
          <div className="flex items-center justify-between border-b border-ink/30 pb-0.5 font-mono text-[6px] uppercase tracking-widest text-ink/70 sm:text-[7.5px]">
            <span>SCHEDULE & PROTOCOL</span>
            <span style={{ color: theme.accent }}>CSI-VIT / MUMBAI</span>
          </div>

          <div className="mt-1 grid grid-cols-3 gap-1 py-0.5 text-center font-mono">
            <div className="border-r border-ink/20 pr-0.5">
              <span className="block text-[6px] uppercase text-ink/60 sm:text-[7px]">TEAM SIZE</span>
              <strong className="block text-[7.5px] font-bold sm:text-[9px]">
                {event.teamSize || "OPEN"}
              </strong>
            </div>
            <div className="border-r border-ink/20 px-0.5">
              <span className="block text-[6px] uppercase text-ink/60 sm:text-[7px]">TIME</span>
              <strong className="block text-[7.5px] font-bold sm:text-[9px]">
                {event.time || "10:00 IST"}
              </strong>
            </div>
            <div className="pl-0.5">
              <span className="block text-[6px] uppercase text-ink/60 sm:text-[7px]">ENTRY</span>
              <strong
                className="block text-[7.5px] font-bold uppercase sm:text-[9px]"
                style={{ color: event.registrationOpen !== false ? theme.accent : "#555" }}
              >
                {event.registrationOpen !== false ? "PERMITTED" : "CONCLUDED"}
              </strong>
            </div>
          </div>
        </div>

        {/* BOTTOM METRIC TICKET / RECEIPT STRIP */}
        <footer className="mt-1 border-t-2 border-ink pt-1.5">
          <div className="grid grid-cols-3 items-center divide-x divide-ink/50 bg-ink/5 py-1 text-center font-mono">
            {/* DATE */}
            <div className="px-1">
              <p className="text-[5.5px] uppercase tracking-wider text-ink/60 sm:text-[7px]">DATE</p>
              <p className="font-stencil text-[11px] font-bold leading-none sm:text-base">
                {dateParts.day}.{dateParts.month}
              </p>
              <p className="text-[5.5px] tracking-tight text-ink/60 sm:text-[6.5px]">
                {dateParts.weekday}
              </p>
            </div>

            {/* TIME */}
            <div className="px-1">
              <p className="text-[5.5px] uppercase tracking-wider text-ink/60 sm:text-[7px]">HOURS</p>
              <p className="font-stencil text-[11px] font-bold leading-none sm:text-base">
                {(event.time || "10:00").split(" ")[0]}
              </p>
              <p className="text-[5.5px] tracking-tight text-ink/60 sm:text-[6.5px]">IST ONWARDS</p>
            </div>

            {/* VENUE */}
            <div className="px-1">
              <p className="text-[5.5px] uppercase tracking-wider text-ink/60 sm:text-[7px]">VENUE</p>
              <p className="truncate font-stencil text-[10px] font-bold leading-none sm:text-sm">
                {(event.venue || "VIT MUMBAI").split(",")[0].toUpperCase()}
              </p>
              <p className="text-[5.5px] tracking-tight text-ink/60 sm:text-[6.5px]">VIT CAMPUS</p>
            </div>
          </div>

          {/* FOOTER NOTICE SLOGAN */}
          <div className="mt-1 flex items-center justify-between border-t border-dotted border-ink/40 pt-1 font-mono text-[5.5px] uppercase tracking-wider text-ink/80 sm:text-[7px]">
            <span>TRUST THE CODE · FILE PARTICULARS</span>
            <span className="font-bold underline decoration-ink/40 underline-offset-2">
              INSPECT NOTICE →
            </span>
          </div>
        </footer>
      </div>

      {/* Subtle weathered paper edge highlight */}
      <div className="pointer-events-none absolute inset-0 border border-white/40" />
    </article>
  );
}
