"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Tag, GradientOrb, cn } from "./shared";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TESTIMONIALS = [
  {
    quote: "SpeedUp cut our delivery time from 45 minutes to under 8. Our patients' outcomes have meaningfully improved across the board.",
    name: "Dr. Sarah Chen",
    role: "Chief Medical Officer",
    company: "MedCore Health",
    stars: 5,
    accent: "#fb7185",
  },
  {
    quote: "We tripled our delivery capacity without adding a single van. SpeedUp's drone fleet is the most reliable logistics partner we've ever had.",
    name: "James Rodriguez",
    role: "VP of Operations",
    company: "Walmart eCommerce",
    stars: 5,
    accent: "#F97316",
  },
  {
    quote: "The real-time tracking is incredible. Our customers watch the drone fly to their door — NPS scores shot up 34 points in two months.",
    name: "Lisa Park",
    role: "Head of Customer Experience",
    company: "Chipotle Digital",
    stars: 5,
    accent: "#38bdf8",
  },
  {
    quote: "In emergency response, every second matters. SpeedUp gets defibrillators on scene in under 3 minutes — that's saving lives.",
    name: "Chief Mark Thompson",
    role: "Fire Chief",
    company: "Orlando Fire Rescue",
    stars: 5,
    accent: "#fbbf24",
  },
  {
    quote: "Integration took 2 days. Their API is the cleanest I've worked with. We went from pilot to 50-city rollout in 8 weeks.",
    name: "Priya Agarwal",
    role: "CTO",
    company: "QuickMeds",
    stars: 5,
    accent: "#4ade80",
  },
  {
    quote: "SpeedUp made us carbon-neutral overnight. Zero emissions, faster delivery, happier customers — it's a no-brainer.",
    name: "Tom Fischer",
    role: "Sustainability Director",
    company: "GreenBox Logistics",
    stars: 5,
    accent: "#a78bfa",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Responsive cards per view
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - cardsPerView);

  const next = useCallback(() => setCurrent(p => Math.min(p + 1, maxIndex)), [maxIndex]);
  const prev = useCallback(() => setCurrent(p => Math.max(p - 1, 0)), []);

  useEffect(() => {
    if (!trackRef.current) return;
    const offset = -(current * (100 / cardsPerView));
    gsap.to(trackRef.current, {
      xPercent: offset,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [current, cardsPerView]);

  useEffect(() => {
    gsap.from(sectionRef.current?.querySelector(".test-hdr") ?? [], {
      opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
    });
    gsap.from(sectionRef.current?.querySelectorAll(".test-card") ?? [], {
      opacity: 0, y: 50, duration: 0.8, ease: "power3.out", stagger: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 bg-white border-t border-gray-100 overflow-hidden" id="testimonials" aria-label="Testimonials">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent" />
      <GradientOrb className="w-[400px] h-[400px] bottom-[-5%] right-[-10%]" color="orange" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header row */}
        <div className="test-hdr flex items-end justify-between mb-14">
          <div>
            <Tag>Testimonials</Tag>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.04em] text-[#1e40af]">
              Loved by <span className="gradient-text">industry leaders.</span>
            </h2>
          </div>

          {/* Carousel controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={prev}
              disabled={current === 0}
              className={cn(
                "h-10 w-10 rounded-full border flex items-center justify-center transition-all duration-200",
                current === 0
                  ? "border-white/[0.06] text-white/15 cursor-not-allowed"
                  : "border-gray-200 text-gray-500 hover:text-[#F97316] hover:border-[#F97316]/30 hover:bg-[#F97316]/5"
              )}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              disabled={current >= maxIndex}
              className={cn(
                "h-10 w-10 rounded-full border flex items-center justify-center transition-all duration-200",
                current >= maxIndex
                  ? "border-white/[0.06] text-white/15 cursor-not-allowed"
                  : "border-gray-200 text-gray-500 hover:text-[#F97316] hover:border-[#F97316]/30 hover:bg-[#F97316]/5"
              )}
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div className="overflow-hidden">
          <div ref={trackRef} className="flex">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="test-card shrink-0 px-2"
                style={{ width: `${100 / cardsPerView}%` }}
              >
                <div className="group relative h-full rounded-2xl p-7 bg-white border border-gray-100 shadow-sm hover:border-orange-200 hover:shadow-md transition-all duration-500 overflow-hidden">
                  {/* Accent glow */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[60px] pointer-events-none"
                    style={{ background: t.accent }}
                  />

                  <div className="relative z-10">
                    {/* Quote icon */}
                    <Quote className="h-6 w-6 mb-5 opacity-15" style={{ color: t.accent }} />

                    {/* Stars */}
                    <div className="flex gap-0.5 mb-5">
                      {Array.from({ length: t.stars }).map((_, si) => (
                        <Star key={si} className="h-3.5 w-3.5 fill-[#F97316] text-[#F97316]" />
                      ))}
                    </div>

                    {/* Quote text */}
                    <p className="text-[14px] text-gray-600 leading-relaxed mb-8 min-h-[80px]">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-bold"
                        style={{ background: `${t.accent}25`, border: `1px solid ${t.accent}35` }}
                      >
                        {t.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#1e40af]">{t.name}</p>
                        <p className="text-[11px] text-gray-400">{t.role}, {t.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator (mobile) */}
        <div className="flex justify-center gap-1.5 mt-8 sm:hidden">
          {Array.from({ length: TESTIMONIALS.length }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                current === i ? "w-6 bg-[#F97316]" : "w-1.5 bg-white/15"
              )}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
