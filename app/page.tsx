"use client";

/**
 * SpeedUp — Zipline-aesthetic landing page
 * ────────────────────────────────────────
 * Stack: Next.js 15 · React 19 · Tailwind CSS v3 · GSAP 3 + ScrollTrigger
 */

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import {
  Package, Wind, Radio, CheckCircle2,
  Heart, ShoppingBag, AlertTriangle,
  ArrowRight, Shield, Cpu, Battery, Globe,
  Zap, Plus, MapPin, Star, Newspaper, X,
} from "lucide-react";
import { Navigation, Footer, Tag, DroneIcon } from "./components/shared";
import { Testimonials } from "./components/testimonials";

/* ── GSAP plugins: register client-side only ── */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

/* ============================================================
   CONSTANTS
   ============================================================ */

// const NEWS_ITEMS = [

// "🚀 SpeedUp expands to 5 new cities in Texas — Now serving Austin, Dallas, Houston, San Antonio & El Paso",

// "📦 Over 4.2 million deliveries completed with zero safety incidents",

// "🤝 New partnership with major healthcare providers for emergency medical supply delivery",

// "⚡ SpeedUp named Top 10 Most Innovative Logistics Companies 2026",

// "🌿 100% carbon-neutral operations — certified by the Climate Pledge",

// ];







// const PARTNERS = [
//   "Walmart", "Chipotle", "Panera Bread", "UPS", "Johnson & Johnson",
//   "DHL", "FedEx", "CVS Pharmacy", "Walgreens", "Target", "Amazon", "GNC",
// ];

// const STATS = [
//   { value: 4200000, display: "4.2M+",  suffix: "+",  label: "Deliveries completed" },
//   { value: 2,       display: "2M+",    suffix: "M+", label: "Miles flown" },
//   { value: 99.98,   display: "99.98%", suffix: "%",  label: "On-time rate" },
//   { value: 100,     display: "100%",   suffix: "%",  label: "Zero emission" },
// ];

// const HOW_IT_WORKS = [
//   { step: "01", title: "Place your order",     icon: Package,      desc: "Order via our partner apps or API. SpeedUp instantly receives your request and begins routing." },
//   { step: "02", title: "Drone dispatched",     icon: Wind,         desc: "An autonomous drone launches within 60 seconds, pre-loaded and mission-ready." },
//   { step: "03", title: "Live tracking",        icon: Radio,        desc: "Watch your delivery in real-time on the map. Our AI navigates weather and airspace live." },
//   { step: "04", title: "Delivered in minutes", icon: CheckCircle2, desc: "Your package lands safely at your door. Average delivery: under 8 minutes." },
// ];

// const FEATURES = [
//   {
//     label: "Healthcare",
//     title: "Life-saving speed.",
//     desc: "Medications, blood samples, and emergency supplies in critical minutes — not hours.",
//     stat: "3 min avg",
//     icon: Heart,
//     accent: "#F97316",
//     gradientStyle: {
//       background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
//     } as React.CSSProperties,
//   },
//   {
//     label: "Retail & E-commerce",
//     title: "Delight customers.",
//     desc: "Same-minute delivery unlocks new commerce possibilities. From groceries to electronics — instantly.",
//     stat: "8 min avg",
//     icon: ShoppingBag,
//     accent: "#ea580c",
//     gradientStyle: {
//       background: "linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)",
//     } as React.CSSProperties,
//   },
//   {
//     label: "Emergency Services",
//     title: "First on scene.",
//     desc: "AEDs, fire suppressants, and rescue equipment reach emergencies before ground units.",
//     stat: "< 2 min",
//     icon: AlertTriangle,
//     accent: "#c2410c",
//     gradientStyle: {
//       background: "linear-gradient(135deg, #fff7ed 0%, #fdba74 100%)",
//     } as React.CSSProperties,
//   },
// ];

// const TECH_SPECS = [
//   { icon: Cpu,     label: "Edge AI Navigation", desc: "120fps obstacle detection, fully on-board" },
//   { icon: Shield,  label: "Triple Redundancy",  desc: "Motors, parachute, geofencing baked in" },
//   { icon: Battery, label: "Swappable Cells",    desc: "90-second turnaround, 24/7 operations" },
//   { icon: Globe,   label: "Fleet Intelligence", desc: "Every drone learns, fleet-wide in real time" },
// ];

// const FAQ_ITEMS = [
//   { q: "What does a SpeedUp delivery look like?",    a: "Your drone hovers about 100 feet above your location and lowers the package on a precision tether. No crashing, no loud landings — a precise, quiet delivery every time." },
//   { q: "How much weight can the drone carry?",       a: "SpeedUp drones carry up to 4 kg (about 8 lbs) per delivery — covering medications, groceries, electronics, and emergency supplies." },
//   { q: "How do I choose my exact delivery location?",a: "Through our partner apps or API, you drop a pin anywhere in the service zone. The drone navigates to that exact GPS coordinate." },
//   { q: "How loud is a SpeedUp drone?",              a: "At delivery altitude, our drones measure around 65 dB — similar to a normal conversation. We engineered our propeller geometry specifically to minimize noise." },
//   { q: "Can drones fly in bad weather?",            a: "SpeedUp drones are rated for winds up to 65 km/h and light rain. In severe weather, deliveries are automatically rescheduled for safety." },
//   { q: "Are drones safe for people and property?",  a: "Absolutely. Triple-redundant motors, AI obstacle detection, and parachute backup systems. We have completed 4.2M deliveries with zero safety incidents." },
// ];


/* ============================================================
   SECTION 2 — HERO  (full-viewport, bottom-left — zipline pattern)
   ============================================================ */
function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const trustRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });
    tl.from(
      [eyebrowRef.current, headRef.current, subRef.current, ctaRef.current, trustRef.current],
      { opacity: 0, y: 70, duration: 1, ease: "power4.out", stagger: 0.1 }
    );

    /* Parallax: video scales and drifts as user scrolls */
    gsap.to(bgRef.current, {
      yPercent: 18, scale: 1.08, ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top", end: "bottom top", scrub: 1.5,
      },
    });

    /* Fade video in as soon as enough data is buffered */
    const vid = videoRef.current;
    let cleanup = () => {};
    if (vid) {
      gsap.set(vid, { opacity: 0 });
      const show = () => gsap.to(vid, { opacity: 1, duration: 1.4, ease: "power2.inOut" });
      if (vid.readyState >= 3) {
        /* Already buffered (e.g. hot reload) — show immediately */
        show();
      } else {
        vid.addEventListener("canplay", show, { once: true });
        cleanup = () => vid.removeEventListener("canplay", show);
      }
    }
    return cleanup;
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100dvh] min-h-[700px] flex items-end overflow-hidden" aria-label="Hero">
      {/* Video background */}
      <div ref={bgRef} className="absolute inset-[-10%] z-0 will-change-transform">
        {/*
          Drop a high-res aerial/drone MP4 at public/hero-video.mp4
          Free sources: pexels.com · pixabay.com · mixkit.co (search "aerial drone city")
        */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Multi-layer overlay — warm dark gradient for readability */}
        <div className="absolute inset-0" style={{
          background:
            "linear-gradient(to top, rgba(15,15,15,0.92) 0%, rgba(30,20,10,0.55) 45%, rgba(15,15,15,0.25) 100%)," +
            "linear-gradient(to right, rgba(15,15,15,0.7) 0%, transparent 60%)",
        }} />
        {/* Warm orange accent glow */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 60% 50% at 70% 25%, rgba(249,115,22,0.15) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(251,146,60,0.1) 0%, transparent 70%)",
        }} />
      </div>

      {/* Content — bottom-left */}
      <div className="relative z-10 w-full px-6 pb-20 lg:px-16 lg:pb-24">
        <div className="max-w-[640px]">
          <div ref={eyebrowRef} className="flex items-center gap-2.5 mb-7">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F97316] animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
            
            </span>
          </div>

          <h1 ref={headRef} className="text-[clamp(3.2rem,7.5vw,6.5rem)] font-black leading-[0.91] tracking-[-0.04em] text-white mb-7">
            Delivery<br />from the sky.
          </h1>

          <p ref={subRef} className="text-[clamp(1rem,1.8vw,1.2rem)] text-white/45 font-light leading-relaxed mb-10 max-w-[500px]">
            Autonomous drones that fly straight to you — no traffic, no stops, no waiting. Get what you need in minutes.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-12">
            <a href="#contact" className="inline-flex items-center gap-2 bg-[#F97316] text-white rounded-full px-7 py-3.5 text-[14px] font-semibold hover:bg-orange-600 transition-colors duration-200 shadow-lg shadow-orange-900/30">
              Coming Soon <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* <div ref={trustRef} className="flex flex-wrap gap-5 text-[12px] text-white/28 font-medium">
            <span>4.2M+ deliveries</span>
            <span className="text-white/12">·</span>
            <span>99.98% on-time</span>
            <span className="text-white/12">·</span>
            <span>100% zero-emission</span>
          </div> */}
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-10 hidden lg:flex flex-col items-center gap-2 text-white/18 select-none pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.25em]" style={{ writingMode: "vertical-rl" }}>speedup</span>
        <div className="h-8 w-px bg-white/12" />
      </div>
    </section>
  );
}

// /* ============================================================
//    SECTION 3 — PARTNER STRIP  (GSAP infinite marquee)
//    ============================================================ */
// function PartnerStrip() {
//   const trackRef = useRef<HTMLDivElement>(null);
//   const wrapRef  = useRef<HTMLDivElement>(null);
//   const tweenRef = useRef<gsap.core.Tween | null>(null);

//   useEffect(() => {
//     const track = trackRef.current;
//     if (!track) return;
//     const totalW = track.scrollWidth / 2;

//     tweenRef.current = gsap.to(track, { x: -totalW, duration: 26, ease: "none", repeat: -1 });

//     const pause  = () => tweenRef.current?.pause();
//     const resume = () => tweenRef.current?.resume();
//     const wrap = wrapRef.current;
//     wrap?.addEventListener("mouseenter", pause);
//     wrap?.addEventListener("mouseleave", resume);
//     return () => {
//       tweenRef.current?.kill();
//       wrap?.removeEventListener("mouseenter", pause);
//       wrap?.removeEventListener("mouseleave", resume);
//     };
//   }, []);

//   const doubled = [...PARTNERS, ...PARTNERS];

//   return (
//     <section className="relative border-y border-gray-100 py-5 overflow-hidden bg-white" aria-label="Partner brands">
//       <div ref={wrapRef} className="flex items-center">
//         <div className="shrink-0 px-6 lg:px-10 text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400 border-r border-gray-200 mr-6 whitespace-nowrap">
//           Trusted by
//         </div>
//         <div className="overflow-hidden flex-1">
//           <div ref={trackRef} className="flex gap-14 whitespace-nowrap w-max">
//             {doubled.map((name, i) => (
//               <span key={i} className="text-[13px] font-semibold text-gray-400 hover:text-[#F97316] transition-colors duration-200 cursor-default select-none">
//                 {name}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    SECTION 4 — IMPACT STATS  (GSAP counters per card)
//    ============================================================ */
// function StatCard({ stat, index }: { stat: typeof STATS[number]; index: number }) {
//   const numRef  = useRef<HTMLParagraphElement>(null);
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!numRef.current || !cardRef.current) return;

//     gsap.from(cardRef.current, {
//       opacity: 0, y: 50, duration: 0.8, ease: "power3.out",
//       delay: index * 0.1,
//       scrollTrigger: { trigger: cardRef.current, start: "top 83%", once: true },
//     });

//     const obj = { val: 0 };
//     gsap.to(obj, {
//       val: stat.value,
//       duration: 2.2,
//       ease: "power2.out",
//       scrollTrigger: { trigger: numRef.current, start: "top 85%", once: true },
//       onUpdate() {
//         if (!numRef.current) return;
//         let out: string;
//         if (stat.value >= 1_000_000)   out = (obj.val / 1_000_000).toFixed(1) + "M+";
//         else if (stat.value === 2)     out = obj.val.toFixed(1) + "M+";
//         else if (stat.value % 1 !== 0) out = obj.val.toFixed(2) + "%";
//         else                           out = Math.floor(obj.val) + "%";
//         numRef.current.textContent = out;
//       },
//     });
//   }, [stat, index]);

//   return (
//     <div ref={cardRef} className="glass-card p-10 group cursor-default border border-gray-100 bg-white">
//       <p ref={numRef} className="text-[clamp(2.6rem,5vw,4rem)] font-black text-[#1e40af] leading-none tracking-[-0.04em] mb-3 tabular-nums" aria-label={`${stat.display} ${stat.label}`}>
//         {stat.display}
//       </p>
//       <p className="text-[13px] text-gray-500 font-medium">{stat.label}</p>
//       <div className="mt-5 h-0.5 w-8 bg-gradient-to-r from-[#F97316] to-[#fdba74] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
//     </div>
//   );
// }

// function ImpactStats() {
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     gsap.from(sectionRef.current?.querySelector(".stats-hdr") ?? [], {
//       opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
//       scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={sectionRef} className="relative py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff, #fff8f3 50%, #ffffff)' }} id="about" aria-label="Impact statistics">
//       {/* Decorative gradient orb */}
//       <div className="gradient-orb gradient-orb-orange w-[500px] h-[500px] -top-40 -right-40 pulse-glow" />
//       <div className="gradient-orb gradient-orb-purple w-[400px] h-[400px] -bottom-32 -left-32 pulse-glow" style={{ animationDelay: '2s' }} />
//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="stats-hdr mb-16">
//           <Tag>By the numbers</Tag>
//           <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.04em] text-[#1e40af]">
//             The scale of instant.
//           </h2>
//         </div>
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           {STATS.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    SECTION 5 — HOW IT WORKS
//    ============================================================ */
// function HowItWorks() {
//   const sectionRef  = useRef<HTMLElement>(null);
//   const connectorRef = useRef<SVGLineElement>(null);

//   useEffect(() => {
//     gsap.from(sectionRef.current?.querySelector(".how-hdr") ?? [], {
//       opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
//       scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
//     });

//     /* Draw the connector line across the four steps */
//     const line = connectorRef.current;
//     if (line) {
//       const len = line.getTotalLength?.() ?? 900;
//       gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
//       gsap.to(line, {
//         strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut",
//         scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
//       });
//     }

//     gsap.from(sectionRef.current?.querySelectorAll(".step-card") ?? [], {
//       opacity: 0, y: 60, duration: 0.8, ease: "power3.out", stagger: 0.13,
//       scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={sectionRef} className="relative py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff, #fff7ed 50%, #ffffff)' }} aria-label="How SpeedUp works">
//       <div className="gradient-orb gradient-orb-orange w-[400px] h-[400px] top-20 -left-40 pulse-glow" />
//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="how-hdr mb-20 max-w-lg">
//           <Tag>Process</Tag>
//           <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.04em] text-[#1e40af]">
//             From order to door<br />in under 8 minutes.
//           </h2>
//         </div>

//         {/* Animated connector line (desktop only) */}
//         <div className="hidden lg:block relative mb-2 -mx-2 h-0">
//           <svg className="absolute w-full overflow-visible" height="2" aria-hidden="true" style={{ top: -54 }}>
//             <line
//               ref={connectorRef}
//               x1="12.5%" y1="1" x2="87.5%" y2="1"
//               stroke="#F97316" strokeWidth="1.5" strokeLinecap="round"
//               strokeDasharray="4 6"
//             />
//           </svg>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {HOW_IT_WORKS.map((step, i) => {
//             const Icon = step.icon;
//             return (
//               <div key={step.step} className="step-card relative">
//                 {/* Step number */}
//                 <p className="text-[clamp(4rem,6vw,6rem)] font-black text-[#F97316]/10 leading-none tracking-[-0.06em] mb-5 select-none">
//                   {step.step}
//                 </p>
//                 {/* Icon bubble */}
//                 <div className="mb-5 relative inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#F97316]/10 border-2 border-[#F97316]/30 ring-4 ring-[#F97316]/5">
//                   <Icon className="h-5 w-5 text-[#F97316]" />
//                 </div>
//                 <h3 className="text-[1.05rem] font-bold text-[#1e40af] mb-2 tracking-tight">{step.title}</h3>
//                 <p className="text-[13px] text-gray-500 leading-relaxed">{step.desc}</p>
//                 {/* ETA badge on last step */}
//                 {i === HOW_IT_WORKS.length - 1 && (
//                   <span className="mt-4 inline-flex items-center gap-1.5 bg-[#F97316] text-white text-[11px] font-bold px-3 py-1 rounded-full">
//                     <Zap className="h-3 w-3" aria-hidden="true" />
//                     Avg 6 min
//                   </span>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    SECTION 6 — FEATURE CARDS  (full-bleed, zipline style)
//    ============================================================ */
// function FeatureCards() {
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     gsap.from(sectionRef.current?.querySelector(".feat-hdr") ?? [], {
//       opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
//       scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
//     });
//     gsap.from(sectionRef.current?.querySelectorAll(".feat-card") ?? [], {
//       opacity: 0, y: 50, duration: 0.85, ease: "power3.out", stagger: 0.14,
//       scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={sectionRef} className="relative py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff, #fff8f3 50%, #ffffff)' }} id="solutions" aria-label="Solutions">
//       <div className="gradient-orb gradient-orb-orange w-[400px] h-[400px] top-0 -right-32 pulse-glow" />
//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="feat-hdr mb-14 max-w-xl">
//           <Tag>Solutions</Tag>
//           <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.04em] text-[#1e40af]">
//             Finally, first-class<br />delivery.
//           </h2>
//         </div>
//         <div className="grid md:grid-cols-3 gap-5">
//           {FEATURES.map((f) => {
//             const Icon = f.icon;
//             return (
//               <div key={f.label} className="feat-card relative rounded-2xl overflow-hidden group cursor-pointer border border-orange-100" style={{ ...f.gradientStyle, aspectRatio: "3/4" }}>
//                 <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
//                   <DroneIcon className="w-48 h-48 text-[#F97316]" />
//                 </div>
//                 <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100" style={{ background: "rgba(249,115,22,0.08)" }} />
//                 <div className="absolute inset-0 flex flex-col justify-end p-8">
//                   <div className="mb-5 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm border border-orange-200">
//                     <Icon className="h-5 w-5" style={{ color: f.accent }} />
//                   </div>
//                   <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: f.accent }}>{f.label}</p>
//                   <h3 className="text-[1.75rem] font-black text-[#1e40af] mb-3 leading-tight tracking-tight">{f.title}</h3>
//                   <p className="text-[13px] text-gray-600 leading-relaxed mb-6">{f.desc}</p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-bold" style={{ color: f.accent }}>{f.stat}</span>
//                     <a href="#" className="text-[12px] text-gray-500 hover:text-[#F97316] flex items-center gap-1 transition-colors duration-200">
//                       Learn more <ArrowRight className="h-3 w-3" />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    SECTION 7 — BENTO GRID  (zipline social proof style)
//    ============================================================ */
// function BentoGrid() {
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     gsap.from(sectionRef.current?.querySelector(".bento-hdr") ?? [], {
//       opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
//       scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
//     });
//     gsap.from(sectionRef.current?.querySelectorAll(".bento-card") ?? [], {
//       opacity: 0, scale: 0.96, duration: 0.75, ease: "power3.out", stagger: 0.07,
//       scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={sectionRef} className="relative py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff, #fff7ed 50%, #ffffff)' }} aria-label="Social proof">
//       <div className="max-w-7xl mx-auto">
//         <div className="bento-hdr mb-14">
//           <Tag>Social proof</Tag>
//           <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.04em] text-[#1e40af]">
//             Millions of deliveries<br />made.
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(180px,auto)] gap-4">
//           {/* Quote — orange */}
//           <div className="bento-card md:col-span-2 rounded-2xl p-8 flex flex-col justify-between bg-[#F97316]" style={{ minHeight: 260 }}>
//             <div className="flex gap-1 mb-4">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-white text-white" />)}</div>
//             <div>
//               <p className="text-[1.15rem] font-semibold text-white leading-relaxed mb-5">
//                 &ldquo;SpeedUp cut our delivery time from 45 minutes to under 8. Our patients&rsquo; outcomes have meaningfully improved.&rdquo;
//               </p>
//               <p className="text-[13px] text-white/70 font-medium">— Dr. Sarah Chen, Chief Medical Officer, MedCore Health</p>
//             </div>
//           </div>

//           {/* Dark stat */}
//           <div className="bento-card rounded-2xl p-8 flex flex-col justify-end bg-[#1a1a1a]">
//             <p className="tabular-nums text-[3.5rem] font-black leading-none tracking-[-0.04em] mb-2 text-[#F97316]">4.2M+</p>
//             <p className="text-[13px] font-medium text-white/50">Deliveries completed</p>
//           </div>

//           {/* Cream stat */}
//           <div className="bento-card rounded-2xl p-8 flex flex-col justify-end bg-white border border-gray-100 shadow-sm">
//             <p className="tabular-nums text-[3rem] font-black leading-none tracking-[-0.04em] mb-2 text-[#1e40af]">&lt;&nbsp;8 min</p>
//             <p className="text-[13px] font-medium text-gray-500">Average delivery time</p>
//           </div>

//           {/* Info — cream */}
//           <div className="bento-card md:col-span-2 rounded-2xl p-8 bg-white border border-gray-100 shadow-sm">
//             <DroneIcon className="h-9 w-9 text-[#F97316] mb-6" />
//             <h3 className="text-[1.4rem] font-black text-[#1e40af] mb-3">Zero incidents.</h3>
//             <p className="text-[13px] text-gray-500 leading-relaxed max-w-md">4.2 million deliveries. Zero injuries. Zero compromises. Our safety-first engineering speaks for itself.</p>
//           </div>

//           {/* Orange stat */}
//           <div className="bento-card rounded-2xl p-8 flex flex-col justify-end bg-[#F97316]">
//             <p className="tabular-nums text-[3.5rem] font-black leading-none tracking-[-0.04em] mb-2 text-white">12</p>
//             <p className="text-[13px] font-medium text-white/70">Countries and growing</p>
//           </div>

//           {/* Dark info */}
//           <div className="bento-card md:col-span-2 rounded-2xl p-8 bg-[#1a1a1a]">
//             <Zap className="h-8 w-8 text-[#F97316] mb-5" />
//             <h3 className="text-[1.4rem] font-black text-white mb-3">100% electric.</h3>
//             <p className="text-[13px] text-white/50 leading-relaxed max-w-md">Every SpeedUp drone runs on renewable energy. Zero emissions, clean skies, quiet roads.</p>
//           </div>

//           {/* Globe card */}
//           <div className="bento-card rounded-2xl p-8 bg-white border border-gray-100 shadow-sm flex flex-col justify-between">
//             <Globe className="h-8 w-8 text-[#F97316]" />
//             <div>
//               <p className="tabular-nums text-[3rem] font-black text-[#1e40af] leading-none tracking-[-0.04em] mb-1">12</p>
//               <p className="text-[13px] text-gray-500">Countries served</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    SECTION 8 — TECHNOLOGY
//    ============================================================ */
// function TechSection() {
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const left  = sectionRef.current?.querySelector(".tech-left");
//     const right = sectionRef.current?.querySelector(".tech-right");
//     if (!left || !right) return;
//     gsap.from(left,  { opacity: 0, x: -60, duration: 0.95, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true } });
//     gsap.from(right, { opacity: 0, x:  60, duration: 0.95, ease: "power3.out", delay: 0.15, scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true } });
//   }, []);

//   return (
//     <section ref={sectionRef} className="relative py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff, #fff8f3 50%, #ffffff)' }} id="technology" aria-label="Technology">
//       <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
//         <div className="tech-left relative rounded-2xl overflow-hidden bg-[#1a1a1a]" style={{ aspectRatio: "4/3" }}>
//           <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 65% at 40% 40%, rgba(249,115,22,0.22) 0%, #1a1a1a 68%)" }} />
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//             <DroneIcon className="w-56 h-56 text-[#F97316] opacity-25" />
//           </div>
//           <div className="absolute bottom-0 left-0 right-0 p-5 grid grid-cols-2 gap-3">
//             {[{ l: "AI decisions/sec", v: "200+" }, { l: "Sensor streams", v: "47" }, { l: "Navigation fps", v: "120" }, { l: "Wind tolerance", v: "65 km/h" }].map((s) => (
//               <div key={s.l} className="bg-white/8 backdrop-blur-md rounded-xl p-3 border border-white/10">
//                 <p className="text-[10px] text-white/35 mb-1">{s.l}</p>
//                 <p className="text-[1.1rem] font-black text-white tracking-tight">{s.v}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="tech-right">
//           <Tag>Technology</Tag>
//           <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-black tracking-[-0.04em] text-[#1e40af] mb-6">
//             Engineered at the edge<br />of what&rsquo;s possible.
//           </h2>
//           <p className="text-gray-500 leading-relaxed mb-10 text-[15px]">
//             Our proprietary AI stack processes 47 sensor streams simultaneously — radar, LiDAR, stereo cameras, and GNSS — to make 200+ navigation decisions per second. No remote pilot required.
//           </p>
//           <div className="grid grid-cols-2 gap-3 mb-10">
//             {TECH_SPECS.map(({ icon: Icon, label, desc }) => (
//               <div key={label} className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-[#F97316]/30 hover:shadow-md transition-all duration-200">
//                 <Icon className="h-4 w-4 text-[#F97316] mb-3" />
//                 <p className="text-[13px] font-semibold text-[#1e40af] mb-1">{label}</p>
//                 <p className="text-[11px] text-gray-500 leading-relaxed">{desc}</p>
//               </div>
//             ))}
//           </div>
//           <a href="#technology" className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#F97316] hover:text-[#ea580c] transition-colors duration-200">
//             Learn about the technology <ArrowRight className="h-4 w-4" />
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    SECTION 9 — LOCATIONS STRIP
//    ============================================================ */
// /* ============================================================
//    SECTION 10 — FAQ ACCORDION  (GSAP height animation)
//    ============================================================ */
// function FAQSection() {
//   const [openIdx, setOpenIdx]  = useState<number | null>(null);
//   const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const sectionRef  = useRef<HTMLElement>(null);

//   useEffect(() => {
//     contentRefs.current.forEach((el) => {
//       if (el) gsap.set(el, { height: 0, overflow: "hidden" });
//     });
//     gsap.from(sectionRef.current?.querySelectorAll(".faq-row") ?? [], {
//       opacity: 0, y: 28, duration: 0.7, ease: "power3.out", stagger: 0.07,
//       scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
//     });
//   }, []);

//   const toggle = useCallback((i: number) => {
//     const el = contentRefs.current[i];
//     if (!el) return;

//     if (openIdx === i) {
//       gsap.to(el, { height: 0, duration: 0.38, ease: "power2.inOut" });
//       setOpenIdx(null);
//     } else {
//       if (openIdx !== null && contentRefs.current[openIdx]) {
//         gsap.to(contentRefs.current[openIdx]!, { height: 0, duration: 0.3, ease: "power2.inOut" });
//       }
//       gsap.set(el, { height: "auto" });
//       const h = el.scrollHeight;
//       gsap.fromTo(el, { height: 0 }, { height: h, duration: 0.42, ease: "power2.out" });
//       setOpenIdx(i);
//     }
//   }, [openIdx]);

//   return (
//     <section ref={sectionRef} className="relative py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff, #fff7ed 50%, #ffffff)' }} id="safety" aria-label="FAQ">
//       <div className="gradient-orb gradient-orb-orange w-[400px] h-[400px] bottom-20 -right-32 pulse-glow" />
//       <div className="max-w-3xl mx-auto">
//         <div className="mb-16">
//           <Tag>FAQ</Tag>
//           <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.04em] text-[#1e40af]">
//             You might be<br />wondering.
//           </h2>
//         </div>
//         <div className="divide-y divide-gray-100">
//           {FAQ_ITEMS.map((item, i) => (
//             <div key={i} className="faq-row py-5">
//               <button
//                 className="w-full flex items-center justify-between gap-4 text-left group"
//                 onClick={() => toggle(i)}
//                 aria-expanded={openIdx === i}
//               >
//                 <span className="text-[1.05rem] font-semibold text-[#1e40af] group-hover:text-[#F97316] transition-colors duration-200 leading-snug">
//                   {item.q}
//                 </span>
//                 <span className={`shrink-0 h-7 w-7 rounded-full border flex items-center justify-center transition-all duration-300 ${openIdx === i ? "bg-[#F97316] border-[#F97316] rotate-45" : "bg-gray-50 border-gray-200"}`}>
//                   <Plus className={`h-3.5 w-3.5 ${openIdx === i ? "text-white" : "text-gray-500"}`} />
//                 </span>
//               </button>
//               <div ref={(el) => { contentRefs.current[i] = el; }} style={{ overflow: "hidden" }}>
//                 <p className="text-[14px] text-gray-500 leading-relaxed pt-4 pb-2 max-w-xl">{item.a}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    SECTION 11 — FINAL CTA
//    ============================================================ */
// function FinalCTA() {
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     gsap.from(sectionRef.current?.querySelectorAll(".cta-el") ?? [], {
//       opacity: 0, y: 60, duration: 1, ease: "power3.out", stagger: 0.1,
//       scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={sectionRef} className="relative overflow-hidden py-40 px-6" style={{ background: 'linear-gradient(135deg, #F97316 0%, #ea580c 40%, #c2410c 100%)' }} id="contact" aria-label="Get started">
//       <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)" }} />
//       <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
//         backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
//         backgroundSize: "90px 90px",
//       }} />
//       <div className="absolute right-[-2%] top-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none select-none">
//         <DroneIcon className="w-[50vw] max-w-[600px] h-auto text-white" />
//       </div>

//       <div className="relative max-w-3xl mx-auto text-center">
//         <p className="cta-el text-[11px] font-bold uppercase tracking-[0.22em] text-white/70 mb-6">Get started</p>
//         <h2 className="cta-el text-[clamp(2.5rem,6vw,5.5rem)] font-black tracking-[-0.05em] text-white mb-6 leading-[0.92]">
//           Skip the wait.<br />Speed it up.
//         </h2>
//         <p className="cta-el text-white/80 text-[1.1rem] max-w-lg mx-auto mb-12 leading-relaxed">
//           Join 300+ businesses using SpeedUp. We&rsquo;ll design a custom delivery network for your city in under 2 weeks.
//         </p>
//         <div className="cta-el flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
//           <a href="#" className="inline-flex items-center gap-2 bg-white text-[#F97316] rounded-full px-9 py-4 text-[14px] font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg shadow-black/10">
//             Contact Sales <ArrowRight className="h-4 w-4" />
//           </a>
//           <a href="#" className="inline-flex items-center gap-2 text-white rounded-full px-9 py-4 text-[14px] font-semibold border border-white/30 hover:bg-white/10 transition-colors duration-200">
//             View case studies
//           </a>
//         </div>
//         <div className="cta-el flex flex-wrap justify-center gap-6 text-[13px] text-white/70">
//           {["No setup fees", "2-week launch", "24/7 support", "Custom SLA"].map((item) => (
//             <span key={item} className="flex items-center gap-2">
//               <span className="h-1 w-1 rounded-full bg-white" />
//               {item}
//             </span>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


// /* ============================================================
//    SECTION — DELIVERY JOURNEY  (animated SVG drone path)
//    ============================================================ */
// function DeliveryJourney() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const pathRef    = useRef<SVGPathElement>(null);
//   const droneRef   = useRef<SVGGElement>(null);
//   const glowRef    = useRef<SVGCircleElement>(null);

//   useEffect(() => {
//     const path  = pathRef.current;
//     const drone = droneRef.current;
//     if (!path || !drone) return;

//     const len = path.getTotalLength();

//     /* Reveal the dashed route line */
//     gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
//     gsap.to(path, {
//       strokeDashoffset: 0,
//       duration: 2.8,
//       ease: "power2.inOut",
//       scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true },
//     });

//     /* Drone follows the path */
//     gsap.to(drone, {
//       motionPath: { path: path, align: path, autoRotate: true, alignOrigin: [0.5, 0.5] },
//       duration: 2.8,
//       ease: "power2.inOut",
//       scrollTrigger: { trigger: sectionRef.current, start: "top 68%", once: true },
//     });

//     /* Glow pulse on drone */
//     gsap.to(glowRef.current, {
//       scale: 2.4, opacity: 0, duration: 1.1, ease: "power2.out",
//       repeat: -1, transformOrigin: "50% 50%",
//     });

//     /* Header reveal */
//     gsap.from(sectionRef.current?.querySelector(".journey-hdr") ?? [], {
//       opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
//       scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
//     });

//     /* Stat chips */
//     gsap.from(sectionRef.current?.querySelectorAll(".journey-chip") ?? [], {
//       opacity: 0, y: 20, duration: 0.6, ease: "power3.out", stagger: 0.1,
//       scrollTrigger: { trigger: sectionRef.current, start: "top 60%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={sectionRef} className="relative py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff, #fff7ed 50%, #ffffff)' }} aria-label="Delivery journey">
//       <div className="max-w-7xl mx-auto">
//         <div className="journey-hdr mb-16 text-center">
//           <Tag>How it flies</Tag>
//           <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.04em] text-[#1e40af]">
//             Straight to you.<br />Every time.
//           </h2>
//           <p className="mt-4 text-[15px] text-gray-500 max-w-md mx-auto leading-relaxed">
//             Our AI plots the safest, fastest flight corridor in real time — avoiding obstacles, traffic, and weather.
//           </p>
//         </div>

//         {/* SVG flight map */}
//         <div className="relative w-full" style={{ paddingBottom: "38%" }}>
//           <svg
//             viewBox="0 0 900 340"
//             className="absolute inset-0 w-full h-full"
//             aria-hidden="true"
//             preserveAspectRatio="xMidYMid meet"
//           >
//             <defs>
//               <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
//                 <stop offset="0%" stopColor="#F97316" stopOpacity="0.08" />
//               <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
//               </radialGradient>
//               <filter id="droneShadow">
//                 <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#F97316" floodOpacity="0.8" />
//               </filter>
//             </defs>

//             {/* Background glow */}
//             <ellipse cx="450" cy="170" rx="380" ry="130" fill="url(#bgGlow)" />

//             {/* Grid lines */}
//             {[80, 160, 240].map(y => (
//               <line key={y} x1="60" y1={y} x2="840" y2={y} stroke="#F97316" strokeWidth="0.5" strokeOpacity="0.08" />
//             ))}
//             {[160, 320, 480, 640, 800].map(x => (
//               <line key={x} x1={x} y1="40" x2={x} y2="300" stroke="#F97316" strokeWidth="0.5" strokeOpacity="0.08" />
//             ))}

//             {/* Origin pin */}
//             <circle cx="80" cy="240" r="8" fill="#F97316" opacity="0.9" />
//             <circle cx="80" cy="240" r="14" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.35" fill="none" />
//             <text x="80" y="270" textAnchor="middle" fill="#1a1a1a" fillOpacity="0.4" fontSize="10" fontFamily="system-ui">Store</text>

//             {/* Destination pin */}
//             <circle cx="820" cy="200" r="8" fill="#F97316" opacity="0.9" />
//             <circle cx="820" cy="200" r="14" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.35" fill="none" />
//             <text x="820" y="230" textAnchor="middle" fill="#1a1a1a" fillOpacity="0.4" fontSize="10" fontFamily="system-ui">Home</text>

//             {/* Altitude waypoints */}
//             {[{ x: 280, y: 100 }, { x: 450, y: 80 }, { x: 620, y: 120 }].map((pt, i) => (
//               <g key={i}>
//                 <circle cx={pt.x} cy={pt.y} r="3" fill="#F97316" opacity="0.5" />
//                 <line x1={pt.x} y1={pt.y} x2={pt.x} y2="200" stroke="#F97316" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="3 4" />
//               </g>
//             ))}

//             {/* The flight path */}
//             <path
//               ref={pathRef}
//               d="M 80,240 C 160,240 200,80 280,100 C 360,120 380,60 450,80 C 520,100 560,110 620,120 C 700,130 760,200 820,200"
//               fill="none"
//               stroke="#F97316"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeOpacity="0.7"
//             />

//             {/* Drone icon that follows path */}
//             <g ref={droneRef} style={{ filter: "url(#droneShadow)" }}>
//               <circle ref={glowRef} cx="0" cy="0" r="10" fill="#F97316" opacity="0.5" />
//               <g transform="translate(-10, -10)">
//                 <rect x="7" y="7" width="6" height="6" rx="1.5" fill="#F97316" />
//                 <ellipse cx="3"  cy="3"  rx="3.5" ry="1.2" fill="white" opacity=".85" />
//                 <ellipse cx="17" cy="3"  rx="3.5" ry="1.2" fill="white" opacity=".85" />
//                 <ellipse cx="3"  cy="17" rx="3.5" ry="1.2" fill="white" opacity=".85" />
//                 <ellipse cx="17" cy="17" rx="3.5" ry="1.2" fill="white" opacity=".85" />
//               </g>
//             </g>
//           </svg>
//         </div>

//         {/* Stat chips */}
//         <div className="mt-10 flex flex-wrap justify-center gap-4">
//           {[
//             { label: "Avg flight time", value: "6.2 min" },
//             { label: "Top speed",       value: "112 km/h" },
//             { label: "Altitude",        value: "80–120 m" },
//             { label: "Precision land",  value: "±30 cm" },
//           ].map((chip) => (
//             <div key={chip.label} className="journey-chip flex items-center gap-3 bg-white border border-gray-100 shadow-sm rounded-full px-5 py-2.5">
//               <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
//               <span className="text-[12px] text-gray-500 font-medium">{chip.label}</span>
//               <span className="text-[13px] text-[#1e40af] font-bold">{chip.value}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    SECTION — COVERAGE  (pulsing hub dots on a grid)
//    ============================================================ */
// const HUBS = [
//   { city: "San Francisco", x: "12%",  y: "38%", size: "lg" },
//   { city: "New York",      x: "27%",  y: "35%", size: "lg" },
//   { city: "London",        x: "46%",  y: "26%", size: "lg" },
//   { city: "Dubai",         x: "57%",  y: "42%", size: "md" },
//   { city: "Mumbai",        x: "62%",  y: "47%", size: "md" },
//   { city: "Singapore",     x: "73%",  y: "55%", size: "md" },
//   { city: "Tokyo",         x: "82%",  y: "34%", size: "lg" },
//   { city: "Sydney",        x: "84%",  y: "68%", size: "md" },
//   { city: "Toronto",       x: "22%",  y: "32%", size: "sm" },
//   { city: "Berlin",        x: "49%",  y: "28%", size: "sm" },
//   { city: "São Paulo",     x: "29%",  y: "64%", size: "sm" },
//   { city: "Nairobi",       x: "54%",  y: "55%", size: "sm" },
// ];

// function CoverageSection() {
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     gsap.from(sectionRef.current?.querySelector(".cov-hdr") ?? [], {
//       opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
//       scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
//     });
//     gsap.from(sectionRef.current?.querySelectorAll(".hub-dot") ?? [], {
//       scale: 0, opacity: 0, duration: 0.5, ease: "back.out(2)", stagger: 0.06,
//       transformOrigin: "50% 50%",
//       scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
//     });
//   }, []);

//   const sizeMap = { lg: 12, md: 9, sm: 7 } as const;

//   return (
//     <section ref={sectionRef} className="relative py-28 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff, #fff8f3 50%, #ffffff)' }} id="locations" aria-label="Coverage map">
//       <div className="gradient-orb gradient-orb-orange w-[400px] h-[400px] -top-24 -left-32 pulse-glow" />
//       <div className="max-w-7xl mx-auto">
//         <div className="cov-hdr mb-14 max-w-xl">
//           <Tag>Global coverage</Tag>
//           <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.04em] text-[#1e40af]">
//             Operating in<br />12 countries.
//           </h2>
//           <p className="mt-4 text-[15px] text-gray-500 leading-relaxed max-w-sm">
//             From San Francisco to Singapore — SpeedUp hubs are live and expanding every quarter.
//           </p>
//         </div>

//         {/* Dot-grid map */}
//         <div className="relative w-full rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm" style={{ paddingBottom: "42%" }}>
//           {/* Dot grid background */}
//           <div className="absolute inset-0 opacity-[0.08]" style={{
//             backgroundImage: "radial-gradient(circle, #F97316 1px, transparent 1px)",
//             backgroundSize: "24px 24px",
//           }} />
//           {/* Continent silhouette tint */}
//           <div className="absolute inset-0" style={{
//             background: "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(249,115,22,0.04) 0%, transparent 75%)",
//           }} />

//           {HUBS.map((hub) => {
//             const r = sizeMap[hub.size as keyof typeof sizeMap];
//             return (
//               <div
//                 key={hub.city}
//                 className="hub-dot absolute group"
//                 style={{ left: hub.x, top: hub.y, transform: "translate(-50%, -50%)" }}
//               >
//                 {/* Pulse rings */}
//                 <span className="absolute inset-0 rounded-full bg-[#F97316] opacity-30 animate-ping" style={{ animationDuration: "2.4s" }} />
//                 <span className="absolute rounded-full bg-[#F97316] opacity-15" style={{
//                   width: r * 3, height: r * 3,
//                   top: "50%", left: "50%",
//                   transform: "translate(-50%, -50%)",
//                 }} />
//                 {/* Core dot */}
//                 <span className="relative block rounded-full bg-[#F97316] z-10" style={{ width: r, height: r }} />
//                 {/* Tooltip */}
//                 <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-[#1a1a1a] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
//                   {hub.city}
//                 </span>
//               </div>
//             );
//           })}
//         </div>

//         {/* City list */}
//         <div className="mt-8 flex flex-wrap gap-3">
//           {HUBS.map((hub) => (
//             <span key={hub.city} className="flex items-center gap-1.5 text-[12px] font-medium text-gray-600 bg-white border border-gray-100 shadow-sm rounded-full px-3 py-1.5">
//               <MapPin className="h-2.5 w-2.5 text-[#F97316] shrink-0" aria-hidden="true" />
//               {hub.city}
//             </span>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    NEWS BANNER — fixed bottom ticker bar
//    ============================================================ */
// function NewsBanner() {
//   const [visible, setVisible] = useState(true);
//   const bannerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!bannerRef.current) return;
//     gsap.fromTo(
//       bannerRef.current,
//       { y: 60, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 1.5 }
//     );
//   }, []);

//   if (!visible) return null;

//   /* Quadruple items to guarantee a seamless loop on wide screens */
//   const loopItems = [...NEWS_ITEMS, ...NEWS_ITEMS, ...NEWS_ITEMS, ...NEWS_ITEMS];

//   return (
//     <div
//       ref={bannerRef}
//       className="fixed bottom-0 left-0 right-0 z-[90]"
//       style={{ opacity: 0 }}
//       role="marquee"
//       aria-label="Latest news"
//     >
//       {/* Light glassmorphism bar */}
//       <div className="relative bg-white/90 backdrop-blur-xl border-t border-gray-100 shadow-lg">
//         {/* Orange accent line */}
//         <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F97316] to-transparent opacity-60" />

//         <div className="flex items-center h-10">
//           {/* Label badge */}
//           <div className="shrink-0 flex items-center gap-1.5 px-4 lg:px-6 border-r border-gray-100 h-full">
//             <Newspaper className="h-3.5 w-3.5 text-[#F97316]" />
//             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F97316] hidden sm:inline">
//               News
//             </span>
//           </div>

//           {/* Scrolling marquee */}
//           <div className="flex-1 overflow-hidden">
//             <div className="marquee-track flex w-max gap-0">
//               {loopItems.map((item, i) => (
//                 <span
//                   key={i}
//                   className="shrink-0 flex items-center gap-6 px-6 text-[12px] text-gray-600 font-medium whitespace-nowrap"
//                 >
//                   {item}
//                   <span className="h-1 w-1 rounded-full bg-[#F97316] opacity-40" />
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Close button */}
//           <button
//             onClick={() => {
//               if (bannerRef.current) {
//                 gsap.to(bannerRef.current, {
//                   y: 60, opacity: 0, duration: 0.35, ease: "power2.in",
//                   onComplete: () => setVisible(false),
//                 });
//               } else {
//                 setVisible(false);
//               }
//             }}
//             className="shrink-0 flex items-center justify-center h-full px-3 lg:px-4 border-l border-gray-100 text-gray-400 hover:text-[#F97316] transition-colors duration-200"
//             aria-label="Close news banner"
//           >
//             <X className="h-3.5 w-3.5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

/* ============================================================
   ROOT
   ============================================================ */
export default function SpeedUpPage() {
  useEffect(() => {
    ScrollTrigger.defaults({ once: true });
  }, []);

  return (
    <>
      <Hero />
    </>
  );
}

// {/* <PartnerStrip />
//         <ImpactStats />
//         <HowItWorks />
//         <DeliveryJourney />
//         <FeatureCards />
//         <BentoGrid />
//         <TechSection />
//         <CoverageSection />
//         <Testimonials />
//         <FAQSection />
//         <FinalCTA /> */}  
    
