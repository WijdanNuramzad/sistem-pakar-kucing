import { useEffect, useState } from "react";
import { ArrowLeft, Award } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import type { Screen } from "../types";

// ─── RANKING PAGE ─────────────────────────────────────────────────────────────

interface RankingProps {
  onNav: (s: Screen) => void;
}

export default function Ranking({ onNav }: RankingProps) {
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    const rawResult = sessionStorage.getItem("diagnosa_result");
    if (!rawResult) {
      alert("Data diagnosa tidak ditemukan. Silakan lakukan diagnosa ulang.");
      onNav("diagnosa");
      return;
    }
    setResultData(JSON.parse(rawResult));
  }, [onNav]);

  if (!resultData) return null;

  // Prepare chart data colors
  const COLORS = ["#2563EB", "#0D9488", "#F59E0B", "#E11D48", "#8B5CF6", "#EC4899", "#10B981"];

  const rankingData = resultData.ranking.map((r: any, i: number) => ({
    kode: r.kode,
    nama: r.nama,
    persen: r.probabilitas,
    rank: i + 1,
    color: COLORS[i % COLORS.length]
  }));

  const topDisease = rankingData[0];

  return (
    <div className="p-4 md:p-8 flex-1 overflow-y-auto">
      <button onClick={() => onNav("hasil")} className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 mb-2">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Hasil
      </button>

      <div className="grid grid-cols-3 gap-4">
        {/* Ranking cards */}
        <div className="col-span-2 space-y-3">
          <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5">
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 text-sm mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#F97316]" /> Probabilitas Seluruh Penyakit
            </h3>
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
              {rankingData.map((d: any) => (
                <div key={d.kode}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white`}
                        style={{ background: d.color }}>
                        {d.rank}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{d.nama}</p>
                        <p className="text-[10px] font-mono text-slate-400">{d.kode}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span style={{ fontFamily: "Poppins, sans-serif", color: d.color }} className="text-xl font-bold">
                        {d.persen}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{ width: `${d.persen}%`, background: d.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bar chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5">
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 text-sm mb-4">Visualisasi Bar Chart</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={rankingData} layout="vertical" margin={{ left: 80, right: 40, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF4FB" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} />
                <YAxis type="category" dataKey="kode" tick={{ fontSize: 10 }} width={40} />
                <Tooltip formatter={(v) => [`${v}%`, "Probabilitas"]} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="persen" radius={[0, 6, 6, 0]}>
                  {rankingData.map((d: any, i: number) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie + table */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5">
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 text-sm mb-2">Distribusi Probabilitas</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={rankingData} cx="50%" cy="50%" outerRadius={75} dataKey="persen" paddingAngle={3}>
                  {rankingData.map((d: any, i: number) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, "Probabilitas"]} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2 max-h-[150px] overflow-y-auto">
              {rankingData.map((d: any) => (
                <div key={d.kode} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-[11px] text-slate-600 flex-1 truncate" title={d.nama}>{d.nama}</span>
                  <span className="text-[11px] font-bold text-slate-800">{d.persen}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-5 text-white">
            <p className="text-blue-200 text-xs mb-1">Diagnosa Utama</p>
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="text-xl font-bold leading-tight">{topDisease.nama}</h3>
            <div className="mt-3 bg-white/20 rounded-xl p-3">
              <p className="text-blue-100 text-xs leading-relaxed">
                Tingkat probabilitas tertinggi berdasarkan kombinasi gejala yang dipilih menggunakan metode Teorema Bayes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
