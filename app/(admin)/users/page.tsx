"use client";

import { useEffect, useState } from "react";
import { UserPlus, Shield, User, Search, MoreHorizontal } from "lucide-react";
import clsx from "clsx";
import { supabase } from "@/lib/supabase";

const FALLBACK_USERS = [
  { id: "1", name: "Adeeb Admin", email: "ezviz01@gmail.com", role: "Super Admin", status: "Active" },
  { id: "2", name: "Ravi Sharma", email: "ravi.s@speedup.com", role: "Dispatcher", status: "Active" },
];

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>(FALLBACK_USERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase.from('admin_users').select('*');
        if (data && data.length > 0) {
          setUsers(data);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500 mt-1">Manage staff roles and customer accounts.</p>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
          <UserPlus className="h-5 w-5" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200">
           <div className="relative max-w-md">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Search className="h-4 w-4 text-slate-400" />
             </div>
             <input
               type="text"
               placeholder="Search by name or email..."
               className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all"
             />
           </div>
        </div>
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading users...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                  <th className="font-medium p-4 whitespace-nowrap">Name</th>
                  <th className="font-medium p-4 whitespace-nowrap">Role</th>
                  <th className="font-medium p-4 whitespace-nowrap">Status</th>
                  <th className="font-medium p-4 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-slate-700 text-sm font-medium">
                        {user.role.includes("Admin") ? <Shield className="w-4 h-4 text-blue-600" /> : <User className="w-4 h-4 text-slate-400" />}
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={clsx(
                        "px-2.5 py-1 rounded-full text-xs font-semibold",
                        user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      )}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
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
