"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function TicketAuth() {
  const { status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/events";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (status === "authenticated") router.replace(callbackUrl);
  }, [status, callbackUrl, router]);

  return (
    <div className="mx-auto w-full max-w-[760px]">
      <div className="relative">
        {/* perforated edges */}
        <PerfEdge side="left" />
        <PerfEdge side="right" />

        <div
          className="mx-4 sm:mx-6 md:mx-8"
          style={{ background: "#c9b7a5" }}
        >
          <div className="p-2.5 sm:p-3 md:p-3.5">
            {/* HEADER BAND */}
            <div className="relative grid grid-cols-[1.35fr_0.6fr] items-stretch">
              {/* left orange band */}
              <div
                className="relative flex flex-col items-start justify-center px-3 py-3 sm:px-5 sm:py-4"
                style={{ background: "#a35a25", color: "#efe8db" }}
              >
                <Image
                  src="/images/csi-logo-white.png"
                  alt="CSI VIT"
                  width={150}
                  height={46}
                  className="h-6 w-auto object-contain sm:h-8 md:h-9"
                />
                <p
                  className="mt-1 font-mono text-[10px] leading-tight tracking-widest uppercase sm:text-xs md:text-sm"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Student Chapter
                </p>
              </div>
              {/* right year box */}
              <div
                className="flex items-center justify-end px-3 py-3 sm:px-6 sm:py-4"
                style={{ background: "#d9d1c3" }}
              >
                <p
                  className="font-mono text-lg tracking-widest text-ink sm:text-2xl md:text-3xl"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  2026-2027
                </p>
              </div>
            </div>

            {/* BODY */}
            <div
              className="mt-2 grid grid-cols-1 gap-4 px-3 py-4 sm:px-5 sm:py-6 md:grid-cols-[1.35fr_0.6fr] md:gap-0 md:px-7"
              style={{ background: "#d9d1c3", color: "#1a1a1a" }}
            >
              {/* LEFT COLUMN */}
              <div>
                <p
                  className="font-mono text-base tracking-widest uppercase sm:text-lg md:text-xl"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  PASSENGER DETAILS
                </p>

                <div className="mt-3 space-y-2.5">
                  <FieldRow label="PASSENGER:">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="TEXT BOX HERE"
                      className="ticket-input"
                    />
                  </FieldRow>
                  <FieldRow label="EMAIL:">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="TEXT BOX HERE"
                      className="ticket-input"
                    />
                  </FieldRow>
                </div>

                <div className="dashed-rule mt-5 text-[#1a1a1a]/60" />

                <p
                  className="mt-4 font-mono text-base tracking-widest uppercase sm:text-lg md:text-xl"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  TERMS OF JOURNEY
                </p>

                <div
                  className="mt-2 space-y-1 font-mono text-base sm:text-lg md:text-xl"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <p><span className="tracking-widest">VALID FROM:</span> date of registration</p>
                  <p><span className="tracking-widest">VALID UNTIL:</span> end of tenure</p>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="relative border-t border-dashed border-[#1a1a1a]/45 pt-4 md:border-t-0 md:pt-0 md:pl-6">
                <span
                  className="pointer-events-none absolute left-0 top-0 hidden h-full md:block"
                  style={{ borderLeft: "2px dashed rgba(26,26,26,0.55)" }}
                />
                <p
                  className="font-mono text-2xl leading-tight tracking-widest uppercase sm:text-3xl md:text-4xl"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  ONE PASS,<br />ONE PASSENGER,
                </p>
              </div>
            </div>

            {/* OAUTH ROW */}
            <div
              className="relative px-3 pb-1.5 pt-3.5 sm:px-5 md:px-7"
              style={{ background: "#d9d1c3" }}
            >
              <div className="dashed-rule mb-3.5 text-[#1a1a1a]/60 md:mb-4" />
              <div className="flex flex-col items-stretch justify-between gap-2 sm:flex-row">
                <OAuthButton onClick={() => signIn("google", { callbackUrl })}>
                  SIGN UP USING GOOGLE
                </OAuthButton>
                <OAuthButton onClick={() => signIn("github", { callbackUrl })}>
                  SIGN UP USING GITHUB
                </OAuthButton>
              </div>
            </div>

            {/* SIGN UP CTA */}
            <div
              className="relative px-3 pb-4 pt-3 sm:px-5 md:px-7 md:pb-6"
              style={{ background: "#d9d1c3" }}
            >
              <div className="dashed-rule mb-4 text-[#1a1a1a]/60" />
              <div className="flex justify-center">
                <button
                  onClick={() => signIn(undefined, { callbackUrl })}
                  className="w-full max-w-[260px] px-6 py-2.5 font-mono text-2xl tracking-widest text-cream transition-all hover:brightness-110 sm:w-auto sm:px-12 sm:py-3 sm:text-3xl md:text-4xl"
                  style={{
                    background: "#a35a25",
                    fontFamily: "var(--font-mono)"
                  }}
                >
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ticket-input {
          background: #ffffff;
          border: 1px solid rgba(26, 26, 26, 0.55);
          padding: 4px 10px;
          font-family: var(--font-mono);
          font-size: 15px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #1a1a1a;
          min-width: 0;
          width: 100%;
          max-width: 260px;
          outline: none;
        }
        .ticket-input::placeholder {
          color: rgba(26, 26, 26, 0.55);
        }
        @media (min-width: 640px) {
          .ticket-input { font-size: 17px; min-width: 180px; }
        }
      `}</style>
    </div>
  );
}

function FieldRow({ label, children }) {
  return (
    <div
      className="flex flex-col gap-1.5 font-mono text-base sm:flex-row sm:items-center sm:gap-3 sm:text-lg"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <span className="w-full shrink-0 tracking-widest uppercase sm:w-28 md:w-32">{label}</span>
      {children}
    </div>
  );
}

function OAuthButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 border font-mono text-base tracking-widest transition-all hover:bg-cream sm:text-lg md:text-xl"
      style={{
        background: "#ffffff",
        borderColor: "rgba(26,26,26,0.55)",
        color: "#1a1a1a",
        padding: "10px 14px",
        fontFamily: "var(--font-mono)"
      }}
    >
      {children}
    </button>
  );
}

function PerfEdge({ side }) {
  const dots = Array.from({ length: 9 });
  return (
    <div
      className={`pointer-events-none absolute top-0 flex h-full w-4 flex-col items-center justify-around py-3 sm:w-5 md:w-8 ${
        side === "left" ? "left-0" : "right-0"
      }`}
      style={{ background: "#c9b7a5" }}
    >
      {dots.map((_, i) => (
        <span
          key={i}
          className="block h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3 md:h-4 md:w-4"
          style={{ background: "rgba(0,0,0,0.18)" }}
        />
      ))}
    </div>
  );
}
