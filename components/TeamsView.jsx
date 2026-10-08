"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronLeft, 
  ChevronRight, 
  Instagram, 
  Linkedin, 
  Github,
  ArrowLeft
} from "lucide-react";
import { DOMAINS, teamData } from "@/lib/teamData";

// Responsive coordinate percentages mapped directly to the 9 framed artwork sections
// The background image aspect ratio is 16:9 (1920x1080)
const FRAME_POSITIONS = {
  convener: { top: "9.5%", left: "66.5%", width: "9.3%", height: "18.5%" },
  executives: { top: "8.5%", left: "76.8%", width: "9.3%", height: "18.5%" },
  operations: { top: "5.5%", left: "87.0%", width: "9.8%", height: "18.5%" },
  technical: { top: "31.5%", left: "66.5%", width: "9.3%", height: "18.5%" },
  design: { top: "30.0%", left: "76.8%", width: "9.3%", height: "18.5%" },
  pr: { top: "28.0%", left: "87.0%", width: "9.8%", height: "18.5%" },
  digitalMarketing: { top: "52.5%", left: "66.5%", width: "9.3%", height: "18.5%" },
  editorials: { top: "52.0%", left: "76.8%", width: "9.3%", height: "18.5%" },
  filmMedia: { top: "51.5%", left: "87.0%", width: "9.8%", height: "18.5%" }
};

export default function TeamsView() {
  const [selectedDomain, setSelectedDomain] = useState("convener");
  const [memberIndex, setMemberIndex] = useState(0);
  const [isFlickering, setIsFlickering] = useState(false);

  const currentMembers = teamData[selectedDomain] || [];
  const currentMember = currentMembers[memberIndex] || currentMembers[0];
  const activeDomainMeta = DOMAINS.find((d) => d.id === selectedDomain);

  // Reset member index when changing domain and trigger CRT channel flicker
  const handleSelectDomain = (domainId) => {
    if (domainId === selectedDomain) return;
    setIsFlickering(true);
    setSelectedDomain(domainId);
    setMemberIndex(0);
    setTimeout(() => {
      setIsFlickering(false);
    }, 240);
  };

  const handleNext = () => {
    setIsFlickering(true);
    setMemberIndex((prev) => (prev + 1) % currentMembers.length);
    setTimeout(() => setIsFlickering(false), 200);
  };

  const handlePrev = () => {
    setIsFlickering(true);
    setMemberIndex((prev) => (prev - 1 + currentMembers.length) % currentMembers.length);
    setTimeout(() => setIsFlickering(false), 200);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#140d07] text-[#efe8db] overflow-hidden select-none">
      
      {/* 1. MAIN VINTAGE ROOM WORKSPACE (DESKTOP INTERACTIVE CANVAS) */}
      <div className="relative w-full max-w-[1920px] mx-auto hidden lg:block aspect-[16/9] shadow-2xl">
        {/* Real Unmodified Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/vintage-room-teams-bg.png"
            alt="CSI Vintage Team Room"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Subtle Ambient Warm Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#110b06]/30 via-transparent to-black/10 pointer-events-none" />
        </div>

        {/* Back to Society / Home button */}
        <div className="absolute top-5 left-6 z-40">
          <Link
            href="/"
            className="group flex items-center gap-2 px-4 py-2 rounded-sm bg-[#1c140d]/85 hover:bg-[#2e1d10] text-[#efe8db] border border-[#7a4a24]/60 backdrop-blur-sm font-mono text-xs uppercase tracking-widest transition-all hover:border-[#d99453] hover:text-[#d99453] shadow-lg hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Main Hall</span>
          </Link>
        </div>

        {/* === LEFT SIDE: THE INTERACTIVE VINTAGE TV SCREEN === */}
        <div
          className="absolute z-10"
          style={{
            top: "23.6%",
            left: "4.1%",
            width: "35.3%",
            height: "43.5%"
          }}
        >
          {/* TV Outer Screen Glass Container */}
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-black/95 shadow-[inset_0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(0,0,0,0.8)] border border-[#4a341f]/30">
            
            {/* CRT TV Glass Scanlines & Grain Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none z-30 opacity-25 mix-blend-overlay"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.8) 0px, rgba(0,0,0,0.8) 1px, transparent 2px, transparent 4px)",
                backgroundSize: "100% 4px"
              }}
            />
            {/* CRT Glass Bulb Reflection */}
            <div className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-[2.5rem]" />
            {/* Subtle Vignette on Screen Corners */}
            <div className="absolute inset-0 pointer-events-none z-30 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.85)_100%)]" />

            {/* CRT Screen Content */}
            <div className={`relative w-full h-full flex flex-col justify-between p-5 md:p-6 transition-opacity duration-300 ${isFlickering ? "opacity-20 brightness-150 filter blur-[1px]" : "opacity-100"}`}>
              
              {/* TV Top Header Bar */}
              <div className="flex items-center justify-between border-b border-[#7a4a24]/40 pb-2 z-20">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-[#f5efe1] font-bold drop-shadow">
                    {activeDomainMeta?.label}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px] text-[#e6dcc4]/80">
                  <span className="tracking-wider">SIGNAL: 100%</span>
                  <span className="text-[#d99453] font-bold">
                    {String(memberIndex + 1).padStart(2, "0")} / {String(currentMembers.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* TV Main Content Body (Photo on Left, Details on Right) */}
              <div className="grid grid-cols-12 gap-4 items-center my-auto z-20">
                {/* Member Photograph */}
                <div className="col-span-5 flex justify-center">
                  <div className="relative w-28 h-32 md:w-36 md:h-44 rounded-lg overflow-hidden border-2 border-[#a4562a]/60 shadow-[0_0_15px_rgba(197,106,43,0.25)] bg-[#1c1a17]">
                    <Image
                      src={currentMember?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"}
                      alt={currentMember?.name || "Team Member"}
                      fill
                      className="object-cover filter contrast-110 sepia-[0.35] brightness-95 transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100px, 150px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-1 right-2 font-mono text-[9px] text-[#d99453] tracking-tighter">
                      CSI-VIT
                    </span>
                  </div>
                </div>

                {/* Member Biography & Titles */}
                <div className="col-span-7 flex flex-col justify-center space-y-2 pr-1">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#c56a2b] font-medium block">
                      {currentMember?.role}
                    </span>
                    <h2 className="font-display text-lg md:text-xl font-bold text-[#f5efe1] leading-tight drop-shadow-md">
                      {currentMember?.name}
                    </h2>
                  </div>

                  <p className="font-display text-xs md:text-sm text-[#efe8db]/85 leading-relaxed line-clamp-3 italic">
                    "{currentMember?.description}"
                  </p>

                  {/* Social Media Links */}
                  <div className="flex items-center gap-3 pt-1">
                    {currentMember?.instagram && (
                      <a
                        href={currentMember.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-full bg-[#3a2a1a]/80 text-[#d99453] hover:text-[#f5efe1] hover:bg-[#a4562a] transition-all border border-[#7a4a24]/60 hover:scale-110"
                        title="Instagram"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {currentMember?.linkedin && (
                      <a
                        href={currentMember.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-full bg-[#3a2a1a]/80 text-[#d99453] hover:text-[#f5efe1] hover:bg-[#a4562a] transition-all border border-[#7a4a24]/60 hover:scale-110"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {currentMember?.github && (
                      <a
                        href={currentMember.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-full bg-[#3a2a1a]/80 text-[#d99453] hover:text-[#f5efe1] hover:bg-[#a4562a] transition-all border border-[#7a4a24]/60 hover:scale-110"
                        title="GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* TV Bottom Controller Bar (PREV / NEXT) */}
              <div className="flex items-center justify-between border-t border-[#7a4a24]/40 pt-2 z-20">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#2a1d13]/90 hover:bg-[#7a4a24] text-[#f5efe1] font-mono text-[10px] tracking-widest uppercase border border-[#7a4a24]/60 transition-all hover:scale-105 active:scale-95"
                >
                  <ChevronLeft className="w-3 h-3 text-[#d99453]" />
                  <span>PREV</span>
                </button>

                <div className="flex items-center gap-1">
                  {currentMembers.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsFlickering(true);
                        setMemberIndex(idx);
                        setTimeout(() => setIsFlickering(false), 200);
                      }}
                      className={`h-1.5 rounded-full transition-all ${
                        memberIndex === idx
                          ? "w-5 bg-[#d99453] shadow-[0_0_8px_#d99453]"
                          : "w-1.5 bg-[#7a4a24]/60 hover:bg-[#d99453]/60"
                      }`}
                      aria-label={`Jump to member ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#2a1d13]/90 hover:bg-[#7a4a24] text-[#f5efe1] font-mono text-[10px] tracking-widest uppercase border border-[#7a4a24]/60 transition-all hover:scale-105 active:scale-95"
                >
                  <span>NEXT</span>
                  <ChevronRight className="w-3 h-3 text-[#d99453]" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* === RIGHT SIDE: 9 CLEAN TYPOGRAPHIC DOMAIN LABELS OVER FRAMES === */}
        {DOMAINS.map((domain) => {
          const pos = FRAME_POSITIONS[domain.id];
          const isSelected = selectedDomain === domain.id;

          return (
            <div
              key={domain.id}
              onClick={() => handleSelectDomain(domain.id)}
              style={{
                top: pos.top,
                left: pos.left,
                width: pos.width,
                height: pos.height
              }}
              className="absolute z-20 cursor-pointer group flex items-start justify-center pt-3 sm:pt-4 px-2 select-none"
            >
              {/* Natural typography placed over artwork with subtle rotation and pure text styling */}
              <div className="w-full text-center transition-all duration-300 transform -rotate-[2deg] group-hover:-rotate-0">
                <span
                  className={`font-stencil text-xs xl:text-sm tracking-widest block leading-tight transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] ${
                    isSelected
                      ? "text-[#fbf6ec] font-bold scale-105 drop-shadow-[0_0_12px_rgba(245,239,225,0.85)] brightness-125 underline decoration-[#d99453]/70 decoration-2 underline-offset-4"
                      : "text-[#f5efe1]/85 group-hover:text-[#ffffff] group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(245,239,225,0.6)] group-hover:scale-105"
                  }`}
                  style={{
                    textShadow: isSelected 
                      ? "0 0 10px rgba(217, 148, 83, 0.7), 0 2px 6px rgba(0,0,0,0.9)" 
                      : "0 2px 5px rgba(0,0,0,0.9)"
                  }}
                >
                  {domain.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. RESPONSIVE MOBILE & TABLET ADAPTATION */}
      <div className="block lg:hidden px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Mobile Header / Back Button */}
        <div className="flex items-center justify-between pb-2 border-b border-[#3a2a1a]">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#efe8db] hover:text-[#d99453] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Main Hall</span>
          </Link>
          <span className="font-stencil text-xs tracking-widest text-[#d99453]">CSI VIT</span>
        </div>
        
        {/* Mobile TV Screen Showcase */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-black/95 border-4 border-[#3a2a1a] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          {/* Scanline texture */}
          <div 
            className="absolute inset-0 pointer-events-none z-20 opacity-20"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.8) 0px, rgba(0,0,0,0.8) 1px, transparent 2px, transparent 4px)",
              backgroundSize: "100% 4px"
            }}
          />

          <div className="p-5 space-y-4">
            {/* TV Status Bar */}
            <div className="flex items-center justify-between border-b border-[#7a4a24]/50 pb-2">
              <span className="font-mono text-sm text-[#f5efe1] uppercase font-bold tracking-wider">
                {activeDomainMeta?.label}
              </span>
              <div className="flex items-center gap-3 font-mono text-xs text-[#e6dcc4]/80">
                <span>SIGNAL: 100%</span>
                <span className="text-[#d99453] font-bold">
                  {String(memberIndex + 1).padStart(2, "0")} / {String(currentMembers.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Member Details */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-32 h-40 rounded-lg overflow-hidden border-2 border-[#a4562a] shadow-lg flex-shrink-0 bg-[#1c1a17]">
                <Image
                  src={currentMember?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"}
                  alt={currentMember?.name || "Team Member"}
                  fill
                  className="object-cover filter sepia-[0.3]"
                  sizes="128px"
                />
              </div>

              <div className="space-y-2 text-center sm:text-left">
                <span className="font-mono text-xs uppercase tracking-widest text-[#c56a2b] font-medium block">
                  {currentMember?.role}
                </span>
                <h3 className="font-display text-xl font-bold text-[#f5efe1]">
                  {currentMember?.name}
                </h3>
                <p className="font-display text-xs text-[#efe8db]/85 leading-relaxed italic">
                  "{currentMember?.description}"
                </p>

                {/* Social icons */}
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
                  {currentMember?.instagram && (
                    <a
                      href={currentMember.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-[#3a2a1a] text-[#d99453] border border-[#7a4a24]"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {currentMember?.linkedin && (
                    <a
                      href={currentMember.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-[#3a2a1a] text-[#d99453] border border-[#7a4a24]"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {currentMember?.github && (
                    <a
                      href={currentMember.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-[#3a2a1a] text-[#d99453] border border-[#7a4a24]"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Prev / Next Controls */}
            <div className="flex items-center justify-between border-t border-[#7a4a24]/50 pt-3">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-4 py-2 rounded bg-[#2a1d13] text-[#f5efe1] font-mono text-xs uppercase tracking-widest border border-[#7a4a24]"
              >
                <ChevronLeft className="w-4 h-4 text-[#d99453]" />
                <span>PREV</span>
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded bg-[#2a1d13] text-[#f5efe1] font-mono text-xs uppercase tracking-widest border border-[#7a4a24]"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4 text-[#d99453]" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Domain Selection Grid (9 Domains) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-stencil text-lg tracking-widest text-[#f5efe1]">
              SELECT DOMAIN
            </h4>
            <span className="font-mono text-[10px] text-[#d99453]">9 DEPARTMENTS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {DOMAINS.map((domain) => {
              const isSelected = selectedDomain === domain.id;
              return (
                <button
                  key={domain.id}
                  onClick={() => handleSelectDomain(domain.id)}
                  className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between h-16 ${
                    isSelected
                      ? "bg-[#3a2a1a] border-[#d99453] shadow-[0_0_15px_rgba(217,148,83,0.3)] ring-1 ring-[#d99453]"
                      : "bg-[#1c140d]/90 border-[#7a4a24]/50 hover:border-[#d99453]/60"
                  }`}
                >
                  <span className="font-stencil text-sm text-[#f5efe1] tracking-wider leading-tight">
                    {domain.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. FOOTER NOTE */}
      <div className="relative z-20 py-4 px-6 text-center border-t border-[#3a2a1a]/60 bg-[#140d07] font-mono text-[11px] text-[#efe8db]/60 tracking-wider">
        <span>COMPUTER SOCIETY OF INDIA — VIT STUDENT CHAPTER &copy; 2026-27</span>
      </div>
    </div>
  );
}
