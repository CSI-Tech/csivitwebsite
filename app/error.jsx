"use client";

export default function Error({ error, reset }) {
  return (
    <section className="container-editorial flex min-h-[50vh] flex-col items-center justify-center text-center">
      <p className="kicker">Technical difficulty</p>
      <h2 className="mt-3 font-display text-3xl text-ink">The projector has jammed.</h2>
      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">
        {error?.message?.slice(0, 200) || "Unknown fault"}
      </p>
      <button onClick={reset} className="btn-ticket mt-6">Try again</button>
    </section>
  );
}
