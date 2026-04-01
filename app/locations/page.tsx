// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import {
//   MapPin, CheckCircle2, ArrowRight,
//   Building2, Zap, Clock,
// } from "lucide-react";
// import { Navigation, Footer, PageHero, Tag, GradientOrb, cn } from "../components/shared";
// import { PageTransition } from "../components/global-ui";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// /* ============================================================
//    CONSTANTS
//    ============================================================ */
// const US_CITIES = [
//   { city: "Orlando", state: "FL", x: "78%", y: "72%", active: true, hubs: 4, desc: "SpeedUp HQ hub — our largest US operation with 4 drone stations serving metro Orlando." },
//   { city: "Miami", state: "FL", x: "79%", y: "82%", active: true, hubs: 2, desc: "Serving Miami-Dade and Broward counties with rapid healthcare and retail delivery." },
//   { city: "Tampa", state: "FL", x: "74%", y: "72%", active: true, hubs: 2, desc: "Tampa Bay area coverage including St. Petersburg and Clearwater." },
//   { city: "Jacksonville", state: "FL", x: "76%", y: "64%", active: true, hubs: 1, desc: "Northeast Florida hub serving the greater Jacksonville metro." },
//   { city: "San Francisco", state: "CA", x: "10%", y: "42%", active: true, hubs: 3, desc: "Our founding city. Bay Area operations from SF to San Jose." },
//   { city: "Los Angeles", state: "CA", x: "12%", y: "58%", active: true, hubs: 3, desc: "Covering the greater LA metro — from Downtown to Santa Monica." },
//   { city: "New York", state: "NY", x: "82%", y: "32%", active: true, hubs: 5, desc: "NYC tri-state operations with 5 drone hubs across boroughs." },
//   { city: "Dallas", state: "TX", x: "50%", y: "64%", active: true, hubs: 2, desc: "DFW metroplex coverage with focus on healthcare delivery." },
//   { city: "Chicago", state: "IL", x: "62%", y: "30%", active: true, hubs: 2, desc: "Chicagoland area — retail and emergency service delivery." },
//   { city: "Seattle", state: "WA", x: "12%", y: "14%", active: true, hubs: 2, desc: "Pacific Northwest hub serving greater Seattle." },
//   { city: "Denver", state: "CO", x: "32%", y: "42%", active: true, hubs: 1, desc: "Front Range operations from Boulder to Colorado Springs." },
//   { city: "Austin", state: "TX", x: "48%", y: "72%", active: true, hubs: 1, desc: "Austin metro with a focus on food and retail delivery." },
//   { city: "Atlanta", state: "GA", x: "70%", y: "60%", active: false, hubs: 0, desc: "Coming Q3 2026 — ATL metro drone delivery." },
//   { city: "Phoenix", state: "AZ", x: "22%", y: "60%", active: false, hubs: 0, desc: "Coming Q4 2026 — Phoenix-Scottsdale metro operations." },
// ];

// const GLOBAL_CITIES = [
//   { city: "London", country: "UK", region: "Europe", active: true },
//   { city: "Berlin", country: "Germany", region: "Europe", active: true },
//   { city: "Dubai", country: "UAE", region: "Middle East", active: true },
//   { city: "Mumbai", country: "India", region: "Asia", active: true },
//   { city: "Singapore", country: "Singapore", region: "Asia", active: true },
//   { city: "Tokyo", country: "Japan", region: "Asia", active: true },
//   { city: "Sydney", country: "Australia", region: "Pacific", active: true },
//   { city: "Toronto", country: "Canada", region: "Americas", active: true },
//   { city: "São Paulo", country: "Brazil", region: "Americas", active: true },
//   { city: "Nairobi", country: "Kenya", region: "Africa", active: true },
//   { city: "Seoul", country: "South Korea", region: "Asia", active: false },
//   { city: "Paris", country: "France", region: "Europe", active: false },
// ];

// const FLORIDA_STATS = [
//   { value: "4", label: "Drone stations in Orlando", icon: Building2 },
//   { value: "9", label: "Total Florida hubs", icon: MapPin },
//   { value: "850K+", label: "Florida deliveries", icon: Zap },
//   { value: "6.1 min", label: "Avg delivery time FL", icon: Clock },
// ];

// /* ============================================================
//    US MAP SECTION
//    ============================================================ */
// function USMapSection() {
//   const ref = useRef<HTMLElement>(null);
//   const [selected, setSelected] = useState<string>("Orlando");
//   const selectedCity = US_CITIES.find(c => c.city === selected);

//   useEffect(() => {
//     gsap.from(ref.current?.querySelectorAll(".map-dot") ?? [], {
//       scale: 0, opacity: 0, duration: 0.4, ease: "back.out(2)", stagger: 0.05,
//       scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={ref} className="relative py-28 px-6 bg-white overflow-hidden" id="us-map">
//       <GradientOrb className="w-[500px] h-[500px] top-[-5%] right-[-10%]" color="orange" />

//       <div className="relative max-w-7xl mx-auto">
//         <div className="mb-14 max-w-xl">
//           <Tag>United States</Tag>
//           <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.04em] text-[#1e40af]">
//             Live across <span className="gradient-text">America.</span>
//           </h2>
//           <p className="mt-4 text-[15px] text-gray-500 leading-relaxed">
//             SpeedUp operates in 12 US cities with 28 drone stations. Florida is our densest network — with Orlando as our main hub.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-[1fr_340px] gap-8">
//           {/* Map */}
//           <div className="relative w-full rounded-2xl overflow-hidden bg-orange-50/50 border border-orange-100" style={{ paddingBottom: "60%" }}>
//             <div className="absolute inset-0 opacity-[0.04]" style={{
//               backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
//               backgroundSize: "20px 20px",
//             }} />

//             {/* Florida highlight glow */}
//             <div className="absolute" style={{ left: "70%", top: "60%", width: "18%", height: "30%" }}>
//               <div className="w-full h-full bg-[#F97316]/10 rounded-full blur-[40px]" />
//             </div>

//             {US_CITIES.map((c) => (
//               <button
//                 key={c.city}
//                 className={cn(
//                   "map-dot absolute group cursor-pointer z-10",
//                   selected === c.city && "z-20"
//                 )}
//                 style={{ left: c.x, top: c.y, transform: "translate(-50%, -50%)" }}
//                 onClick={() => setSelected(c.city)}
//                 aria-label={`${c.city}, ${c.state}`}
//               >
//                 {c.active && (
//                   <span className={cn(
//                     "absolute rounded-full opacity-15",
//                     selected === c.city ? "bg-[#F97316]" : "bg-white"
//                   )} style={{
//                     width: 28, height: 28,
//                     top: "50%", left: "50%",
//                     transform: "translate(-50%, -50%)",
//                   }} />
//                 )}
//                 <span className={cn(
//                   "relative block rounded-full z-10 shadow-lg transition-all duration-300",
//                   c.active
//                     ? selected === c.city
//                       ? "bg-[#F97316] shadow-orange-500/40 w-[14px] h-[14px]"
//                       : "bg-[#F97316] shadow-orange-500/20 w-[10px] h-[10px]"
//                     : "bg-white/30 w-[7px] h-[7px]"
//                 )} />
//                 <span className={cn(
//                   "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap text-[10px] font-semibold px-3 py-1.5 rounded-full border shadow-xl transition-all duration-200 pointer-events-none",
//                   selected === c.city
//                     ? "bg-[#F97316] text-[#1e40af] border-[#F97316] opacity-100"
//                     : "bg-gray-50 text-[#1e40af] border-orange-100 opacity-0 group-hover:opacity-100",
//                   !c.active && "text-gray-500"
//                 )}>
//                   {c.city}, {c.state} {!c.active && "(soon)"}
//                 </span>
//               </button>
//             ))}
//           </div>

//           {/* Detail panel */}
//           <div className="rounded-2xl p-6 bg-orange-50/50 border border-orange-100 h-fit lg:sticky lg:top-28">
//             {selectedCity && (
//               <>
//                 <div className="flex items-center gap-2 mb-4">
//                   <MapPin className="h-4 w-4 text-[#F97316]" />
//                   <h3 className="text-[1.1rem] font-bold text-[#1e40af]">{selectedCity.city}, {selectedCity.state}</h3>
//                   {selectedCity.active ? (
//                     <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">Live</span>
//                   ) : (
//                     <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">Coming soon</span>
//                   )}
//                 </div>
//                 <p className="text-[13px] text-gray-500 leading-relaxed mb-5">{selectedCity.desc}</p>
//                 {selectedCity.active && (
//                   <div className="flex items-center gap-4 text-[12px]">
//                     <span className="flex items-center gap-1 text-gray-500">
//                       <Building2 className="h-3 w-3 text-[#F97316]" />
//                       {selectedCity.hubs} hub{selectedCity.hubs > 1 ? "s" : ""}
//                     </span>
//                     <span className="flex items-center gap-1 text-gray-500">
//                       <CheckCircle2 className="h-3 w-3 text-emerald-400" />
//                       Operational
//                     </span>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    FLORIDA FOCUS
//    ============================================================ */
// function FloridaFocus() {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     gsap.from(ref.current?.querySelectorAll(".fl-stat") ?? [], {
//       opacity: 0, y: 30, duration: 0.7, ease: "power3.out", stagger: 0.1,
//       scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={ref} className="relative py-28 px-6 bg-gray-50 border-t border-orange-100" id="florida">
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent" />

//       <div className="max-w-7xl mx-auto">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           <div>
//             <Tag>Florida spotlight</Tag>
//             <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.04em] text-[#1e40af] mb-6">
//               Orlando is our <span className="gradient-text">home base.</span>
//             </h2>
//             <p className="text-gray-500 leading-relaxed text-[15px] mb-4">
//               Florida is our most mature network. Orlando serves as SpeedUp&rsquo;s primary operations hub with 4 drone stations covering the metro area, theme park corridors, and medical campuses.
//             </p>
//             <p className="text-gray-500 leading-relaxed text-[15px] mb-8">
//               From Miami to Jacksonville, our 9 Florida hubs handle 850,000+ deliveries annually — the densest drone delivery network in the United States.
//             </p>

//             <div className="grid grid-cols-2 gap-3">
//               {FLORIDA_STATS.map(({ value, label, icon: Icon }) => (
//                 <div key={label} className="fl-stat rounded-xl p-5 bg-orange-50/50 border border-orange-100 hover:border-[#F97316]/20 transition-colors duration-300">
//                   <Icon className="h-4 w-4 text-[#F97316] mb-3" />
//                   <p className="text-[1.5rem] font-black text-[#1e40af] tracking-tight mb-1">{value}</p>
//                   <p className="text-[11px] text-gray-500">{label}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Florida map mini */}
//           <div className="relative rounded-2xl overflow-hidden bg-orange-50/50 border border-orange-100 p-8" style={{ aspectRatio: "1" }}>
//             <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(249,115,22,0.08) 0%, transparent 70%)" }} />

//             <svg viewBox="0 0 300 400" className="w-full h-full" aria-hidden="true">
//               {/* Simplified Florida outline */}
//               <path d="M60,40 L240,40 L250,60 L255,100 L260,140 L250,160 L240,170 L230,200 L220,240 L210,260 L200,280 L190,300 L180,320 L175,340 L180,360 L170,370 L155,360 L150,340 L140,310 L120,290 L100,280 L80,260 L60,240 L50,220 L40,200 L35,180 L30,150 L35,120 L40,90 L45,65 Z"
//                 fill="rgba(249,115,22,0.08)" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.3" />

//               {/* Orlando */}
//               <circle cx="185" cy="220" r="8" fill="#F97316" opacity="0.9" />
//               <circle cx="185" cy="220" r="16" stroke="#F97316" strokeWidth="1" strokeOpacity="0.3" fill="none" />
//               <circle cx="185" cy="220" r="24" stroke="#F97316" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />
//               <text x="185" y="205" textAnchor="middle" fill="#F97316" fontSize="11" fontWeight="800" fontFamily="system-ui">Orlando</text>

//               {/* Miami */}
//               <circle cx="195" cy="340" r="5" fill="#F97316" opacity="0.7" />
//               <text x="195" y="358" textAnchor="middle" fill="#1a1a1a" fillOpacity="0.4" fontSize="9" fontFamily="system-ui">Miami</text>

//               {/* Tampa */}
//               <circle cx="140" cy="240" r="5" fill="#F97316" opacity="0.7" />
//               <text x="125" y="255" textAnchor="middle" fill="#1a1a1a" fillOpacity="0.4" fontSize="9" fontFamily="system-ui">Tampa</text>

//               {/* Jacksonville */}
//               <circle cx="200" cy="130" r="4" fill="#F97316" opacity="0.6" />
//               <text x="200" y="120" textAnchor="middle" fill="#1a1a1a" fillOpacity="0.4" fontSize="9" fontFamily="system-ui">Jacksonville</text>

//               {/* Connection lines */}
//               <line x1="185" y1="220" x2="195" y2="340" stroke="#F97316" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="4 4" />
//               <line x1="185" y1="220" x2="140" y2="240" stroke="#F97316" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="4 4" />
//               <line x1="185" y1="220" x2="200" y2="130" stroke="#F97316" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="4 4" />
//             </svg>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    GLOBAL NETWORK
//    ============================================================ */
// function GlobalSection() {
//   const ref = useRef<HTMLElement>(null);
//   const [filter, setFilter] = useState("All");

//   const regions = ["All", ...Array.from(new Set(GLOBAL_CITIES.map(c => c.region)))];
//   const filtered = filter === "All" ? GLOBAL_CITIES : GLOBAL_CITIES.filter(c => c.region === filter);

//   useEffect(() => {
//     gsap.from(ref.current?.querySelectorAll(".global-card") ?? [], {
//       opacity: 0, y: 30, duration: 0.6, ease: "power3.out", stagger: 0.06,
//       scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={ref} className="relative py-28 px-6 bg-white overflow-hidden" id="global">
//       <GradientOrb className="w-[400px] h-[400px] bottom-[5%] left-[-10%]" color="orange" />

//       <div className="relative max-w-7xl mx-auto">
//         <div className="mb-10">
//           <Tag>Global network</Tag>
//           <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.04em] text-[#1e40af] mb-6">
//             Operating in <span className="gradient-text">12 countries.</span>
//           </h2>
//         </div>

//         {/* Filter tabs */}
//         <div className="flex flex-wrap gap-2 mb-10">
//           {regions.map(r => (
//             <button
//               key={r}
//               onClick={() => setFilter(r)}
//               className={cn(
//                 "text-[12px] font-semibold px-4 py-2 rounded-full border transition-all duration-300",
//                 filter === r
//                   ? "bg-[#F97316] text-[#1e40af] border-[#F97316]"
//                   : "bg-orange-50/50 border-orange-100 text-gray-500 hover:text-gray-500 hover:border-orange-100"
//               )}
//             >
//               {r}
//             </button>
//           ))}
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//           {filtered.map((c) => (
//             <div key={c.city} className="global-card group rounded-xl p-5 bg-orange-50/50 border border-orange-100 hover:border-[#F97316]/20 transition-all duration-300">
//               <div className="flex items-start justify-between mb-3">
//                 <div>
//                   <h3 className="text-[15px] font-bold text-[#1e40af]">{c.city}</h3>
//                   <p className="text-[12px] text-gray-500">{c.country}</p>
//                 </div>
//                 {c.active ? (
//                   <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">Live</span>
//                 ) : (
//                   <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">2026</span>
//                 )}
//               </div>
//               <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F97316]/50">{c.region}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    CTA
//    ============================================================ */
// function LocationsCTA() {
//   return (
//     <section className="relative py-32 px-6 bg-gray-50 border-t border-orange-100" id="expand">
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent" />
//       <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(249,115,22,0.08) 0%, transparent 65%)" }} />

//       <div className="relative max-w-3xl mx-auto text-center">
//         <Tag>Expand with us</Tag>
//         <h2 className="text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.04em] text-[#1e40af] mb-6">
//           Want SpeedUp in <span className="gradient-text">your city?</span>
//         </h2>
//         <p className="text-gray-500 text-[15px] max-w-md mx-auto mb-10 leading-relaxed">
//           We&rsquo;re expanding rapidly. If you&rsquo;re a city official, business, or partner — let&rsquo;s talk.
//         </p>
//         <a href="/company#contact" className="group relative inline-flex items-center gap-2 bg-[#F97316] text-[#1e40af] rounded-full px-10 py-4 text-[15px] font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30">
//           <span className="relative z-10">Request coverage</span>
//           <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
//           <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//         </a>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    PAGE
//    ============================================================ */
// export default function LocationsPage() {
//   useEffect(() => {
//     ScrollTrigger.defaults({ once: true });
//   }, []);

//   return (
//     <PageTransition>
//     <div>
//       <Navigation />
//       <main>
//         <PageHero
//           tag="Locations"
//           title="Where we fly —"
//           titleAccent="USA, Florida & beyond."
//           subtitle="From Orlando to Tokyo, SpeedUp drones are delivering across 12 countries. Explore our network of drone stations worldwide."
//         />
//         <USMapSection />
//         <FloridaFocus />
//         <GlobalSection />
//         <LocationsCTA />
//       </main>
//       <Footer />
//     </div>
//     </PageTransition>
//   );
// }

export default function LocationsPage() {
  return (
    <div>
      <h1>Location</h1>
    </div>
  );
}