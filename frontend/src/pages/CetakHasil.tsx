import { useEffect, useState } from "react";
import { ArrowLeft, Download, Printer, Cat, Check } from "lucide-react";
import type { Screen } from "../types";

// ─── CETAK HASIL (SINGLE REPORT) ─────────────────────────────────────────────────────────

interface CetakHasilProps {
  onNav: (s: Screen | "cetak-hasil") => void;
}

export default function CetakHasil({ onNav }: CetakHasilProps) {
  const [resultData, setResultData] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const rawResult = sessionStorage.getItem("diagnosa_result");
    const rawForm = sessionStorage.getItem("diagnosa_form");

    if (!rawResult || !rawForm) {
      alert("Data diagnosa tidak ditemukan. Silakan lakukan diagnosa ulang atau pilih dari riwayat.");
      onNav("riwayat");
      return;
    }

    setResultData(JSON.parse(rawResult));
    setFormData(JSON.parse(rawForm));
  }, [onNav]);

  const handlePrint = () => {
    window.print();
  };

  if (!resultData || !formData) return null;

  const topDisease = resultData.top_penyakit;
  const confidence = topDisease.probabilitas;
  
  const getStatusLabel = (c: number) => {
    if (c >= 80) return { label: "Pasti", color: "text-emerald-700", bg: "bg-emerald-100" };
    if (c >= 60) return { label: "Hampir Pasti", color: "text-blue-700", bg: "bg-blue-100" };
    if (c >= 40) return { label: "Kemungkinan Besar", color: "text-amber-700", bg: "bg-amber-100" };
    if (c >= 20) return { label: "Mungkin", color: "text-orange-700", bg: "bg-orange-100" };
    return { label: "Tidak Yakin", color: "text-red-700", bg: "bg-red-100" };
  };
  const status = getStatusLabel(confidence);
  
  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const noLaporan = `RM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="p-4 md:p-8 flex-1 overflow-y-auto">
      <div className="flex items-center justify-between mb-4 print:hidden">
        <button onClick={() => onNav("riwayat")} className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
        <div className="flex gap-2">
          <button onClick={handlePrint} className="flex items-center gap-2 bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-red-700 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" /> Download PDF
          </button>
          <button onClick={handlePrint} className="flex items-center gap-2 bg-[#2563EB] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
            <Printer className="w-3.5 h-3.5" /> Print
          </button>
        </div>
      </div>

      {/* A4 Paper Preview */}
      <div className="flex justify-center print:block print:w-full print:m-0 print:p-0">
        
        <div className="print-container bg-white shadow-2xl rounded-lg w-[794px] min-h-[1123px] p-[60px] print:w-full print:min-h-0 print:p-0 print:shadow-none" style={{ fontFamily: "Inter, sans-serif" }}>
          {/* Header */}
          <div className="flex items-start gap-4 pb-5 border-b-2 border-[#1E3A5F] mb-5">
            <div className="w-16 h-16 bg-[#1E3A5F] rounded-xl flex items-center justify-center flex-shrink-0">
              <Cat className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Klinik Kucing Nusantara</p>
              <h1 style={{ fontFamily: "Poppins, sans-serif" }} className="text-lg font-bold text-[#1E3A5F] leading-tight">
                LAPORAN HASIL DIAGNOSA
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Sistem Pakar menggunakan Teorema Bayes</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400">No. Rekam Medis</p>
              <p style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-xs font-bold text-slate-600">{noLaporan}</p>
              <p className="text-[10px] text-slate-400 mt-1">{today}</p>
            </div>
          </div>

          {/* Info pemilik */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-xs font-bold text-[#1E3A5F] mb-2 uppercase tracking-wider">Data Pasien</p>
              <table className="w-full text-xs">
                <tbody>
                  {[
                    ["Nama Pemilik", formData.pemilik], 
                    ["Nama Kucing", formData.kucing], 
                    ["Umur Kucing", formData.umur || "-"], 
                    ["Jenis Kelamin", formData.kelamin]
                  ].map(([k, v]) => (
                    <tr key={k}>
                      <td className="py-1.5 text-slate-500 w-36">{k}</td>
                      <td className="py-1.5 text-slate-400 w-4">:</td>
                      <td className="py-1.5 font-semibold text-slate-800">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-[#EEF4FB] rounded-xl p-4 border-l-4 border-[#2563EB] flex flex-col justify-center">
              <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-xs font-bold text-[#1E3A5F] mb-1">Diagnosa Utama</p>
              <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-xl font-bold text-[#2563EB]">{topDisease.nama}</p>
              <div className="flex items-center gap-3 mt-2">
                <p style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-2xl font-bold text-emerald-600">{confidence}%</p>
                <span className={`${status.bg} ${status.color} text-[10px] font-bold px-2 py-1 rounded-md`}>Tingkat Kepastian: {status.label}</span>
              </div>
            </div>
          </div>

          {/* Gejala */}
          <div className="mb-6">
            <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-xs font-bold text-[#1E3A5F] mb-3 uppercase tracking-wider border-b border-slate-200 pb-1">
              Gejala Klinis yang Ditemukan
            </p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {resultData.gejala_dipilih.map((g: any) => (
                <div key={g.kode} className="flex items-start gap-2 text-xs">
                  <div className="w-4 h-4 bg-[#2563EB] rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="font-mono text-[10px] text-teal-600 font-bold mt-0.5">[{g.kode}]</span>
                  <span className="text-slate-700 leading-tight flex-1">{g.nama}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Penyakit */}
          <div className="mb-6 space-y-4">
            <div>
              <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-xs font-bold text-[#1E3A5F] mb-1 uppercase tracking-wider border-b border-slate-200 pb-1">
                Keterangan Penyakit
              </p>
              <p className="text-xs text-slate-700 leading-relaxed mt-2 text-justify">
                {topDisease.deskripsi}
              </p>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
              <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-xs font-bold text-[#ea580c] mb-2 uppercase tracking-wider">
                Rekomendasi Penanganan
              </p>
              <ul className="list-disc pl-5 space-y-1">
                {topDisease.solusi.split('\n').filter((s: string) => s.trim() !== "").map((s: string, i: number) => (
                  <li key={i} className="text-xs text-slate-700 leading-relaxed">
                    {s.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tabel Probabilitas Lainnya */}
          {resultData.ranking.length > 1 && (
            <div className="mb-8">
              <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-xs font-bold text-[#1E3A5F] mb-3 uppercase tracking-wider border-b border-slate-200 pb-1">
                Kemungkinan Diagnosa Lainnya
              </p>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th className="py-2 text-left font-semibold">Penyakit</th>
                    <th className="py-2 text-right font-semibold">Probabilitas</th>
                  </tr>
                </thead>
                <tbody>
                  {resultData.ranking.slice(1, 4).map((r: any) => (
                    <tr key={r.kode} className="border-b border-slate-100">
                      <td className="py-2 text-slate-700">{r.nama}</td>
                      <td className="py-2 text-right font-mono font-medium text-slate-600">{r.probabilitas}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer Signature */}
          <div className="border-t-2 border-[#1E3A5F] pt-6 mt-auto flex items-start justify-between">
            <div>
              <p className="text-[10px] text-slate-500 mb-1">Dokumen ini dicetak secara otomatis oleh sistem.</p>
              <p className="text-[10px] text-slate-500 font-bold">Sistem Pakar Diagnosa Kucing - Teorema Bayes</p>
            </div>
            <div className="text-center w-40">
              <p className="text-xs text-slate-700 mb-16">{today}</p>
              <p className="text-xs text-slate-800 font-bold underline decoration-slate-300 underline-offset-4">Dokter Hewan / Pakar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
