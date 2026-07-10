import { useState, useEffect } from "react";
import axios from "axios";
import { Search, ChevronDown, ChevronUp, BookOpen, AlertCircle } from "lucide-react";

export default function KamusPenyakit() {
  const [penyakit, setPenyakit] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api-pakarkucing.kesug.com/api/penyakit");
        setPenyakit(res.data);
      } catch (err) {
        console.error("Gagal mengambil data penyakit");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = penyakit.filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase()) ||
    p.kode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-full py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Kamus Penyakit Kucing</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Edukasi mengenai berbagai penyakit yang sering menyerang kucing. Kenali gejala, penyebab, dan cara penanganannya secara tepat.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari penyakit (misal: Scabies, Feline...)"
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all shadow-sm"
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-medium">Memuat data kamus...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium">Penyakit tidak ditemukan.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div 
                  key={item.id} 
                  className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-blue-200 shadow-md' : 'border-slate-200 shadow-sm hover:border-blue-200'}`}
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0">
                        {item.kode}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">{item.nama}</h3>
                      </div>
                    </div>
                    <div className="shrink-0 text-slate-400 ml-4">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out origin-top overflow-hidden ${
                      isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-5 pt-0 border-t border-slate-100 mt-2 bg-slate-50/50">
                      <div className="mt-4">
                        <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          Detail / Deskripsi
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                          {item.deskripsi || "Belum ada deskripsi untuk penyakit ini."}
                        </p>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                          Saran Penanganan
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-lg border border-slate-100 shadow-sm whitespace-pre-line">
                          {item.saran || "Belum ada saran penanganan untuk penyakit ini."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
