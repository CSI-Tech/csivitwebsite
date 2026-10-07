"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/auth") || pathname?.startsWith("/teams") || pathname?.startsWith("/profile")) return null;

  return (
    <footer className="mt-24 border-t border-sepia/40 bg-cream text-sepia">
      <div className="container-editorial py-14">
        <div className="rule-double mb-8" />
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-stencil text-2xl tracking-widest" style={{ fontFamily: "var(--font-stencil)" }}>
              COMPUTER SOCIETY OF INDIA
            </p>
            <p className="mt-2 font-display text-sm italic text-muted">
              Vidyalankar Institute of Technology · Mumbai · Tenure 2026 – 27
            </p>
            <p className="mt-6 max-w-md font-mono text-[11px] uppercase tracking-widest text-muted">
              A student chapter of a broader society of engineers, publishers,
              tinkerers and troublemakers. Since 2008.
            </p>
          </div>

          <div>
            <p className="kicker">Programme</p>
            <ul className="mt-3 space-y-2 font-mono text-[12px] uppercase tracking-widest">
              <li><Link href="/events" className="hover:text-rust">Events</Link></li>
              <li><Link href="/auth" className="hover:text-rust">Get a Ticket</Link></li>
              <li><Link href="/#about" className="hover:text-rust">The Society</Link></li>
            </ul>
          </div>

          <div>
            <p className="kicker">Elsewhere</p>
            <ul className="mt-3 space-y-2 font-mono text-[12px] uppercase tracking-widest">
              <li className="flex items-center gap-2"><Instagram className="h-3 w-3" /> Instagram</li>
              <li className="flex items-center gap-2"><Linkedin className="h-3 w-3" /> LinkedIn</li>
              <li className="flex items-center gap-2"><Github className="h-3 w-3" /> GitHub</li>
            </ul>
          </div>
        </div>

        <div className="dashed-rule mt-12 text-sepia/60" />
        <div className="mt-4 flex flex-col items-start justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-muted md:flex-row">
          <span>© CSI VIT 2026 · All rights reserved</span>
          <span>Printed in Mumbai · Vol. XVIII · No. 01</span>
        </div>
      </div>
    </footer>
  );
}
