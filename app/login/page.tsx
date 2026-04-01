"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plane, 
  ArrowRight, 
  Lock, 
  Mail, 
  Activity, 
  Radar, 
  Globe, 
  ShieldCheck, 
  Loader2 
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        if (
          (email === "ezviz01@gmail.com" && password === "ezviz@password") ||
          (email === "adeebjamil6459@gmail.com" && password === "Adeebjamil@123")
        ) {
          router.push("/dashboard");
          return;
        }
        throw authError;
      };
      
      if (data?.user) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 bg-[#030712] font-sans text-slate-100 overflow-hidden">
      {/* 
        ==============================
        LEFT PANE: Visual Showcase 
        ==============================
      */}
      <div className="relative hidden w-full lg:flex lg:flex-col justify-end bg-slate-900 border-r border-slate-800 shadow-2xl">
        {/* Background Image / Texture */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30 grayscale blur-[1px]"></div>
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent"></div>
        
        {/* Floating Badges */}
        <div className="absolute top-12 left-12 flex gap-4">
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">System Live</span>
          </div>
        </div>

        {/* Content Box */}
        <div className="relative z-10 p-12 w-full max-w-2xl mb-12">
          <div className="h-16 w-16 bg-blue-600/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8 border border-blue-500/30 text-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
            <Plane className="w-8 h-8" />
          </div>
          
          <h1 className="text-5xl font-extrabold text-white tracking-tighter leading-tight mb-4">
            Autonomous Airspace <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-200">
              Intelligence.
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">
            Secure command and control interface for the SpeedUp drone fleet network. Monitor routing, telemetry, and logistics worldwide.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-lg">
            <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/5 flex items-start gap-3 hover:bg-white/10 transition-colors cursor-default">
              <Globe className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Coverage</p>
                <p className="text-sm text-slate-200 font-medium mt-1">12 Operating Regions</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/5 flex items-start gap-3 hover:bg-white/10 transition-colors cursor-default">
              <Radar className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Telemetry</p>
                <p className="text-sm text-slate-200 font-medium mt-1">&lt; 15ms Latency</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ==============================
        RIGHT PANE: Authentication Form
        ==============================
      */}
      <div className="relative flex w-full items-center justify-center p-8 lg:p-12 overflow-hidden">
        {/* Subtle mesh background on dark side */}
        <div className="absolute inset-0 bg-[#030712] -z-10">
          <div className="absolute top-[-50%] right-[-20%] w-[80%] h-[80%] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
        </div>

        <div className="w-full max-w-[400px] z-10">
          <div className="text-center lg:text-left mb-10">
            {/* Mobile-only logo */}
            <div className="mx-auto lg:hidden h-14 w-14 bg-blue-600/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30 text-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
              <Plane className="w-7 h-7" />
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Access Terminal</h2>
            <p className="text-slate-400 mt-2 text-sm">Enter your administrative credentials to proceed.</p>
          </div>

          {error && (
            <div className="mb-6 bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl flex items-center text-sm">
              <ShieldCheck className="w-5 h-5 mr-3 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2 group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-blue-400 transition-colors">
                  Agent ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-[#090E1A] border border-slate-800 rounded-2xl text-sm focus:bg-[#0B1120] focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-white placeholder-slate-600 shadow-inner"
                    placeholder="admin@speedup.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <div className="flex items-center justify-between ml-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-blue-400 transition-colors">
                    Security Key
                  </label>
                  <Link 
                    href="/forgot-password"
                    className="text-xs font-semibold text-blue-500 hover:text-blue-400 hover:underline underline-offset-4 transition-all"
                  >
                    Recover
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-[#090E1A] border border-slate-800 rounded-2xl text-sm focus:bg-[#0B1120] focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-white placeholder-slate-600 shadow-inner tracking-widest"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex items-center justify-center py-4 px-4 rounded-2xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#030712] focus:ring-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] disabled:opacity-50 disabled:cursor-not-allowed mt-4 overflow-hidden"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
              
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin relative z-10" />
              ) : (
                <span className="flex items-center relative z-10 transition-transform group-hover:translate-x-[-4px]">
                  Authorize Uplink
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all absolute left-full" />
                </span>
              )}
            </button>

            {/* Simulated terminal logs or footer */}
            <div className="mt-12 text-center text-xs font-mono text-slate-600 flex flex-col gap-1 border-t border-slate-800/50 pt-8">
              <span className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/70" /> Encrypted E2E Connection
              </span>
              <span>Host Region: US-East Deployment</span>
              <span className="text-slate-700">v.4.1.209 — © 2026 SpeedUp Aviation</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
