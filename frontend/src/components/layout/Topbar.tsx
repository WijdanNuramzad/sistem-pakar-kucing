import { useState, useRef, useEffect } from "react";
import { Bell, Search, ChevronDown, Menu, LogOut, Info } from "lucide-react";
import type { Screen } from "../../types";
import { useAuth } from "../../context/AuthContext";

// ─── TOPBAR COMPONENT ─────────────────────────────────────────────────────────

interface TopbarProps {
  title: string;
  onToggleSidebar: () => void;
  onNav: (s: Screen) => void;
}

export default function Topbar({ title, onToggleSidebar, onNav }: TopbarProps) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-14 bg-white border-b border-blue-50 flex items-center px-4 gap-4 flex-shrink-0 shadow-sm print:hidden">
      <button onClick={onToggleSidebar} className="text-slate-400 hover:text-slate-600">
        <Menu className="w-5 h-5" />
      </button>
      <div>
        <h1 style={{ fontFamily: "Poppins, sans-serif" }} className="text-sm font-semibold text-slate-800">{title}</h1>
      </div>
      <div className="flex-1 flex items-center gap-2 max-w-xs ml-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <button className="relative text-slate-400 hover:text-blue-600">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#F97316] rounded-full text-white text-[8px] flex items-center justify-center font-bold">3</span>
        </button>
        
        {user && (
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 py-1 px-2 rounded-lg transition-colors" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-7 h-7 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xs font-bold">{user.name.charAt(0).toUpperCase()}</div>
              <span className="text-xs font-medium text-slate-700 hidden sm:block">{user.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                  <p className="text-xs font-semibold text-slate-800">{user.name}</p>
                  <p className="text-[10px] text-slate-500 capitalize">{user.role}</p>
                </div>
                <button 
                  onClick={() => {
                    setDropdownOpen(false);
                    onNav("tentang");
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                  Tentang Sistem
                </button>
                <button 
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Keluar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
