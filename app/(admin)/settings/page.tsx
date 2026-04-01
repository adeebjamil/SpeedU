"use client";

import { Save, Key, CloudLightning, ShieldCheck, Mail, Database } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
        <p className="text-slate-500 mt-1">Configure integrations, security, and preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Section 1 */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-3">
            <Key className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-slate-900">API Keys & Integrations</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Weather API Key</label>
                <input type="password" value="sk_test_123456789" readOnly className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Payment Gateway Key</label>
                <input type="password" value="pk_live_987654321" readOnly className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-3">
            <Mail className="w-5 h-5 text-slate-600" />
            <h2 className="font-semibold text-slate-900">Email Configuration (Nodemailer)</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">SMTP Host</label>
                <input type="text" defaultValue="smtp.gmail.com" className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">SMTP Port</label>
                <input type="text" defaultValue="587" className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600/20" />
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
            <Save className="h-5 w-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
