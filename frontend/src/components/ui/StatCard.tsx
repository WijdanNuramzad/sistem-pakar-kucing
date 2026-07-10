// ─── STAT CARD COMPONENT ──────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  sub?: string;
}

export default function StatCard({ icon, label, value, color, sub }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-50 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500 font-medium font-[Inter]">{label}</p>
        <p className="text-2xl font-bold text-slate-800 font-[Poppins]">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
