import { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit2, Trash2, Check, X, AlertTriangle } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import axios from "axios";
import Swal from "sweetalert2";
import type { Screen } from "../types";

// ─── PENYAKIT PAGE ────────────────────────────────────────────────────────────

interface PenyakitProps {
  onNav: (s: Screen) => void;
}

export default function Penyakit({ onNav }: PenyakitProps) {
  const [diseases, setDiseases] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<null | "add" | "view" | "edit" | "delete">(null);
  const [selected, setSelected] = useState<any>(null);
  const [formData, setFormData] = useState<any>({ id: null, kode: "", nama: "", deskripsi: "", solusi: "" });

  const fetchData = async () => {
    try {
      const res = await axios.get("https://api-pakarkucing.kesug.com/api/penyakit");
      setDiseases(res.data);
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
        deskripsi: data.deskripsi || data.desc || "",
        solusi: data.solusi
      });
    } else {
      setFormData({ id: null, kode: "", nama: "", deskripsi: "", solusi: "" });
    }
  };

  const handleSave = async () => {
    // Validasi kosong
    if (!formData.kode || !formData.nama || !formData.deskripsi || !formData.solusi) {
      alert("Semua field harus diisi!");
      return;
    }

    try {
      if (modal === "add") {
        await axios.post("https://api-pakarkucing.kesug.com/api/penyakit", formData);
      } else if (modal === "edit" && selected) {
        await axios.put(`https://api-pakarkucing.kesug.com/api/penyakit/${selected.id}`, formData);
      }
      setModal(null);
      setSelected(null);
      fetchData();
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: modal === "add" ? "Data penyakit berhasil ditambahkan" : "Data penyakit berhasil diperbarui",
        confirmButtonColor: "#2563EB",
      });
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data?.errors
        ? JSON.stringify(err.response?.data?.errors)
        : "Gagal menyimpan data";
      alert(msg);
    }
  };

  const confirmDelete = async () => {
    if (!selected) return;
    try {
      await axios.delete(`https://api-pakarkucing.kesug.com/api/penyakit/${selected.id}`);
      setModal(null);
      fetchData();
      Swal.fire({
        icon: "success",
        title: "Terhapus!",
        text: "Data penyakit berhasil dihapus",
        confirmButtonColor: "#2563EB",
      });
    } catch (error) {
      alert('Gagal menghapus data ke server');
    }
  };

  const filtered = diseases.filter(d =>
    (d.nama || "").toLowerCase().includes(search.toLowerCase()) ||
    (d.kode || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout current="penyakit" onNav={onNav} title="Data Penyakit">
      <div className="bg-white rounded-2xl shadow-sm border border-blue-50 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari penyakit..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <button
            onClick={() => openModal("add")}
            className="ml-auto flex items-center gap-2 bg-[#2563EB] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Penyakit
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#EEF4FB]">
                {["Kode", "Nama Penyakit", "Deskripsi", "Solusi", "Aksi"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-slate-600 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <tr key={d.id || d.kode || i} className={`border-b border-slate-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
                  <td className="px-4 py-3">
                    <span className="bg-blue-100 text-blue-700 font-mono font-semibold px-2 py-0.5 rounded">
                      {d.kode}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800 max-w-[180px]">
                    {d.nama}
                  </td>
                  <td className="px-4 py-3 text-slate-500 max-w-[220px] truncate">
                    {d.deskripsi || d.desc}
                  </td>
                  <td className="px-4 py-3 text-slate-500 max-w-[220px] truncate">
                    {d.solusi}
                  </td>

                  {/* Kolom Aksi */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">

                      {/* Tombol View */}
                      <button
                        onClick={() => openModal("view", d)}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Tombol Edit */}
                      <button
                        onClick={() => { setSelected(d); setFormData({ kode: d.kode, nama: d.nama, deskripsi: d.deskripsi || '', solusi: d.solusi || '' }); setModal('edit'); }}
                        className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Tombol Hapus */}
                      <button
                        onClick={() => { setSelected(d); setModal('delete'); }}
                        className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">Menampilkan {filtered.length} dari {diseases.length} data</p>
        </div>
      </div>

      {/* Modal CRUD */}
      {modal && modal !== "delete" && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800">
                {modal === "add" ? "Tambah Penyakit Baru" : modal === "edit" ? "Edit Penyakit" : "Detail Penyakit"}
              </h3>
              <button onClick={() => setModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Input Kode Penyakit */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Kode Penyakit</label>
                <input
                  type="text"
                  value={formData.kode}
                  onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
                  readOnly={modal === "view"}
                  placeholder="Contoh: P14"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-400 bg-slate-50"
                />
              </div>

              {/* Input Nama Penyakit */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nama Penyakit</label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  readOnly={modal === "view"}
                  placeholder="Nama penyakit"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-400 bg-slate-50"
                />
              </div>

              {/* Textarea Deskripsi */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Deskripsi</label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  readOnly={modal === "view"}
                  placeholder="Deskripsi penyakit"
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-400 bg-slate-50 resize-none"
                />
              </div>

              {/* Textarea Solusi Penanganan */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Solusi Penanganan</label>
                <textarea
                  value={formData.solusi}
                  onChange={(e) => setFormData({ ...formData, solusi: e.target.value })}
                  readOnly={modal === "view"}
                  placeholder="Solusi penanganan"
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-400 bg-slate-50 resize-none"
                />
              </div>
            </div>

            <div className="px-5 py-4 border-t border-slate-100 flex justify-end gap-2">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
                {modal === "view" ? "Tutup" : "Batal"}
              </button>

              {modal !== "view" && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                >
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
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="text-lg font-bold text-slate-800 mb-2">Hapus Penyakit?</h3>
            <p className="text-sm text-slate-500 mb-6">Yakin ingin menghapus penyakit <span className="font-semibold text-slate-700">{selected.nama}</span>? Data yang dihapus tidak bisa dikembalikan.</p>
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
