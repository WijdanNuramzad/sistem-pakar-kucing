import { useEffect, useState } from "react";
import { ArrowLeft, Eye, Award, Printer, Info, Heart, Shield, Check } from "lucide-react";
import type { Screen } from "../types";

// ─── HASIL PAGE ───────────────────────────────────────────────────────────────

interface HasilProps {
  onNav: (s: Screen) => void;
}

export default function Hasil({ onNav }: HasilProps) {
  const [resultData, setResultData] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const rawResult = sessionStorage.getItem("diagnosa_result");
    const rawForm = sessionStorage.getItem("diagnosa_form");

    if (!rawResult || !rawForm) {
      alert("Data diagnosa tidak ditemukan. Silakan lakukan diagnosa ulang.");
      onNav("diagnosa");
      return;
    }

    setResultData(JSON.parse(rawResult));
    setFormData(JSON.parse(rawForm));
  }, [onNav]);

  if (!resultData || !formData) return null;

  const topDisease = resultData.top_penyakit;
  const confidence = topDisease.probabilitas;
  
  const getStatus = (c: number) => {
    if (c >= 80) return { label: "Pasti", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" };
    if (c >= 60) return { label: "Hampir Pasti", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" };
    if (c >= 40) return { label: "Kemungkinan Besar", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" };
    if (c >= 20) return { label: "Mungkin", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" };
    return { label: "Tidak Yakin", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
  };
  const status = getStatus(confidence);
  
  // Format tanggal hari ini
  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="p-4 md:p-8 flex-1 overflow-y-auto">
      <button onClick={() => onNav("diagnosa")} className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 mb-2">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Diagnosa
      </button>

      <div className="grid grid-cols-3 gap-4">
        {/* Hero result card */}
        <div className="col-span-3">
          <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2563EB] rounded-2xl p-6 text-white shadow-xl flex items-center gap-8">
            <div className="flex-1">
              <p className="text-blue-200 text-xs font-medium mb-1">Hasil Diagnosa Sistem Pakar</p>
              <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-3xl font-bold mb-2">{topDisease.nama}</h2>
              <p className="text-blue-100 text-xs mb-4">Kode Penyakit: {topDisease.kode}</p>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${status.bg} ${status.color}`}>
                  ✓ {status.label}
                </span>
                <span className="text-blue-200 text-xs">Dihitung menggunakan Teorema Bayes</span>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => onNav("perhitungan")} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
                  <Eye className="w-3.5 h-3.5" /> Detail Perhitungan
                </button>
                <button onClick={() => onNav("ranking")} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
                  <Award className="w-3.5 h-3.5" /> Ranking Penyakit
                </button>
                <button onClick={() => onNav("cetak-hasil")} className="flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
                  <Printer className="w-3.5 h-3.5" /> Cetak Laporan
                </button>
              </div>
            </div>

            {/* Gauge */}
            <div className="text-center flex-shrink-0">
              <div className="relative w-36 h-36">
                <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
                  <circle cx="70" cy="70" r="54" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="12" />
                  <circle cx="70" cy="70" r="54" fill="none" stroke="white" strokeWidth="12"
                    strokeDasharray={`${(confidence / 100) * 339.3} 339.3`}
                    strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{confidence}%</span>
                  <span className="text-blue-200 text-[10px]">Probabilitas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detail sections */}
        <div className="col-span-2 space-y-4">
          {/* Penjelasan */}
          <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5">
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 text-sm mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-[#2563EB]" /> Penjelasan Penyakit
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
              {topDisease.deskripsi}
            </p>
          </div>

          {/* Solusi */}
          <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5">
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 text-sm mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#F97316]" /> Solusi Penanganan
            </h3>
            <div className="space-y-2">
              {topDisease.solusi.split('\n').filter((s: string) => s.trim() !== "").map((s: string, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[9px] font-bold text-orange-600">{i + 1}</span>
                  </div>
                  <p className="text-xs text-slate-600">{s.trim()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Saran perawatan (statis - karena dari request awal minta UI yang kaya, ini tetap bagus secara UX) */}
          <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5">
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-emerald-800 text-sm mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" /> Saran Perawatan Umum
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Jaga kebersihan kandang dan perlengkapan makan",
                "Pastikan asupan nutrisi dan cairan terpenuhi",
                "Pantau perkembangan gejala secara berkala",
                "Segera konsultasi ke dokter hewan terdekat"
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-700">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info & Gejala terpilih */}
        <div className="col-span-1">
          {/* Info kucing */}
          <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5 mb-4">
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 text-sm mb-3">Informasi Pasien</h3>
            <div className="space-y-2.5">
              {[
                ["Pemilik", formData.pemilik], 
                ["Nama Kucing", formData.kucing], 
                ["Umur", formData.umur || "-"], 
                ["Jenis Kelamin", formData.kelamin], 
                ["Tanggal", today]
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs">
                  <span className="text-slate-400">{k}</span>
                  <span className="font-semibold text-slate-700">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gejala terpilih */}
          <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5">
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 text-sm mb-3">Gejala Terpilih</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {resultData.gejala_dipilih.map((g: any) => (
                <div key={g.kode} className="flex items-center gap-2 p-2 bg-[#EEF4FB] rounded-xl">
                  <Check className="w-3.5 h-3.5 text-[#2563EB] flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-teal-600 font-bold">{g.kode}</p>
                    <p className="text-[11px] text-slate-700 font-medium leading-tight">{g.nama}</p>
                  </div>
                  <span style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-[10px] text-slate-400 ml-auto flex-shrink-0">
                    {Number(g.bobot).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
