import { useEffect, useState } from "react";
import { Download, Printer, Search, Calendar, FileText, Loader2 } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import Badge from "../components/ui/Badge";
import axios from "axios";
import type { Screen } from "../types";

// ─── REKAP LAPORAN PAGE ─────────────────────────────────────────────────────────

interface LaporanProps {
  onNav: (s: Screen) => void;
}

export default function Laporan({ onNav }: LaporanProps) {
  const [riwayat, setRiwayat] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const res = await axios.get("https://api-pakarkucing.kesug.com/api/diagnosa/riwayat");
        setRiwayat(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRiwayat();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const filtered = riwayat.filter(r =>
    r.nama_pemilik?.toLowerCase().includes(search.toLowerCase()) ||
    r.nama_kucing?.toLowerCase().includes(search.toLowerCase()) ||
    r.penyakit?.nama?.toLowerCase().includes(search.toLowerCase())
  );

  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  if (loading) {
    return (
      <AppLayout current="laporan" onNav={onNav} title="Rekapitulasi Laporan">
        <div className="flex h-full items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout current="laporan" onNav={onNav} title="Rekapitulasi Laporan">
      
      {/* Action Bar (Not visible in Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden mb-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari data laporan..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#2563EB] w-full sm:w-64"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={handlePrint} className="flex items-center gap-2 bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-red-700 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" /> Download PDF
          </button>
          <button onClick={handlePrint} className="flex items-center gap-2 bg-[#2563EB] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
            <Printer className="w-3.5 h-3.5" /> Print Laporan
          </button>
        </div>
      </div>

      {/* Laporan Container (Visible in Print) */}
      <div className="print-rekap-container bg-white rounded-2xl shadow-sm border border-blue-50 overflow-hidden print:shadow-none print:border-none print:rounded-none">
        
        {/* Header untuk Print */}
        <div className="hidden print:block p-6 border-b-2 border-slate-800 mb-4">
          <div className="flex items-center gap-4">
            <FileText className="w-10 h-10 text-slate-800" />
            <div>
              <h1 style={{ fontFamily: "Poppins, sans-serif" }} className="text-xl font-bold text-slate-900">REKAPITULASI DIAGNOSA PENYAKIT KUCING</h1>
              <p className="text-sm text-slate-600">Sistem Pakar Teorema Bayes - Klinik Kucing Nusantara</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm text-slate-600">
            <p>Tanggal Cetak: {today}</p>
            <p>Total Data: {filtered.length} Diagnosa</p>
          </div>
        </div>

        <div className="overflow-x-auto print:overflow-visible">
          <table className="w-full text-xs print:text-[11px]">
            <thead>
              <tr className="bg-[#EEF4FB] print:bg-slate-200">
                {["No", "Tanggal", "Nama Pemilik", "Nama Kucing", "Penyakit Terdiagnosa", "Probabilitas", "Status"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-slate-600 print:text-slate-900 font-semibold border-b print:border-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => {
                const getStatus = (c: number) => {
                  if (c >= 80) return "Sangat Tinggi";
                  if (c >= 60) return "Tinggi";
                  if (c >= 40) return "Sedang";
                  return "Rendah";
                };

                const date = new Date(r.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
                return (
                  <tr key={r.id} className="border-b border-slate-50 print:border-slate-300 hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3 text-slate-400 print:text-slate-700">{i + 1}</td>
                    <td className="px-4 py-3 text-slate-500 print:text-slate-800 flex items-center gap-1">
                      <Calendar className="w-3 h-3 print:hidden" /> {date}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800 print:text-black">{r.nama_pemilik}</td>
                    <td className="px-4 py-3 text-slate-600 print:text-black">{r.nama_kucing}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800 print:text-black">{r.penyakit ? r.penyakit.nama : 'Tidak diketahui'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 print:gap-1">
                        <div className="w-14 bg-slate-100 rounded-full h-1.5 print:hidden">
                          <div className="h-1.5 rounded-full bg-[#2563EB]" style={{ width: `${r.probabilitas}%` }} />
                        </div>
                        <span className="font-bold text-slate-700 print:text-black">{Number(r.probabilitas).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {/* Di print badge CSS mungkin hilang, jadi pakai text plain */}
                      <span className="print:hidden">
                        <Badge label={getStatus(r.probabilitas)} color="" />
                      </span>
                      <span className="hidden print:inline-block font-semibold">
                        {getStatus(r.probabilitas)}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">Tidak ada riwayat diagnosa</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer for print only */}
        <div className="hidden print:flex justify-end mt-12 pr-12">
          <div className="text-center w-48">
            <p className="text-sm mb-16">{today}</p>
            <p className="text-sm font-bold border-b border-black">Administrator</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
