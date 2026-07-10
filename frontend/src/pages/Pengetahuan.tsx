import { useState, useEffect, useCallback } from "react";
import {
  ChevronRight, Stethoscope, Plus, Edit2, Trash2, X, Check,
  AlertTriangle, Search, BookOpen, RefreshCw, Loader2,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import axios from "axios";
import Swal from "sweetalert2";
import type { Screen } from "../types";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface GejalaItem {
  id: number;
  kode: string;
  nama: string;
  bobot: number;
}

interface PenyakitItem {
  id: number;
  kode: string;
  nama: string;
  deskripsi: string;
  solusi: string;
}

interface Rule {
  kode: string;
  penyakit: PenyakitItem;
  gejala: GejalaItem[];
}

// ─── API BASE ─────────────────────────────────────────────────────────────────
const BASE = "http://127.0.0.1:8000/api";

// ─── PENGETAHUAN PAGE ─────────────────────────────────────────────────────────

interface PengetahuanProps {
  onNav: (s: Screen) => void;
}

export default function Pengetahuan({ onNav }: PengetahuanProps) {
  // ── State: data ──────────────────────────────────────────────────────────
  const [rules, setRules] = useState<Rule[]>([]);
  const [allPenyakit, setAllPenyakit] = useState<PenyakitItem[]>([]);
  const [allGejala, setAllGejala] = useState<GejalaItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ── State: UI ────────────────────────────────────────────────────────────
  const [selected, setSelected] = useState(0);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<null | "add" | "edit" | "delete">(null);
  const [saving, setSaving] = useState(false);
  const [gejalaSearch, setGejalaSearch] = useState("");

  // ── State: form ──────────────────────────────────────────────────────────
  const [formPenyakitId, setFormPenyakitId] = useState<number | "">("");
  const [formGejalaIBayes, setFormGejalaIBayes] = useState<Set<number>>(new Set());

  // ── Fetch ────────────────────────────────────────────────────────────────
  const fetchRules = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get<Rule[]>(`${BASE}/basis-pengetahuan`);
      setRules(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDropdowns = useCallback(async () => {
    try {
      const [p, g] = await Promise.all([
        axios.get<PenyakitItem[]>(`${BASE}/basis-pengetahuan/all-penyakit`),
        axios.get<GejalaItem[]>(`${BASE}/basis-pengetahuan/all-gejala`),
      ]);
      setAllPenyakit(p.data);
      setAllGejala(g.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchRules();
    fetchDropdowns();
  }, [fetchRules, fetchDropdowns]);

  // ── Computed ─────────────────────────────────────────────────────────────
  const filteredRules = rules.filter(
    (r) =>
      r.penyakit.nama.toLowerCase().includes(search.toLowerCase()) ||
      r.penyakit.kode.toLowerCase().includes(search.toLowerCase()) ||
      r.kode.toLowerCase().includes(search.toLowerCase())
  );

  const currentRule = filteredRules[selected] ?? null;

  const filteredGejala = allGejala.filter(
    (g) =>
      g.nama.toLowerCase().includes(gejalaSearch.toLowerCase()) ||
      g.kode.toLowerCase().includes(gejalaSearch.toLowerCase())
  );

  // Penyakit yg belum punya rule (untuk dropdown tambah)
  const usedPenyakitIBayes = new Set(rules.map((r) => r.penyakit.id));
  const availablePenyakit = allPenyakit.filter((p) => !usedPenyakitIBayes.has(p.id));

  // ── Handlers ─────────────────────────────────────────────────────────────
  const openAdd = () => {
    setFormPenyakitId("");
    setFormGejalaIBayes(new Set());
    setGejalaSearch("");
    setModal("add");
  };

  const openEdit = (rule: Rule) => {
    setFormPenyakitId(rule.penyakit.id);
    setFormGejalaIBayes(new Set(rule.gejala.map((g) => g.id)));
    setGejalaSearch("");
    setModal("edit");
  };

  const toggleGejala = (id: number) => {
    setFormGejalaIBayes((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSave = async () => {
    if (!formPenyakitId || formGejalaIBayes.size === 0) {
      alert("Pilih penyakit dan minimal 1 gejala!");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        penyakit_id: formPenyakitId,
        gejala_ids: Array.from(formGejalaIBayes),
      };
      if (modal === "add") {
        await axios.post(`${BASE}/basis-pengetahuan`, payload);
      } else if (modal === "edit" && currentRule) {
        await axios.put(`${BASE}/basis-pengetahuan/${currentRule.penyakit.id}`, payload);
      }
      setModal(null);
      setSelected(0);
      await fetchRules();
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: modal === "add" ? "Data basis pengetahuan berhasil ditambahkan" : "Data basis pengetahuan berhasil diperbarui",
        confirmButtonColor: "#2563EB",
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
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentRule) return;
    setSaving(true);
    try {
      await axios.delete(`${BASE}/basis-pengetahuan/${currentRule.penyakit.id}`);
      setModal(null);
      setSelected(0);
      await fetchRules();
      Swal.fire({
        icon: "success",
        title: "Terhapus!",
        text: "Data basis pengetahuan berhasil dihapus",
        confirmButtonColor: "#2563EB",
      });
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data");
    } finally {
      setSaving(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <AppLayout current="pengetahuan" onNav={onNav} title="Basis Pengetahuan">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-slate-500">Visualisasi rule IF-THEN sistem pakar</p>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-purple-100 text-purple-700 font-semibold px-3 py-1 rounded-full">
            {rules.length} Rule Aktif
          </span>
          <button
            onClick={openAdd}
            disabled={availablePenyakit.length === 0}
            className="flex items-center gap-1.5 bg-[#2563EB] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Rule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* ── Rule List (sidebar kiri) ──────────────────────────────────── */}
        <div className="col-span-1 bg-white rounded-2xl shadow-sm border border-blue-50 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-slate-100 bg-[#EEF4FB]">
            <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-xs font-semibold text-slate-700 mb-2">
              Daftar Rule
            </p>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setSelected(0); }}
                placeholder="Cari rule..."
                className="w-full pl-7 pr-2 py-1.5 text-[11px] bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-50 overflow-y-auto flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-10 text-slate-400">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                <span className="text-xs">Memuat...</span>
              </div>
            ) : filteredRules.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2 text-slate-400">
                <BookOpen className="w-8 h-8 opacity-40" />
                <p className="text-xs text-center">Belum ada rule.<br />Tambahkan rule baru.</p>
              </div>
            ) : (
              filteredRules.map((r, i) => (
                <button
                  key={r.kode + r.penyakit.id}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left px-4 py-3 text-xs transition-colors ${
                    selected === i ? "bg-blue-600 text-white" : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <p className={`font-mono font-bold text-[10px] ${selected === i ? "text-blue-200" : "text-blue-600"}`}>
                    {r.kode}
                  </p>
                  <p className="font-medium mt-0.5 truncate">{r.penyakit.nama.split(" ")[0]}</p>
                  <p className={`text-[10px] mt-0.5 ${selected === i ? "text-blue-200" : "text-slate-400"}`}>
                    {r.gejala.length} gejala
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* ── Visualization Panel (kanan) ───────────────────────────────── */}
        <div className="col-span-3">
          {!currentRule ? (
            <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-10 flex flex-col items-center justify-center gap-3 text-slate-400 h-full min-h-[300px]">
              <BookOpen className="w-12 h-12 opacity-30" />
              <p className="text-sm font-medium">Pilih rule dari daftar atau tambah rule baru</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6">
              {/* Rule header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-purple-100 text-purple-700 font-mono font-bold text-xs px-2.5 py-1 rounded-lg">
                  {currentRule.kode}
                </span>
                <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 flex-1">
                  IF <span className="text-[#0D9488]">Gejala</span> THEN{" "}
                  <span className="text-[#2563EB]">{currentRule.penyakit.nama}</span>
                </h3>
                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(currentRule)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => setModal("delete")}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> Hapus
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-6">
                {/* Gejala column */}
                <div className="flex-1 space-y-2.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Kondisi (IF) — {currentRule.gejala.length} gejala
                  </p>
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {currentRule.gejala.map((g) => (
                      <div key={g.kode} className="relative flex items-center gap-3">
                        <div className="bg-[#EEF4FB] border border-[#0D9488]/20 rounded-xl px-3 py-2.5 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-teal-600 font-bold">{g.kode}</span>
                            <span
                              style={{ fontFamily: "JetBrains Mono, monospace" }}
                              className="text-[10px] text-slate-400"
                            >
                              m={Number(g.bobot).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 font-medium mt-0.5">{g.nama}</p>
                        </div>
                        {/* Connector */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-6 border-t-2 border-dashed border-slate-300" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center gap-2 pt-12">
                  <div className="w-16 h-0.5 bg-gradient-to-r from-slate-300 to-[#2563EB]" />
                  <ChevronRight className="w-6 h-6 text-[#2563EB]" />
                  <span className="text-[10px] text-slate-400 font-semibold">THEN</span>
                </div>

                {/* Disease box */}
                <div className="w-56">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Hasil (THEN)</p>
                  <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-2xl p-4 text-white shadow-lg shadow-blue-200">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                      <Stethoscope className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-mono text-[10px] text-blue-200 font-bold">{currentRule.penyakit.kode}</p>
                    <p
                      style={{ fontFamily: "Poppins, sans-serif" }}
                      className="font-semibold text-sm mt-1 leading-snug"
                    >
                      {currentRule.penyakit.nama}
                    </p>
                    <p className="text-blue-200 text-[10px] mt-2 leading-relaxed">
                      {currentRule.penyakit.deskripsi?.slice(0, 70)}...
                    </p>
                  </div>

                  <div className="mt-3 bg-[#EEF4FB] rounded-xl p-3 border border-blue-100">
                    <p className="text-[10px] font-semibold text-slate-600 mb-1">Solusi:</p>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      {currentRule.penyakit.solusi?.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Modal Tambah / Edit ─────────────────────────────────────────────── */}
      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
              <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800">
                {modal === "add" ? "Tambah Rule Baru" : `Edit Rule — ${currentRule?.penyakit.nama}`}
              </h3>
              <button onClick={() => setModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1 space-y-5">
              {/* Dropdown Penyakit */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Penyakit <span className="text-red-500">*</span>
                </label>
                {modal === "edit" ? (
                  <div className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-100 text-slate-600 font-medium">
                    [{currentRule?.penyakit.kode}] {currentRule?.penyakit.nama}
                  </div>
                ) : (
                  <select
                    value={formPenyakitId}
                    onChange={(e) => setFormPenyakitId(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-400 bg-slate-50"
                  >
                    <option value="">-- Pilih Penyakit --</option>
                    {availablePenyakit.map((p) => (
                      <option key={p.id} value={p.id}>
                        [{p.kode}] {p.nama}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Multi-select Gejala */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-600">
                    Gejala <span className="text-red-500">*</span>
                    <span className="ml-2 text-slate-400 font-normal">({formGejalaIBayes.size} dipilih)</span>
                  </label>
                  {formGejalaIBayes.size > 0 && (
                    <button
                      onClick={() => setFormGejalaIBayes(new Set())}
                      className="text-[10px] text-slate-400 hover:text-red-500 flex items-center gap-1"
                    >
                      <RefreshCw className="w-2.5 h-2.5" /> Reset
                    </button>
                  )}
                </div>

                {/* Search gejala */}
                <div className="relative mb-2">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                  <input
                    type="text"
                    value={gejalaSearch}
                    onChange={(e) => setGejalaSearch(e.target.value)}
                    placeholder="Cari gejala..."
                    className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
                  />
                </div>

                {/* Gejala checkbox list */}
                <div className="grid grid-cols-2 gap-1.5 max-h-64 overflow-y-auto pr-1 border border-slate-100 rounded-xl p-2">
                  {filteredGejala.map((g) => {
                    const checked = formGejalaIBayes.has(g.id);
                    return (
                      <button
                        key={g.id}
                        onClick={() => toggleGejala(g.id)}
                        className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                          checked
                            ? "bg-[#EEF4FB] border-[#2563EB]"
                            : "bg-white border-slate-200 hover:border-blue-300"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-colors ${
                            checked ? "bg-[#2563EB] border-[#2563EB]" : "border-slate-300 bg-white"
                          }`}
                        >
                          {checked && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[9px] text-teal-600 font-bold">{g.kode}</span>
                            <span
                              style={{ fontFamily: "JetBrains Mono, monospace" }}
                              className="text-[9px] text-slate-400"
                            >
                              m={Number(g.bobot).toFixed(2)}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-700 font-medium leading-tight truncate">{g.nama}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-5 py-4 border-t border-slate-100 flex justify-end gap-2 flex-shrink-0">
              <button
                onClick={() => setModal(null)}
                disabled={saving}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !formPenyakitId || formGejalaIBayes.size === 0}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Hapus ──────────────────────────────────────────────────────── */}
      {modal === "delete" && currentRule && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="text-lg font-bold text-slate-800 mb-2">
              Hapus Rule?
            </h3>
            <p className="text-sm text-slate-500 mb-2">
              Yakin ingin menghapus rule untuk penyakit{" "}
              <span className="font-semibold text-slate-700">{currentRule.penyakit.nama}</span>?
            </p>
            <p className="text-xs text-slate-400 mb-6">
              Semua relasi {currentRule.gejala.length} gejala akan dihapus. Data penyakit dan gejala tidak ikut terhapus.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setModal(null)}
                disabled={saving}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors flex-1"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={saving}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors flex-1 shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
