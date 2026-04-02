"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Search, Filter, Package, Clock, CheckCircle2, ChevronRight, Plane
} from "lucide-react";
import clsx from "clsx";
import { supabase } from "@/lib/supabase";

const FALLBACK_ORDERS = [
  { id: "ORD101", package_info: "Medical Supplies", status: "Flying", drone_id: "DR-101", customer_name: "Austin General", order_time: "10:24 AM" },
  { id: "ORD102", package_info: "Hot Food", status: "Packed", drone_id: null, customer_name: "Michael R.", order_time: "10:30 AM" },
  { id: "ORD103", package_info: "Electronics", status: "Delivered", drone_id: "DR-103", customer_name: "Sarah J.", order_time: "09:45 AM" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>(FALLBACK_ORDERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (data && data.length > 0) {
          setOrders(data);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'flying': return 'bg-orange-100 text-orange-700';
      case 'packed': return 'bg-amber-100 text-amber-700';
      case 'delivered': return 'bg-emerald-100 text-emerald-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'flying': return <Plane className="w-4 h-4 mr-1.5" />;
      case 'packed': return <Package className="w-4 h-4 mr-1.5" />;
      case 'delivered': return <CheckCircle2 className="w-4 h-4 mr-1.5" />;
      default: return <Clock className="w-4 h-4 mr-1.5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders Management</h1>
          <p className="text-slate-500 mt-1">Track and manage all drone deliveries.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search orders, customers..."
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading orders...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                  <th className="font-medium p-4 whitespace-nowrap">Order ID</th>
                  <th className="font-medium p-4 whitespace-nowrap">Package Info</th>
                  <th className="font-medium p-4 whitespace-nowrap">Customer</th>
                  <th className="font-medium p-4 whitespace-nowrap">Status</th>
                  <th className="font-medium p-4 whitespace-nowrap">Assigned Drone</th>
                  <th className="font-medium p-4 whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">{order.id}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{order.order_time}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="text-slate-600 font-medium">{order.package_info}</span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="text-slate-600">{order.customer_name}</span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={clsx(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider",
                        getStatusColor(order.status)
                      )}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {!order.drone_id ? (
                        <span className="text-amber-600 font-medium text-sm bg-amber-50 px-2 py-1 rounded-md">Needs Assignment</span>
                      ) : (
                        <Link href={`/fleet/drone-details/${order.drone_id}`} className="text-orange-600 hover:underline font-medium text-sm">
                          {order.drone_id}
                        </Link>
                      )}
                    </td>
                    <td className="p-4 whitespace-nowrap text-right">
                      <Link 
                        href={`/orders/${order.id}`}
                        className="inline-flex items-center justify-center text-sm font-medium text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors gap-1"
                      >
                        {order.status === 'Packed' ? 'Assign' : 'Track'}
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
