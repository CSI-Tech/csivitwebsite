import Masthead from "@/components/Masthead";
import EventGrid from "@/components/EventGrid";
import PageTransition from "@/components/PageTransition";
import { seedEvents } from "@/lib/events-data";
import Event from "@/models/Event";
import { connectToDatabase } from "@/lib/mongodb";

export const metadata = { title: "The Programme · CSI VIT" };

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
      <Masthead />

      <section className="container-editorial mt-14">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="kicker">Programme · Tenure 2026–27</p>
            <h1 className="mt-2 font-display text-5xl leading-none text-ink md:text-7xl">
              The Society's Programme
            </h1>
          </div>
          <div className="text-left md:text-right">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Events / 2026-27
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {events.length.toString().padStart(2, "0")} listings on file
            </p>
          </div>
        </div>

        <div className="rule-double mt-8" />
      </section>

      <section className="container-editorial mt-14 pb-14">
        <EventGrid events={events} />
      </section>

      <section className="container-editorial mt-6 hidden md:block">
        <div className="rule-double" />
        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted">
          End of programme · Continued in the next issue
        </p>
      </section>
    </PageTransition>
  );
}
