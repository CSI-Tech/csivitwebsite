import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-editorial flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="kicker">Section unavailable</p>
      <h1 className="mt-3 font-hand text-6xl text-sepia" style={{ fontFamily: "var(--font-hand)" }}>
        This page has left the building.
      </h1>
      <p className="mt-3 font-body text-muted">
        The reel skipped, the projectionist stepped out. Try the main hall.
      </p>
      <Link href="/" className="btn-ticket mt-8">Back to the society</Link>
    </section>
  );
}
