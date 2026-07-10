// ─── BADGE COMPONENT ──────────────────────────────────────────────────────────

interface BadgeProps {
  label: string;
  color: string;
}

export default function Badge({ label, color }: BadgeProps) {
  const map: Record<string, string> = {
    "Sangat Tinggi": "bg-emerald-100 text-emerald-700",
    "Tinggi": "bg-blue-100 text-blue-700",
    "Sedang": "bg-amber-100 text-amber-700",
    "Rendah": "bg-red-100 text-red-700",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${map[label] || color}`}>
      {label}
    </span>
  );
}
