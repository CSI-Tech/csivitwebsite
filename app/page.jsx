import Link from "next/link";
import Masthead from "@/components/Masthead";
import Hero from "@/components/Hero";
import PageTransition from "@/components/PageTransition";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <PageTransition>
      <Masthead />
      <Hero />

      {/* About The Society */}
      <section id="about" className="container-editorial page-in mt-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="kicker">Section I · Origin</p>
            <h2 className="mt-2 font-display text-4xl text-ink md:text-5xl">The Society</h2>
          </div>
          <div className="md:col-span-8">
            <p className="font-body text-lg leading-relaxed text-sepia">
              The Computer Society of India — VIT Student Chapter — is a
              collective of engineers, publishers, tinkerers and troublemakers
              operating out of Mumbai since 2008. We run programmes on coding,
              systems, design and product, and publish a small quantity of
              trouble on the side.
            </p>
            <p className="mt-4 font-body italic text-muted">
              "Where logic meets deception." — the tenure motto, 2026–27.
            </p>

            <div className="mt-8 grid grid-cols-3 divide-x divide-sepia/30 border border-sepia/30 bg-cream">
              <Stat k="17" v="Years running" />
              <Stat k="9" v="Key Domains" />
              <Stat k="600+" v="Members strong" />
            </div>
          </div>
        </div>
      </section>

      {/* The Council / Teams Spotlight */}
      <section className="container-editorial page-in mt-20">
        <div className="border border-sepia/30 bg-cream p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-xl">
              <p className="kicker">Section II · The Architects</p>
              <h3 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                The Minds Behind The Chapter
              </h3>
              <p className="mt-3 font-body text-sm text-sepia/80 leading-relaxed">
                Step inside the vintage room. Meet the conveners, domain heads, and
                creators orchestrating the 2026–27 tenure across 9 specialized departments.
              </p>
            </div>
            <Link
              href="/teams"
              className="btn-ticket whitespace-nowrap self-start md:self-center"
            >
              Explore The Team Room <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stamps strip */}
      <section className="container-editorial mt-20 hidden md:block">
        <div className="rule-double mb-6" />
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
          <span>Mumbai · 100</span>
          <span>Est. 2008</span>
          <span>Vol. XVIII</span>
          <span>No. 01</span>
          <span>Printed at VIT</span>
        </div>
        <div className="rule-double mt-6" />
      </section>

      {/* CTA */}
      <section className="container-editorial mt-20 pb-12">
        <div className="rule-double mb-10" />
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="kicker">A closing note</p>
          <h3 className="font-display text-3xl text-ink md:text-4xl max-w-2xl">
            The society is currently accepting passengers for the 2026–27 tenure.
          </h3>
          <Link href="/auth" className="btn-ticket">
            Get your ticket <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}

function Stat({ k, v }) {
  return (
    <div className="p-6 text-center">
      <p className="font-stencil text-4xl text-sepia" style={{ fontFamily: "var(--font-stencil)" }}>
        {k}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">{v}</p>
    </div>
  );
}
