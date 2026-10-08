"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Ticket, Loader2, X, Users, User, ArrowUpRight } from "lucide-react";

export default function RegisterButton({ slug, open, registrationUrl }) {
  const { data: session, status } = useSession();
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [regType, setRegType] = useState("individual"); // "individual" | "team"
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");

  useEffect(() => {
    if (session?.user) {
      if (session.user.name && !name) setName(session.user.name);
      if (session.user.email && !email) setEmail(session.user.email);
    }
  }, [session]);

  // Check registration status from API and localStorage
  useEffect(() => {
    let cancel = false;

    // Check localStorage fallback
    try {
      const local = JSON.parse(localStorage.getItem("csi_user_registrations") || "[]");
      if (local.some((r) => r.slug === slug || r.eventSlug === slug)) {
        setRegistered(true);
      }
    } catch {}

    async function check() {
      const checkEmail = session?.user?.email || email;
      if (!checkEmail) return;
      try {
        const res = await fetch(`/api/events/${slug}/register?email=${encodeURIComponent(checkEmail)}`);
        const data = await res.json();
        if (!cancel && data.registered) setRegistered(true);
      } catch {}
    }

    check();
    return () => { cancel = true; };
  }, [status, slug, session, email]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setError(null);

    const userEmail = email.trim() || session?.user?.email;
    const userName = name.trim() || session?.user?.name || "Passenger";

    if (!userEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    if (regType === "team" && !teamName.trim()) {
      setError("Please provide your team name.");
      return;
    }

    setLoading(true);

    const payload = {
      name: userName,
      email: userEmail,
      phone: phone.trim(),
      type: regType,
      teamName: regType === "team" ? teamName.trim() : "",
      teamMembers: regType === "team" ? teamMembers.split(",").map((s) => s.trim()).filter(Boolean) : []
    };

    try {
      const res = await fetch(`/api/events/${slug}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok && !data.ok && !data.alreadyRegistered) {
        setError(data.error || "Registration failed. Please try again.");
      } else {
        setRegistered(true);
        setIsModalOpen(false);

        // Persist to local storage
        try {
          const current = JSON.parse(localStorage.getItem("csi_user_registrations") || "[]");
          const filtered = current.filter((r) => r.slug !== slug && r.eventSlug !== slug);
          filtered.push({
            slug,
            eventSlug: slug,
            eventTitle: slug,
            name: userName,
            email: userEmail,
            type: regType,
            teamName: payload.teamName,
            teamMembers: payload.teamMembers,
            registeredAt: new Date().toISOString()
          });
          localStorage.setItem("csi_user_registrations", JSON.stringify(filtered));
        } catch {}
      }
    } catch (e) {
      // Fallback local registration
      setRegistered(true);
      setIsModalOpen(false);
      try {
        const current = JSON.parse(localStorage.getItem("csi_user_registrations") || "[]");
        current.push({
          slug,
          eventSlug: slug,
          name: userName,
          email: userEmail,
          type: regType,
          registeredAt: new Date().toISOString()
        });
        localStorage.setItem("csi_user_registrations", JSON.stringify(current));
      } catch {}
    } finally {
      setLoading(false);
    }
  }

  // If there's an external direct registration link (e.g. Unstop)
  if (registrationUrl) {
    return (
      <div className="flex flex-col items-center gap-3">
        <a
          href={registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ticket inline-flex items-center gap-2.5 text-base px-8 py-3.5 shadow-lg hover:shadow-xl transition-all"
        >
          <Ticket className="h-5 w-5" />
          <span>Register on Unstop</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Official Unstop Registration Portal · 3-Player Team Challenge
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <button disabled className="btn-ghost cursor-not-allowed opacity-70">
        Registrations closed
      </button>
    );
  }

  if (registered) {
    return (
      <div className="inline-flex flex-col items-center gap-3">
        <div className="inline-flex items-center gap-3 border-2 border-rust bg-rust/10 px-8 py-4 font-mono text-sm uppercase tracking-widest text-rust shadow-md">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-bold">Pass Dispatched · You're Registered</span>
        </div>
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink hover:text-rust underline underline-offset-4"
        >
          <span>View in Passenger Profile Pass</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={loading}
          className="btn-ticket disabled:opacity-60 text-base px-8 py-3.5 shadow-lg hover:shadow-xl transition-all"
        >
          <Ticket className="h-5 w-5 mr-2" />
          <span>Claim Event Pass · Register Now</span>
        </button>
      </div>

      {/* REGISTRATION FORM MODAL */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Dialog Container (Vintage broadsheet style) */}
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-md border-2 border-sepia/80 bg-[#f7f2e7] p-6 text-ink shadow-2xl sm:p-8">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-sm border border-sepia/40 bg-cream text-sepia hover:bg-rust hover:text-cream transition-colors"
              aria-label="Close registration modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="border-b-2 border-ink/80 pb-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-rust">
                CSI VIT · OFFICIAL REGISTRATION PASS
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
                Event Pass Application
              </h3>
              <p className="font-body text-xs text-sepia">
                Dispatching admittance for <span className="font-semibold uppercase text-ink">{slug}</span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
              {/* Registration Type Toggle */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-ink/80 mb-1.5 font-bold">
                  Participation Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRegType("individual")}
                    className={`flex items-center justify-center gap-2 border py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                      regType === "individual"
                        ? "border-rust bg-rust text-cream font-bold shadow-sm"
                        : "border-sepia/50 bg-cream text-sepia hover:border-rust"
                    }`}
                  >
                    <User className="h-3.5 w-3.5" />
                    <span>Individual</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegType("team")}
                    className={`flex items-center justify-center gap-2 border py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                      regType === "team"
                        ? "border-rust bg-rust text-cream font-bold shadow-sm"
                        : "border-sepia/50 bg-cream text-sepia hover:border-rust"
                    }`}
                  >
                    <Users className="h-3.5 w-3.5" />
                    <span>Team</span>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-ink/80 mb-1 font-bold">
                  Full Name / Lead Passenger *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Moin Gardi"
                  className="w-full border-2 border-sepia/60 bg-cream px-3 py-2 font-mono text-sm text-ink outline-none focus:border-rust focus:bg-white"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-ink/80 mb-1 font-bold">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. moin@example.com"
                  className="w-full border-2 border-sepia/60 bg-cream px-3 py-2 font-mono text-sm text-ink outline-none focus:border-rust focus:bg-white"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-ink/80 mb-1 font-bold">
                  Contact Number (WhatsApp)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full border-2 border-sepia/60 bg-cream px-3 py-2 font-mono text-sm text-ink outline-none focus:border-rust focus:bg-white"
                />
              </div>

              {/* Team fields if team is selected */}
              {regType === "team" && (
                <div className="space-y-3 rounded border border-rust/40 bg-rust/5 p-3">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-rust font-bold mb-1">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. The Bad Designers"
                      className="w-full border-2 border-rust/50 bg-cream px-3 py-2 font-mono text-sm text-ink outline-none focus:border-rust focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-rust font-bold mb-1">
                      Team Members (Comma separated names/emails)
                    </label>
                    <input
                      type="text"
                      value={teamMembers}
                      onChange={(e) => setTeamMembers(e.target.value)}
                      placeholder="Alice, Bob, Charlie"
                      className="w-full border-2 border-rust/50 bg-cream px-3 py-2 font-mono text-sm text-ink outline-none focus:border-rust focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded border border-red-400 bg-red-50 p-2 font-mono text-xs text-red-700">
                  {error}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-ticket w-full justify-center py-3 text-sm tracking-widest uppercase shadow-md disabled:opacity-50"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Stamping Pass...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Ticket className="h-4 w-4" /> Issue Event Pass
                    </span>
                  )}
                </button>
              </div>

              <p className="text-center font-mono text-[10px] uppercase text-muted">
                Your pass will be immediately recorded and linked to your Passenger Profile.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
