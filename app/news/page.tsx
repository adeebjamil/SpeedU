// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import {
//   ArrowUpRight, Clock,
//   ChevronLeft, ChevronRight, Newspaper, Globe, Rocket,
//   TrendingUp,
// } from "lucide-react";
// import { Navigation, Footer, Tag, GradientOrb, cn } from "../components/shared";
// import { PageTransition } from "../components/global-ui";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// /* ============================================================
//    CONSTANTS
//    ============================================================ */
// const BREAKING_NEWS = [
//   "SpeedUp expands to 12th country — Nairobi, Kenya now live",
//   "4.2 million deliveries milestone reached with zero incidents",
//   "New S4 Gen 3 drone achieves 112 km/h top speed",
//   "Walmart partnership expanded to 150+ locations nationwide",
//   "FAA grants SpeedUp extended BVLOS operations certificate",
// ];

// const FEATURED_ARTICLES = [
//   {
//     id: 1,
//     category: "Expansion",
//     title: "SpeedUp launches in Nairobi — our 12th country",
//     excerpt: "Today we're thrilled to announce SpeedUp is live in Nairobi, Kenya. Our first African hub will serve healthcare, logistics, and e-commerce delivery across the Nairobi metro area.",
//     date: "Mar 5, 2026",
//     readTime: "5 min read",
//     featured: true,
//     icon: Globe,
//     accent: "#F97316",
//   },
//   {
//     id: 2,
//     category: "Milestone",
//     title: "4.2 million deliveries — zero safety incidents",
//     excerpt: "We've crossed another milestone: 4.2 million autonomous deliveries completed worldwide with a perfect safety record. Here's how our engineering culture made it possible.",
//     date: "Feb 28, 2026",
//     readTime: "8 min read",
//     featured: true,
//     icon: TrendingUp,
//     accent: "#4ade80",
//   },
//   {
//     id: 3,
//     category: "Technology",
//     title: "Introducing the S4 Gen 3 — fastest drone in delivery",
//     excerpt: "Our new S4 Gen 3 drone reaches 112 km/h, carries 4kg payloads, and features next-gen sensor fusion with 200+ AI decisions per second.",
//     date: "Feb 14, 2026",
//     readTime: "6 min read",
//     featured: true,
//     icon: Rocket,
//     accent: "#38bdf8",
//   },
// ];

// const ALL_ARTICLES = [
//   {
//     id: 4,
//     category: "Partnership",
//     title: "Walmart expands SpeedUp to 150+ stores",
//     excerpt: "Walmart is rolling out SpeedUp drone delivery to over 150 locations across 8 states, making instant grocery delivery available to millions more customers.",
//     date: "Feb 8, 2026",
//     readTime: "4 min read",
//   },
//   {
//     id: 5,
//     category: "Regulatory",
//     title: "FAA grants extended BVLOS certificate",
//     excerpt: "SpeedUp is now authorized for extended Beyond Visual Line Of Sight operations in 8 US states — a major step toward nationwide autonomous delivery.",
//     date: "Jan 30, 2026",
//     readTime: "3 min read",
//   },
//   {
//     id: 6,
//     category: "Healthcare",
//     title: "CVS partners with SpeedUp for same-day Rx",
//     excerpt: "CVS Health and SpeedUp are bringing same-day prescription delivery to patients across Florida and California, cutting wait times from days to minutes.",
//     date: "Jan 22, 2026",
//     readTime: "5 min read",
//   },
//   {
//     id: 7,
//     category: "Engineering",
//     title: "How our AI makes 200 decisions per second",
//     excerpt: "A deep dive into SpeedUp's Edge AI navigation stack — from sensor fusion to real-time obstacle avoidance at 120fps.",
//     date: "Jan 15, 2026",
//     readTime: "10 min read",
//   },
//   {
//     id: 8,
//     category: "Sustainability",
//     title: "One year of carbon-neutral operations",
//     excerpt: "SpeedUp is marking one full year of 100% electric, zero-emission operations worldwide. Here's what it took to get here.",
//     date: "Jan 5, 2026",
//     readTime: "6 min read",
//   },
//   {
//     id: 9,
//     category: "Community",
//     title: "SpeedUp Academy: training the next gen of drone engineers",
//     excerpt: "Our new engineering fellowship program is accepting applications from underrepresented communities in STEM.",
//     date: "Dec 18, 2025",
//     readTime: "4 min read",
//   },
//   {
//     id: 10,
//     category: "Expansion",
//     title: "Orlando hub expansion — 2 new drone stations",
//     excerpt: "SpeedUp Orlando now operates 4 drone stations, covering the entire metro area, theme park corridors, and medical campuses.",
//     date: "Dec 5, 2025",
//     readTime: "3 min read",
//   },
//   {
//     id: 11,
//     category: "Product",
//     title: "Introducing real-time delivery tracking for consumers",
//     excerpt: "Now you can watch your drone delivery in real-time on a map — from takeoff to your front door. Available in all SpeedUp partner apps.",
//     date: "Nov 20, 2025",
//     readTime: "3 min read",
//   },
//   {
//     id: 12,
//     category: "Safety",
//     title: "50,000 parachute tests and counting",
//     excerpt: "Our autonomous safety parachute system has been tested 50,000+ times with a 100% deployment rate. Here's the story behind the system.",
//     date: "Nov 10, 2025",
//     readTime: "7 min read",
//   },
// ];

// const CATEGORIES = ["All", "Expansion", "Technology", "Partnership", "Healthcare", "Regulatory", "Engineering", "Sustainability", "Safety", "Product", "Community", "Milestone"];

// /* ============================================================
//    NEWS TICKER — sliding hero banner
//    ============================================================ */
// function NewsTicker() {
//   const [current, setCurrent] = useState(0);
//   const tickerRef = useRef<HTMLDivElement>(null);
//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   const next = useCallback(() => {
//     setCurrent(prev => (prev + 1) % BREAKING_NEWS.length);
//   }, []);

//   const prev = useCallback(() => {
//     setCurrent(prev => (prev - 1 + BREAKING_NEWS.length) % BREAKING_NEWS.length);
//   }, []);

//   useEffect(() => {
//     intervalRef.current = setInterval(next, 4000);
//     return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
//   }, [next]);

//   useEffect(() => {
//     if (!tickerRef.current) return;
//     gsap.fromTo(tickerRef.current,
//       { y: 20, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
//     );
//   }, [current]);

//   return (
//     <section className="relative bg-[#F97316] overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
//         <span className="shrink-0 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
//           <span className="relative flex h-2 w-2">
//             <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
//             <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
//           </span>
//           Breaking
//         </span>

//         <div className="flex-1 overflow-hidden relative h-6">
//           <div ref={tickerRef} key={current} className="absolute inset-0 flex items-center">
//             <p className="text-[13px] font-semibold text-[#1e40af] truncate">{BREAKING_NEWS[current]}</p>
//           </div>
//         </div>

//         <div className="shrink-0 flex items-center gap-1">
//           <button onClick={prev} className="p-1 text-gray-500 hover:text-[#1e40af] transition-colors" aria-label="Previous news">
//             <ChevronLeft className="h-4 w-4" />
//           </button>
//           <span className="text-[11px] font-mono text-gray-500 w-8 text-center">{current + 1}/{BREAKING_NEWS.length}</span>
//           <button onClick={next} className="p-1 text-gray-500 hover:text-[#1e40af] transition-colors" aria-label="Next news">
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    HERO — news page hero with ticker
//    ============================================================ */
// function NewsHero() {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!ref.current) return;
//     gsap.from(ref.current.children, {
//       opacity: 0, y: 50, duration: 0.9, ease: "power4.out", stagger: 0.12, delay: 0.3,
//     });
//   }, []);

//   return (
//     <>
//       <div className="pt-20">
//         <NewsTicker />
//       </div>
//       <section className="relative pt-16 pb-20 px-6 bg-white overflow-hidden">
//         <GradientOrb className="w-[500px] h-[500px] top-[-10%] right-[-10%]" color="orange" />
//         <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none" style={{
//           backgroundImage: "linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px),linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)",
//           backgroundSize: "60px 60px",
//         }} />
//         <div ref={ref} className="relative z-10 max-w-5xl mx-auto text-center">
//           <Tag>News & Updates</Tag>
//           <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.92] tracking-[-0.04em] mb-6">
//             <span className="text-[#1e40af]">What&rsquo;s new at</span><br />
//             <span className="gradient-text">SpeedUp.</span>
//           </h1>
//           <p className="text-[clamp(1rem,1.6vw,1.15rem)] text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
//             Product launches, partnerships, milestones, and insights from the world&rsquo;s leading drone delivery company.
//           </p>
//         </div>
//       </section>
//     </>
//   );
// }

// /* ============================================================
//    FEATURED ARTICLES
//    ============================================================ */
// function FeaturedSection() {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     gsap.from(ref.current?.querySelectorAll(".feat-article") ?? [], {
//       opacity: 0, y: 50, duration: 0.8, ease: "power3.out", stagger: 0.12,
//       scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={ref} className="relative py-20 px-6 bg-white">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-10">
//           <Tag>Featured</Tag>
//         </div>

//         <div className="grid md:grid-cols-3 gap-5">
//           {FEATURED_ARTICLES.map((article) => {
//             const Icon = article.icon;
//             return (
//               <a key={article.id} href="#" className="feat-article group relative rounded-2xl overflow-hidden border border-orange-100 hover:border-[#F97316]/25 transition-all duration-500 cursor-pointer" style={{ aspectRatio: "3/4" }}>
//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white" />
//                 <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 30%, ${article.accent}12 0%, transparent 60%)` }} />

//                 <div className="absolute top-6 left-6">
//                   <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-orange-50/50 backdrop-blur-sm border border-orange-100">
//                     <Icon className="h-5 w-5" style={{ color: article.accent }} />
//                   </div>
//                 </div>

//                 <div className="absolute inset-0 flex flex-col justify-end p-7">
//                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: article.accent }}>{article.category}</span>
//                   <h3 className="text-[1.4rem] font-black text-[#1e40af] mb-3 leading-tight tracking-tight group-hover:text-[#F97316] transition-colors duration-300">{article.title}</h3>
//                   <p className="text-[13px] text-gray-500 leading-relaxed mb-5 line-clamp-2">{article.excerpt}</p>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3 text-[11px] text-gray-500">
//                       <span>{article.date}</span>
//                       <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
//                     </div>
//                     <ArrowUpRight className="h-4 w-4 text-gray-500 group-hover:text-[#F97316] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
//                   </div>
//                 </div>
//               </a>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    ALL ARTICLES LIST
//    ============================================================ */
// function AllArticles() {
//   const ref = useRef<HTMLElement>(null);
//   const [filter, setFilter] = useState("All");

//   const filtered = filter === "All" ? ALL_ARTICLES : ALL_ARTICLES.filter(a => a.category === filter);
//   const availableCategories = CATEGORIES.filter(c => c === "All" || ALL_ARTICLES.some(a => a.category === c));

//   useEffect(() => {
//     gsap.from(ref.current?.querySelectorAll(".article-row") ?? [], {
//       opacity: 0, y: 25, duration: 0.6, ease: "power3.out", stagger: 0.06,
//       scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={ref} className="relative py-20 px-6 bg-gray-50 border-t border-orange-100" id="all">
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent" />

//       <div className="max-w-5xl mx-auto">
//         <div className="mb-10">
//           <Tag>All articles</Tag>
//           <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-[-0.04em] text-[#1e40af]">
//             Browse <span className="gradient-text">everything.</span>
//           </h2>
//         </div>

//         {/* Category filters */}
//         <div className="flex flex-wrap gap-2 mb-10">
//           {availableCategories.map(c => (
//             <button
//               key={c}
//               onClick={() => setFilter(c)}
//               className={cn(
//                 "text-[12px] font-semibold px-4 py-2 rounded-full border transition-all duration-300",
//                 filter === c
//                   ? "bg-[#F97316] text-[#1e40af] border-[#F97316]"
//                   : "bg-orange-50/50 border-orange-100 text-gray-500 hover:text-gray-500 hover:border-orange-100"
//               )}
//             >
//               {c}
//             </button>
//           ))}
//         </div>

//         {/* Articles list */}
//         <div className="space-y-3">
//           {filtered.map((article) => (
//             <a key={article.id} href="#" className="article-row group flex items-start gap-5 rounded-xl p-5 bg-orange-50/50 border border-orange-100 hover:border-[#F97316]/20 hover:bg-orange-50/50 transition-all duration-300">
//               <div className="shrink-0 mt-1 w-10 h-10 rounded-xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center">
//                 <Newspaper className="h-4 w-4 text-[#F97316]" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-3 mb-1.5">
//                   <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F97316]">{article.category}</span>
//                   <span className="text-[11px] text-gray-500">{article.date}</span>
//                 </div>
//                 <h3 className="text-[15px] font-semibold text-[#1e40af] group-hover:text-[#F97316] transition-colors duration-200 mb-1 truncate">{article.title}</h3>
//                 <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-1">{article.excerpt}</p>
//               </div>
//               <div className="shrink-0 flex items-center gap-2 text-[11px] text-gray-500 mt-1">
//                 <Clock className="h-3 w-3" />
//                 {article.readTime}
//               </div>
//             </a>
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <p className="text-center text-[14px] text-gray-500 py-12">No articles in this category yet.</p>
//         )}
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    NEWSLETTER CTA
//    ============================================================ */
// function NewsletterCTA() {
//   return (
//     <section className="relative py-28 px-6 bg-white">
//       <GradientOrb className="w-[400px] h-[400px] top-[10%] right-[-10%]" color="orange" />

//       <div className="relative max-w-2xl mx-auto text-center">
//         <Tag>Stay updated</Tag>
//         <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.04em] text-[#1e40af] mb-4">
//           Never miss a <span className="gradient-text">headline.</span>
//         </h2>
//         <p className="text-[15px] text-gray-500 mb-8 leading-relaxed">
//           Subscribe to the SpeedUp newsletter for product updates, partnership announcements, and engineering insights.
//         </p>
//         <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
//           <label htmlFor="news-email" className="sr-only">Email address</label>
//           <input
//             id="news-email"
//             type="email"
//             placeholder="your@email.com"
//             autoComplete="email"
//             className="flex-1 bg-orange-50/50 border border-orange-100 rounded-xl px-5 py-3.5 text-[14px] text-[#1e40af] placeholder-white/15 focus:outline-none focus:border-[#F97316]/40 focus:bg-orange-50/50 transition-all duration-300"
//           />
//           <button type="submit" className="shrink-0 bg-[#F97316] text-[#1e40af] rounded-xl px-8 py-3.5 text-[14px] font-semibold hover:bg-orange-600 transition-colors duration-300 shadow-lg shadow-orange-500/15 hover:shadow-orange-500/25">
//             Subscribe
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    PAGE
//    ============================================================ */
// export default function NewsPage() {
//   useEffect(() => {
//     ScrollTrigger.defaults({ once: true });
//   }, []);

//   return (
//     <PageTransition>
//     <div>
//       <Navigation />
//       <main>
//         <NewsHero />
//         <FeaturedSection />
//         <AllArticles />
//         <NewsletterCTA />
//       </main>
//       <Footer />
//     </div>
//     </PageTransition>
//   );
// }

export default function NewsPage() {
  return (
    <div>
      <h1>News</h1>
    </div>
  );
}
