"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import TransparentSeal from "./TransparentSeal";
import { Ticket, ArrowLeft, LogOut, Download, Check, Calendar, MapPin, Users, ArrowUpRight } from "lucide-react";
import { seedEvents } from "@/lib/events-data";

export default function TicketProfile() {
  const { data: session, status } = useSession();
  const [passengerName, setPassengerName] = useState("");
  const [email, setEmail] = useState("");
  const [regDate, setRegDate] = useState("date of registration");
  const [saved, setSaved] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [loadingRegs, setLoadingRegs] = useState(true);

  useEffect(() => {
    if (session?.user) {
      setPassengerName(session.user.name || "");
      setEmail(session.user.email || "");
      setRegDate(new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }));
    }
  }, [session]);

  // Load user registered passes
  useEffect(() => {
    let localRegs = [];
    try {
      localRegs = JSON.parse(localStorage.getItem("csi_user_registrations") || "[]");
    } catch {}

    async function fetchServerRegs() {
      const targetEmail = session?.user?.email || email;
      try {
        if (targetEmail) {
          const res = await fetch(`/api/user/registrations?email=${encodeURIComponent(targetEmail)}`);
          const data = await res.json();
          if (data?.registrations?.length) {
            // Merge server and local, avoiding duplicates
            const slugs = new Set(data.registrations.map((r) => r.eventSlug || r.slug));
            const extraLocal = localRegs.filter((lr) => !slugs.has(lr.slug || lr.eventSlug));
            setRegistrations([...data.registrations, ...extraLocal]);
            setLoadingRegs(false);
            return;
          }
        }
      } catch {}

      // Fallback to local
      setRegistrations(localRegs);
      setLoadingRegs(false);
    }

    fetchServerRegs();
  }, [session, email]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto w-full max-w-[840px] select-none pb-12">
      {/* Top action controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-[#efe8db]">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1c140d]/80 hover:bg-[#2e1d10] border border-[#7a4a24]/60 transition-colors hover:text-[#d99453]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Society
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/events"
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1c140d]/80 hover:bg-[#2e1d10] border border-[#7a4a24]/60 transition-colors hover:text-[#d99453]"
          >
            <Ticket className="h-3.5 w-3.5" /> Browse Events
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1c140d]/80 hover:bg-[#2e1d10] border border-[#7a4a24]/60 transition-colors hover:text-[#d99453]"
          >
            <Download className="h-3.5 w-3.5" /> Print / Save Pass
          </button>
          {session?.user && (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#3a1d13]/80 hover:bg-[#5a2a1a] border border-[#a35a25]/60 text-[#f5efe1] transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          )}
        </div>
      </div>

      {/* TICKET CONTAINER */}
      <div className="relative shadow-2xl">
        {/* Perforated edge holes */}
        <PerfEdge side="left" />
        <PerfEdge side="right" />

        {/* Main Ticket Base */}
        <div
          className="mx-5 sm:mx-8 md:mx-10 p-3 sm:p-5 md:p-6"
          style={{ background: "#c9b7a5" }}
        >
          {/* Outer Dashed Border Frame */}
          <div
            className="p-3 sm:p-4 md:p-5"
            style={{
              border: "3.5px dashed #a35a25",
              background: "#d9d1c3"
            }}
          >
            {/* 1. HEADER BAND */}
            <div className="relative grid grid-cols-[1.35fr_0.65fr] items-stretch border-b border-[#a35a25]/40">
              {/* Left Orange Section */}
              <div
                className="relative flex items-center px-4 py-3 sm:px-6 sm:py-4"
                style={{ background: "#a35a25", color: "#efe8db" }}
              >
                <p
                  className="font-mono text-base font-bold leading-tight tracking-widest uppercase sm:text-lg md:text-2xl"
                  style={{ fontFamily: "var(--font-mono, 'VT323', monospace)" }}
                >
                  CSI - VIT,<br />STUDENT CHAPTER
                </p>
              </div>

              {/* Right Year Box */}
              <div
                className="flex items-center justify-end px-4 py-3 sm:px-6 sm:py-4"
                style={{ background: "#d9d1c3" }}
              >
                <p
                  className="font-mono text-2xl font-bold tracking-widest text-ink sm:text-3xl md:text-4xl"
                  style={{ fontFamily: "var(--font-mono, 'VT323', monospace)" }}
                >
                  2026-2027
                </p>
              </div>

              {/* Transparent CSI VIT Seal Straddling Header */}
              <TransparentSeal
                className="pointer-events-none absolute left-[62%] top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20 drop-shadow-md"
                alt="CSI VIT seal"
              />
            </div>

            {/* 2. BODY SECTIONS */}
            <div className="pt-5 space-y-4 text-[#1a1a1a]">
              
              {/* SECTION 1: PASSENGER DETAILS */}
              <div className="space-y-3">
                <p
                  className="font-mono text-lg font-bold tracking-widest uppercase sm:text-xl md:text-2xl"
                  style={{ fontFamily: "var(--font-mono, 'VT323', monospace)" }}
                >
                  PASSENGER DETAILS
                </p>
                <div className="space-y-2.5">
                  <div
                    className="flex flex-col gap-1.5 font-mono text-lg sm:flex-row sm:items-center sm:gap-3 md:text-2xl"
                    style={{ fontFamily: "var(--font-mono, 'VT323', monospace)" }}
                  >
                    <span className="w-full shrink-0 tracking-widest uppercase sm:w-32 md:w-36 font-semibold">
                      PASSENGER:
                    </span>
                    <input
                      type="text"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      placeholder="TEXT BOX HERE"
                      className="ticket-box-input"
                    />
                  </div>

                  <div
                    className="flex flex-col gap-1.5 font-mono text-lg sm:flex-row sm:items-center sm:gap-3 md:text-2xl"
                    style={{ fontFamily: "var(--font-mono, 'VT323', monospace)" }}
                  >
                    <span className="w-full shrink-0 tracking-widest uppercase sm:w-32 md:w-36 font-semibold">
                      EMAIL:
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="TEXT BOX HERE"
                      className="ticket-box-input"
                    />
                  </div>
                </div>
              </div>

              {/* DASHED DIVIDER */}
              <div className="dashed-rule-sepia" />

              {/* SECTION 2: REGISTERED EVENT PASSES */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p
                    className="font-mono text-lg font-bold tracking-widest uppercase sm:text-xl md:text-2xl"
                    style={{ fontFamily: "var(--font-mono, 'VT323', monospace)" }}
                  >
                    REGISTERED CONVOCATIONS & DISPATCHES
                  </p>
                  <span className="border border-[#a35a25] bg-[#a35a25]/10 px-2 py-0.5 font-mono text-xs uppercase tracking-widest text-[#a35a25] font-bold">
                    {registrations.length} BOOKED
                  </span>
                </div>

                {registrations.length === 0 ? (
                  <div className="border border-dashed border-[#a35a25]/60 bg-[#cfc5b4]/50 p-4 text-center">
                    <p
                      className="font-mono text-base uppercase tracking-wider text-[#4a3b2c] sm:text-lg"
                      style={{ fontFamily: "var(--font-mono, 'VT323', monospace)" }}
                    >
                      NO CONVOCATION PASSES DISPATCHED YET
                    </p>
                    <Link
                      href="/events"
                      className="mt-2 inline-flex items-center gap-1.5 border border-[#a35a25] bg-[#a35a25] px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#efe8db] hover:bg-[#854519] transition-colors"
                    >
                      <span>Examine The Programme & Claim Seats</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {registrations.map((reg, idx) => {
                      const slug = reg.eventSlug || reg.slug;
                      const eventDetails =
                        reg.event ||
                        seedEvents.find((e) => e.slug === slug) || {
                          title: reg.eventTitle || slug,
                          date: "2026-10-13",
                          time: "16:00 IST",
                          venue: "VIT Mumbai"
                        };

                      return (
                        <div
                          key={slug + idx}
                          className="relative flex flex-col justify-between gap-2 border-2 border-[#a35a25]/70 bg-[#ece4d5] p-3 sm:flex-row sm:items-center"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="inline-block h-2 w-2 rounded-full bg-[#a35a25]" />
                              <h4
                                className="font-mono text-xl font-bold uppercase text-[#1a1a1a] sm:text-2xl"
                                style={{ fontFamily: "var(--font-mono, 'VT323', monospace)" }}
                              >
                                {eventDetails.title || reg.eventTitle || slug}
                              </h4>
                              {reg.type === "team" && (
                                <span className="rounded bg-[#a35a25] px-1.5 py-0.2 font-mono text-[11px] uppercase text-[#efe8db]">
                                  TEAM: {reg.teamName || "REGISTERED"}
                                </span>
                              )}
                            </div>
                            <div
                              className="flex flex-wrap items-center gap-3 font-mono text-sm text-[#4a3b2c] sm:text-base"
                              style={{ fontFamily: "var(--font-mono, 'VT323', monospace)" }}
                            >
                              <span>{eventDetails.date || "OCT 2026"}</span>
                              <span>·</span>
                              <span>{eventDetails.time || "16:00 IST"}</span>
                              <span>·</span>
                              <span>{eventDetails.venue || "VIT MUMBAI"}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="border border-[#a35a25] bg-[#a35a25]/15 px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-[#a35a25] font-bold">
                              ★ CONFIRMED PASS
                            </span>
                            <Link
                              href={`/events/${slug}`}
                              className="inline-flex items-center gap-1 border border-[#1a1a1a] bg-[#1a1a1a] px-2.5 py-1 font-mono text-xs uppercase tracking-widest text-[#efe8db] hover:bg-[#a35a25] transition-colors"
                            >
                              <span>Dossier</span>
                              <ArrowUpRight className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* DASHED DIVIDER */}
              <div className="dashed-rule-sepia" />

              {/* SECTION 3: TERMS OF JOURNEY */}
              <div className="space-y-1.5">
                <p
                  className="font-mono text-lg font-bold tracking-widest uppercase sm:text-xl md:text-2xl"
                  style={{ fontFamily: "var(--font-mono, 'VT323', monospace)" }}
                >
                  TERMS OF JOURNEY
                </p>
                <div
                  className="space-y-1 font-mono text-base tracking-wider sm:text-lg md:text-xl"
                  style={{ fontFamily: "var(--font-mono, 'VT323', monospace)" }}
                >
                  <p>
                    <span className="font-semibold tracking-widest uppercase">VALID FROM:</span>{" "}
                    {regDate}
                  </p>
                  <p>
                    <span className="font-semibold tracking-widest uppercase">VALID UNTIL:</span>{" "}
                    end of tenure
                  </p>
                </div>
              </div>

              {/* DASHED DIVIDER */}
              <div className="dashed-rule-sepia" />

              {/* SECTION 4: JOURNEY MUST COMMENCE */}
              <div className="space-y-0.5">
                <p
                  className="font-mono text-lg font-bold tracking-widest uppercase sm:text-xl md:text-2xl"
                  style={{ fontFamily: "var(--font-mono, 'VT323', monospace)" }}
                >
                  JOURNEY MUST COMMENCE
                </p>
                <p
                  className="font-mono text-base lowercase tracking-wide sm:text-lg md:text-xl text-[#2a2a2a]"
                  style={{ fontFamily: "var(--font-mono, 'VT323', monospace)" }}
                >
                  within the validity period mentioned above
                </p>
              </div>

              {/* DASHED DIVIDER */}
              <div className="dashed-rule-sepia" />

              {/* SECTION 5: ONE PASS, ONE PASSENGER. */}
              <div className="pt-1 pb-2">
                <p
                  className="font-mono text-2xl font-bold tracking-widest uppercase sm:text-3xl md:text-4xl text-[#1a1a1a]"
                  style={{ fontFamily: "var(--font-mono, 'VT323', monospace)" }}
                >
                  ONE PASS, ONE PASSENGER.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Inline styling matching exact vintage ticket */}
      <style jsx>{`
        .ticket-box-input {
          background: #ffffff;
          border: 1.5px solid rgba(26, 26, 26, 0.7);
          padding: 3px 10px;
          font-family: var(--font-mono, 'VT323', monospace);
          font-size: 18px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1a1a1a;
          min-width: 0;
          width: 100%;
          max-width: 280px;
          outline: none;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
        }
        .ticket-box-input::placeholder {
          color: rgba(26, 26, 26, 0.45);
        }
        .dashed-rule-sepia {
          border-top: 2px dashed rgba(163, 90, 37, 0.75);
          margin-top: 0.85rem;
          margin-bottom: 0.85rem;
        }
        @media (min-width: 640px) {
          .ticket-box-input {
            font-size: 20px;
            max-width: 320px;
          }
        }
        @media print {
          body {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}

function PerfEdge({ side }) {
  const dots = Array.from({ length: 9 });
  return (
    <div
      className={`pointer-events-none absolute top-0 flex h-full w-5 flex-col items-center justify-around py-4 sm:w-8 md:w-10 ${
        side === "left" ? "left-0" : "right-0"
      }`}
      style={{ background: "#c9b7a5" }}
    >
      {dots.map((_, i) => (
        <span
          key={i}
          className="block h-3.5 w-3.5 rounded-full sm:h-5 sm:w-5 md:h-6 md:w-6 shadow-inner"
          style={{ background: "#1c140d" }}
        />
      ))}
    </div>
  );
}
