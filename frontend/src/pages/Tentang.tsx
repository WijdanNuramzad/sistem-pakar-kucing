import { Cat, Info } from "lucide-react";

export default function TentangPage() {
  return (
    <div className="p-4 md:p-8 flex-1 overflow-y-auto w-full h-full bg-[#EEF4FB]">
      <div className="space-y-4 max-w-6xl mx-auto">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2563EB] rounded-2xl p-8 text-white">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
              <Cat className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="text-3xl font-bold mb-2"
              >
                Sistem Pakar Diagnosa Kucing
              </h2>
              <p className="text-blue-200 text-sm max-w-2xl leading-relaxed">
                Aplikasi berbasis web untuk mendiagnosis penyakit pada kucing
                berdasarkan gejala yang dialami menggunakan metode{" "}
                <strong className="text-white font-semibold">
                  Teorema Bayes
                </strong>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-50">
              <h3
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="font-semibold text-slate-800 text-lg mb-4 flex items-center gap-2"
              >
                <Info className="w-5 h-5 text-[#2563EB]" /> Tentang Teorema
                Bayes
              </h3>
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                  Teorema Bayes adalah metode probabilistik yang digunakan untuk
                  menghitung probabilitas sebuah hipotesis berdasarkan evidence
                  (bukti) yang ada. Dalam konteks sistem ini:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-slate-800">Hipotesis (H)</strong>:
                    Jenis penyakit kucing yang mungkin diderita.
                  </li>
                  <li>
                    <strong className="text-slate-800">Evidence (E)</strong>:
                    Gejala-gejala klinis yang diamati oleh pemilik kucing.
                  </li>
                </ul>
                <div className="bg-[#EEF4FB] p-4 rounded-xl border border-blue-100 font-mono text-xs text-center">
                  <p className="font-bold text-[#1E3A5F] mb-2 text-sm">
                    P(H|E) = [ P(E|H) × P(H) ] / P(E)
                  </p>
                  <p className="text-slate-500">
                    P(E) = Σ [ P(H_i) × P(E|H_i) ]
                  </p>
                </div>
                <p>
                  Sistem menggabungkan nilai bobot probabilitas dari setiap
                  gejala yang dipilih pengguna (berdasarkan data pakar) untuk
                  menghasilkan persentase kepastian (confidence) dari penyakit
                  tersebut.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-50">
              <h3
                style={{ fontFamily: "Poppins, sans-serif" }}
                className="font-semibold text-slate-800 text-sm mb-4"
              >
                Pengembang
              </h3>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img
                    src="https://i.pravatar.cc/150?img=33"
                    alt="Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Dimas N</p>
                  <p className="text-xs text-slate-500">Fullstack Developer</p>
                </div>
              </div>

              <h4 className="font-semibold text-slate-800 text-xs mb-3 border-b border-slate-100 pb-2">
                Referensi Pakar & Jurnal
              </h4>
              <div className="space-y-3">
                {[
                  {
                    title:
                      "Sistem Pakar Diagnosa Penyakit Kucing Menggunakan Teorema Bayes",
                    author: "A. Rahman, dkk",
                    year: "2021",
                    journal: "Jurnal Informatika",
                  },
                  {
                    title:
                      "Penerapan Metode Bayes Pada Sistem Pakar Hewan Peliharaan",
                    author: "S. Widodo",
                    year: "2020",
                    journal: "Jurnal Teknologi Terapan",
                  },
                ].map((r) => (
                  <div
                    key={r.title}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <p className="text-[11px] font-semibold text-slate-800 leading-tight">
                      {r.title}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {r.author} ({r.year})
                    </p>
                    <p className="text-[10px] text-[#2563EB] mt-0.5 italic">
                      {r.journal}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1E3A5F] rounded-2xl p-5 text-white">
              <p className="text-xs font-semibold text-blue-200 mb-2">
                Teknologi yang Digunakan
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "React.js",
                  "PHP Laravel",
                  "MySQL",
                  "Tailwind CSS",
                  "Recharts",
                  "Dompdf",
                ].map((t) => (
                  <span
                    key={t}
                    className="bg-white/15 text-white text-[10px] font-semibold px-2 py-1 rounded-lg"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
