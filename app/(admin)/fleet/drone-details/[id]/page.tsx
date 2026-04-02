"use client";

import { use } from "react";
import Link from "next/link";
import { 
  ArrowLeft,
  BatteryFull,
  Cpu,
  Radio,
  Clock,
  Wrench,
  AlertTriangle,
  PlaneTakeoff,
  RotateCcw,
  Video
} from "lucide-react";
import clsx from "clsx";

export default function DroneDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = use(params);
  
  // In a real app, fetch from Supabase based on ID
  const drone = {
    id: resolvedParams.id,
    model: "X500 Series",
    battery: 78,
    status: "Flying",
    signalStrength: "Excellent",
    motorHealth: "98%",
    currentRoute: "Base 1 → Sector 4",
    lastMaintenance: "Mar 15, 2026",
    assignedOrder: "ORD101",
    flightTimeLeft: "24 mins"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/fleet"
          className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-500"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{drone.id}</h1>
            <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              {drone.status}
            </span>
          </div>
          <p className="text-slate-500 mt-0.5 text-sm">{drone.model}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Diagnostics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-blue-600" />
              Live Diagnostics
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-500">Battery</span>
                  <BatteryFull className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{drone.battery}%</div>
                <p className="text-xs text-slate-500 mt-1">Est. {drone.flightTimeLeft} left</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-500">Signal</span>
                  <Radio className="h-4 w-4 text-orange-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{drone.signalStrength}</div>
                <p className="text-xs text-slate-500 mt-1">-42 dBm</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-500">Motor Health</span>
                  <Wrench className="h-4 w-4 text-slate-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{drone.motorHealth}</div>
                <p className="text-xs text-slate-500 mt-1">All rotors optimal</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-500">Current Task</span>
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{drone.assignedOrder}</div>
                <p className="text-xs text-slate-500 mt-1">Delivery in progress</p>
              </div>
            </div>

            {/* Video/Telemetry Mock */}
            <div className="mt-8 rounded-xl overflow-hidden bg-slate-900 aspect-video relative flex items-center justify-center">
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  Live Cam
                </span>
                <span className="bg-orange-950/50 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                  720p 60fps
                </span>
              </div>
              <Video className="text-slate-700 w-16 h-16 opacity-50" />
              
              {/* Telemetry overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between text-emerald-400 font-mono text-sm tracking-wider">
                <div>
                  <p>ALT: 120m</p>
                  <p>SPD: 12m/s</p>
                </div>
                <div className="text-right">
                  <p>LAT: 32.5512 N</p>
                  <p>LNG: -97.2341 W</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Command Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-medium transition-colors">
                <PlaneTakeoff className="h-5 w-5" />
                Pause Mission / Hover
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-800 py-3 rounded-xl font-medium transition-colors">
                <RotateCcw className="h-5 w-5" />
                Force Return to Base
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 py-3 rounded-xl font-medium transition-colors border border-red-200">
                <AlertTriangle className="h-5 w-5" />
                Emergency Landing
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Information</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-slate-100 pb-3">
                <span className="text-slate-500">Route</span>
                <span className="font-medium text-slate-900">{drone.currentRoute}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-3">
                <span className="text-slate-500">Firmware</span>
                <span className="font-medium text-slate-900">v4.2.1-stable</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-3">
                <span className="text-slate-500">Max Payload</span>
                <span className="font-medium text-slate-900">5.5 lb</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-500">Last Maint.</span>
                <span className="font-medium text-slate-900">{drone.lastMaintenance}</span>
              </div>
              <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg transition-colors border border-slate-200 mt-2">
                Schedule Maintenance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
