export default function EventHero({ event }) {
  return (
    <section className="relative border-b border-sepia/30 bg-ink text-cream">
      <div className="relative min-h-[70vh] overflow-hidden">
        {/* theatre walls */}
        <div className="absolute inset-0 opacity-80"
             style={{
               background:
                 "radial-gradient(80% 60% at 50% 40%, rgba(217,148,83,0.15), transparent 60%), linear-gradient(180deg, #14100a 0%, #0a0806 100%)"
             }} />

        {/* posters left/right */}
        <div className="pointer-events-none absolute inset-y-6 left-2 hidden w-24 flex-col gap-4 md:flex">
          <MiniPoster label="CHAOS UX" />
          <MiniPoster label="SYNC / SINK" />
        </div>
        <div className="pointer-events-none absolute inset-y-6 right-2 hidden w-24 flex-col gap-4 md:flex">
          <MiniPoster label="CSI VIT" />
          <MiniPoster label="BOMBAY 26" />
        </div>

        {/* the screen */}
        <div className="container-editorial relative z-10 flex min-h-[70vh] items-center py-14">
          <div className="mx-auto w-full max-w-3xl">
            <div className="relative overflow-hidden border-8 border-sepia/70 shadow-ticket"
                 style={{
                   background:
                     "linear-gradient(180deg, rgba(217,148,83,0.08), rgba(30,30,30,0.9))"
                 }}>
              {/* curtain hint */}
              <div className="relative aspect-[16/9] w-full film-grain">
                <div className="absolute inset-0 sepia-treatment"
                     style={{
                       backgroundImage:
                         "url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=80')",
                       backgroundSize: "cover",
                       backgroundPosition: "center"
                     }} />
                <div className="absolute inset-0"
                     style={{
                       background:
                         "linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.75))"
                     }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-widest2 text-cream/70">
                    NOW SHOWING
                  </p>
                  <h1
                    className="mt-2 font-stencil text-5xl leading-none tracking-widest text-cream md:text-7xl"
                    style={{ fontFamily: "var(--font-stencil)" }}
                  >
                    {event.title.toUpperCase()}
                  </h1>
                  <p className="mt-3 font-hand text-2xl text-ochre md:text-3xl"
                     style={{ fontFamily: "var(--font-hand)" }}>
                    {event.tagline}
                  </p>
                </div>
              </div>

              {/* metadata bar */}
              <div className="flex items-center justify-between border-t border-sepia/40 bg-black/60 px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-cream/80 md:text-xs">
                <span>{event.date ? new Date(event.date).getFullYear() : "2026"}</span>
                <span>{event.category}</span>
                <span className="border border-cream/40 px-2 py-0.5">HD</span>
                <span>#1 IN PROGRAMME TODAY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniPoster({ label }) {
  return (
    <div className="h-32 border border-sepia/40 bg-cream/95 p-2 text-sepia rotate-[-1deg]">
      <p className="text-center font-mono text-[8px] tracking-widest">CSI VIT</p>
      <div className="mx-auto mt-1 h-14 bg-sepia/20 halftone" />
      <p className="mt-2 text-center font-stencil text-[11px] tracking-widest"
         style={{ fontFamily: "var(--font-stencil)" }}>
        {label}
      </p>
    </div>
  );
}
