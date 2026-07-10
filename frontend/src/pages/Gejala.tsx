import { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit2, Trash2, Check, X, AlertTriangle } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import axios from "axios";
import Swal from "sweetalert2";
import type { Screen } from "../types";

// ─── GEJALA PAGE ──────────────────────────────────────────────────────────────

interface GejalaProps {
  onNav: (s: Screen) => void;
}

export default function Gejala({ onNav }: GejalaProps) {
  const [gejala, setGejala] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<null | "add" | "view" | "edit" | "delete">(null);
  const [selected, setSelected] = useState<any>(null);
  const [formData, setFormData] = useState<any>({ id: null, kode: "", nama: "", bobot: "" });

  const fetchData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/gejala");
      setGejala(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (type: "add" | "view" | "edit", data: any = null) => {
    setModal(type);
    if (data && type !== "add") {
      setFormData({ 
        id: data.id, 
        kode: data.kode, 
        nama: data.nama, 
        bobot: data.bobot.toString() 
      });
    } else {
      setFormData({ id: null, kode: "", nama: "", bobot: "" });
    }
  };

  const handleSave = async () => {
    // Validasi kosong
    if (!formData.kode || !formData.nama || !formData.bobot) {
      alert("Semua field harus diisi!");
      return;
    }

    try {
      const payload = { ...formData, bobot: parseFloat(formData.bobot) || 0 };
      if (modal === "add") {
        await axios.post("http://127.0.0.1:8000/api/gejala", payload);
      } else if (modal === "edit") {
        await axios.put(`http://127.0.0.1:8000/api/gejala/${formData.id}`, payload);
      }
      setModal(null);
      setSelected(null);
      fetchData();
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: modal === "add" ? "Data gejala berhasil ditambahkan" : "Data gejala berhasil diperbarui",
        confirmButtonColor: "#0D9488",
      });
    } catch (err: any) {
      console.error(err);
      const errors = err.response?.data?.errors;
      if (errors) {
        const messages = Object.values(errors).flat().join('\n');
        alert(`Gagal menyimpan:\n${messages}`);
      } else {
        alert(err.response?.data?.message || "Gagal menyimpan data");
      }
    }
  };

  const confirmDelete = async () => {
    if (!selected) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/gejala/${selected.id}`);
      setModal(null);
      fetchData();
      Swal.fire({
        icon: "success",
        title: "Terhapus!",
        text: "Data gejala berhasil dihapus",
        confirmButtonColor: "#0D9488",
      });
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data");
    }
  };

  const filtered = gejala.filter(g =>
    (g.nama || "").toLowerCase().includes(search.toLowerCase()) ||
    (g.kode || "").toLowerCase().includes(search.toLowerCase())
  );

  const getBobot = (b: number) => {
    if (b >= 0.8) return { label: "Sangat Kuat", color: "bg-emerald-100 text-emerald-700" };
    if (b >= 0.6) return { label: "Kuat", color: "bg-blue-100 text-blue-700" };
    return { label: "Sedang", color: "bg-amber-100 text-amber-700" };
  };

  return (
    <AppLayout current="gejala" onNav={onNav} title="Data Gejala">
      <div className="bg-white rounded-2xl shadow-sm border border-blue-50 overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Cari gejala..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <button onClick={() => openModal("add")} className="ml-auto flex items-center gap-2 bg-[#0D9488] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Tambah Gejala
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#EEF4FB]">
                <th className="text-left px-4 py-3 text-slate-600 font-semibold w-12">No</th>
                <th className="text-left px-4 py-3 text-slate-600 font-semibold">Kode Gejala</th>
                <th className="text-left px-4 py-3 text-slate-600 font-semibold">Nama Gejala</th>
                <th className="text-left px-4 py-3 text-slate-600 font-semibold">Bobot Belief</th>
                <th className="text-left px-4 py-3 text-slate-600 font-semibold">Kekuatan</th>
                <th className="text-left px-4 py-3 text-slate-600 font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((g, i) => {
                const b = getBobot(g.bobot);
                return (
                  <tr key={g.id || g.kode || i} className={`border-b border-slate-50 hover:bg-teal-50/30 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/20"}`}>
                    <td className="px-4 py-2.5 text-slate-400">{i + 1}</td>
                    <td className="px-4 py-2.5">
                      <span className="bg-teal-100 text-teal-700 font-mono font-semibold px-2 py-0.5 rounded">{g.kode}</span>
                    </td>
                    <td className="px-4 py-2.5 text-slate-700 font-medium">{g.nama}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-[#0D9488]" style={{ width: `${g.bobot * 100}%` }} />
                        </div>
                        <span style={{ fontFamily: "JetBrains Mono, monospace" }} className="font-semibold text-slate-700">{Number(g.bobot).toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${b.color}`}>{b.label}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openModal("view", g)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"><Eye className="w-3 h-3" /></button>
                        <button onClick={() => openModal("edit", g)} className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100"><Edit2 className="w-3 h-3" /></button>
                        <button onClick={() => { setSelected(g); setModal("delete"); }} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">{filtered.length} dari {gejala.length} gejala</p>
        </div>
      </div>

      {/* Modal CRUD */}
      {modal && modal !== "delete" && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800">
                {modal === "add" ? "Tambah Gejala Baru" : modal === "edit" ? "Edit Gejala" : "Detail Gejala"}
              </h3>
              <button onClick={() => setModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {[
                { label: "Kode Gejala", key: "kode", val: formData.kode, ph: "Contoh: G14" },
                { label: "Nama Gejala", key: "nama", val: formData.nama, ph: "Nama gejala" },
                { label: "Bobot Belief", key: "bobot", val: formData.bobot, ph: "Contoh: 0.8" },
              ].map(({ label, key, val, ph }) => (
                <div key={label}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
                  <input
                    type="text"
                    value={val}
                    onChange={e => setFormData({ ...formData, [key as keyof typeof formData]: e.target.value })}
                    readOnly={modal === "view"}
                    placeholder={ph}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500 bg-slate-50"
                  />
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-slate-100 flex justify-end gap-2">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
                {modal === "view" ? "Tutup" : "Batal"}
              </button>
              {modal !== "view" && (
                <button onClick={handleSave} className="px-4 py-2 text-xs font-semibold text-white bg-[#0D9488] rounded-xl hover:bg-teal-700 transition-colors flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> Simpan
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {modal === "delete" && selected && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="text-lg font-bold text-slate-800 mb-2">Hapus Gejala?</h3>
            <p className="text-sm text-slate-500 mb-6">Yakin ingin menghapus gejala <span className="font-semibold text-slate-700">{selected.nama}</span>? Data yang dihapus tidak bisa dikembalikan.</p>
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
    </AppLayout>
  );
}
