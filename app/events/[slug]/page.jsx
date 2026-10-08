import { notFound } from "next/navigation";
import PageTransition from "@/components/PageTransition";
import EventHero from "@/components/EventHero";
import RegisterButton from "./RegisterButton";
import Event from "@/models/Event";
import { connectToDatabase } from "@/lib/mongodb";
import { findSeedEvent, seedEvents } from "@/lib/events-data";

export async function generateStaticParams() {
  return seedEvents.map((e) => ({ slug: e.slug }));
}

async function loadEvent(slug) {
  try {
    await connectToDatabase();
    const db = await Event.findOne({ slug }).lean();
    if (db) return { ...db, _id: String(db._id) };
  } catch {}
  return findSeedEvent(slug);
}

export async function generateMetadata({ params }) {
  const e = await loadEvent(params.slug);
  return { title: e ? `${e.title} · CSI VIT` : "Event · CSI VIT" };
}

export default async function EventPage({ params }) {
  const event = await loadEvent(params.slug);
  if (!event) return notFound();

  return (
    <PageTransition>
      <EventHero event={event} />

      {/* About */}
      <section className="container-editorial mt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="kicker">About the event</p>
            <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">
              {event.tagline}
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="font-body text-lg leading-relaxed text-sepia">
              {event.description}
            </p>
          </div>
        </div>
        <div className="rule-double mt-10" />
      </section>

      {/* Details grid */}
      <section className="container-editorial mt-14">
        <p className="kicker">Event details</p>
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-sepia/30 py-8 md:grid-cols-5">
          <Detail label="Date" value={fmt(event.date)} />
          <Detail label="Time" value={event.time || "TBA"} />
          <Detail label="Venue" value={event.venue || "VIT Mumbai"} />
          <Detail label="Team size" value={event.teamSize || "Individual"} />
          <Detail
            label="Registration"
            value={event.registrationOpen ? (event.registrationUrl ? "OPEN ON UNSTOP" : "OPEN") : "CLOSED"}
            tone={event.registrationOpen ? "open" : "closed"}
          />
        </div>
      </section>

      {/* What to expect */}
      <section className="container-editorial mt-14">
        <p className="kicker">What to expect</p>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {(event.features || []).map((f, i) => (
            <div key={i} className="border border-sepia/40 bg-cream p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                No. {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 font-display text-lg text-ink">{f}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rules */}
      <section className="container-editorial mt-14">
        <p className="kicker">The rules of engagement</p>
        <ol className="mt-4 divide-y divide-sepia/30 border-y border-sepia/30">
          {(event.rules || []).map((r, i) => (
            <li key={i} className="grid grid-cols-[3rem_1fr] items-baseline gap-4 py-4">
              <span className="font-stencil text-2xl text-rust" style={{ fontFamily: "var(--font-stencil)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-body text-base text-sepia">{r}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Register CTA */}
      <section className="container-editorial mt-16 pb-16 text-center">
        <div className="rule-double mb-10" />
        <p className="kicker">Take your seat</p>
        <h3 className="mt-2 font-display text-3xl text-ink md:text-4xl">
          {event.registrationOpen
            ? event.registrationUrl
              ? "Registrations are hosted on Unstop. Claim your slot below."
              : "Registrations are open. Welcome aboard."
            : "Registrations are currently closed."}
        </h3>
        <div className="mt-6">
          <RegisterButton
            slug={event.slug}
            open={event.registrationOpen}
            registrationUrl={event.registrationUrl}
          />
        </div>
      </section>
    </PageTransition>
  );
}

function fmt(d) {
  if (!d) return "TBA";
  try {
    return new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  } catch {
    return d;
  }
}

function Detail({ label, value, tone }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</p>
      <p className={`mt-2 font-display text-lg ${tone === "open" ? "text-rust" : tone === "closed" ? "text-navy" : "text-ink"}`}>
        {value}
      </p>
    </div>
  );
}
