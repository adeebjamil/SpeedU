"use client";

import { useState, useEffect } from "react";
import {
  PlaneTakeoff,
  Package,
  AlertTriangle,
  BatteryWarning,
  CloudRain,
  Wind,
  WifiOff,
  Activity,
  LocateFixed,
  Zap,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Clock,
  Route,
  Battery,
  Signal,
  ArrowUpRight,
  Eye,
  BarChart3,
  Gauge,
  Timer,
  MapPin,
} from "lucide-react";

/* ───────────── tiny helpers ───────────── */

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame: number;
    const duration = 1200;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return (
    <span className="tabular">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function ProgressRing({ percentage, color, size = 48, strokeWidth = 4 }: { percentage: number; color: string; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

/* ───────────── data ───────────── */

const stats = [
  {
    label: "Active Drones",
    value: 12,
    change: "+3",
    trend: "up" as const,
    icon: PlaneTakeoff,
    gradient: "from-orange-500 to-orange-600",
    glowColor: "rgba(249,115,22,0.3)",
    bgGlow: "rgba(249,115,22,0.08)",
  },
  {
    label: "Flights In Progress",
    value: 7,
    change: "+2",
    trend: "up" as const,
    icon: Activity,
    gradient: "from-emerald-400 to-teal-500",
    glowColor: "rgba(52,211,153,0.3)",
    bgGlow: "rgba(52,211,153,0.08)",
  },
  {
    label: "Pending Orders",
    value: 18,
    change: "-5",
    trend: "down" as const,
    icon: Package,
    gradient: "from-amber-400 to-amber-500",
    glowColor: "rgba(253,230,138,0.3)",
    bgGlow: "rgba(253,230,138,0.08)",
  },
  {
    label: "Grounded Drones",
    value: 3,
    change: "+1",
    trend: "up" as const,
    icon: AlertTriangle,
    gradient: "from-rose-500 to-pink-600",
    glowColor: "rgba(244,63,94,0.3)",
    bgGlow: "rgba(244,63,94,0.08)",
  },
];

const recentFlights = [
  {
    id: "FL-2847",
    drone: "DR-101",
    from: "Hub Alpha",
    to: "Zone B-12",
    status: "In Transit",
    eta: "14 min",
    battery: 78,
    speed: "42 km/h",
    statusColor: "text-emerald-400",
    statusBg: "bg-emerald-400/10",
    statusBorder: "border-emerald-400/20",
  },
  {
    id: "FL-2846",
    drone: "DR-105",
    from: "Hub Beta",
    to: "Zone A-07",
    status: "Delivering",
    eta: "6 min",
    battery: 45,
    speed: "38 km/h",
    statusColor: "text-orange-400",
    statusBg: "bg-orange-400/10",
    statusBorder: "border-orange-200",
  },
  {
    id: "FL-2845",
    drone: "DR-102",
    from: "Zone C-03",
    to: "Hub Alpha",
    status: "Returning",
    eta: "2 min",
    battery: 22,
    speed: "35 km/h",
    statusColor: "text-orange-400",
    statusBg: "bg-orange-400/10",
    statusBorder: "border-orange-200",
  },
  {
    id: "FL-2844",
    drone: "DR-109",
    from: "Hub Alpha",
    to: "Zone D-15",
    status: "In Transit",
    eta: "23 min",
    battery: 92,
    speed: "55 km/h",
    statusColor: "text-emerald-400",
    statusBg: "bg-emerald-400/10",
    statusBorder: "border-emerald-400/20",
  },
];

const performanceMetrics = [
  { label: "On-Time Rate", value: 96.8, color: "#3b82f6", icon: Timer },
  { label: "Fleet Utilization", value: 84, color: "#10b981", icon: Gauge },
  { label: "Delivery Success", value: 99.2, color: "#8b5cf6", icon: CheckCircle2 },
  { label: "Avg. Flight Time", value: 73, color: "#f59e0b", icon: Clock },
];

/* ───────────── page ───────────── */

export default function DashboardPage() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8">
      <style jsx>{`
        /* Card base */
        .dash-card {
          background: linear-gradient(
            135deg,
            rgba(255, 243, 224, 0.8) 0%,
            rgba(255, 250, 245, 0.9) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .dash-card:hover {
          border-color: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.5);
        }

        /* Stat card */
        .stat-card {
          background: linear-gradient(
            145deg,
            rgba(255, 243, 224, 0.7) 0%,
            rgba(255, 250, 245, 0.85) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .stat-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.08) 50%,
            transparent 100%
          );
        }
        .stat-card:hover {
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-4px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        /* Map card */
        .map-card {
          background: linear-gradient(
            180deg,
            rgba(255, 248, 240, 0.95) 0%,
            rgba(255, 253, 250, 0.98) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 20px;
          overflow: hidden;
        }

        /* Grid pattern */
        .grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.02) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.02) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
        }

        /* Animated grid line */
        @keyframes grid-scan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        .grid-scan-line {
          animation: grid-scan 4s ease-in-out infinite;
        }

        /* Radar sweep */
        @keyframes radar-sweep {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .radar-sweep {
          animation: radar-sweep 4s linear infinite;
        }

        /* Pulse ring */
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 0;
          }
          100% {
            transform: scale(0.8);
            opacity: 0;
          }
        }
        .pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
        }
        .pulse-ring-delay {
          animation: pulse-ring 2s ease-out infinite 0.5s;
        }
        .pulse-ring-delay-2 {
          animation: pulse-ring 2s ease-out infinite 1s;
        }

        /* Float animation for drones */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .drone-float {
          animation: float 3s ease-in-out infinite;
        }
        .drone-float-delay {
          animation: float 3s ease-in-out infinite 1s;
        }

        /* Stagger entrance */
        @keyframes slide-up-fade {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .stagger-1 {
          animation: slide-up-fade 0.6s ease-out 0.1s both;
        }
        .stagger-2 {
          animation: slide-up-fade 0.6s ease-out 0.2s both;
        }
        .stagger-3 {
          animation: slide-up-fade 0.6s ease-out 0.3s both;
        }
        .stagger-4 {
          animation: slide-up-fade 0.6s ease-out 0.4s both;
        }
        .stagger-5 {
          animation: slide-up-fade 0.6s ease-out 0.5s both;
        }
        .stagger-6 {
          animation: slide-up-fade 0.6s ease-out 0.6s both;
        }

        /* Battery bar */
        .battery-bar {
          transition: width 1s ease-out;
        }

        /* Table row hover */
        .table-row {
          transition: all 0.2s ease;
        }
        .table-row:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        /* Shimmer loading */
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>

      {/* Header */}
      <div className="stagger-1">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-1.5 w-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600" />
              <span className="text-[11px] font-bold text-orange-400/70 uppercase tracking-[0.2em]">
                Command Center
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-medium max-w-md">
              Real-time monitoring and control center for all drone operations across your fleet.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-orange-800/10 text-slate-300 text-[13px] font-medium hover:bg-white/[0.07] transition-all duration-200">
              <Eye className="h-4 w-4" />
              Live View
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[13px] font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 hover:-translate-y-0.5">
              <BarChart3 className="h-4 w-4" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-2">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="stat-card p-6 cursor-pointer"
            onMouseEnter={() => setHoveredStat(idx)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            {/* Background glow */}
            <div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl transition-opacity duration-500"
              style={{
                background: stat.bgGlow,
                opacity: hoveredStat === idx ? 1 : 0.4,
              }}
            />

            <div className="relative z-10">
              {/* Top row: icon + change badge */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
                  style={{
                    boxShadow: `0 8px 24px -4px ${stat.glowColor}`,
                  }}
                >
                  <stat.icon className="h-5 w-5 text-orange-50" />
                </div>
                <div
                  className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    stat.trend === "up" && stat.label !== "Grounded Drones"
                      ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                      : stat.label === "Grounded Drones"
                      ? "bg-rose-400/10 text-rose-400 border border-rose-400/20"
                      : "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                  }`}
                >
                  {stat.trend === "up" && stat.label !== "Grounded Drones" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : stat.label === "Grounded Drones" ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
              </div>

              {/* Value */}
              <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-1">
                {mounted ? <AnimatedCounter target={stat.value} /> : stat.value}
              </h3>
              <p className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid — Map + Side panels */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Live Airspace Map */}
        <div className="xl:col-span-2 map-card min-h-[520px] flex flex-col stagger-3">
          {/* Map Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 bg-gradient-to-br from-orange-500/20 to-orange-500/20 rounded-xl flex items-center justify-center border border-orange-200 shadow-inner">
                <LocateFixed className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  Live Airspace Monitor
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  Real-time fleet tracking
                </p>
              </div>
            </div>
            <div className="flex gap-4 bg-white backdrop-blur-md px-5 py-2.5 rounded-full border border-orange-800/10">
              <span className="flex items-center text-[11px] font-bold text-emerald-400 tracking-wider uppercase">
                <span className="relative mr-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  <span className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </span>
                Active (12)
              </span>
              <div className="w-px h-4 bg-orange-800/10 self-center" />
              <span className="flex items-center text-[11px] font-bold text-orange-400 tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-orange-400 mr-2 shadow-[0_0_8px_rgba(253,230,138,0.6)]" />
                Returning (3)
              </span>
              <div className="w-px h-4 bg-orange-800/10 self-center" />
              <span className="flex items-center text-[11px] font-bold text-rose-400 tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-rose-400 mr-2" />
                Grounded (3)
              </span>
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 mx-3 mb-3 bg-[#fff7ed] rounded-2xl border border-white/[0.03] relative overflow-hidden">
            {/* Grid pattern */}
            <div className="absolute inset-0 grid-pattern" />

            {/* Scan line */}
            <div className="absolute inset-x-0 top-0 h-full overflow-hidden pointer-events-none">
              <div className="grid-scan-line absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
            </div>

            {/* Radar rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-[200px] h-[200px] rounded-full border border-orange-500/[0.06] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="w-[350px] h-[350px] rounded-full border border-orange-500/[0.04] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="w-[500px] h-[500px] rounded-full border border-orange-500/[0.03] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

              {/* Radar sweep */}
              <div className="w-[500px] h-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 radar-sweep">
                <div
                  className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left"
                  style={{
                    background:
                      "conic-gradient(from 0deg, rgba(249,115,22,0.12), transparent 60deg)",
                  }}
                />
              </div>
            </div>

            {/* Hub Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-orange-500 pulse-ring absolute -inset-2" />
                <div className="w-4 h-4 rounded-full bg-orange-500 pulse-ring-delay absolute -inset-2" />
                <div className="w-4 h-4 rounded-full bg-orange-500 pulse-ring-delay-2 absolute -inset-2" />
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.6)] relative z-10">
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                </div>
              </div>
              <span className="absolute top-12 left-1/2 -translate-x-1/2 text-[9px] font-bold text-orange-800 uppercase tracking-[0.3em] whitespace-nowrap">
                HQ Hub
              </span>
            </div>

            {/* Drone 1 - Active */}
            <div className="absolute top-[22%] left-[28%] z-20 group cursor-pointer drone-float">
              <div className="relative">
                <div className="w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_16px_rgba(52,211,153,0.8)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                {/* Trail */}
                <div className="absolute top-1/2 left-full ml-1 w-24 h-[1px] bg-gradient-to-r from-emerald-400/50 to-transparent -translate-y-1/2 rotate-[-30deg] origin-left pointer-events-none" />
              </div>
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#ffedd5] border border-orange-800/10 text-slate-900 text-[11px] px-4 py-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-30 shadow-2xl shadow-orange-900/10 group-hover:-translate-y-1">
                <p className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                  <PlaneTakeoff className="w-3 h-3" /> DR-101
                </p>
                <p className="text-[10px] text-slate-400">
                  42 km/h • Alt: 120m • Bat: 78%
                </p>
              </div>
            </div>

            {/* Drone 2 - Returning */}
            <div className="absolute bottom-[28%] right-[22%] z-20 group cursor-pointer drone-float-delay">
              <div className="relative">
                <div className="w-4 h-4 bg-orange-400 rounded-full shadow-[0_0_16px_rgba(253,230,138,0.8)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                <div className="absolute top-1/2 right-full mr-1 w-16 h-[1px] bg-gradient-to-l from-amber-400/50 to-transparent -translate-y-1/2 rotate-[20deg] origin-right pointer-events-none" />
              </div>
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#ffedd5] border border-orange-800/10 text-slate-900 text-[11px] px-4 py-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-30 shadow-2xl shadow-orange-900/10 group-hover:-translate-y-1">
                <p className="font-bold text-orange-400 flex items-center gap-1.5 mb-1">
                  <PlaneTakeoff className="w-3 h-3" /> DR-102
                </p>
                <p className="text-[10px] text-slate-400">
                  Returning • ETA: 2 min • Bat: 22%
                </p>
              </div>
            </div>

            {/* Drone 3 */}
            <div className="absolute top-[40%] right-[35%] z-20 group cursor-pointer drone-float">
              <div className="w-3.5 h-3.5 bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.6)] flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
            </div>

            {/* Drone 4 */}
            <div className="absolute top-[55%] left-[20%] z-20 group cursor-pointer drone-float-delay">
              <div className="w-3.5 h-3.5 bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.6)] flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
            </div>

            {/* Overlay - Coords */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
              <div className="bg-[#fff7ed]/80 backdrop-blur-md border border-orange-800/10 px-3.5 py-2.5 rounded-xl text-slate-900 font-mono text-[11px] shadow-lg">
                <div className="flex items-center gap-2 mb-1.5">
                  <MapPin className="h-3 w-3 text-orange-400" />
                  <span className="text-[9px] font-bold text-orange-400/70 uppercase tracking-wider">
                    Coordinates
                  </span>
                </div>
                <p className="text-slate-300">
                  LAT: <span className="text-slate-900 font-semibold">32.7767</span>
                </p>
                <p className="text-slate-300">
                  LNG: <span className="text-slate-900 font-semibold">-96.7970</span>
                </p>
              </div>
            </div>

            {/* Overlay - Zone indicator */}
            <div className="absolute bottom-4 right-4 z-20">
              <div className="bg-[#fff7ed]/80 backdrop-blur-md border border-orange-800/10 px-3.5 py-2.5 rounded-xl text-[11px] shadow-lg">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Airspace
                </p>
                <p className="text-slate-900 font-semibold">Zone Alpha • Clear</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Performance Metrics */}
          <div className="dash-card p-6 stagger-4">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[15px] font-bold text-slate-900">
                Performance
              </h2>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Last 24h
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {performanceMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-orange-800/5 hover:border-white/[0.08] transition-all duration-300"
                >
                  <div className="relative mb-2">
                    <ProgressRing
                      percentage={mounted ? metric.value : 0}
                      color={metric.color}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <metric.icon
                        className="h-4 w-4"
                        style={{ color: metric.color }}
                      />
                    </div>
                  </div>
                  <span className="text-lg font-extrabold text-slate-900 tabular">
                    {mounted ? <AnimatedCounter target={Math.round(metric.value)} suffix="%" /> : `${metric.value}%`}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 mt-0.5">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Flight Conditions */}
          <div className="dash-card p-6 stagger-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[15px] font-bold text-slate-900">
                Flight Conditions
              </h2>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> Go
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-orange-800/5 hover:border-orange-200 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-400 border border-orange-200 group-hover:shadow-[0_0_12px_rgba(249,115,22,0.15)] transition-shadow duration-300">
                    <Wind className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-900">
                      Wind Velocity
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      12 mph • Crosswind
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-emerald-400">
                  Optimal
                </span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-orange-800/5 hover:border-indigo-500/20 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 group-hover:shadow-[0_0_12px_rgba(99,102,241,0.15)] transition-shadow duration-300">
                    <CloudRain className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-900">
                      Precipitation
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Clear skies ahead
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-emerald-400">0%</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-orange-800/5 hover:border-violet-500/20 transition-all duration-300 group">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-violet-500/10 rounded-xl text-violet-400 border border-violet-500/20 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.15)] transition-shadow duration-300">
                    <Signal className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-900">
                      Signal Strength
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      All beacons in range
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-emerald-400">
                  Strong
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid — Flight Table + Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Flights Table */}
        <div className="xl:col-span-2 dash-card overflow-hidden stagger-5">
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-orange-500/15 to-orange-500/15 rounded-xl flex items-center justify-center border border-orange-500/15">
                <Route className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-slate-900">
                  Recent Flights
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  Active and recent flight logs
                </p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 text-[12px] font-semibold text-orange-400 hover:text-orange-300 transition-colors">
              View All
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Table */}
          <div className="px-6 pb-2">
            <div className="grid grid-cols-[1fr_1fr_1fr_auto_auto] gap-4 px-4 py-3 text-[10px] font-bold text-slate-600 uppercase tracking-[0.15em] border-b border-orange-800/5">
              <span>Flight / Drone</span>
              <span>Route</span>
              <span>Status</span>
              <span className="text-right">Battery</span>
              <span className="text-right">ETA</span>
            </div>
          </div>

          <div className="px-6 pb-6">
            {recentFlights.map((flight, idx) => (
              <div
                key={idx}
                className="table-row grid grid-cols-[1fr_1fr_1fr_auto_auto] gap-4 items-center px-4 py-3.5 rounded-xl cursor-pointer"
              >
                <div>
                  <p className="text-[13px] font-bold text-slate-900">
                    {flight.id}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {flight.drone}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] text-slate-300">{flight.from}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3 text-slate-600" />
                    {flight.to}
                  </p>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${flight.statusBg} ${flight.statusColor} border ${flight.statusBorder}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${flight.statusColor === "text-emerald-400" ? "bg-emerald-400" : flight.statusColor === "text-orange-400" ? "bg-orange-400" : "bg-orange-400"}`} />
                    {flight.status}
                  </span>
                </div>
                <div className="text-right min-w-[80px]">
                  <div className="flex items-center gap-2 justify-end">
                    <div className="w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={`battery-bar h-full rounded-full ${
                          flight.battery > 60
                            ? "bg-emerald-400"
                            : flight.battery > 30
                            ? "bg-orange-400"
                            : "bg-rose-400"
                        }`}
                        style={{
                          width: mounted ? `${flight.battery}%` : "0%",
                        }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 tabular w-8 text-right">
                      {flight.battery}%
                    </span>
                  </div>
                </div>
                <div className="text-right min-w-[60px]">
                  <span className="text-[12px] font-semibold text-slate-300 tabular flex items-center gap-1 justify-end">
                    <Clock className="h-3 w-3 text-slate-500" />
                    {flight.eta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="dash-card p-6 stagger-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-rose-500/15 to-pink-500/15 rounded-xl flex items-center justify-center border border-rose-500/15">
                <Zap className="h-5 w-5 text-rose-400" />
              </div>
              <h2 className="text-[15px] font-bold text-slate-900">
                System Alerts
              </h2>
            </div>
            <span className="flex items-center gap-1.5 bg-rose-400/10 text-rose-400 text-[11px] font-bold px-3 py-1.5 rounded-full border border-rose-400/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-400" />
              </span>
              2 Active
            </span>
          </div>

          <div className="space-y-3">
            {/* Alert 1 */}
            <div className="group p-4 rounded-2xl bg-orange-400/[0.04] border border-orange-400/10 hover:border-orange-400/25 cursor-pointer transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-400/10 rounded-lg text-orange-400 border border-orange-200 shrink-0 mt-0.5 group-hover:shadow-[0_0_12px_rgba(253,230,138,0.15)] transition-shadow duration-300">
                  <BatteryWarning className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <p className="text-[13px] font-bold text-slate-900 group-hover:text-orange-300 transition-colors">
                      Low Battery (DR-107)
                    </p>
                    <span className="text-[9px] font-bold text-orange-400/70 uppercase tracking-wider whitespace-nowrap">
                      Just now
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Auto-returning to base. Battery level critically dropped to
                    15% in Sector 4.
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
                      <Battery className="h-3 w-3 text-orange-400" />
                      <span>15%</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
                      <MapPin className="h-3 w-3 text-orange-400" />
                      <span>Sector 4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert 2 */}
            <div className="group p-4 rounded-2xl bg-rose-400/[0.04] border border-rose-400/10 hover:border-rose-400/25 cursor-pointer transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-rose-400/10 rounded-lg text-rose-400 border border-rose-400/20 shrink-0 mt-0.5 group-hover:shadow-[0_0_12px_rgba(244,63,94,0.15)] transition-shadow duration-300">
                  <WifiOff className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <p className="text-[13px] font-bold text-slate-900 group-hover:text-rose-300 transition-colors">
                      Signal Degraded (DR-102)
                    </p>
                    <span className="text-[9px] font-bold text-rose-400/70 uppercase tracking-wider whitespace-nowrap">
                      2m ago
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Lost high-bandwidth telemetry connection. Operating on
                    backup radio frequency.
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
                      <Signal className="h-3 w-3 text-rose-400" />
                      <span>Backup Freq</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
                      <Clock className="h-3 w-3 text-rose-400" />
                      <span>2 min ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert 3 — Resolved */}
            <div className="group p-4 rounded-2xl bg-white border border-orange-800/5 hover:border-white/[0.08] cursor-pointer transition-all duration-300 opacity-60 hover:opacity-80">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-400/10 rounded-lg text-emerald-400 border border-emerald-400/20 shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <p className="text-[13px] font-bold text-slate-900/70 line-through decoration-white/20">
                      GPS Drift (DR-103)
                    </p>
                    <span className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-wider whitespace-nowrap">
                      Resolved
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    GPS calibration corrected. Position accuracy restored to
                    ±0.5m tolerance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
