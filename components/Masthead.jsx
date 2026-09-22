export default function Masthead() {
  return (
    <div className="container-editorial pt-6 md:pt-10">
      <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-widest2 text-muted">
        <span>Mumbai · Tenure 2026 – 27</span>
        <span className="hidden md:inline">Est. 2008</span>
        <span>Vol. XVIII · No. 01</span>
      </div>
      <h1
        className="mt-2 text-center font-display text-3xl leading-tight tracking-tight text-ink md:text-5xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        COMPUTER SOCIETY OF INDIA · VIT
      </h1>
      <div className="rule-double mt-3" />
    </div>
  );
}
