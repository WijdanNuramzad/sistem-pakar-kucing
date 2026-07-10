// ─── SHARED TYPES ─────────────────────────────────────────────────────────────

export type Screen =
  | "login" | "dashboard" | "penyakit" | "gejala" | "pengetahuan"
  | "diagnosa" | "hasil" | "perhitungan" | "ranking" | "riwayat"
  | "laporan" | "tentang" | "cetak-hasil";

export interface Disease {
  kode: string;
  nama: string;
  desc: string;
  solusi: string;
}

export interface Gejala {
  kode: string;
  nama: string;
  bobot: number;
}

export interface RiwayatItem {
  id: number;
  tgl: string;
  pemilik: string;
  kucing: string;
  hasil: string;
  persen: number;
  status: string;
}
