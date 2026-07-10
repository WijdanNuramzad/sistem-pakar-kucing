import { useState, useEffect } from "react";
import { Search, Download, Calendar, Eye, Printer, Trash2, Loader2, AlertTriangle } from "lucide-react";
import Badge from "../components/ui/Badge";
import axios from "axios";
import type { Screen } from "../types";

// ─── RIWAYAT PAGE ─────────────────────────────────────────────────────────────

interface RiwayatProps {
  onNav: (s: Screen) => void;
}

export default function Riwayat({ onNav }: RiwayatProps) {
  const [search, setSearch] = useState("");
  const [riwayat, setRiwayat] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<null | "delete">(null);
  const [selected, setSelected] = useState<any>(null);

  const fetchRiwayat = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/diagnosa/riwayat");
      setRiwayat(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiwayat();
  }, []);

  const confirmDelete = async () => {
    if (!selected) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/diagnosa/riwayat/${selected.id}`);
      setModal(null);
      fetchRiwayat();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus riwayat");
    }
  };

  const handleView = (item: any) => {
    const topPenyakit = item.penyakit ? { ...item.penyakit } : { nama: "Tidak diketahui", deskripsi: "", solusi: "" };
    topPenyakit.probabilitas = item.probabilitas;

    const resultData = {
      top_penyakit: topPenyakit,
      ranking: item.hasil_lengkap || [],
      gejala_dipilih: item.gejala_dipilih || [],
      prior_prob: 1 / ((item.hasil_lengkap || []).length || 1), 
    };

    const formData = {
      pemilik: item.nama_pemilik,
      kucing: item.nama_kucing,
      umur: item.umur_kucing,
      kelamin: item.jenis_kelamin
    };

    sessionStorage.setItem("diagnosa_result", JSON.stringify(resultData));
    sessionStorage.setItem("diagnosa_form", JSON.stringify(formData));
    
    onNav("hasil");
  };

  const handleLaporan = (item: any) => {
    const topPenyakit = item.penyakit ? { ...item.penyakit } : { nama: "Tidak diketahui", deskripsi: "", solusi: "" };
    topPenyakit.probabilitas = item.probabilitas;

    const resultData = {
      top_penyakit: topPenyakit,
      ranking: item.hasil_lengkap || [],
      gejala_dipilih: item.gejala_dipilih || [],
      prior_prob: 1 / ((item.hasil_lengkap || []).length || 1), 
    };

    const formData = {
      pemilik: item.nama_pemilik,
      kucing: item.nama_kucing,
      umur: item.umur_kucing,
      kelamin: item.jenis_kelamin
    };

    sessionStorage.setItem("diagnosa_result", JSON.stringify(resultData));
    sessionStorage.setItem("diagnosa_form", JSON.stringify(formData));
    
    onNav("cetak-hasil");
  };

  const filtered = riwayat.filter(r =>
    r.nama_pemilik?.toLowerCase().includes(search.toLowerCase()) ||
    r.nama_kucing?.toLowerCase().includes(search.toLowerCase()) ||
    r.penyakit?.nama?.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="p-4 md:p-8 flex-1 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-blue-50 overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-slate-100 flex-wrap gap-y-2">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Cari riwayat..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="date" className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400" />
            <span className="text-xs text-slate-400">s/d</span>
            <input type="date" className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400" />
          </div>
          <button className="ml-auto flex items-center gap-2 bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export Excel
          </button>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="w-8 h-8 animate-spin text-[#2563EB]" />
            </div>
          ) : (
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#EEF4FB]">
                  {["No", "Tanggal", "Nama Pemilik", "Nama Kucing", "Hasil Diagnosa", "Persentase", "Aksi"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-slate-600 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3 text-slate-400">{i + 1}</td>
                    <td className="px-4 py-3 text-slate-500 flex items-center gap-1 whitespace-nowrap">
                      <Calendar className="w-3 h-3" /> {new Date(r.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">{r.nama_pemilik}</td>
                    <td className="px-4 py-3 text-slate-600">{r.nama_kucing}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {r.penyakit ? r.penyakit.nama : "Tidak diketahui"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 w-32">
                        <div className="w-full bg-slate-100 rounded-full h-1.5 flex-1">
                          <div className="h-1.5 rounded-full bg-[#2563EB]" style={{ width: `${r.probabilitas}%` }} />
                        </div>
                        <span className="font-bold text-slate-700">{Number(r.probabilitas).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleView(r)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"><Eye className="w-3 h-3" /></button>
                        <button onClick={() => handleLaporan(r)} className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100"><Printer className="w-3 h-3" /></button>
                        <button onClick={() => { setSelected(r); setModal("delete"); }} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-400">Belum ada riwayat diagnosa</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">{filtered.length} data ditemukan</p>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {modal === "delete" && selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="text-lg font-bold text-slate-800 mb-2">Hapus Riwayat?</h3>
            <p className="text-sm text-slate-500 mb-6">
              Yakin ingin menghapus riwayat diagnosa milik <span className="font-semibold text-slate-700">{selected.nama_pemilik}</span> dengan kucing <span className="font-semibold text-slate-700">{selected.nama_kucing}</span>? Data yang dihapus tidak bisa dikembalikan.
            </p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setModal(null)} className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors flex-1">
                Batal
              </button>
              <button onClick={confirmDelete} className="px-5 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors flex-1 shadow-lg shadow-red-500/30">
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
