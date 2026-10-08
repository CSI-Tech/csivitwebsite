import TicketProfile from "@/components/TicketProfile";
import PageTransition from "@/components/PageTransition";

export const metadata = { 
  title: "Passenger Profile Pass · CSI VIT",
  description: "Your official passenger ticket and identity for the 2026-2027 CSI VIT tenure."
};

export default function ProfilePage() {
  return (
    <PageTransition>
      <section
        className="relative min-h-screen overflow-hidden bg-ink"
        style={{
          "--font-mono": "'VT323', ui-monospace, monospace",
          fontFamily: "'VT323', ui-monospace, monospace"
        }}
      >
        {/* Carriage background */}
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
        {/* warm wash */}
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

        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 md:px-10">
          <TicketProfile />
        </div>
      </section>
    </PageTransition>
  );
}
