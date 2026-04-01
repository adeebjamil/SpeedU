"use client";

import { Map as MapIcon, ShieldAlert, Navigation } from "lucide-react";

export default function RoutesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Routes & Airspace</h1>
        <p className="text-slate-500 mt-1">Manage flight corridors and restricted zones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 min-h-[600px] flex flex-col relative overflow-hidden">
           {/* Mock Interactive Map */}
           <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
           
           <div className="flex-1 flex items-center justify-center z-10 flex-col">
             <MapIcon className="h-16 w-16 text-slate-300 mb-4" />
             <p className="text-slate-500 font-medium">Airspace Map Visualization Area</p>
             
             <div className="mt-8 flex gap-4">
                <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-red-100">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  Restricted (Stadium)
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  Main Corridor Alpha
                </div>
             </div>
           </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-bold text-slate-900 mb-4">No Fly Zones</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900">DFW Airport Airspace</p>
                  <p className="text-xs text-slate-500">Permanent Restriction</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900">AT&T Stadium</p>
                  <p className="text-xs text-amber-600 font-medium">Temp: Game Day</p>
                </div>
              </li>
            </ul>
            <button className="w-full mt-4 py-2 bg-slate-50 text-blue-600 font-medium rounded-lg text-sm hover:bg-blue-50 transition-colors">
              + Add Restriction
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-bold text-slate-900 mb-4">Active Corridors</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-600 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-blue-500" /> Alpha-1
                </span>
                <span className="text-emerald-600 font-medium">Clear</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-600 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-blue-500" /> Beta-South
                </span>
                <span className="text-emerald-600 font-medium">Clear</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
