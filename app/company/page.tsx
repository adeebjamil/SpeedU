// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import {
//   ArrowRight, ArrowUpRight, Users, Target, Rocket, Heart,
//   MapPin, Clock, Briefcase, Handshake, Globe,
//   Zap, Mail,
// } from "lucide-react";
// import { Navigation, Footer, PageHero, Tag, GradientOrb, DroneIcon } from "../components/shared";
// import { PageTransition } from "../components/global-ui";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// /* ============================================================
//    CONSTANTS
//    ============================================================ */
// const LEADERSHIP = [
//   { name: "Ghanshyam Mandal", role: "Chief Executive Officer", bio: "PhD Aerospace Engineeing.",email: "gh528428@usf.edu", phone: "(407) 247-0769", img: null },
//   { name: "James Hearon", role: "Managing Director", bio: "PhD Aerospace Engineeing.",email: "Ja314724@usf.edu", phone: "(850) 896-4810", img: null },
//   { name: "Sebastian Reuda", role: "Chief Operating Officer", bio: "MD Mechanical Engineeing.",email: "se610938@usf.edu", phone: "(321) 365-1236", img: null },
//   { name: "Miguel Cevallos", role: "Director of Engineering", bio: "MD Mechanical Engineeing.",email: "mi509047@usf.edu", phone: "(407) 668-8904", img: null },
// ];

// const VALUES = [
//   { icon: Rocket, title: "Move fast, fly safe", desc: "Speed without shortcuts. We push boundaries while keeping safety non-negotiable." },
//   { icon: Users, title: "People first", desc: "Every delivery is someone's critical need. We build for real human outcomes." },
//   { icon: Target, title: "Relentless precision", desc: "±30cm landing accuracy isn't luck — it's obsessive engineering at every layer." },
//   { icon: Heart, title: "Sustainability native", desc: "100% electric, zero-emission. We don't offset carbon — we don't create it." },
// ];

// // const OPEN_ROLES = [
// //   { title: "Senior Robotics Engineer", team: "Engineering", location: "San Francisco, CA", type: "Full-time" },
// //   { title: "AI/ML Research Scientist", team: "Engineering", location: "Remote (US)", type: "Full-time" },
// //   { title: "Flight Operations Manager", team: "Operations", location: "Orlando, FL", type: "Full-time" },
// //   { title: "Regulatory Affairs Lead", team: "Legal & Safety", location: "Washington, DC", type: "Full-time" },
// //   { title: "Enterprise Account Executive", team: "Sales", location: "New York, NY", type: "Full-time" },
// //   { title: "Hardware Design Engineer", team: "Engineering", location: "San Francisco, CA", type: "Full-time" },
// //   { title: "Data Platform Engineer", team: "Engineering", location: "Remote (US)", type: "Full-time" },
// //   { title: "UX Designer — Consumer App", team: "Design", location: "San Francisco, CA", type: "Full-time" },
// // ];

// // const PARTNERS_LIST = [
// //   { name: "Walmart", desc: "Instant grocery delivery across 150+ Walmart locations.", category: "Retail" },
// //   { name: "CVS Health", desc: "Same-day prescription delivery for millions of patients.", category: "Healthcare" },
// //   { name: "UPS", desc: "Last-mile drone fulfillment for enterprise-grade logistics.", category: "Logistics" },
// //   { name: "Chipotle", desc: "Hot food delivered in under 8 minutes from kitchen to door.", category: "Food & Bev" },
// //   { name: "Johnson & Johnson", desc: "Emergency medical supply corridors for hospitals.", category: "Healthcare" },
// //   { name: "FedEx", desc: "Hybrid air logistics for time-critical parcels.", category: "Logistics" },
// // ];

// // const MILESTONES = [
// //   { year: "2026", event: "SpeedUp founded in Florida" },
// //   { year: "2020", event: "First successful autonomous delivery" },
// //   { year: "2021", event: "FAA Part 135 certification achieved" },
// //   { year: "2022", event: "Expanded to 5 US cities, partnered with Walmart" },
// //   { year: "2023", event: "International launch — London, Dubai, Tokyo" },
// //   { year: "2024", event: "1M deliveries milestone, Series C funding" },
// //   { year: "2025", event: "Expanded to 12 countries, 4.2M+ deliveries" },
// // ];

// /* ============================================================
//    ABOUT SECTION
//    ============================================================ */
// function AboutSection() {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     gsap.from(ref.current?.querySelector(".about-hdr") ?? [], {
//       opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
//       scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
//     });
//     gsap.from(ref.current?.querySelectorAll(".about-card") ?? [], {
//       opacity: 0, y: 50, duration: 0.8, ease: "power3.out", stagger: 0.12,
//       scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={ref} className="relative py-28 px-6 bg-white overflow-hidden" id="about">
//       <GradientOrb className="w-[500px] h-[500px] top-[-10%] left-[-10%]" color="orange" />

//       <div className="relative max-w-7xl mx-auto">
//         <div className="about-hdr grid lg:grid-cols-2 gap-16 items-start mb-20">
//           <div>
//             <Tag>Our story</Tag>
//             <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.04em] text-[#1e40af] mb-6">
//               Built for the world that <span className="gradient-text">can&rsquo;t wait.</span>
//             </h2>
//             <p className="text-gray-500 leading-relaxed text-[15px] mb-4">
//               SpeedUp was born from a simple frustration: why does delivery still depend on roads? Founded in 2019, we set out to build the world&rsquo;s most reliable autonomous drone delivery network.
//             </p>
//             <p className="text-gray-500 leading-relaxed text-[15px]">
//               Today, we operate in 12 countries, serve 300+ enterprise partners, and have completed over 4.2 million deliveries — with zero safety incidents. Our mission: make instant delivery the standard, not the exception.
//             </p>
//           </div>

//           <div className="relative rounded-2xl overflow-hidden bg-[#1a1a1a] border border-gray-200" style={{ aspectRatio: "4/3" }}>
//             <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 65% at 40% 40%, rgba(249,115,22,0.12) 0%, #1a1a1a 68%)" }} />
//             <div className="absolute inset-0 flex items-center justify-center">
//               <DroneIcon className="w-40 h-40 text-[#F97316] opacity-15" />
//             </div>
//             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1a1a1a] to-transparent">
//               <p className="text-[2.5rem] font-black text-white tracking-tight">4.2M+</p>
//               <p className="text-[13px] text-white/40">deliveries and counting</p>
//             </div>
//           </div>
//         </div>

//         {/* Values */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {VALUES.map(({ icon: Icon, title, desc }) => (
//             <div key={title} className="about-card group rounded-2xl p-7 bg-white border border-gray-100 shadow-sm hover:border-[#F97316]/25 hover:shadow-md transition-all duration-500 overflow-hidden">
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
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    TIMELINE
//    ============================================================ */
// function Timeline() {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     gsap.from(ref.current?.querySelectorAll(".tl-item") ?? [], {
//       opacity: 0, x: -30, duration: 0.7, ease: "power3.out", stagger: 0.1,
//       scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={ref} className="relative py-28 px-6 bg-gray-50 border-t border-gray-100">
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent" />
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-16">
//           <Tag>Milestones</Tag>
//           <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.04em] text-[#1e40af]">
//             Our <span className="gradient-text">journey.</span>
//           </h2>
//         </div>

//         <div className="relative">
//           <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#F97316]/40 via-[#F97316]/10 to-transparent" />
//           <div className="space-y-8">
//             {MILESTONES.map((m, i) => (
//               <div key={i} className="tl-item flex items-start gap-6 pl-4">
//                 <div className="relative shrink-0 mt-1">
//                   <span className="block w-3 h-3 rounded-full bg-[#F97316] shadow-lg shadow-orange-500/30" />
//                   <span className="absolute inset-0 rounded-full bg-[#F97316]/20 scale-[2.5]" />
//                 </div>
//                 <div className="flex-1 rounded-xl bg-white border border-gray-100 shadow-sm p-5 hover:border-[#F97316]/20 transition-colors duration-300">
//                   <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F97316] mb-1 block">{m.year}</span>
//                   <p className="text-[15px] text-gray-600 font-medium">{m.event}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    LEADERSHIP
//    ============================================================ */
// function LeadershipSection() {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     gsap.from(ref.current?.querySelectorAll(".leader-card") ?? [], {
//       opacity: 0, y: 40, duration: 0.7, ease: "power3.out", stagger: 0.09,
//       scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={ref} className="relative py-28 px-6 bg-white overflow-hidden">
//       <GradientOrb className="w-[400px] h-[400px] top-[10%] right-[-10%]" color="orange" />
//       <div className="relative max-w-7xl mx-auto">
//         <div className="mb-14">
//           <Tag>Leadership</Tag>
//           <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.04em] text-[#1e40af]">
//             The team behind <span className="gradient-text">the drones.</span>
//           </h2>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {LEADERSHIP.map((person) => (
//             <div key={person.name} className="leader-card group rounded-2xl p-7 bg-white border border-gray-100 shadow-sm hover:border-[#F97316]/20 hover:shadow-md transition-all duration-500 overflow-hidden">
//               <div className="relative z-10">
//                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F97316]/20 to-[#F97316]/5 border border-[#F97316]/20 flex items-center justify-center mb-5">
//                   <span className="text-[1.1rem] font-black text-[#F97316]">{person.name.split(" ").map(n => n[0]).join("")}</span>
//                 </div>
//                 <h3 className="text-[1.05rem] font-bold text-[#1e40af] mb-1 tracking-tight">{person.name}</h3>
//                 <p className="text-[12px] text-[#F97316] font-semibold mb-3">{person.role}</p>
//                 <p className="text-[13px] text-gray-500 leading-relaxed">{person.bio}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    CAREERS
//    ============================================================ */
// function CareersSection() {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     gsap.from(ref.current?.querySelectorAll(".role-row") ?? [], {
//       opacity: 0, y: 25, duration: 0.6, ease: "power3.out", stagger: 0.07,
//       scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={ref} className="relative py-28 px-6 bg-gray-50 border-t border-gray-100" id="careers">
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent" />

//       <div className="max-w-5xl mx-auto">
//         <div className="text-center mb-16">
//           <Tag>Careers</Tag>
//           <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.04em] text-[#1e40af]">
//             Build the future of <span className="gradient-text">delivery.</span>
//           </h2>
//           <p className="mt-4 text-[15px] text-gray-500 max-w-lg mx-auto leading-relaxed">
//             We&rsquo;re hiring world-class engineers, operators, and dreamers. Remote-friendly, competitive equity, and a mission that matters.
//           </p>
//         </div>

//         {/* Perks */}
//         <div className="grid sm:grid-cols-3 gap-4 mb-14">
//           {[
//             { icon: Globe, label: "Remote-friendly", sub: "Work from anywhere in the US" },
//             { icon: Zap, label: "Equity for all", sub: "Every employee is an owner" },
//             { icon: Heart, label: "Full benefits", sub: "Health, dental, vision, 401k" },
//           ].map(({ icon: Icon, label, sub }) => (
//             <div key={label} className="rounded-xl p-5 bg-white border border-gray-100 shadow-sm text-center">
//               <Icon className="h-5 w-5 text-[#F97316] mx-auto mb-3" />
//               <p className="text-[14px] font-semibold text-[#1e40af] mb-1">{label}</p>
//               <p className="text-[12px] text-gray-500">{sub}</p>
//             </div>
//           ))}
//         </div>

//         {/* Open roles */}
//         <div className="space-y-3">
//           {OPEN_ROLES.map((role, i) => (
//             <a key={i} href="#" className="role-row group flex items-center justify-between rounded-xl p-5 bg-white border border-gray-100 shadow-sm hover:border-[#F97316]/25 hover:shadow-md transition-all duration-300">
//               <div className="flex-1">
//                 <h3 className="text-[15px] font-semibold text-[#1e40af] group-hover:text-[#F97316] transition-colors duration-200 mb-1">{role.title}</h3>
//                 <div className="flex flex-wrap gap-3 text-[12px] text-gray-500">
//                   <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{role.team}</span>
//                   <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{role.location}</span>
//                   <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{role.type}</span>
//                 </div>
//               </div>
//               <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-[#F97316] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 ml-4" />
//             </a>
//           ))}
//         </div>

//         <p className="text-center mt-8 text-[13px] text-gray-500">
//           Don&rsquo;t see your role? Email us at <a href="mailto:careers@speedup.aero" className="text-[#F97316] hover:underline">careers@speedup.aero</a>
//         </p>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    PARTNERSHIP
//    ============================================================ */
// function PartnershipSection() {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     gsap.from(ref.current?.querySelectorAll(".partner-card") ?? [], {
//       opacity: 0, scale: 0.96, duration: 0.7, ease: "power3.out", stagger: 0.08,
//       scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
//     });
//   }, []);

//   return (
//     <section ref={ref} className="relative py-28 px-6 bg-white overflow-hidden" id="partnership">
//       <GradientOrb className="w-[500px] h-[500px] bottom-[-10%] right-[-10%]" color="orange" />

//       <div className="relative max-w-7xl mx-auto">
//         <div className="mb-14 max-w-xl">
//           <Tag>Partnership</Tag>
//           <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.04em] text-[#1e40af]">
//             Trusted by <span className="gradient-text">industry leaders.</span>
//           </h2>
//           <p className="mt-4 text-[15px] text-gray-500 leading-relaxed">
//             From retail giants to healthcare systems — SpeedUp powers instant delivery for world-class brands.
//           </p>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
//           {PARTNERS_LIST.map((p) => (
//             <div key={p.name} className="partner-card group rounded-2xl p-7 bg-white border border-gray-100 shadow-sm hover:border-[#F97316]/20 hover:shadow-md transition-all duration-500 overflow-hidden">
//               <div className="relative z-10">
//                 <span className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] text-[#F97316]/80 bg-[#F97316]/10 px-3 py-1 rounded-full mb-5">{p.category}</span>
//                 <h3 className="text-[1.3rem] font-black text-[#1e40af] mb-2 tracking-tight">{p.name}</h3>
//                 <p className="text-[13px] text-gray-500 leading-relaxed">{p.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Partner CTA */}
//         <div id="contact" className="rounded-2xl p-10 bg-gradient-to-br from-[#F97316] to-[#ea580c] text-center">
//           <Handshake className="h-8 w-8 text-white mx-auto mb-4" />
//           <h3 className="text-[1.5rem] font-black text-white mb-3">Become a partner</h3>
//           <p className="text-[14px] text-white/80 max-w-md mx-auto mb-6 leading-relaxed">
//             Launch drone delivery for your business in under 2 weeks. Custom SLA, dedicated fleet, 24/7 support.
//           </p>
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
//             <a href="mailto:partners@speedup.aero" className="group relative inline-flex items-center gap-2 bg-white text-[#F97316] rounded-full px-8 py-3.5 text-[14px] font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:bg-gray-50">
//               <Mail className="h-4 w-4 relative z-10" />
//               <span className="relative z-10">Contact Sales</span>
//             </a>
//             <a href="#" className="inline-flex items-center gap-2 text-white rounded-full px-8 py-3.5 text-[14px] font-semibold border border-white/30 hover:bg-white/10 transition-all duration-300">
//               View case studies <ArrowRight className="h-4 w-4" />
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ============================================================
//    PAGE
//    ============================================================ */
// export default function CompanyPage() {
//   useEffect(() => {
//     ScrollTrigger.defaults({ once: true });
//   }, []);

// //   return (
// //     <PageTransition>
// //     <div>
// //       <Navigation />
// //       <main>
// //         <PageHero
// //           tag="Company"
// //           title="The team building"
// //           titleAccent="the future of delivery."
// //           subtitle="We're on a mission to make instant, zero-emission delivery the global standard. Meet the people, culture, and partners making it real."
// //         />
// //         <AboutSection />
// //         <Timeline />
// //         <LeadershipSection />
// //         <CareersSection />
// //         <PartnershipSection />
// //       </main>
// //       <Footer />
// //     </div>
// //     </PageTransition>
// //   );
// }


export default function CompanyPage() {
  return (
    <div>
      <h1>Company</h1>
    </div>
  );
}