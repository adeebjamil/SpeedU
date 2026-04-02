"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  PlaneTakeoff,
  PackageSearch,
  Map as MapIcon,
  Users,
  LineChart,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Fleet Management", href: "/fleet", icon: PlaneTakeoff },
  { name: "Orders", href: "/orders", icon: PackageSearch },
  { name: "Routes & Airspace", href: "/routes", icon: MapIcon },
  { name: "Users", href: "/users", icon: Users },
  { name: "Analytics", href: "/analytics", icon: LineChart },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="h-screen flex overflow-hidden admin-shell">
      {/* Admin-specific styles */}
      <style jsx global>{`
        .admin-shell {
          background: #fffcf8;
          font-family: "Inter", system-ui, -apple-system, sans-serif;
        }

        /* Sidebar creamy background */
        .sidebar-bg {
          background: #fffcf8;
          border-right: 1px solid rgba(249, 115, 22, 0.1);
        }

        /* Active nav item glow */
        .nav-active {
          background: rgba(249, 115, 22, 0.08);
          border: 1px solid rgba(249, 115, 22, 0.2);
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.05);
        }

        .nav-active .nav-indicator {
          opacity: 1;
          transform: scaleY(1);
        }

        /* Nav hover */
        .nav-item:not(.nav-active):hover {
          background: rgba(249, 115, 22, 0.03);
        }

        /* Top bar glass */
        .topbar-glass {
          background: rgba(255, 252, 248, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(249, 115, 22, 0.1);
        }

        /* Search input */
        .search-input {
          background: #fff;
          border: 1px solid rgba(249, 115, 22, 0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .search-input:focus {
          background: #fff;
          border-color: rgba(249, 115, 22, 0.5);
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
        }

        /* Notification badge pulse */
        @keyframes badge-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.6);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(59, 130, 246, 0);
          }
        }
        .badge-pulse {
          animation: badge-pulse 2s ease-in-out infinite;
        }

        /* Sidebar logo shimmer */
        @keyframes logo-shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .logo-shimmer {
          background: linear-gradient(
            90deg,
            #f97316 0%,
            #fdba74 25%,
            #fff7ed 50%,
            #fdba74 75%,
            #f97316 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: logo-shimmer 4s linear infinite;
        }

        /* Page content area */
        .content-area {
          background: #fffcf8;
        }

        /* Scrollbar for sidebar */
        .sidebar-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(249, 115, 22, 0.2);
          border-radius: 10px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(249, 115, 22, 0.3);
        }
      `}</style>

      {/* Mobile sidebar overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          sidebarOpen
            ? "opacity-100 backdrop-blur-sm bg-white/60"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed lg:static inset-y-0 left-0 z-50 w-[280px] sidebar-bg flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:transform-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-[72px] flex items-center px-6 relative">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <PlaneTakeoff className="h-5 w-5 text-orange-50" />
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] font-bold tracking-tight logo-shimmer">
                SpeedUp
              </span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.2em]">
                Admin Console
              </span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-slate-500 hover:text-slate-900 transition-colors p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Status */}
        <div className="mx-4 mb-2 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-500/10 border border-orange-500/10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-3 w-3 text-orange-400" />
            <span className="text-[10px] font-bold text-orange-800 uppercase tracking-widest">
              System Status
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-xs font-medium text-emerald-400">
              All Systems Operational
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 sidebar-scroll">
          <p className="px-3 mb-2 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
            Navigation
          </p>
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={clsx(
                  "nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 relative group",
                  isActive ? "nav-active text-orange-600" : "text-slate-600"
                )}
              >
                {/* Active indicator bar */}
                <div className="nav-indicator absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-gradient-to-b from-orange-400 to-orange-600 rounded-r-full opacity-0 scale-y-0 transition-all duration-300" />

                <div
                  className={clsx(
                    "h-9 w-9 flex items-center justify-center rounded-lg transition-all duration-200 shrink-0",
                    isActive
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                      : "bg-white border border-slate-100 text-slate-500 group-hover:border-orange-200 group-hover:text-orange-500"
                  )}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                </div>
                <span
                  className={clsx(
                    "transition-colors duration-200",
                    !isActive && "group-hover:text-slate-900"
                  )}
                >
                  {item.name}
                </span>
                {isActive && (
                  <ChevronRight className="h-3.5 w-3.5 ml-auto text-orange-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-3 border-t border-orange-800/5">
          {/* User card */}
          <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-white border border-orange-800/5 shadow-sm">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-[11px] font-bold text-white shadow-lg shadow-orange-500/20">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-slate-900 truncate">
                Admin User
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                admin@speedup.in
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          >
            <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-red-500/10">
              <LogOut className="h-[18px] w-[18px]" />
            </div>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-[72px] topbar-glass flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-400 hover:text-slate-900 transition-colors p-2 rounded-lg hover:bg-orange-800/5"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search bar */}
          <div className="flex-1 max-w-lg hidden sm:flex px-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search drones, orders, routes..."
                className="search-input block w-full pl-10 pr-4 py-2.5 rounded-xl text-[13px] text-slate-300 placeholder:text-slate-600 outline-none"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <kbd className="px-2 py-0.5 text-[10px] font-medium text-slate-600 bg-white rounded border border-orange-800/10">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Time */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-orange-800/5 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
              <span className="text-xs font-medium text-slate-600 tabular">
                {currentTime}
              </span>
            </div>

            {/* Notifications */}
            <button className="relative p-2.5 text-slate-400 hover:text-slate-900 hover:bg-orange-800/5 rounded-xl transition-all duration-200">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-[1.5px] border-[#fffaf5] badge-pulse" />
            </button>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-slate-200" />

            {/* Avatar */}
            <button className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-orange-800/5 transition-all duration-200">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-orange-500/20">
                AD
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-[12px] font-semibold text-slate-900">
                  Admin
                </span>
                <span className="text-[10px] text-slate-500">Super Admin</span>
              </div>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto content-area p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
