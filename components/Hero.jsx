"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Users, Ticket } from "lucide-react";

const navTiles = [
  {
    title: "EVENTS",
    subtitle: "Upcoming & Past Events",
    desc: "Hackathons, workshops and technical competitions.",
    href: "/events",
    icon: Calendar
  },
  {
    title: "TEAM",
    subtitle: "The 2026–27 Council",
    desc: "Conveners, domain heads and core developers.",
    href: "/teams",
    icon: Users
  },
  {
    title: "PROFILE / PASS",
    subtitle: "Your Digital Boarding Pass",
    desc: "Your event registrations and verified credentials.",
    href: "/profile",
    icon: Ticket
  }
];

export default function Hero() {
  return (
    <section className="relative isolate pt-6 pb-16">
      <div className="container-editorial space-y-10">
        {/* Central Branding — stripped back */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Image
            src="/images/csi-logo-dark.png"
            alt="CSI VIT"
            width={260}
            height={80}
            priority
            className="h-16 w-auto object-contain sm:h-20"
          />

          <p className="mt-5 font-mono text-[11px] uppercase tracking-widest2 text-sepia">
            Computer Society of India · VIT Student Chapter · 2026–27
          </p>

          <h1
            className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-display, serif)" }}
          >
            Where Innovation Meets Craft
          </h1>

          <p className="mt-4 max-w-xl font-body text-base text-sepia/85 sm:text-lg">
            Empowering students through technology, hands-on engineering,
            hackathons and collaborative innovation.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest">
            <Link href="/events" className="btn-ticket">
              <Calendar className="h-4 w-4" /> Explore Events
            </Link>
            <Link
              href="/teams"
              className="inline-flex items-center gap-2 rounded border border-sepia/40 bg-paper/90 px-5 py-2.5 text-sepia transition-all hover:bg-sepia hover:text-cream"
            >
              <Users className="h-4 w-4" /> Meet The Team
            </Link>
          </div>
        </div>

        {/* 3 Navigation Hub Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {navTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <Link
                key={tile.title}
                href={tile.href}
                className="group relative flex flex-col justify-between rounded-xl border border-sepia/30 bg-cream/80 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-sepia hover:shadow-md"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-sepia/20 bg-paper text-sepia transition-colors group-hover:bg-sepia group-hover:text-cream">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3
                    className="mt-4 font-stencil text-2xl tracking-wider text-ink transition-colors group-hover:text-rust"
                    style={{ fontFamily: "var(--font-stencil, monospace)" }}
                  >
                    {tile.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-sepia/90">
                    {tile.subtitle}
                  </p>
                  <p className="mt-2.5 font-body text-sm leading-relaxed text-sepia/80">
                    {tile.desc}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-sepia group-hover:text-rust">
                  <span>Enter</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
