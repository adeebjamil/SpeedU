"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft, Loader2, CheckCircle2, ShieldAlert, KeyRound, Unlock } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"enter-email" | "enter-otp" | "success">("enter-email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send-otp", email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send reset email");
      }

      setStep("enter-otp");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify-otp", email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to verify OTP");
      }

      setStep("success");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030712] font-sans flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dark modern background aesthetics */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-emerald-600/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="w-full max-w-[420px] bg-[#090E1A] backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-800/80 p-8 pt-10 relative z-10">
        
        <Link 
          href="/login" 
          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Abort Recovery
        </Link>

        {step === "success" && (
          <div className="text-center py-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-3 tracking-tight">Recovery Complete</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Authentication override successful. Your original password has been dispatched directly to <span className="font-bold text-white">{email}</span>.
            </p>
            <Link 
              href="/login"
              className="inline-flex w-full items-center justify-center py-3.5 px-4 rounded-xl text-sm font-bold text-slate-900 bg-white hover:bg-slate-200 transition-all"
            >
              Return to Login
            </Link>
          </div>
        )}

        {step === "enter-email" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">System Recovery</h1>
              <p className="text-slate-400 text-sm">
                Enter your administrative email. A 6-digit one-time password (OTP) will be dispatched to your terminal.
              </p>
            </div>

            <form onSubmit={handleSendOTP} className="space-y-6">
              {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl flex items-center text-sm">
                  <ShieldAlert className="w-5 h-5 mr-3 shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-2 group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-blue-400 transition-colors">
                  Recovery Node (Email)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-black/40 border border-slate-800 rounded-2xl text-sm focus:bg-black/60 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-white placeholder-slate-600"
                    placeholder="admin@speedup.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex items-center justify-center py-4 px-4 rounded-2xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#030712] focus:ring-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Request Access Code"
                )}
              </button>
            </form>
          </div>
        )}

        {step === "enter-otp" && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Verify Identity</h1>
              <p className="text-slate-400 text-sm">
                OTP dispatched to <span className="text-white font-medium">{email}</span>. Enter the 6-digit code below to retrieve your password.
              </p>
            </div>

            <form onSubmit={handleVerifyOTP} className="space-y-6">
              {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl flex items-center text-sm">
                  <ShieldAlert className="w-5 h-5 mr-3 shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-2 group">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">
                  6-Digit Request Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-slate-600 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="block w-full pl-12 pr-4 py-4 bg-black/40 border border-slate-800 rounded-2xl text-lg tracking-[0.5em] focus:bg-black/60 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all text-white placeholder-slate-600 text-center"
                    placeholder="••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="group relative w-full flex items-center justify-center py-4 px-4 rounded-2xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#030712] focus:ring-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="flex items-center">
                    <Unlock className="w-4 h-4 mr-2" /> Retrieve Password
                  </span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}