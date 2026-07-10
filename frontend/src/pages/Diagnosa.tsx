import { useState, useEffect } from "react";
import { User, List, Stethoscope, RefreshCw, Check, AlertTriangle, Loader2 } from "lucide-react";
import axios from "axios";
import type { Screen } from "../types";

// ─── DIAGNOSA PAGE ────────────────────────────────────────────────────────────

interface Gejala {
  id: number;
  kode: string;
  nama: string;
  bobot: number;
}

interface DiagnosaProps {
  onNav: (s: Screen) => void;
}

export default function Diagnosa({ onNav }: DiagnosaProps) {
  const [form, setForm] = useState({ pemilik: "", kucing: "", umur: "", kelamin: "Jantan" });
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [gejalaList, setGejalaList] = useState<Gejala[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchGejala = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/gejala");
        setGejalaList(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    };
    fetchGejala();
  }, []);

  const toggle = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleProsesDiagnosa = async () => {
    if (!form.pemilik || !form.kucing) {
      alert("Nama pemilik dan kucing wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        nama_pemilik: form.pemilik,
        nama_kucing: form.kucing,
        umur_kucing: form.umur,
        jenis_kelamin: form.kelamin,
        gejala_ids: Array.from(selected)
      };

      const res = await axios.post("http://127.0.0.1:8000/api/diagnosa", payload);
      
      // Simpan hasil ke sessionStorage untuk diakses oleh Hasil, Perhitungan, dll
      sessionStorage.setItem("diagnosa_result", JSON.stringify(res.data));
      sessionStorage.setItem("diagnosa_form", JSON.stringify(form));
      
      setShowSuccess(true);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Gagal memproses diagnosa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 flex-1 overflow-y-auto">
      <div className="grid grid-cols-3 gap-4">
        {/* Form data */}
        <div className="col-span-1 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5">
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 text-sm mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-[#2563EB]" /> Data Pemilik & Kucing
            </h3>
            <div className="space-y-3">
              {[
                { label: "Nama Pemilik", key: "pemilik", ph: "Nama lengkap pemilik" },
                { label: "Nama Kucing", key: "kucing", ph: "Nama kucing" },
                { label: "Umur Kucing", key: "umur", ph: "Contoh: 2 tahun" },
              ].map(({ label, key, ph }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{label} <span className={key === 'umur' ? 'hidden' : 'text-red-500'}>*</span></label>
                  <input
                    type="text"
                    value={(form as any)[key]}
                    onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={ph}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-400 bg-slate-50"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Jenis Kelamin</label>
                <div className="flex gap-2">
                  {["Jantan", "Betina"].map(g => (
                    <button
                      key={g}
                      onClick={() => setForm(prev => ({ ...prev, kelamin: g }))}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-colors
                        ${form.kelamin === g ? "bg-[#2563EB] text-white border-[#2563EB]" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300"}`}
                    >{g}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5">
            <p style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 text-sm mb-3">Progres Pemilihan</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Gejala dipilih</span>
                <span className="font-bold text-[#2563EB]">{selected.size} / {gejalaList.length || 0}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="h-2 rounded-full bg-[#2563EB] transition-all" style={{ width: `${gejalaList.length ? (selected.size / gejalaList.length) * 100 : 0}%` }} />
              </div>
              {selected.size < 3 && (
                <p className="text-[10px] text-amber-600 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Pilih minimal 3 gejala
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Gejala checklist */}
        <div className="col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5 flex flex-col h-full">
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 text-sm mb-4 flex items-center gap-2">
              <List className="w-4 h-4 text-[#0D9488]" /> Silahkan Pilih Gejala yang Dialami
              <span className="ml-auto text-xs text-slate-400 font-normal">{selected.size} dipilih</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto pr-1 min-h-[400px] content-start">
              {loadingData ? (
                <div className="col-span-2 flex justify-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin text-[#2563EB]" />
                </div>
              ) : (
                gejalaList.map(g => {
                  const checked = selected.has(g.id);
                  return (
                    <button
                      key={g.id}
                      onClick={() => toggle(g.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all
                        ${checked
                          ? "bg-[#EEF4FB] border-[#2563EB] shadow-sm"
                          : "bg-slate-50 border-slate-200 hover:border-blue-300"}`}
                    >
                      <div className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-colors
                        ${checked ? "bg-[#2563EB] border-[#2563EB]" : "border-slate-300 bg-white"}`}>
                        {checked && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] text-teal-600 font-bold">{g.kode}</span>
                          <span style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-[9px] text-slate-400">m={Number(g.bobot).toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium mt-0.5 leading-tight">{g.nama}</p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-5 pt-4 border-t border-slate-100 flex-shrink-0">
              <button
                onClick={() => setSelected(new Set())}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset
              </button>
              <button
                disabled={selected.size < 3 || loading}
                onClick={handleProsesDiagnosa}
                className="flex-1 flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold py-2.5 rounded-xl transition-colors shadow-md shadow-blue-200"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Stethoscope className="w-3.5 h-3.5" />} 
                {loading ? "Memproses..." : "Proses Diagnosa"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Berhasil */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="text-lg font-bold text-slate-800 mb-2">Diagnosa Berhasil</h3>
            <p className="text-sm text-slate-500 mb-6">Sistem telah selesai memproses data gejala untuk kucing <span className="font-semibold text-slate-700">{form.kucing}</span>.</p>
            <div className="flex justify-center">
              <button onClick={() => { setShowSuccess(false); onNav("hasil"); }} className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors w-full shadow-lg shadow-emerald-500/30">
                Lihat Hasil Diagnosa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
