"use client";

import { useEffect, useState } from "react";
import { X, Users, UserPlus, Copy, Check, Loader2, CheckCircle2, Ticket, Hash } from "lucide-react";

/**
 * EventRegistrationModal
 *
 * Props:
 *  - event: { slug, title, teamSize, teamOnly, minTeamSize, maxTeamSize, registrationUrl }
 *  - open: boolean
 *  - onClose: () => void
 *
 * Handles two modes:
 *  - "create"  → create a new team, generates a shareable code
 *  - "join"    → join an existing team by code
 *
 * Persists to Mongo via /api/events/[slug]/team and /join. If the DB is
 * unreachable the API returns a 503 and the user sees a clear error.
 */
export default function EventRegistrationModal({ event, open, onClose }) {
  const [mode, setMode] = useState("create"); // "create" | "join"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // { kind: "created"|"joined", team }
  const [copied, setCopied] = useState(false);

  // shared fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // create-team fields
  const [teamName, setTeamName] = useState("");

  // join-team fields
  const [joinCode, setJoinCode] = useState("");

  useEffect(() => {
    if (!open) {
      // reset after close so a new open starts clean
      setTimeout(() => {
        setMode("create");
        setLoading(false);
        setError(null);
        setSuccess(null);
        setCopied(false);
        setName("");
        setEmail("");
        setPhone("");
        setTeamName("");
        setJoinCode("");
      }, 200);
    }
  }, [open]);

  if (!open || !event) return null;

  const maxSize = event.maxTeamSize || 4;
  const minSize = event.minTeamSize || 2;

  async function handleCreate(e) {
    e.preventDefault();
    setError(null);
    if (!teamName.trim()) return setError("Team name is required.");
    if (!name.trim()) return setError("Your name is required.");
    if (!email.trim()) return setError("Your email is required.");

    setLoading(true);
    try {
      const res = await fetch(`/api/events/${event.slug}/team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName, name, email, phone })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not create team.");
      } else {
        setSuccess({ kind: "created", team: data.team, teamCode: data.teamCode });
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleJoin(e) {
    e.preventDefault();
    setError(null);
    if (!joinCode.trim()) return setError("Team code is required.");
    if (!name.trim()) return setError("Your name is required.");
    if (!email.trim()) return setError("Your email is required.");

    setLoading(true);
    try {
      const res = await fetch(`/api/events/${event.slug}/team/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamCode: joinCode, name, email, phone })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not join team.");
      } else {
        setSuccess({ kind: "joined", team: data.team, teamCode: joinCode.toUpperCase() });
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function copyCode() {
    if (!success?.teamCode) return;
    navigator.clipboard?.writeText(success.teamCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // If the event has an external registration (Unstop etc), just link out.
  if (event.registrationUrl) {
    return (
      <ModalShell onClose={onClose} title={event.title}>
        <p className="font-body text-sm text-sepia">
          Registration for <strong>{event.title}</strong> is hosted on an
          external portal.
        </p>
        <a
          href={event.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 bg-sepia px-6 py-3 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:bg-rust"
        >
          <Ticket className="h-4 w-4" />
          Open External Registration
        </a>
      </ModalShell>
    );
  }

  return (
    <ModalShell onClose={onClose} title={event.title}>
      {!success && (
        <>
          <p className="font-mono text-[11px] uppercase tracking-widest text-rust">
            Team Registration · {minSize}–{maxSize} members
          </p>

          <div className="mt-4 flex gap-2 border-b border-sepia/30">
            <TabButton active={mode === "create"} onClick={() => { setMode("create"); setError(null); }}>
              <UserPlus className="h-3.5 w-3.5" /> Create Team
            </TabButton>
            <TabButton active={mode === "join"} onClick={() => { setMode("join"); setError(null); }}>
              <Users className="h-3.5 w-3.5" /> Join Team
            </TabButton>
          </div>

          {mode === "create" ? (
            <form onSubmit={handleCreate} className="mt-5 space-y-3">
              <Field label="Team Name" value={teamName} setValue={setTeamName} placeholder="e.g. The Chaos Collective" />
              <div className="rule-double my-3" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Your details (team leader)
              </p>
              <Field label="Full Name" value={name} setValue={setName} placeholder="Alex Rao" />
              <Field label="Email" type="email" value={email} setValue={setEmail} placeholder="you@vit.edu" />
              <Field label="Phone" value={phone} setValue={setPhone} placeholder="optional" required={false} />
              {error && <ErrorBanner message={error} />}
              <SubmitButton loading={loading}>
                <UserPlus className="h-4 w-4" /> Create Team & Get Code
              </SubmitButton>
            </form>
          ) : (
            <form onSubmit={handleJoin} className="mt-5 space-y-3">
              <Field
                label="Team Code"
                value={joinCode}
                setValue={(v) => setJoinCode(v.toUpperCase())}
                placeholder="ABCD12"
                mono
                maxLength={10}
              />
              <div className="rule-double my-3" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Your details
              </p>
              <Field label="Full Name" value={name} setValue={setName} placeholder="Priya Shah" />
              <Field label="Email" type="email" value={email} setValue={setEmail} placeholder="you@vit.edu" />
              <Field label="Phone" value={phone} setValue={setPhone} placeholder="optional" required={false} />
              {error && <ErrorBanner message={error} />}
              <SubmitButton loading={loading}>
                <Users className="h-4 w-4" /> Join Team
              </SubmitButton>
            </form>
          )}
        </>
      )}

      {success && (
        <div className="mt-2 flex flex-col items-center text-center">
          <CheckCircle2 className="h-10 w-10 text-rust" />
          <h4 className="mt-3 font-display text-2xl text-ink">
            {success.kind === "created" ? "Team Created" : "You're In"}
          </h4>
          <p className="mt-1 max-w-sm font-body text-sm text-sepia">
            {success.kind === "created"
              ? "Share this code with your teammates so they can join your team."
              : `You've joined team ${success.team?.teamName || success.teamCode}.`}
          </p>

          <div className="mt-6 w-full rounded-md border-2 border-dashed border-sepia bg-paper p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Team code</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="font-mono text-3xl font-bold tracking-widest text-ink">
                {success.teamCode}
              </p>
              <button
                onClick={copyCode}
                className="inline-flex items-center gap-1.5 border border-sepia px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-sepia transition-colors hover:bg-sepia hover:text-cream"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {success.team?.members?.length > 0 && (
            <div className="mt-5 w-full border-t border-sepia/30 pt-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Members ({success.team.members.length}/{success.team.maxSize || maxSize})
              </p>
              <ul className="mt-2 space-y-1 text-left">
                {success.team.members.map((m, i) => (
                  <li key={i} className="flex items-center gap-2 font-mono text-xs text-ink">
                    <Hash className="h-3 w-3 text-rust" />
                    <span className="truncate">{m.name}</span>
                    {m.isLeader && (
                      <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-rust">
                        Leader
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-6 w-full border border-sepia bg-sepia px-5 py-3 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:bg-rust"
          >
            Done
          </button>
        </div>
      )}
    </ModalShell>
  );
}

function ModalShell({ children, onClose, title }) {
  // close on Escape
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-md border-2 border-sepia/80 bg-[#f7f2e7] shadow-2xl">
        <div className="flex items-start justify-between border-b-2 border-ink/70 bg-cream px-5 py-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-rust">
              CSI VIT · Official Registration
            </p>
            <h3 className="mt-0.5 font-display text-lg font-bold text-ink">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center border border-sepia/40 bg-paper text-sepia transition-colors hover:bg-rust hover:text-cream"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto px-5 py-5">
          {children}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`-mb-px inline-flex items-center gap-2 border-b-2 px-3 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
        active
          ? "border-rust text-rust"
          : "border-transparent text-muted hover:text-sepia"
      }`}
    >
      {children}
    </button>
  );
}

function Field({ label, value, setValue, placeholder, type = "text", required = true, mono = false, maxLength }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-widest text-sepia">
        {label} {required && <span className="text-rust">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`mt-1 w-full border border-sepia/50 bg-paper px-3 py-2 text-ink outline-none transition-colors focus:border-rust ${
          mono ? "font-mono text-base tracking-widest" : "font-body text-sm"
        }`}
      />
    </label>
  );
}

function SubmitButton({ loading, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-2 flex w-full items-center justify-center gap-2 bg-sepia px-5 py-3 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:bg-rust disabled:opacity-60"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </button>
  );
}

function ErrorBanner({ message }) {
  return (
    <div className="border border-navy bg-navy/10 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-navy">
      {message}
    </div>
  );
}

