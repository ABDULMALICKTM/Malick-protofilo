"use client";

import { useEffect, useState } from "react";

export default function Atmosphere() {
  const [booting, setBooting] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer;
    try {
      if (!reduceMotion && !sessionStorage.getItem("malick-system-booted")) {
        setBooting(true);
        timer = window.setTimeout(() => {
          setBooting(false);
          sessionStorage.setItem("malick-system-booted", "1");
        }, 850);
      }
    } catch {
      // Storage can be unavailable; the site still works without the boot sequence.
    }

    const onPointerMove = (event) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  function skipBoot() {
    setBooting(false);
    try {
      sessionStorage.setItem("malick-system-booted", "1");
    } catch {}
  }

  return (
    <>
      <div className="ambient-grid" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />
      <div className="pointer-glow" aria-hidden="true" />
      {booting && (
        <div className="system-boot" role="status" aria-label="System initializing">
          <div className="boot-mark">M<span>.</span></div>
          <div className="boot-label">MALICK DESIGN SYSTEM <span>INITIALIZING</span></div>
          <div className="boot-track"><i /></div>
          <button className="boot-skip" type="button" onClick={skipBoot}>SKIP INTRO ↗</button>
        </div>
      )}
    </>
  );
}
