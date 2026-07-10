import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts";
import { Database, List, BookOpen, Activity, ChevronRight, Loader2 } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import StatCard from "../components/ui/StatCard";
import Badge from "../components/ui/Badge";
import axios from "axios";
import type { Screen } from "../types";

// ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────

interface DashboardProps {
  onNav: (s: Screen) => void;
}

const PIE_COLORS = ["#2563EB", "#0D9488", "#F59E0B", "#E11D48", "#8B5CF6", "#EC4899", "#10B981"];

export default function Dashboard({ onNav }: DashboardProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api-pakarkucing.kesug.com/api/dashboard");
        setData(res.data);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <AppLayout current="dashboard" onNav={onNav} title="Dashboard">
        <div className="flex h-full items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
        </div>
      </AppLayout>
    );
  }

  if (!data) return null;

  return (
    <AppLayout current="dashboard" onNav={onNav} title="Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Database className="w-5 h-5 text-white" />} label="Total Penyakit" value={data.stats.totalPenyakit} color="bg-[#2563EB]" sub="Terdaftar dalam basis data" />
        <StatCard icon={<List className="w-5 h-5 text-white" />} label="Total Gejala" value={data.stats.totalGejala} color="bg-[#0D9488]" sub="Parameter diagnosa" />
        <StatCard icon={<BookOpen className="w-5 h-5 text-white" />} label="Total Rule" value={data.stats.totalRule} color="bg-[#8B5CF6]" sub="Basis pengetahuan aktif" />
        <StatCard icon={<Activity className="w-5 h-5 text-white" />} label="Total Diagnosa" value={data.stats.totalDiagnosa} color="bg-[#F97316]" sub="Riwayat tersimpan" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Bar chart */}
        <div className="col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-blue-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 text-sm">Penyakit Terbanyak Didiagnosa</h3>
              <p className="text-xs text-slate-400 mt-0.5">Data kumulatif semua diagnosa</p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium">{new Date().getFullYear()}</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            {data.diseaseFreq.length > 0 ? (
              <BarChart data={data.diseaseFreq} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF4FB" />
                <XAxis dataKey="kode" tick={{ fontSize: 10 }} interval={0} height={20} />
                <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
                <Bar dataKey="count" fill="#2563EB" radius={[6, 6, 0, 0]} label={{ position: "top", fontSize: 10 }} />
              </BarChart>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs">Belum ada data diagnosa</div>
            )}
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-50">
          <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 text-sm mb-4">Distribusi Penyakit</h3>
          <ResponsiveContainer width="100%" height={200}>
            {data.diseaseFreq.length > 0 ? (
              <PieChart>
                <Pie data={data.diseaseFreq} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="count" paddingAngle={3}>
                  {data.diseaseFreq.map((_: any, i: number) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
              </PieChart>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs">Belum ada data</div>
            )}
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-1 max-h-[80px] overflow-y-auto">
            {data.diseaseFreq.slice(0, 4).map((d: any, i: number) => (
              <div key={d.nama} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                <span className="text-[10px] text-slate-500 truncate flex-1" title={d.nama}>{d.nama}</span>
                <span className="text-[10px] font-semibold text-slate-700">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly + Recent */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="col-span-1 bg-white rounded-2xl p-5 shadow-sm border border-blue-50">
          <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 text-sm mb-4">Diagnosa per Bulan</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={data.monthlyData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF4FB" />
              <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "none" }} />
              <Line type="monotone" dataKey="jumlah" stroke="#0D9488" strokeWidth={2.5} dot={{ fill: "#0D9488", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent table */}
        <div className="col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-blue-50">
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 text-sm">Riwayat Diagnosa Terbaru</h3>
            <button onClick={() => onNav("riwayat")} className="text-xs text-[#2563EB] hover:underline flex items-center gap-1">
              Lihat semua <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#EEF4FB]">
                  {["Tanggal", "Pemilik", "Kucing", "Diagnosa", "Persentase", "Status"].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-slate-600 font-semibold first:rounded-l-lg last:rounded-r-lg">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.recentRiwayat.length > 0 ? (
                  data.recentRiwayat.map((r: any) => (
                    <tr key={r.id} className="border-b border-slate-50 hover:bg-blue-50/40 transition-colors">
                      <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap">{r.tgl}</td>
                      <td className="px-3 py-2.5 font-medium text-slate-700">{r.pemilik}</td>
                      <td className="px-3 py-2.5 text-slate-600">{r.kucing}</td>
                      <td className="px-3 py-2.5 font-medium text-slate-800">{r.hasil}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 rounded-full h-1.5">
                            <div className="h-1.5 rounded-full bg-[#2563EB]" style={{ width: `${r.persen}%` }} />
                          </div>
                          <span className="font-semibold text-slate-700">{r.persen}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5"><Badge label={r.status} color="" /></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-slate-400">Belum ada riwayat</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
