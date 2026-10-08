"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Calendar, 
  Users, 
  Ticket, 
  Mail, 
  MapPin, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Github 
} from "lucide-react";

export default function Hero() {
  const navTiles = [
    {
      title: "EVENTS",
      subtitle: "Upcoming & Past Events",
      desc: "Explore hackathons, workshops, and technical competitions.",
      href: "/events",
      icon: Calendar,
      badge: "Active",
    },
    {
      title: "TEAM",
      subtitle: "The 2026–27 Council",
      desc: "Meet the conveners, domain heads, and core developers.",
      href: "/teams",
      icon: Users,
      badge: "9 Domains",
    },
    {
      title: "PROFILE / PASS",
      subtitle: "Your Digital Boarding Pass",
      desc: "View your event registrations and download verified credentials.",
      href: "/profile",
      icon: Ticket,
      badge: "Access",
    },
  ];

  return (
    <section className="relative isolate pt-4 pb-12">
      <div className="container-editorial space-y-8">
        {/* Main Central Branding */}
        <div className="relative overflow-hidden rounded-2xl border border-sepia/30 bg-cream/70 p-8 text-center shadow-sm backdrop-blur-sm md:p-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <Image
              src="/images/csi-logo-dark.png"
              alt="CSI VIT"
              width={260}
              height={80}
              priority
              className="h-16 w-auto object-contain sm:h-20"
            />

            <p className="mt-4 font-mono text-xs uppercase tracking-widest2 text-sepia">
              Computer Society of India · VIT Student Chapter · 2026–2027
            </p>

            <h1
              className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-display, serif)" }}
            >
              Where Innovation Meets Craft
            </h1>

            <p className="mt-4 max-w-2xl font-body text-base text-sepia/85 sm:text-lg">
              Empowering students through technology, hands-on engineering, hackathons,
              and collaborative innovation at Vidyalankar Institute of Technology.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 font-mono text-xs uppercase tracking-widest">
              <Link href="/events" className="btn-ticket flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Explore Events
              </Link>
              <Link
                href="/teams"
                className="inline-flex items-center gap-2 rounded border border-sepia/40 bg-paper/90 px-5 py-2.5 text-sepia transition-all hover:bg-sepia hover:text-cream"
              >
                <Users className="h-4 w-4" /> Meet The Team
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 rounded border border-sepia/40 bg-paper/90 px-5 py-2.5 text-sepia transition-all hover:bg-sepia hover:text-cream"
              >
                <Ticket className="h-4 w-4" /> Your Boarding Pass
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Navigation Hub Cards (Events, Team, Profile) */}
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
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-sepia/20 bg-paper text-sepia group-hover:bg-sepia group-hover:text-cream transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted px-2.5 py-0.5 rounded border border-sepia/20 bg-paper/60">
                      {tile.badge}
                    </span>
                  </div>

                  <h3
                    className="mt-4 font-stencil text-2xl tracking-wider text-ink group-hover:text-rust transition-colors"
                    style={{ fontFamily: "var(--font-stencil, monospace)" }}
                  >
                    {tile.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-sepia/90">
                    {tile.subtitle}
                  </p>
                  <p className="mt-2.5 text-sm font-body text-sepia/80 leading-relaxed">
                    {tile.desc}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-sepia font-semibold group-hover:text-rust">
                  <span>Enter</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* 3 Core Info Cards: About, Contact, Connect */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* 1. About CSI-VIT */}
          <div className="flex flex-col justify-between rounded-xl border border-sepia/30 bg-cream/80 p-6 shadow-sm">
            <div>
              <h3
                className="font-display text-xl font-bold text-ink"
                style={{ fontFamily: "var(--font-display, serif)" }}
              >
                Computer Society of India - VIT
              </h3>
              <p className="mt-1.5 font-display text-sm italic text-muted">
                "Exploring Technology Beyond Limits"
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-sepia">
                CSI-VIT brings students, researchers, and developers together to
                explore technology, conduct workshops, and build projects that
                bridge academic learning with real-world engineering.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-sepia/20">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Established 2008 · Student Chapter
              </span>
            </div>
          </div>

          {/* 2. Contact Information */}
          <div className="flex flex-col justify-between rounded-xl border border-sepia/30 bg-cream/80 p-6 shadow-sm">
            <div>
              <h3
                className="font-display text-xl font-bold text-ink"
                style={{ fontFamily: "var(--font-display, serif)" }}
              >
                Contact Information
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 mt-0.5 shrink-0 text-sepia" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Email</p>
                    <a
                      href="mailto:csivittechteam@gmail.com"
                      className="font-mono text-xs text-ink hover:text-rust transition-colors break-all"
                    >
                      csivittechteam@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-sepia" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Location</p>
                    <p className="font-body text-xs text-sepia">
                      Vidyalankar Institute of Technology, Wadala (E), Mumbai 400037
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-sepia/20">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Office Hours: Mon – Fri · 9:00 AM – 5:00 PM
              </span>
            </div>
          </div>

          {/* 3. Connect With Us */}
          <div className="flex flex-col justify-between rounded-xl border border-sepia/30 bg-cream/80 p-6 shadow-sm">
            <div>
              <h3
                className="font-display text-xl font-bold text-ink"
                style={{ fontFamily: "var(--font-display, serif)" }}
              >
                Connect With Us
              </h3>
              <p className="mt-1.5 font-body text-xs text-sepia">
                Follow us for updates on events, workshops, hackathons, and tech insights.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <a
                  href="https://linkedin.com/company/csivit"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-sepia/30 bg-paper text-sepia transition-all hover:border-sepia hover:bg-sepia hover:text-cream"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com/csivit"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-sepia/30 bg-paper text-sepia transition-all hover:border-sepia hover:bg-sepia hover:text-cream"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-sepia/30 bg-paper text-sepia transition-all hover:border-sepia hover:bg-sepia hover:text-cream"
                >
                  <Youtube className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com/CSI-Tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-sepia/30 bg-paper text-sepia transition-all hover:border-sepia hover:bg-sepia hover:text-cream"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-sepia/20">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                @csivit · Student Chapter Mumbai
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
