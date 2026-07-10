import { useState } from "react";
import { ChevronRight, Stethoscope, User, Shield, Cat } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import axios from "axios";

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: pass,
      });
      login(res.data.token, res.data.user);
    } catch (e: any) {
      setError(e.response?.data?.message || "Login gagal");
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Left panel */}
      <div className="flex-1 bg-[#1E3A5F] relative flex flex-col items-center justify-center p-12 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#2563EB]/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#0D9488]/20 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 right-8 w-24 h-24 bg-[#F97316]/10 rounded-full" />

        <div className="relative z-10 text-center max-w-md">
          <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur border border-white/20">
            <Cat className="w-14 h-14 text-white" />
          </div>
          <h1 style={{ fontFamily: "Poppins, sans-serif" }} className="text-3xl font-bold text-white mb-3">
            Sistem Pakar
          </h1>
          <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-xl font-semibold text-[#93C5FD] mb-4">
            Diagnosa Penyakit Kucing
          </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Sistem berbasis web menggunakan metode <span className="text-[#F97316] font-semibold">Teorema Bayes</span> untuk
              mendiagnosa penyakit pada kucing berdasarkan gejala-gejala yang diinputkan dengan tingkat akurasi tinggi.
            </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[["13", "Penyakit"], ["39", "Gejala"], ["13", "Rule"]].map(([v, l]) => (
              <div key={l} className="bg-white/10 rounded-xl p-4 backdrop-blur border border-white/10">
                <p className="text-2xl font-bold text-white">{v}</p>
                <p className="text-xs text-slate-300 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cat SVG illustration */}
        <div className="relative z-10 mt-10">
          <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
            <ellipse cx="80" cy="90" rx="50" ry="18" fill="white" fillOpacity="0.08" />
            <circle cx="80" cy="60" r="32" fill="white" fillOpacity="0.12" />
            <path d="M55 48 L62 30 L70 46" fill="#93C5FD" fillOpacity="0.6" />
            <path d="M105 48 L98 30 L90 46" fill="#93C5FD" fillOpacity="0.6" />
            <circle cx="80" cy="62" r="26" fill="#DBEAFE" fillOpacity="0.3" />
            <circle cx="72" cy="58" r="4" fill="white" fillOpacity="0.7" />
            <circle cx="88" cy="58" r="4" fill="white" fillOpacity="0.7" />
            <circle cx="73" cy="59" r="2" fill="#1E3A5F" />
            <circle cx="89" cy="59" r="2" fill="#1E3A5F" />
            <path d="M76 66 Q80 70 84 66" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
            <line x1="60" y1="66" x2="50" y2="64" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
            <line x1="60" y1="68" x2="50" y2="68" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
            <line x1="100" y1="66" x2="110" y2="64" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
            <line x1="100" y1="68" x2="110" y2="68" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
            <path d="M65 82 Q80 96 95 82" fill="white" fillOpacity="0.15" />
            <path d="M55 75 Q45 85 50 95 Q65 90 65 82" fill="white" fillOpacity="0.1" />
            <path d="M105 75 Q115 85 110 95 Q95 90 95 82" fill="white" fillOpacity="0.1" />
          </svg>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="w-[420px] bg-white flex items-center justify-center p-10">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="w-12 h-12 bg-[#DBEAFE] rounded-xl flex items-center justify-center mb-4">
              <Stethoscope className="w-6 h-6 text-[#2563EB]" />
            </div>
            <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-2xl font-bold text-slate-800">Selamat Datang</h2>
            <p className="text-slate-500 text-sm mt-1">Masuk untuk mengakses sistem pakar</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Masukkan email"
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 bg-slate-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Password</label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 bg-slate-50"
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 mt-2 shadow-blue-200 shadow-md"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>Masuk ke Sistem <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <div className="mt-6 p-3 bg-blue-50 rounded-xl border border-blue-100 space-y-2">
            <p className="text-xs text-slate-500">
              <span className="font-semibold text-blue-600">Admin:</span> <code className="bg-white px-1 rounded">admin@admin.com</code> / <code className="bg-white px-1 rounded">admin</code>
            </p>
            <p className="text-xs text-slate-500">
              <span className="font-semibold text-blue-600">User:</span> <code className="bg-white px-1 rounded">user@user.com</code> / <code className="bg-white px-1 rounded">user</code>
            </p>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            © 2024 Sistem Pakar Diagnosa Kucing · Tugas Akhir
          </p>
        </div>
      </div>
    </div>
  );
}
