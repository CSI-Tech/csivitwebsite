import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate mt-6 overflow-hidden border-y border-sepia/40">
      <div className="film-grain relative h-[78vh] min-h-[560px] w-full overflow-hidden vintage-overlay cinematic-overlay">
        <div
          className="absolute inset-0 animate-slowPan sepia-treatment"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1567861911437-538298e4232c?auto=format&fit=crop&w=2400&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 z-[3] flex items-end">
          <div className="container-editorial pb-14 md:pb-24">
            <p className="kicker text-ochre/90">Feature Presentation · No. 01</p>
            <h1
              className="mt-4 font-hand text-[18vw] leading-[0.9] text-cream md:text-[10rem]"
              style={{ fontFamily: "var(--font-hand)" }}
            >
              The Insider
            </h1>
            <p
              className="mt-2 font-stencil text-lg tracking-widest2 text-cream/85 md:text-2xl"
              style={{ fontFamily: "var(--font-stencil)" }}
            >
              WHERE LOGIC MEETS DECEPTION
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/teams"
                className="group inline-flex items-center gap-3 border border-cream/70 px-6 py-3 font-mono text-xs tracking-widest2 text-cream uppercase transition-all hover:border-ochre hover:text-ochre"
              >
                Meet the Team
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#about"
                className="group inline-flex items-center gap-2 border border-transparent px-5 py-3 font-mono text-xs tracking-widest2 text-cream/80 uppercase transition-all hover:text-cream"
              >
                About The Society
              </Link>
              <span className="hidden font-mono text-[11px] uppercase tracking-widest text-cream/60 md:inline">
                A CSI VIT Production · 2026 – 27
              </span>
            </div>
          </div>
        </div>

        {/* corner metadata like a film reel */}
        <div className="absolute left-4 top-4 z-[3] font-mono text-[10px] uppercase tracking-widest text-cream/70">
          REEL 01 · 24 FPS · CSI-VIT / MUMBAI
        </div>
        <div className="absolute right-4 top-4 z-[3] font-mono text-[10px] uppercase tracking-widest text-cream/70">
          NO. 01 / IV
        </div>
      </div>
    </section>
  );
}
