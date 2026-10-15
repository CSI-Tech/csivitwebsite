"use client";

import { useState } from "react";
import { Ticket, ArrowUpRight } from "lucide-react";
import EventRegistrationModal from "@/components/events/EventRegistrationModal";

export default function RegisterButton({ slug, open, registrationUrl, event }) {
  const [modalOpen, setModalOpen] = useState(false);

  const resolvedEvent = event || { slug, registrationUrl };

  // External registration (e.g. Unstop) — direct link, no modal needed.
  if (registrationUrl) {
    return (
      <a
        href={registrationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-ticket inline-flex items-center justify-center gap-2 whitespace-normal text-center !text-sm !tracking-widest shadow-lg transition-all hover:shadow-xl sm:!text-base sm:!px-8 sm:!py-3.5"
      >
        <Ticket className="h-5 w-5 shrink-0" />
        <span>Register on Unstop</span>
        <ArrowUpRight className="h-4 w-4 shrink-0" />
      </a>
    );
  }

  if (!open) {
    return (
      <button disabled className="btn-ghost cursor-not-allowed opacity-70">
        Registrations closed
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="btn-ticket flex items-center justify-center gap-2 !text-sm !tracking-widest shadow-lg transition-all hover:shadow-xl sm:!text-base sm:!px-8 sm:!py-3.5"
      >
        <Ticket className="h-5 w-5 shrink-0" />
        <span>Register Now</span>
      </button>

      <EventRegistrationModal
        event={resolvedEvent}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
