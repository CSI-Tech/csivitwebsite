"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock, MapPin, CheckCircle2 } from "lucide-react";
import VintagePosterArt from "./VintagePosterArt";

export default function OldBombayScene({ events = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [turnDirection, setTurnDirection] = useState(null); // "forward" | "backward" | null
  const [isTurning, setIsTurning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const totalEvents = events.length || 1;
  const currentEvent = events[currentIndex] || events[0];

  // Turn page forward
  const turnNext = useCallback(() => {
    if (isTurning || !events.length) return;
    const nextIdx = (currentIndex + 1) % totalEvents;

    if (prefersReducedMotion) {
      setCurrentIndex(nextIdx);
      return;
    }

    setTurnDirection("forward");
    setIsTurning(true);

    // Synchronize page flip: update index midway as page passes vertical
    setTimeout(() => {
      setCurrentIndex(nextIdx);
    }, 400);

    setTimeout(() => {
      setIsTurning(false);
      setTurnDirection(null);
    }, 820);
  }, [isTurning, currentIndex, totalEvents, prefersReducedMotion, events.length]);

  // Turn page backward
  const turnPrev = useCallback(() => {
    if (isTurning || !events.length) return;
    const prevIdx = (currentIndex - 1 + totalEvents) % totalEvents;

    if (prefersReducedMotion) {
      setCurrentIndex(prevIdx);
      return;
    }

    setTurnDirection("backward");
    setIsTurning(true);

    setTimeout(() => {
      setCurrentIndex(prevIdx);
    }, 400);

    setTimeout(() => {
      setIsTurning(false);
      setTurnDirection(null);
    }, 820);
  }, [isTurning, currentIndex, totalEvents, prefersReducedMotion, events.length]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") turnNext();
      if (e.key === "ArrowLeft") turnPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [turnNext, turnPrev]);

  if (!events.length) return null;

  return (
    <div className="relative w-full overflow-hidden bg-[#11100f] py-4 select-none">
      {/* SCENE CONTAINER (Preserves cinematic framing) */}
      <div className="relative mx-auto w-full max-w-[1400px] aspect-[16/10] min-h-[580px] max-h-[820px] overflow-hidden rounded-lg border border-sepia/50 shadow-2xl bg-[#0e0d0b]">
        {/* Layer 1: Background Street Scene */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/bombay-scene-clean.webp')"
          }}
        />

        {/* Vintage Atmospheric Gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
        <div className="pointer-events-none absolute inset-0 film-grain opacity-35" />

        {/* TOP STATUS BAR (Minimal, clean, authentic) */}
        <div className="absolute left-6 right-6 top-5 z-20 flex items-center justify-between text-cream/90 font-mono text-xs uppercase tracking-widest pointer-events-none">
          <div className="flex items-center gap-2 border border-sepia/40 bg-black/60 px-3 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-rust" />
            <span>CSI VIT · BOMBAY STREET PROGRAMME</span>
          </div>

          <div className="border border-sepia/40 bg-black/60 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-rust font-bold">
              DISPATCH {String(currentIndex + 1).padStart(2, "0")}
            </span>{" "}
            <span className="text-muted">/</span> {String(totalEvents).padStart(2, "0")}
          </div>
        </div>

        {/* Layer 2: NOTICE BOARD ON STANCHION (Shows event details & poster) */}
        <div
          className="absolute hidden md:block"
          style={{
            left: "39.32%",
            top: "10.53%",
            width: "21.14%",
            height: "46.99%"
          }}
        >
          <div
            key={currentEvent.slug || currentIndex}
            className="relative h-full w-full rounded-[10px] bg-[#181614] p-[3px] shadow-[0_25px_50px_rgba(0,0,0,0.85),0_0_0_2px_rgba(40,35,30,0.95)] animate-board-swap"
          >
            {/* Corner mounting bolts */}
            <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full border border-black/80 bg-[#4a4238]" />
            <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full border border-black/80 bg-[#4a4238]" />
            <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full border border-black/80 bg-[#4a4238]" />
            <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full border border-black/80 bg-[#4a4238]" />

            {/* Top vintage clip */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 h-3 w-14 -rotate-1 rounded-sm border border-yellow-900/30 bg-[#c8b792]/90 shadow-sm" />

            {/* Poster content */}
            <div className="relative h-full w-full overflow-hidden rounded-[7px] bg-[#221e1a]">
              <VintagePosterArt event={currentEvent} size="board" />
            </div>

            {/* Direct action link overlay */}
            {currentEvent.registrationUrl ? (
              <a
                href={currentEvent.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-1.5 whitespace-nowrap border border-rust bg-[#1a1714] px-3 py-1 font-mono text-[8.5px] uppercase tracking-widest text-cream shadow-md transition-all hover:bg-rust"
              >
                <span>Register on Unstop</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            ) : (
              <Link
                href={`/events/${currentEvent.slug}`}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-1.5 whitespace-nowrap border border-rust bg-[#1a1714] px-3 py-1 font-mono text-[8.5px] uppercase tracking-widest text-cream shadow-md transition-all hover:bg-rust"
              >
                <span>{currentEvent.registrationOpen !== false ? "Register Now" : "View Dispatch"}</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            )}
          </div>
        </div>

        {/* MOBILE BOARD DISPLAY */}
        <div className="md:hidden absolute inset-x-5 top-[14%] flex justify-center">
          <div
            key={currentEvent.slug || currentIndex}
            className="relative w-full max-w-[320px] aspect-[4/5] rounded-[10px] bg-[#181614] p-1.5 shadow-[0_20px_45px_rgba(0,0,0,0.9)] animate-board-swap"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[7px]">
              <VintagePosterArt event={currentEvent} size="board" />
            </div>
            {currentEvent.registrationUrl ? (
              <a
                href={currentEvent.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block w-full text-center border border-rust bg-[#1a1714] py-1 font-mono text-[9px] uppercase tracking-widest text-cream hover:bg-rust transition-colors"
              >
                Register on Unstop →
              </a>
            ) : (
              <Link
                href={`/events/${currentEvent.slug}`}
                className="mt-2 block w-full text-center border border-rust bg-[#1a1714] py-1 font-mono text-[9px] uppercase tracking-widest text-cream hover:bg-rust transition-colors"
              >
                {currentEvent.registrationOpen !== false ? "Register Now →" : "View Dispatch →"}
              </Link>
            )}
          </div>
        </div>

        {/* Layer 3: FOREGROUND NEWSPAPER & HANDS WITH 3D PAGE TURN ANIMATION */}
        <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center pointer-events-auto">
          {/* 3D Newspaper Book / Broadsheet Container */}
          <div className="relative w-full max-w-[680px] perspective-newspaper px-4 pb-2">
            {/* The Newspaper Spread */}
            <div className="relative flex h-[190px] sm:h-[220px] md:h-[240px] w-full rounded-t-sm border-t-2 border-sepia/70 bg-[#ebe3d3] text-ink shadow-[0_-15px_35px_rgba(0,0,0,0.7)] preserve-3d">
              {/* Paper newsprint texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage: "radial-gradient(rgba(0,0,0,0.3) 1px, transparent 1px)",
                  backgroundSize: "3px 3px"
                }}
              />

              {/* Center Newspaper Fold Spine */}
              <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-r from-black/15 via-black/25 to-black/15 z-20 shadow-inner" />

              {/* LEFT PAGE (Society Gazette & Current Event Article) */}
              <div
                onClick={turnPrev}
                role="button"
                tabIndex={0}
                aria-label="Previous event dispatch"
                className="relative flex-1 cursor-pointer overflow-hidden border-r border-ink/20 p-3 sm:p-4 select-none hover:bg-[#e4dcce] transition-colors"
              >
                {/* Left Page Masthead */}
                <div className="border-b border-ink/70 pb-1 font-mono text-[7px] sm:text-[8px] uppercase tracking-widest text-ink/75 flex justify-between">
                  <span>THE BOMBAY DISPATCH</span>
                  <span>ISSUE {String(currentIndex + 1).padStart(2, "0")}</span>
                </div>

                <div className="mt-2">
                  <span className="font-mono text-[6.5px] sm:text-[7.5px] uppercase tracking-widest text-rust">
                    CSI VIT BULLETIN
                  </span>
                  <h4 className="mt-0.5 font-display text-xs sm:text-sm font-bold text-ink leading-tight line-clamp-2">
                    {currentEvent.title}: {currentEvent.tagline}
                  </h4>
                  <p className="mt-1.5 font-body text-[8px] sm:text-[9.5px] text-sepia leading-snug line-clamp-3">
                    {currentEvent.shortDescription || currentEvent.description}
                  </p>
                </div>

                {/* Turn Backward Prompt */}
                <div className="absolute bottom-2 left-3 flex items-center gap-1 font-mono text-[6.5px] sm:text-[8px] uppercase tracking-widest text-ink/60">
                  <ArrowLeft className="h-2.5 w-2.5" />
                  <span>Turn Back</span>
                </div>
              </div>

              {/* RIGHT PAGE (Event Particulars & Page Turn Dog-Ear) */}
              <div
                onClick={turnNext}
                role="button"
                tabIndex={0}
                aria-label="Next event dispatch"
                className="relative flex-1 cursor-pointer overflow-hidden p-3 sm:p-4 select-none hover:bg-[#e4dcce] transition-colors"
              >
                {/* Right Page Masthead */}
                <div className="border-b border-ink/70 pb-1 font-mono text-[7px] sm:text-[8px] uppercase tracking-widest text-ink/75 flex justify-between">
                  <span>PROGRAMME PARTICULARS</span>
                  <span>{currentEvent.category}</span>
                </div>

                {/* Particulars Grid */}
                <div className="mt-2 grid grid-cols-2 gap-1.5 font-mono text-[7px] sm:text-[8.5px] text-ink/90 border-b border-dotted border-ink/30 pb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-2.5 w-2.5 text-rust shrink-0" />
                    <span className="truncate">{currentEvent.date || "TBA"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5 text-rust shrink-0" />
                    <span>{currentEvent.time || "10:00 IST"}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-1 truncate">
                    <MapPin className="h-2.5 w-2.5 text-rust shrink-0" />
                    <span className="truncate">{currentEvent.venue || "VIT Mumbai"}</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-[7px] sm:text-[8px] uppercase text-rust font-semibold">
                    {currentEvent.registrationOpen !== false ? "● REGISTRATIONS OPEN" : "● CONCLUDED"}
                  </span>
                  <Link
                    href={`/events/${currentEvent.slug}`}
                    className="font-mono text-[7px] sm:text-[8px] uppercase underline underline-offset-2 hover:text-rust"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Page →
                  </Link>
                </div>

                {/* Page Turn Dog-Ear Prompt */}
                <div className="absolute bottom-2 right-3 flex items-center gap-1 font-mono text-[7px] sm:text-[8px] uppercase tracking-widest text-rust font-bold animate-pulse">
                  <span>Turn Page</span>
                  <ArrowRight className="h-2.5 w-2.5" />
                </div>
              </div>

              {/* DYNAMIC 3D TURNING FLIP SHEET (Animated on click) */}
              {isTurning && (
                <div
                  className={`absolute inset-y-0 ${
                    turnDirection === "forward"
                      ? "left-1/2 w-1/2 animate-page-turn-forward"
                      : "right-1/2 w-1/2 animate-page-turn-backward"
                  } z-30 bg-[#e7dfce] border-l border-ink/40 p-3 shadow-2xl preserve-3d`}
                  style={{
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                  }}
                >
                  <div className="font-mono text-[7px] uppercase tracking-widest text-ink/50 border-b border-ink/30 pb-1">
                    TURNING DISPATCH...
                  </div>
                  <div className="mt-4 flex flex-col items-center justify-center">
                    <div className="h-8 w-8 rounded-full border-2 border-rust border-t-transparent animate-spin" />
                    <p className="mt-2 font-mono text-[8px] uppercase tracking-widest text-ink/70">
                      Next Society Notice
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* HANDS (Left hand on left edge, Right hand on right edge) */}
            <div className="pointer-events-none absolute -bottom-2 -left-6 z-40 sm:-left-8">
              <div
                className={`relative transition-transform ${
                  isTurning && turnDirection === "backward" ? "animate-hand-turn-left" : ""
                }`}
              >
                {/* Vintage Left Hand Illustration / Cutout */}
                <div className="h-16 w-14 sm:h-20 sm:w-16 rounded-tr-3xl bg-gradient-to-tr from-[#9e8b74] via-[#c4b39b] to-[#dfd1bd] shadow-lg border border-black/40 rotate-12 flex items-center justify-center">
                  <div className="h-10 w-2.5 rounded-full bg-[#8c7860]/40 -rotate-6" />
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-2 -right-6 z-40 sm:-right-8">
              <div
                className={`relative transition-transform ${
                  isTurning && turnDirection === "forward" ? "animate-hand-turn-right" : ""
                }`}
              >
                {/* Vintage Right Hand Illustration / Cutout */}
                <div className="h-16 w-14 sm:h-20 sm:w-16 rounded-tl-3xl bg-gradient-to-tl from-[#9e8b74] via-[#c4b39b] to-[#dfd1bd] shadow-lg border border-black/40 -rotate-12 flex items-center justify-center">
                  <div className="h-10 w-2.5 rounded-full bg-[#8c7860]/40 rotate-6" />
                </div>
              </div>
            </div>
          </div>

          {/* PAGE TURN CONTROLS (Clean, tactile, minimal) */}
          <nav
            aria-label="Newspaper page turn controls"
            className="mt-2 mb-1 flex items-center gap-4 bg-black/70 px-4 py-1.5 border border-sepia/50 backdrop-blur-sm"
          >
            <button
              onClick={turnPrev}
              disabled={isTurning}
              className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-cream/80 hover:text-rust transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Prev Page</span>
            </button>

            <span className="text-muted font-mono text-[9px]">|</span>

            {/* Quick Page Dots */}
            <div className="flex items-center gap-1.5">
              {events.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (isTurning || i === currentIndex) return;
                    setIsTurning(true);
                    setTurnDirection(i > currentIndex ? "forward" : "backward");
                    setTimeout(() => setCurrentIndex(i), 400);
                    setTimeout(() => {
                      setIsTurning(false);
                      setTurnDirection(null);
                    }, 820);
                  }}
                  className={`h-2 transition-all ${
                    i === currentIndex ? "w-6 bg-rust" : "w-2 bg-cream/30 hover:bg-cream/60"
                  }`}
                  aria-label={`Jump to page ${i + 1}`}
                />
              ))}
            </div>

            <span className="text-muted font-mono text-[9px]">|</span>

            <button
              onClick={turnNext}
              disabled={isTurning}
              className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-cream/80 hover:text-rust transition-colors disabled:opacity-50"
            >
              <span>Next Page</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
