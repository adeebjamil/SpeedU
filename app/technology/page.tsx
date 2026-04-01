// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import {
//   Shield, Eye, Radio,
//   ArrowRight, CheckCircle2, Lock, AlertTriangle,
//   Layers, Wifi, Cloud, ScanLine, Gauge, BrainCircuit,
// } from "lucide-react";
// import { Navigation, Footer, PageHero, Tag, GradientOrb, DroneIcon, cn } from "../components/shared";
// import { PageTransition } from "../components/global-ui";
// import dynamic from "next/dynamic";

// const Drone3D = dynamic(() => import("../components/drone-3d").then(m => ({ default: m.Drone3D })), {
//   ssr: false,
//   loading: () => (
//     <div className="w-full h-full flex items-center justify-center">
//       <DroneIcon className="w-64 h-64 text-[#F97316] opacity-25" />
//     </div>
//   ),
// });

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// /* ============================================================
//    CONSTANTS
//    ============================================================ */
// const TECH_SLIDES = [
//   {
//     id: "ai",
//     icon: BrainCircuit,
//     label: "AI Navigation",
//     title: "120fps real-time intelligence.",
//     desc: "Our proprietary Edge AI stack processes 47 sensor streams simultaneously — radar, LiDAR, stereo cameras, and GNSS — to make 200+ navigation decisions per second. Fully on-board, no cloud dependency.",
//     stats: [
//       { label: "Decisions/sec", value: "200+" },
//       { label: "Sensor streams", value: "47" },
//       { label: "Navigation fps", value: "120" },
//       { label: "Latency", value: "<5ms" },
//     ],
//     accent: "#F97316",
//   },
//   {
//     id: "sensors",
//     icon: ScanLine,
//     label: "Sensor Fusion",
//     title: "See everything. Miss nothing.",
//     desc: "LiDAR, stereo vision, mmWave radar, ultrasonic, barometric altimeters, and dual-band GNSS work in unison. Our sensor fusion algorithm creates a 360° environmental model updated 120 times per second.",
//     stats: [
//       { label: "LiDAR range", value: "200m" },
//       { label: "Radar range", value: "400m" },
//       { label: "FOV coverage", value: "360°" },
//       { label: "Update rate", value: "120Hz" },
//     ],
//     accent: "#38bdf8",
//   },
//   {
//     id: "fleet",
//     icon: Cloud,
//     label: "Fleet Intelligence",
//     title: "Every drone learns. Fleet-wide.",
//     desc: "When one drone encounters a new obstacle pattern or weather anomaly, the learning propagates to every drone in the fleet within seconds. Our edge-cloud hybrid architecture ensures zero-latency local decisions with fleet-wide intelligence.",
//     stats: [
//       { label: "Active drones", value: "2,400+" },
//       { label: "Sync latency", value: "<2s" },
//       { label: "Data processed/day", value: "12TB" },
//       { label: "Model updates/day", value: "48" },
//     ],
//     accent: "#a78bfa",
//   },
//   {
//     id: "propulsion",
//     icon: Gauge,
//     label: "Propulsion",
//     title: "100% electric. Zero compromise.",
//     desc: "Custom-designed brushless motors with proprietary low-noise propeller geometry deliver maximum thrust at minimal sound. Swappable battery cells enable 90-second turnaround for 24/7 operations.",
//     stats: [
//       { label: "Top speed", value: "112 km/h" },
//       { label: "Range", value: "22 km" },
//       { label: "Battery swap", value: "90 sec" },
//       { label: "Noise at 100ft", value: "65 dB" },
//     ],
//     accent: "#4ade80",
//   },
//   {
//     id: "delivery",
//     icon: Layers,
//     label: "Precision Delivery",
//     title: "±30cm. Every single time.",
//     desc: "Our GPS-denied landing system uses computer vision and RTK positioning for centimeter-level accuracy. The precision tether lowers your package from 100ft — no rough landings, no rotor wash.",
//     stats: [
//       { label: "Landing accuracy", value: "±30cm" },
//       { label: "Tether length", value: "30m" },
//       { label: "Max payload", value: "4 kg" },
//       { label: "Descent speed", value: "1.2 m/s" },
//     ],
//     accent: "#fb923c",
//   },
// ];

// const SAFETY_FEATURES = [
//   { icon: Shield, title: "Triple-redundant motors", desc: "Three independent motor controllers. Any single failure is handled automatically — the drone continues its mission safely." },
//   { icon: AlertTriangle, title: "Autonomous parachute", desc: "If all motors fail simultaneously, a ballistic parachute deploys in under 200ms. Tested 50,000+ times with 100% deployment rate." },
//   { icon: Lock, title: "Geofencing", desc: "Hard-coded geographic boundaries that the drone physically cannot cross. Schools, hospitals, airports, and restricted zones are off-limits at the hardware level." },
//   { icon: Eye, title: "Detect-and-avoid", desc: "AI-powered 360° obstacle detection identifies and avoids birds, other aircraft, wires, and structures at 120fps — even in low visibility." },
//   { icon: Wifi, title: "Redundant communications", desc: "4G LTE, 5G, satellite, and mesh radio. Loss of any single link never interrupts operations. Full autonomous fallback." },
//   { icon: Radio, title: "Real-time monitoring", desc: "Every drone is monitored 24/7 by our AI operations center. Human operators can take control instantly if needed — but they never need to." },
// ];

// const CERTIFICATIONS = [
//   "FAA Part 135 Certified", "EASA Light UAS Operator", "ISO 9001:2015",
//   "SOC 2 Type II", "DO-178C Software", "ADS-B Out Equipped",
// ];

// const SAFETY_STATS = [
//   { value: "4.2M+", label: "Deliveries completed" },
//   { value: "0", label: "Safety incidents" },
//   { value: "99.98%", label: "Mission success rate" },
//   { value: "50K+", label: "Parachute tests passed" },
// ];

// /* ============================================================
//    TECH SLIDES
//    ============================================================ */
// function TechSlidesSection() {
//   const ref = useRef<HTMLElement>(null);
//   const [active, setActive] = useState(0);

//   useEffect(() => {
//     gsap.from(ref.current?.querySelector(".tech-hdr") ?? [], {
//       opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
//       scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
//     });
//   }, []);

//   const slide = TECH_SLIDES[active];
//   const Icon = slide.icon;

//   return (
//     <section ref={ref} className="relative py-28 px-6 bg-white overflow-hidden" id="tech">
//       <GradientOrb className="w-[500px] h-[500px] top-[-5%] right-[-10%]" color="orange" />

//       <div className="relative max-w-7xl mx-auto">
//         <div className="tech-hdr mb-14 max-w-xl">
//           <Tag>Core technology</Tag>
//           <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.04em] text-[#1e40af]">
//             Engineered at the <span className="gradient-text">edge of possible.</span>
//           </h2>
//         </div>

//         {/* Tab bar */}
//         <div className="flex flex-wrap gap-2 mb-12">
//           {TECH_SLIDES.map((s, i) => {
//             const TabIcon = s.icon;
//             return (
//               <button
//                 key={s.id}
//                 onClick={() => setActive(i)}
//                 className={cn(
//                   "flex items-center gap-2 text-[13px] font-semibold px-5 py-2.5 rounded-full border transition-all duration-300",
//                   active === i
//                     ? "text-[#1e40af] border-transparent shadow-lg"
//                     : "bg-orange-50/50 border-orange-100 text-gray-500 hover:text-gray-500 hover:border-orange-100"
//                 )}
//                 style={active === i ? { background: s.accent, boxShadow: `0 8px 25px ${s.accent}33` } : undefined}
//               >
//                 <TabIcon className="h-4 w-4" />
//                 {s.label}
//               </button>
//             );
//           })}
//         </div>

//         {/* Slide content */}
//         <div className="grid lg:grid-cols-2 gap-10 items-center">
//           {/* Visualization */}
//           <div className="relative rounded-2xl overflow-hidden bg-gray-50 border border-orange-100" style={{ aspectRatio: "4/3" }}>
//             <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 60% at 40% 40%, ${slide.accent}18 0%, #f5f5f4 68%)` }} />
//             <div className="absolute inset-0 flex items-center justify-center">
//               <DroneIcon className="w-48 h-48 opacity-10" />
//             </div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <Icon className="h-20 w-20 opacity-30" style={{ color: slide.accent }} />
//             </div>

//             {/* Stats overlay at bottom */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 grid grid-cols-2 gap-3">
//               {slide.stats.map((s) => (
//                 <div key={s.label} className="bg-orange-50/50 backdrop-blur-sm rounded-xl p-3 border border-orange-100 hover:border-orange-100 transition-colors duration-300">
//                   <p className="text-[10px] text-gray-500 mb-1">{s.label}</p>
//                   <p className="text-[1.1rem] font-black text-[#1e40af] tracking-tight">{s.value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Text */}
//           <div>
//             <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: slide.accent }}>
//               <Icon className="h-4 w-4" />
//               {slide.label}
//             </span>
//             <h3 className="text-[clamp(1.5rem,3vw,2.2rem)] font-black text-[#1e40af] mb-5 tracking-tight leading-tight">
//               {slide.title}
//             </h3>
//             <p className="text-gray-500 leading-relaxed text-[15px] mb-8">{slide.desc}</p>

//             <div className="grid grid-cols-2 gap-3">
//               {slide.stats.map((s) => (
//                 <div key={s.label} className="group p-4 rounded-xl bg-orange-50/50 border border-orange-100 hover:border-orange-100 transition-all duration-300">
//                   <p className="text-[11px] text-gray-500 mb-1">{s.label}</p>
//                   <p className="text-[1.2rem] font-black tracking-tight" style={{ color: slide.accent }}>{s.value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    DRONE SPECS OVERVIEW
//    ============================================================ */
// function DroneSpecsOverview() {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     gsap.from(ref.current?.querySelectorAll(".spec-item") ?? [], {
//       opacity: 0, y: 30, duration: 0.7, ease: "power3.out", stagger: 0.08,
//       scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
//     });
//   }, []);

//   const specs = [
//     { label: "Wingspan", value: "1.4m" },
//     { label: "Weight (empty)", value: "8.2 kg" },
//     { label: "Max payload", value: "4 kg" },
//     { label: "Top speed", value: "112 km/h" },
//     { label: "Range", value: "22 km" },
//     { label: "Max altitude", value: "120m AGL" },
//     { label: "Wind tolerance", value: "65 km/h" },
//     { label: "Rain rating", value: "IP54" },
//     { label: "Motor count", value: "8 (redundant)" },
//     { label: "Battery", value: "Smart LiPo" },
//     { label: "Swap time", value: "90 seconds" },
//     { label: "Noise @ 100ft", value: "65 dB" },
//   ];

//   return (
//     <section ref={ref} className="relative py-28 px-6 bg-gray-50 border-t border-orange-100">
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent" />

//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-14">
//           <Tag>Specifications</Tag>
//           <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.04em] text-[#1e40af]">
//             The <span className="gradient-text">SpeedUp S4</span> drone.
//           </h2>
//         </div>

//         <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
//           {/* Interactive 3D Drone */}
//           <div className="relative rounded-2xl overflow-hidden bg-white border border-orange-100" style={{ aspectRatio: "1" }}>
//             <Drone3D className="absolute inset-0 w-full h-full" />
//             <div className="absolute top-6 left-6 bg-[#F97316] text-[#1e40af] text-[11px] font-bold px-3 py-1 rounded-full z-10">S4 Gen 3</div>
//             <p className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-gray-500 z-10">Drag to rotate</p>
//           </div>

//           {/* Specs grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//             {specs.map((s) => (
//               <div key={s.label} className="spec-item rounded-xl p-4 bg-orange-50/50 border border-orange-100 hover:border-[#F97316]/20 transition-colors duration-300">
//                 <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">{s.label}</p>
//                 <p className="text-[1rem] font-black text-[#1e40af] tracking-tight">{s.value}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    SAFETY SECTION
//    ============================================================ */
// function SafetySection() {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     gsap.from(ref.current?.querySelector(".safety-hdr") ?? [], {
//       opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
//       scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
//     });
//     gsap.from(ref.current?.querySelectorAll(".safety-card") ?? [], {
//       opacity: 0, y: 40, duration: 0.7, ease: "power3.out", stagger: 0.1,
//       scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={ref} className="relative py-28 px-6 bg-white overflow-hidden" id="safety">
//       <GradientOrb className="w-[500px] h-[500px] top-[10%] left-[-10%]" color="orange" />

//       <div className="relative max-w-7xl mx-auto">
//         {/* Stats banner */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
//           {SAFETY_STATS.map((s) => (
//             <div key={s.label} className="rounded-2xl p-7 bg-orange-50/50 border border-orange-100 text-center">
//               <p className="text-[2.5rem] font-black tracking-[-0.04em] mb-1" style={{ color: s.value === "0" ? "#4ade80" : "#F97316" }}>{s.value}</p>
//               <p className="text-[12px] text-gray-500">{s.label}</p>
//             </div>
//           ))}
//         </div>

//         <div className="safety-hdr mb-14 max-w-xl">
//           <Tag>Safety engineering</Tag>
//           <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.04em] text-[#1e40af]">
//             Safety isn&rsquo;t a feature. <span className="gradient-text">It&rsquo;s the architecture.</span>
//           </h2>
//           <p className="mt-4 text-[15px] text-gray-500 leading-relaxed">
//             Every system has at least two independent backups. We engineer for failure — so our drones never fail.
//           </p>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
//           {SAFETY_FEATURES.map(({ icon: Icon, title, desc }) => (
//             <div key={title} className="safety-card group rounded-2xl p-7 bg-orange-50/50 border border-orange-100 hover:border-[#F97316]/20 transition-all duration-500 overflow-hidden shine-hover">
//               <div className="relative z-10">
//                 <div className="mb-5 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#F97316]/10 border border-[#F97316]/20">
//                   <Icon className="h-5 w-5 text-[#F97316]" />
//                 </div>
//                 <h3 className="text-[1rem] font-bold text-[#1e40af] mb-2 tracking-tight">{title}</h3>
//                 <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Certifications */}
//         <div className="rounded-2xl p-8 bg-orange-50/50 border border-orange-100">
//           <h3 className="text-[14px] font-semibold text-[#1e40af] mb-5 flex items-center gap-2">
//             <Shield className="h-4 w-4 text-[#F97316]" /> Certifications & compliance
//           </h3>
//           <div className="flex flex-wrap gap-3">
//             {CERTIFICATIONS.map((cert) => (
//               <span key={cert} className="flex items-center gap-2 text-[12px] font-medium text-gray-500 bg-orange-50/50 border border-orange-100 rounded-full px-4 py-2 hover:border-[#F97316]/30 hover:text-gray-500 transition-all duration-300">
//                 <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
//                 {cert}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    CTA
//    ============================================================ */
// function TechCTA() {
//   return (
//     <section className="relative py-32 px-6 bg-gray-50 border-t border-orange-100">
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent" />
//       <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(249,115,22,0.08) 0%, transparent 65%)" }} />

//       <div className="relative max-w-3xl mx-auto text-center">
//         <Tag>Developer API</Tag>
//         <h2 className="text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.04em] text-[#1e40af] mb-6">
//           Build on <span className="gradient-text">SpeedUp.</span>
//         </h2>
//         <p className="text-gray-500 text-[15px] max-w-md mx-auto mb-10 leading-relaxed">
//           Our REST API and SDKs let you integrate drone delivery into your app in hours, not months.
//         </p>
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//           <a href="#" className="group relative inline-flex items-center gap-2 bg-[#F97316] text-[#1e40af] rounded-full px-10 py-4 text-[15px] font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30">
//             <span className="relative z-10">View API docs</span>
//             <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
//             <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//           </a>
//           <a href="/company#contact" className="inline-flex items-center gap-2 text-gray-500 rounded-full px-10 py-4 text-[15px] font-semibold border border-orange-100 hover:border-orange-100 hover:bg-orange-50/50 transition-all duration-300">
//             Talk to engineering
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    PAGE
//    ============================================================ */
// export default function TechnologyPage() {
//   useEffect(() => {
//     ScrollTrigger.defaults({ once: true });
//   }, []);

//   return (
//     <PageTransition>
//     <div>
//       <Navigation />
//       <main>
//         <PageHero
//           tag="Technology"
//           title="The tech that makes"
//           titleAccent="instant delivery real."
//           subtitle="Edge AI, sensor fusion, fleet intelligence, and safety engineering — built from scratch for autonomous drone delivery."
//         />
//         <TechSlidesSection />
//         <DroneSpecsOverview />
//         <SafetySection />
//         <TechCTA />
//       </main>
//       <Footer />
//     </div>
//     </PageTransition>
//   );
// }

export default function TechnologyPage() {
  return (
    <div>
      <h1>Technology</h1>
    </div>
  );
}