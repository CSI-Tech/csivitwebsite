"use client";

import { useEffect, useRef, useState } from "react";

// Loads /images/csivit-seal.webp and chroma-keys the burnt-orange background
// to transparent so the seal sits cleanly on the ticket header. Cached across
// renders in module scope.
let CACHED_URL = null;

export default function TransparentSeal({ className = "", alt = "CSI VIT seal" }) {
  const [src, setSrc] = useState(CACHED_URL);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (CACHED_URL) { setSrc(CACHED_URL); return; }

    const img = new Image();
    img.src = "/images/csivit-seal.webp";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = frame.data;
        // Sample the top-left corner as the background colour.
        const bgR = d[0], bgG = d[1], bgB = d[2];
        for (let i = 0; i < d.length; i += 4) {
          const dr = d[i] - bgR;
          const dg = d[i + 1] - bgG;
          const db = d[i + 2] - bgB;
          const dist = Math.sqrt(dr * dr + dg * dg + db * db);
          const KEEP = 120, CUT = 45;
          if (dist <= CUT) d[i + 3] = 0;
          else if (dist < KEEP) d[i + 3] = Math.round(((dist - CUT) / (KEEP - CUT)) * d[i + 3]);
        }
        ctx.putImageData(frame, 0, 0);
        const url = canvas.toDataURL("image/png");
        CACHED_URL = url;
        if (mounted.current) setSrc(url);
      } catch {
        // If canvas gets tainted for any reason, fall back to the raw image.
        CACHED_URL = "/images/csivit-seal.webp";
        if (mounted.current) setSrc(CACHED_URL);
      }
    };

    return () => { mounted.current = false; };
  }, []);

  if (!src) return <span className={`inline-block ${className}`} aria-hidden />;
  return <img src={src} alt={alt} className={className} />;
}
