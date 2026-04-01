"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Plus, Search, Filter, BatteryFull, BatteryMedium, BatteryLow, ChevronRight
} from "lucide-react";
import clsx from "clsx";
import { supabase } from "@/lib/supabase";

// Fallback Mock Data in case Supabase table isn't created yet
const FALLBACK_INVENTORY = [
  { id: "DR-101", model: "X500", battery: 78, status: "Flying", last_maintenance: "2026-03-15", assigned_order: "ORD101" },
  { id: "DR-102", model: "X500", battery: 34, status: "Returning", last_maintenance: "2026-02-28", assigned_order: null },
  { id: "DR-103", model: "X700", battery: 100, status: "Ready", last_maintenance: "2026-03-25", assigned_order: null },
];

export default function FleetPage() {
  const [inventory, setInventory] = useState<any[]>(FALLBACK_INVENTORY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDrones() {
      try {
        const { data, error } = await supabase.from('drones').select('*').order('id');
        if (data && data.length > 0) {
          setInventory(data);
        }
      } catch (err) {
        console.error("Error fetching drones:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDrones();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'flying': return 'bg-emerald-100 text-emerald-700';
      case 'ready': return 'bg-blue-100 text-blue-700';
      case 'returning': return 'bg-amber-100 text-amber-700';
      case 'charging': return 'bg-purple-100 text-purple-700';
      case 'maintenance': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getBatteryIcon = (battery: number) => {
    if (battery > 70) return <BatteryFull className="h-4 w-4 text-emerald-500" />;
    if (battery > 30) return <BatteryMedium className="h-4 w-4 text-amber-500" />;
    return <BatteryLow className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fleet Inventory</h1>
          <p className="text-slate-500 mt-1">Manage and monitor all active and inactive drones.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
          <Plus className="h-5 w-5" />
          Register Drone
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search by Drone ID or Model..."
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 flex justify-center items-center gap-2">
            Loading fleet data...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                  <th className="font-medium p-4 whitespace-nowrap">Drone ID</th>
                  <th className="font-medium p-4 whitespace-nowrap">Model</th>
                  <th className="font-medium p-4 whitespace-nowrap text-center">Battery</th>
                  <th className="font-medium p-4 whitespace-nowrap">Status</th>
                  <th className="font-medium p-4 whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {inventory.map((drone) => (
                  <tr key={drone.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">{drone.id}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="text-slate-600 font-medium">{drone.model}</span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        {getBatteryIcon(drone.battery)}
                        <span className={clsx(
                          "font-medium tabular-nums",
                          drone.battery <= 20 ? "text-red-600" : "text-slate-700"
                        )}>
                          {drone.battery}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={clsx(
                        "px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
                        getStatusColor(drone.status)
                      )}>
                        {drone.status}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-right">
                      <Link 
                        href={`/fleet/drone-details/${drone.id}`}
                        className="inline-flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors gap-1"
                      >
                        View
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
