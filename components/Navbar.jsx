"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Ticket } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/teams", label: "Teams" }
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (pathname?.startsWith("/auth") || pathname?.startsWith("/teams") || pathname?.startsWith("/profile")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-sepia/30 bg-paper/85 backdrop-blur-sm">
      <div className="container-editorial flex h-14 items-center justify-between">
        <Link href="/" className="flex shrink-0 items-center" aria-label="CSI VIT home">
          <Image
            src="/images/csi-logo-dark.png"
            alt="CSI VIT"
            width={142}
            height={44}
            priority
            className="h-8 w-auto object-contain sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-mono text-[11px] uppercase tracking-widest2 transition-colors ${pathname === l.href ? "text-sepia" : "text-muted hover:text-sepia"
                }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {session?.user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-sepia hover:text-rust underline underline-offset-4"
                title="View Passenger Pass"
              >
                <Ticket className="h-3 w-3" />
                <span>{session.user.name?.split(" ")[0] || "Passenger"}</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="font-mono text-[11px] uppercase tracking-widest text-sepia hover:text-rust"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth" className="btn-ticket">
              <Ticket className="h-3.5 w-3.5" /> Get Your Ticket
            </Link>
          )}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-sepia"
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-sepia/20 bg-cream md:hidden">
          <div className="container-editorial flex flex-col gap-4 py-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-xs uppercase tracking-widest text-sepia"
              >
                {l.label}
              </Link>
            ))}
            {session?.user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sepia"
                >
                  <Ticket className="h-3.5 w-3.5" /> My Pass ({session.user.name?.split(" ")[0] || "Passenger"})
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-left font-mono text-xs uppercase tracking-widest text-rust"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth" className="btn-ticket w-fit">
                <Ticket className="h-3.5 w-3.5" /> Get Your Ticket
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
