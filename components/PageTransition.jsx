// CSS-only entrance wrapper — no hooks so it can render as a server component.
export default function PageTransition({ children }) {
  return <div className="animate-fadeUp">{children}</div>;
}
