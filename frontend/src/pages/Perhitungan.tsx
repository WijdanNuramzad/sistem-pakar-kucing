import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { Screen } from "../types";

// ─── PERHITUNGAN PAGE ─────────────────────────────────────────────────────────

interface PerhitunganProps {
  onNav: (s: Screen) => void;
}

export default function Perhitungan({ onNav }: PerhitunganProps) {
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

  const { ranking, gejala_dipilih } = resultData;
  const topResult = ranking[0];

  // Helper: get color for kesimpulan
  const getKesimpulanStyle = (k: string) => {
    switch (k) {
      case "Pasti": return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "Hampir Pasti": return "text-blue-700 bg-blue-50 border-blue-200";
      case "Kemungkinan Besar": return "text-amber-700 bg-amber-50 border-amber-200";
      case "Mungkin": return "text-orange-700 bg-orange-50 border-orange-200";
      default: return "text-red-700 bg-red-50 border-red-200";
    }
  };

  return (
    <div className="p-4 md:p-8 flex-1 overflow-y-auto">
      <button onClick={() => onNav("hasil")} className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 mb-2">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Hasil
      </button>

      <div className="space-y-4">
        {/* Header info */}
        <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2563EB] rounded-2xl p-5 text-white">
          <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-lg font-bold mb-1">Metode Teorema Bayes</h2>
          <p className="text-blue-200 text-xs leading-relaxed max-w-2xl">
            Teorema Bayes adalah pendekatan statistik yang digunakan untuk menghitung probabilitas suatu hipotesis (penyakit) berdasarkan 
            probabilitas prior dan probabilitas kondisional (gejala). Probabilitas diperbarui setiap kali ada bukti/gejala baru yang diamati.
          </p>
        </div>

        {/* Formula */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5">
          <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 text-sm mb-4">Formula Probabilitas Bayes</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#EEF4FB] rounded-xl p-4 border border-blue-100">
              <p className="text-xs font-bold text-slate-600 mb-2">Teorema Bayes Dasar</p>
              <div style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-center text-sm font-bold text-[#1E3A5F] leading-relaxed">
                <p>P(H|E) = (P(E|H) × P(H)) / P(E)</p>
                <div className="text-left text-[10px] text-slate-500 mt-3 font-sans font-normal space-y-1">
                  <p><strong>P(H|E)</strong> = Probabilitas penyakit H jika gejala E terjadi</p>
                  <p><strong>P(E|H)</strong> = Nilai bobot gejala pada penyakit H</p>
                  <p><strong>P(H)</strong> = Nilai probabilitas awal (prior)</p>
                </div>
              </div>
            </div>
            <div className="bg-[#EEF4FB] rounded-xl p-4 border border-blue-100">
              <p className="text-xs font-bold text-slate-600 mb-2">Langkah Perhitungan Sistem</p>
              <div style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-center text-sm font-bold text-[#1E3A5F] leading-relaxed">
                <p>Prior P(Hi) = Bobot / Σ Bobot</p>
                <p>Evidence = P(Hi) × Bobot</p>
                <p>Posterior = Evidence / Σ Evidence</p>
                <p>Hasil = Σ (Posterior × Bobot)</p>
                <div className="text-left text-[10px] text-slate-500 mt-3 font-sans font-normal space-y-1">
                  <p>Σ Bobot = Total bobot gejala cocok</p>
                  <p>Hasil = Total suku akhir × 100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Perhitungan Tiap Penyakit */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-5">
          <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="font-semibold text-slate-800 text-sm mb-4">Langkah Perhitungan per Penyakit</h3>
          <div className="space-y-4">
            <div className="text-xs text-slate-600 mb-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <strong>Catatan:</strong> Hanya gejala yang cocok dengan rule penyakit yang dihitung. Penyakit yang tidak memiliki gejala cocok diberi nilai 0%.
            </div>
            
            {ranking.filter((res: any) => res.probabilitas > 0).map((res: any, idx: number) => (
              <div key={res.penyakit_id} className="border border-slate-100 rounded-xl overflow-hidden">
                <div className="bg-[#EEF4FB] px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-[#2563EB] text-white rounded-full flex items-center justify-center text-[10px] font-bold">{idx + 1}</span>
                    <p className="text-xs font-semibold text-slate-700">
                      Hipotesis Penyakit: <span className="text-blue-700 font-bold">{res.nama} ({res.kode})</span>
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-500">Nilai Akhir: <span className="text-[#0D9488]">{res.probabilitas}%</span></span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="text-slate-500 bg-slate-50">
                        <th className="text-left py-2 px-3 font-semibold border-b">No</th>
                        <th className="text-left py-2 px-3 font-semibold border-b">Kode Gejala</th>
                        <th className="text-center py-2 px-3 font-semibold border-b">Bobot Pakar (B)</th>
                        <th className="text-center py-2 px-3 font-semibold border-b">Prior P(Hi)</th>
                        <th className="text-center py-2 px-3 font-semibold border-b">Evidence (D)</th>
                        <th className="text-center py-2 px-3 font-semibold border-b">Posterior P(Hi|E)</th>
                        <th className="text-center py-2 px-3 font-semibold border-b">Suku Akhir</th>
                      </tr>
                    </thead>
                    <tbody>
                      {res.detail_gejala.map((dg: any, index: number) => {
                        const gejalaInfo = gejala_dipilih.find((g: any) => g.id === dg.gejala_id);
                        return (
                          <tr key={index} className="border-b border-slate-50 last:border-0">
                            <td className="py-2 px-3 text-slate-500">{index + 1}</td>
                            <td className="py-2 px-3 text-slate-700">
                              <span className="font-mono font-bold text-teal-600 mr-2">{gejalaInfo?.kode}</span>
                              {gejalaInfo?.nama}
                            </td>
                            <td className="py-2 px-3 text-center">
                              <span style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-[#2563EB]">{dg.bobot}</span>
                            </td>
                            <td className="py-2 px-3 text-center">
                              <span style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-slate-700">{dg.prior.toFixed(4)}</span>
                            </td>
                            <td className="py-2 px-3 text-center">
                              <span style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-slate-700">{dg.likelihood.toFixed(4)}</span>
                            </td>
                            <td className="py-2 px-3 text-center">
                              <span style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-slate-700">{dg.posterior.toFixed(4)}</span>
                            </td>
                            <td className="py-2 px-3 text-center">
                              <span style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-slate-700">{dg.suku_akhir.toFixed(4)}</span>
                            </td>
                          </tr>
                        );
                      })}
                      {/* Total row */}
                      <tr className="bg-slate-50/50 font-semibold">
                        <td className="py-2 px-3 border-t" colSpan={2}>
                          <span className="text-slate-700">TOTAL</span>
                        </td>
                        <td className="py-2 px-3 text-center border-t">
                          <span style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-slate-800">{res.total_bobot.toFixed(1)}</span>
                        </td>
                        <td className="py-2 px-3 text-center border-t">
                          <span style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-slate-800">1.0000</span>
                        </td>
                        <td className="py-2 px-3 text-center border-t">
                          <span style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-slate-800">{res.total_evidence.toFixed(4)}</span>
                        </td>
                        <td className="py-2 px-3 text-center border-t">
                          <span style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-slate-800">1.0000</span>
                        </td>
                        <td className="py-2 px-3 text-center border-t">
                          <span style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-slate-800 font-bold">{res.total_suku_akhir.toFixed(4)}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  
                  {/* Hasil & Kesimpulan */}
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Hasil Persentase:</span>
                      <span style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-sm font-bold text-[#0D9488]">{res.probabilitas}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Kesimpulan Aturan:</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${getKesimpulanStyle(res.kesimpulan)}`}>
                        {res.kesimpulan}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final result */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-200 text-xs mb-1">Hasil Akhir - Probabilitas Tertinggi</p>
              <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="text-xl font-bold">{topResult.nama} ({topResult.kode})</h3>
              <p className="text-emerald-200 text-xs mt-1">
                Kesimpulan: <span className="text-white font-bold">{topResult.kesimpulan}</span> — dari {ranking.filter((r: any) => r.probabilitas > 0).length} penyakit yang memiliki gejala cocok.
              </p>
            </div>
            <div className="text-right">
              <p style={{ fontFamily: "JetBrains Mono, monospace" }} className="text-4xl font-bold">{topResult.probabilitas}%</p>
              <p className="text-emerald-200 text-sm">Probabilitas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
