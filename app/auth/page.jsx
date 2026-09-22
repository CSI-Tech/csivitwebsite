import TicketAuth from "@/components/TicketAuth";
import PageTransition from "@/components/PageTransition";

export const metadata = { title: "Get Your Ticket · CSI VIT" };

export default function AuthPage() {
  return (
    <PageTransition>
      <section
        className="relative min-h-screen overflow-hidden bg-ink"
        style={{
          // Retype every mono/typewriter surface on the ticket in VT323.
          // Because the ticket uses `var(--font-mono)` throughout,
          // overriding it here scopes VT323 to the auth page only.
          "--font-mono": "'VT323', ui-monospace, monospace",
          fontFamily: "'VT323', ui-monospace, monospace"
        }}
      >
        {/* Carriage background — gently pulled toward the sepia palette, kept bright */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/authbg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.9) saturate(1.15) contrast(1.05) sepia(0.2)"
          }}
        />
        {/* very light warm wash — just enough to unify the tone */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(80,50,25,0.10) 0%, rgba(50,30,15,0.18) 100%)"
          }}
        />
        {/* subtle vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 90% at 50% 50%, transparent 60%, rgba(0,0,0,0.25) 100%)"
          }}
        />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10 md:px-10">
          <TicketAuth />
        </div>
      </section>
    </PageTransition>
  );
}
