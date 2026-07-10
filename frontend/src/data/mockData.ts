import type { Disease, Gejala, RiwayatItem } from "../types";

// ─── PENYAKIT ─────────────────────────────────────────────────────────────────
export const diseases: Disease[] = [
  { kode: "PK01", nama: "Flu Kucing (Feline Rhinotracheitis/Calicivirus)", desc: "Flu Kucing", solusi: "-" },
  { kode: "PK02", nama: "Scabies (Kudis)", desc: "Scabies", solusi: "-" },
  { kode: "PK03", nama: "Cacingan", desc: "Cacingan", solusi: "-" },
  { kode: "PK04", nama: "Panleukopenia (Distemper Kucing)", desc: "Panleukopenia", solusi: "-" },
  { kode: "PK05", nama: "Ringworm (Jamur Kulit)", desc: "Ringworm", solusi: "-" },
  { kode: "PK06", nama: "Otitis (Infeksi Telinga)", desc: "Otitis", solusi: "-" },
  { kode: "PK07", nama: "FLUTD (Infeksi Saluran Kemih)", desc: "FLUTD", solusi: "-" },
  { kode: "PK08", nama: "Ear Mites (Kutu Telinga)", desc: "Ear Mites", solusi: "-" },
  { kode: "PK09", nama: "Konjungtivitis (Infeksi Mata)", desc: "Konjungtivitis", solusi: "-" },
  { kode: "PK10", nama: "Feline Infectious Peritonitis (FIP)", desc: "FIP", solusi: "-" },
  { kode: "PK11", nama: "Flea (Kutu Badan)", desc: "Flea", solusi: "-" },
  { kode: "PK12", nama: "Feline Leukemia Virus", desc: "Feline Leukemia Virus", solusi: "-" },
  { kode: "PK13", nama: "Jamur Cryptococus", desc: "Jamur Cryptococus", solusi: "-" },
];

// ─── GEJALA ───────────────────────────────────────────────────────────────────
export const gejala: Gejala[] = [
  { kode: "GJ01", nama: "Bersin-bersin", bobot: 0.6 },
  { kode: "GJ02", nama: "Demam", bobot: 0.3 },
  { kode: "GJ03", nama: "Keluar ingus / Pilek", bobot: 0.7 },
  { kode: "GJ04", nama: "Radang mata / Peradangan selaput lendir", bobot: 0.8 },
  { kode: "GJ05", nama: "Mata berair / Belekan", bobot: 0.6 },
  { kode: "GJ06", nama: "Tidak mau makan / Nafsu makan turun", bobot: 0.6 },
  { kode: "GJ07", nama: "Dehidrasi", bobot: 0.4 },
  { kode: "GJ08", nama: "Air ludah yang berlebihan (Ngeces)", bobot: 0.6 },
  { kode: "GJ09", nama: "Sesak nafas", bobot: 0.4 },
  { kode: "GJ10", nama: "Batuk-batuk", bobot: 0.3 },
  { kode: "GJ11", nama: "Perut membesar / Buncit", bobot: 0.7 },
  { kode: "GJ12", nama: "Depresi / Murung", bobot: 0.5 },
  { kode: "GJ13", nama: "Terlihat seperti sakit kuning (Jaundice)", bobot: 0.9 },
  { kode: "GJ14", nama: "Berat badan menurun / Kurus walau banyak makan", bobot: 0.7 },
  { kode: "GJ15", nama: "Lemas", bobot: 0.6 },
  { kode: "GJ16", nama: "Muntah (cairan atau makanan)", bobot: 0.6 },
  { kode: "GJ17", nama: "Diare cair / Diare", bobot: 0.8 },
  { kode: "GJ18", nama: "Keluar cacing pada kotoran / Muntah cacing", bobot: 0.9 },
  { kode: "GJ19", nama: "Diare berdarah", bobot: 0.7 },
  { kode: "GJ20", nama: "Diare bau amis", bobot: 0.6 },
  { kode: "GJ21", nama: "Bulu kusam", bobot: 0.5 },
  { kode: "GJ22", nama: "Gatal-gatal", bobot: 0.7 },
  { kode: "GJ23", nama: "Keropeng di daerah telinga, kaki, dan muka", bobot: 0.7 },
  { kode: "GJ24", nama: "Bulu rontok / Pitak melingkar", bobot: 0.7 },
  { kode: "GJ25", nama: "Kulit ketombe", bobot: 0.7 },
  { kode: "GJ26", nama: "Kemerahan di kulit", bobot: 0.5 },
  { kode: "GJ27", nama: "Telinga sakit", bobot: 0.6 },
  { kode: "GJ28", nama: "Keluar nanah/cairan dari telinga", bobot: 0.8 },
  { kode: "GJ29", nama: "Bau busuk dari telinga", bobot: 0.7 },
  { kode: "GJ30", nama: "Pipis tidak lancar / Tidak bisa pipis", bobot: 0.8 },
  { kode: "GJ31", nama: "Sering bolak-balik ke litter box", bobot: 0.5 },
  { kode: "GJ32", nama: "Pipis berdarah", bobot: 0.8 },
  { kode: "GJ33", nama: "Sering garuk-garuk telinga", bobot: 0.6 },
  { kode: "GJ34", nama: "Kotoran telinga seperti serbuk hitam/coklat", bobot: 0.7 },
  { kode: "GJ35", nama: "Anemia (Pucat)", bobot: 0.9 },
  { kode: "GJ36", nama: "Bengkak pada kelenjar limpa / getah bening", bobot: 0.7 },
  { kode: "GJ37", nama: "Hidung bengkak dan luka", bobot: 0.7 },
  { kode: "GJ38", nama: "Pengelupasan kulit sekitar wajah dan kepala", bobot: 0.8 },
  { kode: "GJ39", nama: "Gangguan saraf mata (Buta mendadak)", bobot: 0.8 },
];

// ─── RIWAYAT ──────────────────────────────────────────────────────────────────
export const riwayat: RiwayatItem[] = [
  { id: 1, tgl: "2024-06-20", pemilik: "Budi Santoso", kucing: "Mochi", hasil: "Flu Kucing", persen: 89, status: "Sangat Tinggi" },
  { id: 2, tgl: "2024-06-19", pemilik: "Siti Rahayu", kucing: "Oreo", hasil: "Konjungtivitis", persen: 72, status: "Tinggi" },
  { id: 3, tgl: "2024-06-18", pemilik: "Ahmad Fauzi", kucing: "Luna", hasil: "Scabies", persen: 81, status: "Sangat Tinggi" },
  { id: 4, tgl: "2024-06-17", pemilik: "Dewi Lestari", kucing: "Kitty", hasil: "Otitis", persen: 65, status: "Sedang" },
  { id: 5, tgl: "2024-06-16", pemilik: "Rizky Pratama", kucing: "Nemo", hasil: "FIP", persen: 41, status: "Sedang" },
  { id: 6, tgl: "2024-06-15", pemilik: "Indah Permata", kucing: "Snowball", hasil: "Panleukopenia", persen: 93, status: "Sangat Tinggi" },
  { id: 7, tgl: "2024-06-14", pemilik: "Wahyu Nugroho", kucing: "Tiger", hasil: "Ringworm", persen: 78, status: "Tinggi" },
];

// ─── CHART DATA ───────────────────────────────────────────────────────────────
export const monthlyData = [
  { bulan: "Jan", jumlah: 12 }, { bulan: "Feb", jumlah: 18 }, { bulan: "Mar", jumlah: 15 },
  { bulan: "Apr", jumlah: 24 }, { bulan: "Mei", jumlah: 21 }, { bulan: "Jun", jumlah: 28 },
];

export const diseaseFreq = [
  { nama: "Flu Kucing", count: 28 }, { nama: "Konjungtivitis", count: 22 },
  { nama: "Scabies", count: 19 }, { nama: "Otitis", count: 17 },
  { nama: "Ringworm", count: 14 }, { nama: "FIP", count: 8 },
];

export const PIE_COLORS = ["#2563EB", "#0D9488", "#F97316", "#8B5CF6", "#EC4899", "#EF4444"];

// ─── RANKING DATA ─────────────────────────────────────────────────────────────
export const rankingData = [
  { rank: 1, nama: "Flu Kucing", kode: "PK01", persen: 89, color: "#2563EB" },
  { rank: 2, nama: "Konjungtivitis", kode: "PK09", persen: 72, color: "#0D9488" },
  { rank: 3, nama: "FIP", kode: "PK10", persen: 41, color: "#8B5CF6" },
  { rank: 4, nama: "Scabies", kode: "PK02", persen: 18, color: "#F97316" },
  { rank: 5, nama: "Otitis", kode: "PK06", persen: 12, color: "#EC4899" },
];

// ─── RULES (BASIS PENGETAHUAN) ────────────────────────────────────────────────
export const rules = [
  { kode: "R01", penyakit: diseases.find(d => d.kode === "PK01")!, gejala: ["GJ01", "GJ02", "GJ03", "GJ04", "GJ05", "GJ06", "GJ07", "GJ08", "GJ09", "GJ10"].map(k => gejala.find(g => g.kode === k)!) },
  { kode: "R02", penyakit: diseases.find(d => d.kode === "PK02")!, gejala: ["GJ22", "GJ23"].map(k => gejala.find(g => g.kode === k)!) },
  { kode: "R03", penyakit: diseases.find(d => d.kode === "PK03")!, gejala: ["GJ18", "GJ19", "GJ14", "GJ11", "GJ05", "GJ21", "GJ24"].map(k => gejala.find(g => g.kode === k)!) },
  { kode: "R04", penyakit: diseases.find(d => d.kode === "PK04")!, gejala: ["GJ12", "GJ15", "GJ06", "GJ16", "GJ17", "GJ19", "GJ20", "GJ08", "GJ10"].map(k => gejala.find(g => g.kode === k)!) },
  { kode: "R05", penyakit: diseases.find(d => d.kode === "PK05")!, gejala: ["GJ24", "GJ25", "GJ22", "GJ26"].map(k => gejala.find(g => g.kode === k)!) },
  { kode: "R06", penyakit: diseases.find(d => d.kode === "PK06")!, gejala: ["GJ27", "GJ28", "GJ29"].map(k => gejala.find(g => g.kode === k)!) },
  { kode: "R07", penyakit: diseases.find(d => d.kode === "PK07")!, gejala: ["GJ30", "GJ31", "GJ32"].map(k => gejala.find(g => g.kode === k)!) },
  { kode: "R08", penyakit: diseases.find(d => d.kode === "PK08")!, gejala: ["GJ33", "GJ34", "GJ27"].map(k => gejala.find(g => g.kode === k)!) },
  { kode: "R09", penyakit: diseases.find(d => d.kode === "PK09")!, gejala: ["GJ05", "GJ04"].map(k => gejala.find(g => g.kode === k)!) },
  { kode: "R10", penyakit: diseases.find(d => d.kode === "PK10")!, gejala: ["GJ11", "GJ12", "GJ13", "GJ14", "GJ21"].map(k => gejala.find(g => g.kode === k)!) },
  { kode: "R11", penyakit: diseases.find(d => d.kode === "PK11")!, gejala: ["GJ22", "GJ24", "GJ26"].map(k => gejala.find(g => g.kode === k)!) },
  { kode: "R12", penyakit: diseases.find(d => d.kode === "PK12")!, gejala: ["GJ02", "GJ35", "GJ36"].map(k => gejala.find(g => g.kode === k)!) },
  { kode: "R13", penyakit: diseases.find(d => d.kode === "PK13")!, gejala: ["GJ37", "GJ03", "GJ38", "GJ36", "GJ39"].map(k => gejala.find(g => g.kode === k)!) },
];

// ─── NAV ITEMS (dipakai Sidebar) ──────────────────────────────────────────────
import {
  LayoutDashboard, Database, List, BookOpen, Stethoscope,
  ClipboardList, FileText, Info,
} from "lucide-react";

export const navItems = [
  { id: "dashboard",   label: "Dashboard",         icon: LayoutDashboard },
  { id: "penyakit",    label: "Data Penyakit",      icon: Database, adminOnly: true },
  { id: "gejala",      label: "Data Gejala",        icon: List, adminOnly: true },
  { id: "pengetahuan", label: "Basis Pengetahuan",  icon: BookOpen, adminOnly: true },
  { id: "diagnosa",    label: "Diagnosa",           icon: Stethoscope },
  { id: "riwayat",     label: "Riwayat Diagnosa",   icon: ClipboardList },
  { id: "laporan",     label: "Laporan",            icon: FileText },
  { id: "tentang",     label: "Tentang Sistem",     icon: Info },
];
