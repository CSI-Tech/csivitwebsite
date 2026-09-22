import Link from "next/link";
import Masthead from "@/components/Masthead";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import PageTransition from "@/components/PageTransition";
import { seedEvents } from "@/lib/events-data";
import Event from "@/models/Event";
import { connectToDatabase } from "@/lib/mongodb";
import { ArrowRight } from "lucide-react";

async function loadEvents() {
  try {
    await connectToDatabase();
    const db = await Event.find({}).sort({ date: 1 }).limit(3).lean();
    if (db.length > 0) return db.map((e) => ({ ...e, _id: String(e._id) }));
  } catch {}
  return seedEvents.slice(0, 3);
}

export default async function HomePage() {
  const events = await loadEvents();

  return (
    <PageTransition>
      <Masthead />
      <Hero />

      {/* Current Affairs */}
      <section className="container-editorial page-in mt-24">
        <div className="flex items-end justify-between border-b border-sepia/40 pb-4">
          <div>
            <p className="kicker">Section II</p>
            <h2 className="mt-1 font-display text-4xl text-ink md:text-6xl">Current Affairs</h2>
          </div>
          <p className="hidden max-w-sm text-right font-body text-sm italic text-muted md:block">
            The events currently running through the society. Pull a ticket, take a seat.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-6">
          <div className="md:col-span-3">
            <EventCard event={events[0]} />
          </div>
          <div className="md:col-span-3 md:mt-16">
            <EventCard event={events[1]} />
          </div>
          <div className="md:col-span-4 md:col-start-2">
            <EventCard event={events[2]} />
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <Link href="/events" className="btn-ghost">
            The full programme <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Stamps strip */}
      <section className="container-editorial mt-24 hidden md:block">
        <div className="rule-double mb-6" />
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
          <span>Mumbai · 100</span>
          <span>Est. 2008</span>
          <span>Vol. XVIII</span>
          <span>No. 01</span>
          <span>Printed at VIT</span>
        </div>
        <div className="rule-double mt-6" />
      </section>

      {/* About */}
      <section id="about" className="container-editorial page-in mt-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="kicker">Section III</p>
            <h2 className="mt-2 font-display text-4xl text-ink md:text-5xl">The Society</h2>
          </div>
          <div className="md:col-span-8">
            <p className="font-body text-lg leading-relaxed text-sepia">
              The Computer Society of India — VIT Student Chapter — is a
              collective of engineers, publishers, tinkerers and troublemakers
              operating out of Mumbai since 2008. We run programmes on coding,
              systems, design and product, and publish a small quantity of
              trouble on the side.
            </p>
            <p className="mt-4 font-body italic text-muted">
              "Where logic meets deception." — the tenure motto, 2026–27.
            </p>

            <div className="mt-8 grid grid-cols-3 divide-x divide-sepia/30 border border-sepia/30 bg-cream">
              <Stat k="17" v="Years running" />
              <Stat k="42" v="Events / year" />
              <Stat k="600+" v="Members strong" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-editorial mt-24">
        <div className="rule-double mb-10" />
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="kicker">A closing note</p>
          <h3 className="font-display text-3xl text-ink md:text-4xl max-w-2xl">
            The society is currently accepting passengers for the 2026–27 tenure.
          </h3>
          <Link href="/auth" className="btn-ticket">
            Get your ticket <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}

function Stat({ k, v }) {
  return (
    <div className="p-6 text-center">
      <p className="font-stencil text-4xl text-sepia" style={{ fontFamily: "var(--font-stencil)" }}>
        {k}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">{v}</p>
    </div>
  );
}
