import { Link } from "react-router";
import { ArrowRight, Stethoscope, Search, ShieldCheck, Clock } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="relative bg-[#1E3A5F] overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold tracking-wide uppercase mb-6 border border-blue-400/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Sistem Pakar Berbasis Web
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                Kenali Kondisi Kucing Anda dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Cepat & Akurat</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Mendiagnosa penyakit pada kucing kini lebih mudah. Jawab beberapa pertanyaan tentang gejala yang dialami kucing Anda, dan sistem cerdas kami akan memberikan hasil diagnosa awal seketika.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/diagnosa"
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-blue-900 bg-white rounded-full shadow-lg shadow-blue-900/20 hover:bg-blue-50 transition-all gap-2 transform hover:-translate-y-0.5"
                >
                  <Stethoscope className="w-5 h-5" />
                  Mulai Diagnosa Gratis
                </Link>
                <Link
                  to="/kamus-penyakit"
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-blue-600/30 border border-blue-400/30 rounded-full hover:bg-blue-600/50 transition-all gap-2"
                >
                  <Search className="w-5 h-5" />
                  Pelajari Penyakit
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto w-full max-w-lg lg:max-w-xl">
                {/* Image Decoration */}
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-blue-400 to-teal-300 rounded-[2.5rem] blur opacity-40"></div>
                <div className="relative bg-[#1A3152] rounded-[2rem] p-2 border border-white/10 shadow-2xl">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-teal-500 rounded-3xl -z-10 animate-bounce" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600 rounded-full -z-10"></div>
                  
                  {/* Substitute realistic cat image with illustrative div for now */}
                  <div className="aspect-[4/3] rounded-[1.75rem] bg-gradient-to-br from-slate-800 to-[#0F172A] overflow-hidden relative flex items-center justify-center">
                    <CatIllustration />
                    
                    {/* Floating Cards */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/50 flex items-center gap-3 animate-float" style={{ animationDelay: '1s' }}>
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-semibold uppercase">Tingkat Akurasi</p>
                        <p className="text-sm font-bold text-slate-800">Tinggi</p>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/50 flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
                       <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 font-semibold uppercase">Waktu Proses</p>
                        <p className="text-sm font-bold text-slate-800">{'< 1 Menit'}</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Cara Kerja</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              Tiga Langkah Mudah Mendiagnosa
            </h3>
            <p className="text-slate-600 text-lg">
              Sistem kami menggunakan metode Forward Chaining dan Teorema Bayes untuk memberikan hasil perhitungan yang mendekati pakar asli.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard 
              number="01"
              title="Pilih Gejala"
              desc="Pilih gejala-gejala klinis yang sedang ditunjukkan atau dialami oleh kucing peliharaan Anda dari daftar yang tersedia."
              icon={<Search className="w-6 h-6 text-blue-600" />}
            />
            <FeatureCard 
              number="02"
              title="Sistem Memproses"
              desc="Algoritma cerdas kami akan menganalisis kecocokan gejala dengan basis pengetahuan penyakit yang dirancang oleh pakar."
              icon={<ShieldCheck className="w-6 h-6 text-blue-600" />}
            />
            <FeatureCard 
              number="03"
              title="Terima Hasil"
              desc="Dapatkan hasil prediksi penyakit, persentase kepastian, dan saran penanganan awal yang dapat diunduh (PDF)."
              icon={<Stethoscope className="w-6 h-6 text-blue-600" />}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-400 opacity-20"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
                Kesehatan Kucing Anda Adalah Prioritas
              </h2>
              <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                Jangan tunggu sampai gejala memburuk. Lakukan deteksi dini sekarang juga secara gratis. Anda dapat menyimpan riwayat diagnosa dengan mendaftar akun.
              </p>
              <Link
                to="/diagnosa"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-blue-700 bg-white hover:bg-slate-50 rounded-full transition-colors shadow-lg"
              >
                Mulai Diagnosa Sekarang <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ number, title, desc, icon }: { number: string, title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="relative p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 group">
      <div className="absolute top-6 right-6 text-5xl font-extrabold text-slate-50 group-hover:text-blue-50 transition-colors">
        {number}
      </div>
      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-slate-800 mb-3 relative z-10">{title}</h4>
      <p className="text-slate-600 relative z-10 leading-relaxed">{desc}</p>
    </div>
  );
}

function CatIllustration() {
  return (
    <svg width="240" height="240" viewBox="0 0 160 120" fill="none">
      <ellipse cx="80" cy="90" rx="50" ry="18" fill="white" fillOpacity="0.03" />
      <circle cx="80" cy="60" r="32" fill="#38BDF8" fillOpacity="0.8" />
      <path d="M55 48 L62 30 L70 46" fill="#0EA5E9" />
      <path d="M105 48 L98 30 L90 46" fill="#0EA5E9" />
      <circle cx="80" cy="62" r="26" fill="#E0F2FE" />
      <circle cx="72" cy="58" r="4" fill="#0F172A" />
      <circle cx="88" cy="58" r="4" fill="#0F172A" />
      <circle cx="73" cy="59" r="1.5" fill="white" />
      <circle cx="89" cy="59" r="1.5" fill="white" />
      <path d="M76 66 Q80 70 84 66" stroke="#0F172A" strokeWidth="1.5" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
      <line x1="60" y1="66" x2="50" y2="64" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" />
      <line x1="60" y1="68" x2="50" y2="68" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" />
      <line x1="100" y1="66" x2="110" y2="64" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" />
      <line x1="100" y1="68" x2="110" y2="68" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" />
    </svg>
  );
}
