"use client";

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
  CheckCircle2
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Total Active Drones", value: "12", icon: PlaneTakeoff, gradient: "from-blue-500 to-indigo-500", text: "text-blue-600", bg: "bg-blue-50" },
    { label: "Flights In Progress", value: "7", icon: Activity, gradient: "from-emerald-400 to-teal-500", text: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Pending Orders", value: "18", icon: Package, gradient: "from-amber-400 to-orange-500", text: "text-amber-600", bg: "bg-amber-50" },
    { label: "Grounded Drones", value: "3", icon: AlertTriangle, gradient: "from-pink-500 to-rose-500", text: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1 font-medium">Real-time command center for all drone operations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-[24px] p-6 border border-slate-200/60 shadow-xl shadow-slate-200/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-[0.03] rounded-bl-full group-hover:scale-110 transition-transform duration-500`}></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                </div>
              </div>
              <div className={`h-14 w-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-md`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Premium Dark Tech Map Area */}
        <div className="xl:col-span-2 bg-[#0B1120] rounded-[24px] border border-slate-800 shadow-2xl shadow-blue-900/20 p-1 flex flex-col min-h-[500px] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 pb-4 relative z-10 gap-4 sm:gap-0">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30 shrink-0">
                <LocateFixed className="h-5 w-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">Live Airspace</h2>
            </div>
            <div className="flex gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 whitespace-nowrap self-start sm:self-auto">
              <span className="flex items-center text-xs font-bold text-emerald-400 tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse"></span>
                Active (12)
              </span>
              <div className="w-px h-4 bg-white/20"></div>
              <span className="flex items-center text-xs font-bold text-amber-400 tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-amber-400 mr-2 shadow-[0_0_10px_rgba(251,191,36,0.8)]"></span>
                Returning (3)
              </span>
            </div>
          </div>
          
          <div className="flex-1 m-2 mt-0 bg-[#0F172A] rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center shadow-inner">
            {/* Tech Grid Map Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
            
            {/* Mock Radar Sweep */}
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -mt-[400px] -ml-[400px] rounded-full border border-blue-500/10 shadow-[inset_0_0_50px_rgba(59,130,246,0.1)]">
              <div className="absolute top-0 bottom-50% left-50% right-0 bg-gradient-to-br from-blue-500/20 to-transparent origin-bottom-left animate-[spin_4s_linear_infinite]" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>
            </div>

            {/* Hub Center */}
            <div className="absolute top-1/2 left-1/2 -mt-4 -ml-4 z-20">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,1)]">
                <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
              </div>
              <span className="absolute top-10 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-400 uppercase tracking-widest whitespace-nowrap">HQ Hub</span>
            </div>

            {/* Drones */}
            <div className="absolute top-[25%] left-[30%] z-20 group cursor-pointer">
              <div className="w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,1)] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <div className="absolute top-0 -translate-y-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 border border-slate-700 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 shadow-xl">
                <p className="font-bold text-emerald-400 flex items-center gap-1"><PlaneTakeoff className="w-3 h-3" /> DR-101</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Spd: 42km/h • Alt: 120m</p>
              </div>
              {/* Trajectory line */}
              <div className="absolute top-2 left-2 w-[150px] h-[2px] bg-emerald-400/30 transform origin-left -rotate-45 pointer-events-none"></div>
            </div>

            <div className="absolute bottom-[30%] right-[25%] z-20 group cursor-pointer">
              <div className="w-4 h-4 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,1)] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <div className="absolute top-0 -translate-y-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 border border-slate-700 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 shadow-xl">
                <p className="font-bold text-amber-400 flex items-center gap-1"><PlaneTakeoff className="w-3 h-3" /> DR-102</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Returning • Res: 2min</p>
              </div>
            </div>
            
            {/* Overlay Map Decor */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
               <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl text-white font-mono text-xs shadow-lg">
                 LAT: 32.7767
                 <br />
                 LNG: -96.7970
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Weather Status */}
          <div className="bg-white p-6 rounded-[24px] border border-slate-200/60 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Flight Conditions</h2>
              <span className="flex items-center gap-1 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <CheckCircle2 className="w-4 h-4" /> Go
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl text-blue-600 shadow-sm">
                    <Wind className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Wind Velocity</p>
                    <p className="text-xs text-slate-500 mt-0.5">12 mph • Crosswind</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-slate-900">Optimal</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600 shadow-sm">
                    <CloudRain className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Precipitation</p>
                    <p className="text-xs text-slate-500 mt-0.5">Clear skies ahead</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-slate-900">0%</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white p-6 rounded-[24px] border border-slate-200/60 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">System Alerts</h2>
              <span className="bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full border border-rose-200 flex items-center gap-1.5 animate-pulse">
                <Zap className="w-3 h-3" /> 2 Active
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="group flex items-start gap-4 p-4 bg-amber-50/50 border border-amber-200/60 rounded-2xl hover:bg-amber-50 transition-colors cursor-pointer">
                <div className="p-2 bg-amber-100 rounded-lg text-amber-600 shrink-0">
                  <BatteryWarning className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">Low Battery (DR-107)</p>
                    <span className="text-[10px] font-bold text-amber-600 uppercase">Just now</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">Auto-returning to base. Battery level critically dropped to 15% in Sector 4.</p>
                </div>
              </div>

              <div className="group flex items-start gap-4 p-4 bg-rose-50/50 border border-rose-200/60 rounded-2xl hover:bg-rose-50 transition-colors cursor-pointer">
                <div className="p-2 bg-rose-100 rounded-lg text-rose-600 shrink-0">
                  <WifiOff className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-rose-700 transition-colors">Signal Degraded (DR-102)</p>
                    <span className="text-[10px] font-bold text-rose-600 uppercase">2m ago</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">Lost high-bandwidth telemetry connection. Operating on backup radio frequency.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
