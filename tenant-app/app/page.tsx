'use client';

import { useState } from 'react';
import { Building2, KeyRound, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and redirect to admin dashboard
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-[#0b131e] flex items-center justify-center p-4 selection:bg-blue-500/30">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
        
        {/* Background decorative glow */}
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
          <div className="w-32 h-32 bg-blue-500 rounded-full blur-3xl absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="flex items-center gap-3 mb-8 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Building2 className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">HCL Facility</h1>
            <p className="text-sm text-slate-400 font-medium">Tenant Portal</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Email / Phone</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hospital.com"
                required
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 px-4 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98] transition-all"
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Having trouble logging in? <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
