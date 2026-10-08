import VintagePosterArt from "./events/VintagePosterArt";

export default function Poster({ variant = "codecrush", title, category, date, event }) {
  // If a full event object was passed, render VintagePosterArt directly
  if (event) {
    return <VintagePosterArt event={event} size="card" />;
  }

  // Construct synthetic event object to maintain backward compatibility with (variant, title, category, date)
  const syntheticEvent = {
    slug: variant,
    title: title || variant,
    category: category || "Programme",
    date: date || "2026-10-15",
    tagline: "Official Society Dispatch",
    venue: "VIT Mumbai"
  };

  return <VintagePosterArt event={syntheticEvent} size="card" />;
}
