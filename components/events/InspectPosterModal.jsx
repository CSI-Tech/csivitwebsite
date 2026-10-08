"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, ArrowUpRight, Calendar, Clock, MapPin, Users, CheckCircle2 } from "lucide-react";
import VintagePosterArt from "./VintagePosterArt";

export default function InspectPosterModal({ event, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detailed inspection of ${event.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
    >
      {/* Backdrop with dark sepia overlay and film grain */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden border-2 border-sepia/70 bg-[#f7f2e7] text-ink shadow-ticket md:flex-row">
        {/* Left: Physical Poster View */}
        <div className="relative flex aspect-[4/5] w-full items-center justify-center border-b border-sepia/40 bg-coal/90 p-4 md:w-5/12 md:border-b-0 md:border-r">
          <div className="relative h-full max-h-[520px] w-full shadow-2xl flex items-center justify-center overflow-hidden rounded-[7px]">
            {event.image ? (
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-contain rounded-[7px] border-2 border-sepia"
              />
            ) : (
              <VintagePosterArt event={event} size="expanded" />
            )}
          </div>
        </div>

        {/* Right: Editorial Dossier & Particulars */}
        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-6 md:p-8">
          <div>
            {/* Header info */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest2 text-rust">
                  CSI VIT · OFFICIAL PARTICULARS
                </span>
                <h3 className="mt-1 font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
                  {event.title}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
                  {event.category}
                </p>
              </div>

              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center border border-sepia/40 bg-cream text-sepia transition-colors hover:bg-sepia hover:text-cream"
                aria-label="Close particulars dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Tagline */}
            <blockquote className="mt-4 border-l-2 border-rust/70 pl-3 font-body text-base italic text-sepia/90">
              "{event.tagline}"
            </blockquote>

            {/* Description */}
            <p className="mt-4 font-body text-sm leading-relaxed text-sepia">
              {event.description || event.shortDescription}
            </p>

            {/* Metric grid */}
            <div className="mt-6 grid grid-cols-2 gap-3 border-y border-sepia/30 py-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-sepia">
                <Calendar className="h-4 w-4 text-rust" />
                <span>{event.date || "TBA"}</span>
              </div>
              <div className="flex items-center gap-2 text-sepia">
                <Clock className="h-4 w-4 text-rust" />
                <span>{event.time || "10:00 IST"}</span>
              </div>
              <div className="flex items-center gap-2 text-sepia">
                <MapPin className="h-4 w-4 text-rust" />
                <span>{event.venue || "VIT Mumbai"}</span>
              </div>
              <div className="flex items-center gap-2 text-sepia">
                <Users className="h-4 w-4 text-rust" />
                <span>{event.teamSize || "Individual"}</span>
              </div>
            </div>

            {/* Highlights */}
            {event.features && event.features.length > 0 && (
              <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  Key Features
                </p>
                <ul className="mt-2 space-y-1.5 font-body text-xs text-sepia">
                  {event.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-rust shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-sepia/30 pt-5">
            <Link
              href={`/events/${event.slug}`}
              className="btn-ticket inline-flex items-center gap-2"
              onClick={onClose}
            >
              <span>Register Now</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              {event.registrationOpen !== false ? "Registrations Open" : "Registrations Concluded"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
