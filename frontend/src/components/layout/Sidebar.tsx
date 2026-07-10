import { Cat, LogOut } from "lucide-react";
import type { Screen } from "../../types";
import { navItems } from "../../data/mockData";

import { useAuth } from "../../context/AuthContext";

// ─── SIDEBAR COMPONENT ────────────────────────────────────────────────────────

interface SidebarProps {
  current: Screen;
  onNav: (s: Screen) => void;
  collapsed: boolean;
}

export default function Sidebar({ current, onNav, collapsed }: SidebarProps) {
  const { user, logout } = useAuth();
  return (
    <aside
      style={{ fontFamily: "Poppins, sans-serif" }}
      className={`flex flex-col h-full bg-[#1E3A5F] transition-all duration-300 print:hidden ${collapsed ? "w-16" : "w-60"}`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-9 h-9 bg-[#2563EB] rounded-xl flex items-center justify-center flex-shrink-0">
          <Cat className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-white text-xs font-bold leading-tight">Sistem Pakar</p>
            <p className="text-[#93C5FD] text-[10px]">Diagnosa Kucing</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon, adminOnly }) => {
          if (adminOnly && user?.role !== 'admin') return null;
          const active = current === id;
          return (
            <button
              key={id}
              onClick={() => onNav(id as Screen)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150
                ${active
                  ? "bg-[#2563EB] text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-white" : "text-slate-400"}`} />
              {!collapsed && <span className="font-medium">{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User */}
      {!collapsed && user && (
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xs font-bold">{user.name.charAt(0).toUpperCase()}</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{user.name}</p>
              <p className="text-slate-400 text-[10px] capitalize">{user.role}</p>
            </div>
            <button onClick={logout} className="p-1 hover:bg-white/10 rounded transition-colors" title="Logout">
              <LogOut className="w-4 h-4 text-slate-400 hover:text-white" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
