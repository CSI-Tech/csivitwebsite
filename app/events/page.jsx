import Masthead from "@/components/Masthead";
import EventGrid from "@/components/EventGrid";
import PageTransition from "@/components/PageTransition";
import OldBombayScene from "@/components/events/OldBombayScene";
import { seedEvents } from "@/lib/events-data";
import Event from "@/models/Event";
import { connectToDatabase } from "@/lib/mongodb";

export const metadata = {
  title: "The Programme · Old Bombay Experience · CSI VIT",
  description:
    "An immersive Old Bombay street experience browsing the Computer Society of India, VIT Student Chapter events programme."
};

async function loadEvents() {
  try {
    await connectToDatabase();
    const db = await Event.find({}).sort({ date: 1 }).lean();
    if (db.length > 0) return db.map((e) => ({ ...e, _id: String(e._id) }));
  } catch {}
  return seedEvents;
}

export default async function EventsPage() {
  const events = await loadEvents();

  return (
    <PageTransition>
      {/* 1. Existing site header / masthead */}
      <Masthead />

      {/* 2. INTRO: Editorial introduction to the Old Bombay Programme */}
      <section className="container-editorial mt-10 md:mt-14">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="kicker text-rust font-semibold">
              Bombay Fort District · Programme Gazette · Tenure 2026–27
            </p>
            <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-7xl">
              The Society's Programme
            </h1>
            <p className="mt-4 font-body text-base text-sepia/90 leading-relaxed md:text-lg">
              Step into the streets of Old Bombay. Turn the pages of your broadsheet dispatch to inspect
              the physical notices posted on the society board in the street center.
            </p>
          </div>

          <div className="text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-rust/70 pl-3 md:pl-0 md:pr-4 py-1">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Tenure 2026–27
            </p>
            <p className="mt-1 font-mono text-sm font-bold uppercase tracking-widest text-ink">
              {events.length.toString().padStart(2, "0")} Dispatches on File
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-rust">
              Turn pages or use ← → keys
            </p>
          </div>
        </div>

        <div className="rule-double mt-8" />
      </section>

      {/* 3 & 4. IMMERSIVE STICKY SCROLL SCENE & EVENT INFORMATION */}
      <section className="mt-8 w-full">
        <OldBombayScene events={events} />
      </section>

      {/* 5. AFTER LAST EVENT: Transition out of sticky scene into Full Archival Directory */}
      <section className="container-editorial mt-20 pt-8">
        <div className="rule-double mb-10" />

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end mb-10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest2 text-rust">
              COMPREHENSIVE LEDGER
            </span>
            <h2 className="mt-1 font-display text-3xl text-ink md:text-4xl">
              Complete Society Archive
            </h2>
            <p className="mt-1 font-body text-sm text-sepia">
              All active sessions and convocations available for direct review and registration.
            </p>
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Section II · Permanent Records
          </p>
        </div>

        {/* Existing Grid displaying all events */}
        <EventGrid events={events} />
      </section>

      {/* 6. Page Ending / Signoff */}
      <section className="container-editorial mt-16 pb-16">
        <div className="rule-double" />
        <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-widest text-muted">
          End of Programme · Computer Society of India · VIT Mumbai Chapter · Continued in the Next Issue
        </p>
      </section>
    </PageTransition>
  );
}
