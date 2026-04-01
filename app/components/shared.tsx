"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  X, Menu, Zap,
  Twitter, Linkedin, Github, Mail,
  Users, Briefcase, Handshake, MapPin, Building2,
} from "lucide-react";

/* ── Helpers ── */
export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

/* ── DroneIcon SVG ── */
export function DroneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <rect x="22" y="22" width="20" height="20" rx="5" fill="currentColor" opacity=".9" />
      <rect x="26" y="26" width="12" height="12" rx="3" fill="currentColor" opacity=".4" />
      <rect x="10" y="30" width="12" height="4" rx="2" fill="currentColor" opacity=".65" />
      <rect x="42" y="30" width="12" height="4" rx="2" fill="currentColor" opacity=".65" />
      <rect x="30" y="10" width="4" height="12" rx="2" fill="currentColor" opacity=".65" />
      <rect x="30" y="42" width="4" height="12" rx="2" fill="currentColor" opacity=".65" />
      <ellipse cx="10" cy="10" rx="8" ry="2.5" fill="currentColor" opacity=".5" />
      <ellipse cx="54" cy="10" rx="8" ry="2.5" fill="currentColor" opacity=".5" />
      <ellipse cx="10" cy="54" rx="8" ry="2.5" fill="currentColor" opacity=".5" />
      <ellipse cx="54" cy="54" rx="8" ry="2.5" fill="currentColor" opacity=".5" />
      <circle cx="10" cy="10" r="2.5" fill="currentColor" opacity=".8" />
      <circle cx="54" cy="10" r="2.5" fill="currentColor" opacity=".8" />
      <circle cx="10" cy="54" r="2.5" fill="currentColor" opacity=".8" />
      <circle cx="54" cy="54" r="2.5" fill="currentColor" opacity=".8" />
      <line x1="16" y1="16" x2="22" y2="22" stroke="currentColor" strokeWidth="2" opacity=".5" />
      <line x1="48" y1="16" x2="42" y2="22" stroke="currentColor" strokeWidth="2" opacity=".5" />
      <line x1="16" y1="48" x2="22" y2="42" stroke="currentColor" strokeWidth="2" opacity=".5" />
      <line x1="48" y1="48" x2="42" y2="42" stroke="currentColor" strokeWidth="2" opacity=".5" />
      <line x1="32" y1="42" x2="32" y2="50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" opacity=".4" />
      <rect x="28" y="50" width="8" height="5" rx="1.5" fill="currentColor" opacity=".35" />
      <circle cx="32" cy="32" r="2" fill="currentColor" opacity="1" />
    </svg>
  );
}

/* ── Tag ── */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 mb-6">
      <span className="h-px w-8 bg-gradient-to-r from-[#F97316] to-transparent" />
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#F97316]">
        {children}
      </p>
    </div>
  );
}

/* ── GradientOrb ── */
export function GradientOrb({ className, color = "orange" }: { className?: string; color?: "orange" | "blue" | "purple" }) {
  const colors = {
    orange: "bg-[#F97316]/20",
    blue: "bg-blue-500/15",
    purple: "bg-purple-500/15",
  };
  return (
    <div className={cn(
      "absolute rounded-full blur-[80px] pointer-events-none will-change-auto",
      colors[color],
      className
    )} />
  );
}

/* ── PageHero — reusable page-level hero banner ── */
export function PageHero({ tag, title, titleAccent, subtitle }: {
  tag: string;
  title: string;
  titleAccent: string;
  subtitle: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current.children, {
      opacity: 0, y: 50, duration: 0.9, ease: "power4.out", stagger: 0.12, delay: 0.4,
    });
  }, []);

  return (
    <section className="relative pt-36 pb-20 px-6 bg-white overflow-hidden">
      <GradientOrb className="w-[500px] h-[500px] top-[-10%] right-[-10%]" color="orange" />
      <GradientOrb className="w-[350px] h-[350px] bottom-[-10%] left-[-5%]" color="orange" />
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px),linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto text-center">
        <Tag>{tag}</Tag>
        <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.92] tracking-[-0.04em] mb-6">
          <span className="text-[#1e40af]">{title}</span><br />
          <span className="gradient-text">{titleAccent}</span>
        </h1>
        <p className="text-[clamp(1rem,1.6vw,1.15rem)] text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   NAVIGATION
   ============================================================ */

const SIMPLE_NAV_LINKS = [
  { label: "Technology",   href: "/technology" },
  { label: "Safety",       href: "/#safety" },
  { label: "News",         href: "/news" },
];

const COMPANY_MENU = [
  { label: "About", href: "/company#about", icon: Users, desc: "Our story, mission, and values" },
  { label: "Careers", href: "/company#careers", icon: Briefcase, desc: "Join the team building the future" },
  { label: "Partnership", href: "/company#partnership", icon: Handshake, desc: "Become an enterprise partner" },
];

const MAP_CITIES = [
  { city: "San Francisco", x: 10, y: 42 },
  { city: "Los Angeles", x: 13, y: 56 },
  { city: "Seattle", x: 12, y: 14 },
  { city: "Denver", x: 32, y: 42 },
  { city: "Dallas", x: 50, y: 64 },
  { city: "Austin", x: 48, y: 72 },
  { city: "Chicago", x: 62, y: 30 },
  { city: "Orlando", x: 78, y: 72 },
  { city: "Miami", x: 79, y: 82 },
  { city: "New York", x: 82, y: 32 },
];

function MegaMenuCompany({ scrolled }: { scrolled: boolean }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
      <div className={cn("w-[380px] rounded-2xl p-4 shadow-2xl border", scrolled ? "bg-white border-gray-100" : "bg-white border-gray-200")} style={{ backdropFilter: "blur(20px)" }}>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F97316] mb-3 px-2">Company</p>
        <div className="space-y-1">
          {COMPANY_MENU.map(({ label, href, icon: Icon, desc }) => (
            <a key={label} href={href} className="flex items-center gap-3.5 rounded-xl px-3 py-3 hover:bg-orange-50 transition-colors duration-200 group/item">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center group-hover/item:bg-[#F97316]/15 transition-colors duration-200">
                <Icon className="h-4 w-4 text-[#F97316]" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#1e40af] group-hover/item:text-[#F97316] transition-colors duration-200">{label}</p>
                <p className="text-[11px] text-gray-400">{desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function MegaMenuLocations({ scrolled }: { scrolled: boolean }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
      <div className={cn("w-[420px] rounded-2xl p-5 shadow-2xl border", scrolled ? "bg-white border-gray-100" : "bg-white border-gray-200")} style={{ backdropFilter: "blur(20px)" }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F97316] px-1">Locations</p>
          <a href="/locations" className="text-[11px] font-semibold text-gray-400 hover:text-[#F97316] transition-colors duration-200">View all →</a>
        </div>
        {/* Mini USA map */}
        <div className="relative w-full rounded-xl bg-orange-50/60 border border-orange-100 overflow-hidden" style={{ paddingBottom: "55%" }}>
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: "radial-gradient(circle, #F97316 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }} />
          {MAP_CITIES.map((c) => (
            <div
              key={c.city}
              className="absolute group/dot"
              style={{ left: `${c.x}%`, top: `${c.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <span className="absolute inset-0 rounded-full bg-[#F97316] opacity-20 animate-ping" style={{ width: 16, height: 16, top: -4, left: -4 }} />
              <span className="relative block w-2 h-2 rounded-full bg-[#F97316] shadow-md shadow-orange-500/40 z-10" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-[#1a1a1a] text-white text-[9px] font-semibold px-2 py-0.5 rounded-full opacity-0 group-hover/dot:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                {c.city}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {MAP_CITIES.slice(0, 6).map((c) => (
            <span key={c.city} className="flex items-center gap-1 text-[10px] font-medium text-gray-500 bg-white border border-gray-100 rounded-full px-2 py-0.5">
              <MapPin className="h-2 w-2 text-[#F97316]" />{c.city}
            </span>
          ))}
          <span className="text-[10px] font-medium text-gray-400 px-1 py-0.5">+{MAP_CITIES.length - 6} more</span>
        </div>
      </div>
    </div>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 }
    );
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeMenu = useCallback(() => {
    if (!overlayRef.current) { setMenuOpen(false); document.body.style.overflow = ""; return; }
    gsap.to(overlayRef.current, {
      x: "100%", duration: 0.4, ease: "power3.in",
      onComplete: () => { setMenuOpen(false); document.body.style.overflow = ""; },
    });
  }, []);

  useEffect(() => {
    if (!menuOpen || !overlayRef.current) return;
    gsap.fromTo(overlayRef.current, { x: "100%" }, { x: "0%", duration: 0.45, ease: "power3.out" });
    gsap.from(overlayRef.current.querySelectorAll(".menu-item"), {
      opacity: 0, x: 24, duration: 0.5, stagger: 0.05, ease: "power3.out", delay: 0.15,
    });
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        style={{ opacity: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[999] transition-all duration-500",
          scrolled
            ? "bg-white backdrop-blur-xl border-b border-gray-100 shadow-md"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="SpeedUp home">
            <div className="relative">
              <DroneIcon className="h-7 w-7 text-[#F97316] group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-[#F97316]/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className={cn("font-black text-[1.1rem] tracking-tight", scrolled ? "text-[#1e40af]" : "text-white")}>
              Speed<span className="text-[#F97316]">Up</span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1" role="list">
            {/* Company with mega menu */}
            <li className="relative group">
              <a href="/company" className={cn("text-[13px] px-3 py-2 rounded-lg transition-all duration-200 font-medium", scrolled ? "text-gray-600 hover:text-[#F97316] hover:bg-orange-50" : "text-white/50 hover:text-white hover:bg-white/[0.05]")}>
                Company
              </a>
              <MegaMenuCompany scrolled={scrolled} />
            </li>
            {/* Locations with mega menu */}
            <li className="relative group">
              <a href="/locations" className={cn("text-[13px] px-3 py-2 rounded-lg transition-all duration-200 font-medium", scrolled ? "text-gray-600 hover:text-[#F97316] hover:bg-orange-50" : "text-white/50 hover:text-white hover:bg-white/[0.05]")}>
                Locations
              </a>
              <MegaMenuLocations scrolled={scrolled} />
            </li>
            {/* Simple links */}
            {SIMPLE_NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={cn("text-[13px] px-3 py-2 rounded-lg transition-all duration-200 font-medium", scrolled ? "text-gray-600 hover:text-[#F97316] hover:bg-orange-50" : "text-white/50 hover:text-white hover:bg-white/[0.05]")}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>



          <button className={cn("lg:hidden p-2 transition-colors", scrolled ? "text-gray-600 hover:text-[#F97316]" : "text-white/70 hover:text-[#F97316]")} onClick={openMenu} aria-label="Open menu" aria-expanded={menuOpen}>
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div ref={overlayRef} className="fixed inset-0 z-[100] bg-white flex flex-col px-6 pt-6 pb-10" style={{ transform: "translateX(100%)" }} role="dialog" aria-modal="true" aria-label="Mobile menu">
          <div className="flex justify-between items-center mb-10">
            <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
              <DroneIcon className="h-7 w-7 text-[#F97316]" />
              <span className="font-black text-[1.1rem] text-[#1e40af]">Speed<span className="text-[#F97316]">Up</span></span>
            </Link>
            <button onClick={closeMenu} className="p-2 text-gray-400 hover:text-[#1e40af]" aria-label="Close menu"><X className="h-5 w-5" /></button>
          </div>
          <nav className="flex-1">
            <ul className="flex flex-col" role="list">
              {[{ label: "Company", href: "/company" }, { label: "Locations", href: "/locations" }, ...SIMPLE_NAV_LINKS].map((l) => (
                <li key={l.label} className="menu-item">
                  <a href={l.href} onClick={closeMenu} className="block text-2xl font-black text-[#1e40af] py-4 border-b border-gray-100 hover:text-[#F97316] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <a href="/contact" onClick={closeMenu} className="menu-item w-full text-center bg-[#F97316] text-white rounded-full px-6 py-4 text-[15px] font-semibold hover:bg-orange-600 transition-colors">
              Contact Sales
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Company: [
    { label: "About", href: "/company" },
    { label: "Careers", href: "/company#careers" },
    { label: "Press", href: "/news" },
    { label: "Partners", href: "/company#partnership" },
  ],
  Product: [
    { label: "Technology", href: "/technology" },
    { label: "Safety", href: "/technology#safety" },
    { label: "Pricing", href: "/pricing" },
    { label: "Locations", href: "/locations" },
  ],
  Solutions: [
    { label: "Healthcare", href: "/#solutions" },
    { label: "Retail", href: "/#solutions" },
    { label: "Emergency", href: "/#solutions" },
    { label: "Enterprise", href: "/company#partnership" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Accessibility", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-[#FACC15] border-t border-yellow-400 pt-20 pb-10 px-6" aria-label="Site footer">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 pb-14 border-b border-[#1a1a1a]/10">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="relative">
                <DroneIcon className="h-8 w-8 text-[#F97316]" />
                <div className="absolute inset-0 bg-[#F97316]/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-[#1e40af] font-black text-[1.2rem] tracking-tight">Speed<span className="text-[#F97316]">Up</span></span>
            </Link>
            <p className="text-[13px] text-[#1e40af]/60 max-w-xs leading-relaxed mb-6">
              Autonomous drone delivery for a faster, greener world. Operating in 12 countries and growing.
            </p>
            <div className="flex gap-2">
              {[{ Icon: Twitter, l: "Twitter" }, { Icon: Linkedin, l: "LinkedIn" }, { Icon: Github, l: "GitHub" }, { Icon: Mail, l: "Email" }].map(({ Icon, l }) => (
                <a key={l} href="#" aria-label={l} className="h-9 w-9 rounded-lg bg-[#1a1a1a]/[0.06] border border-[#1a1a1a]/10 flex items-center justify-center text-[#1e40af]/50 hover:text-[#F97316] hover:border-[#F97316]/40 hover:bg-[#F97316]/10 transition-all duration-300">
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[14px] font-semibold text-[#1e40af] mb-2">Stay in the loop</p>
            <p className="text-[13px] text-[#1e40af]/50 mb-4">Updates on new routes, features, and partnerships.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()} aria-label="Newsletter signup">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                className="flex-1 bg-white/60 border border-[#1a1a1a]/10 rounded-xl px-4 py-3 text-[13px] text-[#1e40af] placeholder-[#1a1a1a]/30 focus:outline-none focus:border-[#F97316]/50 focus:bg-white/80 transition-all duration-300"
              />
              <button type="submit" className="shrink-0 bg-[#F97316] text-white rounded-xl px-6 py-3 text-[13px] font-semibold hover:bg-orange-600 transition-colors duration-300 shadow-lg shadow-orange-500/15 hover:shadow-orange-500/25">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#1a1a1a]/10">
          {Object.entries(FOOTER_LINKS).map(([cat, links]) => (
            <div key={cat}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1e40af]/35 mb-4">{cat}</p>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[13px] text-[#1e40af]/60 hover:text-[#F97316] transition-colors duration-200">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] text-[#1e40af]/35">
          <p>&copy; {new Date().getFullYear()} SpeedUp Technologies, Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-[#F97316]" aria-hidden="true" />
            100% carbon-neutral operations
          </p>
        </div>
      </div>
    </footer>
  );
}
