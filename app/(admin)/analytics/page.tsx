"use client";

import { BarChart3, TrendingUp, Clock, PackageCheck } from "lucide-react";

export default function AnalyticsPage() {
  const cards = [
    { title: "Delivery Success Rate", value: "99.8%", trend: "+0.2%", icon: PackageCheck, color: "text-emerald-600" },
    { title: "Drone Utilization", value: "84%", trend: "+5%", icon: BarChart3, color: "text-blue-600" },
    { title: "Avg Delivery Time", value: "7.2 min", trend: "-30s", icon: Clock, color: "text-amber-600" },
    { title: "Daily Revenue", value: "$12,450", trend: "+12%", icon: TrendingUp, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-500 mt-1">Performance metrics and business intelligence.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-start justify-between">
              <card.icon className={`w-8 h-8 ${card.color} opacity-80`} />
              <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">
                {card.trend}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-slate-900">{card.value}</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[300px] flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Flights per Day</h2>
          <div className="flex-1 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
            [ Line Chart Component ]
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm min-h-[300px] flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Drone Efficiency</h2>
          <div className="flex-1 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
            [ Bar Chart Component ]
          </div>
        </div>
      </div>
    </div>
  );
}
