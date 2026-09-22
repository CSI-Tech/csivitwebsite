"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { CheckCircle2, Ticket, Loader2 } from "lucide-react";

export default function RegisterButton({ slug, open }) {
  const { data: session, status } = useSession();
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancel = false;
    async function check() {
      if (status !== "authenticated") return;
      try {
        const res = await fetch(`/api/events/${slug}/register`);
        const data = await res.json();
        if (!cancel) setRegistered(!!data.registered);
      } catch {}
    }
    check();
    return () => { cancel = true; };
  }, [status, slug]);

  async function register() {
    setError(null);
    if (status !== "authenticated") {
      signIn(undefined, { callbackUrl: `/events/${slug}` });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${slug}/register`, { method: "POST" });
      const data = await res.json();
      if (!res.ok && !data.alreadyRegistered) {
        setError(data.error || "Registration failed.");
      } else {
        setRegistered(true);
      }
    } catch (e) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
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
      <div className="inline-flex items-center gap-3 border border-rust bg-rust/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-rust">
        <CheckCircle2 className="h-4 w-4" /> You're registered
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={register}
        disabled={loading}
        className="btn-ticket disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Ticket className="h-4 w-4" />}
        Register Now
      </button>
      {error && (
        <p className="font-mono text-[10px] uppercase tracking-widest text-navy">
          {error}
        </p>
      )}
    </div>
  );
}
