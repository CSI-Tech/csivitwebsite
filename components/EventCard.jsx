"use client";

import { useState } from "react";
import { ArrowUpRight, Ticket } from "lucide-react";
import Poster from "./Poster";
import EventRegistrationModal from "./events/EventRegistrationModal";

function formatDate(d) {
  if (!d) return "TBA";
  try {
    return new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).toUpperCase();
  } catch {
    return d;
  }
}

export default function EventCard({ event, size = "md" }) {
  const [open, setOpen] = useState(false);

  function handleCardClick(e) {
    // External event: don't trap the click, let the <a> fire natively.
    if (event.registrationUrl) {
      window.open(event.registrationUrl, "_blank", "noopener");
      return;
    }
    e.preventDefault();
    setOpen(true);
  }

  const cls = `group relative block w-full text-left border border-sepia/40 bg-cream transition-transform hover:-translate-y-1 hover:shadow-ticket ${
    size === "lg" ? "row-span-2" : ""
  }`;

  return (
    <>
      <button type="button" onClick={handleCardClick} className={cls}>
        <div className="relative overflow-hidden">
          <div className="transition-transform duration-700 group-hover:scale-[1.03]">
            <Poster
              event={event}
              variant={event.poster || event.slug}
              title={event.title.toUpperCase()}
              category={event.category}
              date={formatDate(event.date)}
            />
          </div>
        </div>

        <div className="border-t border-sepia/30 p-5">
          <p className="kicker">{event.category}</p>
          <h3 className="mt-1 font-display text-xl text-ink">{event.title}</h3>
          <p className="mt-2 line-clamp-2 font-body text-sm text-muted">
            {event.shortDescription}
          </p>
          <div className="dashed-rule mt-4 text-sepia/50" />
          <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-sepia">
            <span>{formatDate(event.date)} · {event.venue?.split(",")[0] || "VIT MUMBAI"}</span>
            <span className="inline-flex items-center gap-1 transition-transform group-hover:translate-x-1">
              <Ticket className="h-3.5 w-3.5" /> Register
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </button>

      <EventRegistrationModal
        event={event}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
