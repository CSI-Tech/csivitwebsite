import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Poster from "./Poster";

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
  return (
    <Link
      href={`/events/${event.slug}`}
      className={`group relative block border border-sepia/40 bg-cream transition-transform hover:-translate-y-1 hover:shadow-ticket ${
        size === "lg" ? "row-span-2" : ""
      }`}
    >
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
            View Event <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
