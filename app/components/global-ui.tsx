"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ArrowUp } from "lucide-react";
import { DroneIcon, cn } from "./shared";

/* ============================================================
   1. PRELOADER — branded splash screen
   ============================================================ */
export function Preloader({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(ref.current, {
          yPercent: -100,
          duration: 0.4,
          ease: "power4.inOut",
          onComplete,
        });
      },
    });

    // Animate progress bar — fast
    tl.to({}, {
      duration: 0.6,
      onUpdate() { setProgress(Math.round(this.progress() * 100)); },
    });

    // Stagger in logo + text
    tl.from(logoRef.current, { scale: 0.8, opacity: 0, duration: 0.3, ease: "back.out(1.5)" }, 0);
    tl.from(textRef.current, { opacity: 0, y: 10, duration: 0.25, ease: "power2.out" }, 0.15);

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      aria-label="Loading"
    >
      {/* Subtle radial glow behind logo */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#F97316]/10 blur-[100px] pointer-events-none" />

      <div ref={logoRef} className="preloader-logo relative mb-8">
        <DroneIcon className="w-16 h-16 text-[#F97316]" />
        {/* Spinning ring */}
        <div className="preloader-ring absolute -inset-4 rounded-full border-2 border-transparent border-t-[#F97316]/60" />
      </div>

      <p ref={textRef} className="text-[13px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-6">
        Speed<span className="text-[#F97316]">Up</span>
      </p>

      {/* Progress bar */}
      <div className="w-48 h-[2px] bg-orange-50 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-[#F97316] to-amber-400 transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-[11px] font-mono text-gray-300 tabular-nums">{progress}%</p>
    </div>
  );
}

/* ============================================================
   2. CUSTOM CURSOR — glowing dot + ring
   ============================================================ */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Only activate on pointer: fine (no touch)
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    document.documentElement.classList.add("custom-cursor-enabled");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "power2.out" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.25, ease: "power2.out" });
    };

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    window.addEventListener("mousemove", onMove, { passive: true });

    // Detect interactive elements
    const addListeners = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("custom-cursor-enabled");
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={cn(
          "cursor-dot fixed top-0 left-0 z-[10000] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background] duration-200",
          hovering ? "w-3 h-3 bg-[#F97316]" : "w-2 h-2 bg-white"
        )}
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={ringRef}
        className={cn(
          "cursor-ring fixed top-0 left-0 z-[10000] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200",
          hovering
            ? "w-10 h-10 border-[#F97316]/60 bg-[#F97316]/5"
            : "w-7 h-7 border-white/20 bg-transparent"
        )}
      />
    </>
  );
}

/* ============================================================
   3. SCROLL PROGRESS BAR — thin orange bar at viewport top
   ============================================================ */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!barRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      barRef.current.style.width = `${pct}%`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[3px] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-[#F97316] via-orange-400 to-amber-400 shadow-[0_0_12px_rgba(249,115,22,0.5)]"
        style={{ width: 0 }}
      />
    </div>
  );
}

/* ============================================================
   4. BACK-TO-TOP BUTTON — floating, appears after scroll
   ============================================================ */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-8 right-8 z-[9997] h-11 w-11 rounded-full flex items-center justify-center",
        "bg-[#F97316] text-white shadow-lg shadow-orange-500/30",
        "hover:scale-110 hover:shadow-orange-500/40 active:scale-95",
        "transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}

/* ============================================================
   5. PAGE TRANSITION WRAPPER
   ============================================================ */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
