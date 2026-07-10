import { useState, useRef, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Cat, Menu, X, ChevronDown, LogOut, FileText, UserCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function UserLayout() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Mulai Diagnosa", path: "/diagnosa" },
    { name: "Kamus Penyakit", path: "/kamus-penyakit" },
    { name: "Tentang", path: "/tentang" },
  ];

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Cat className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-bold leading-tight text-blue-900" style={{ fontFamily: "Poppins, sans-serif" }}>Sistem Pakar</h1>
                  <p className="text-[10px] font-medium text-blue-600">Diagnosa Kucing</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-medium transition-colors ${
                      isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* User Action / Login Button */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <div 
                    className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 py-1.5 px-3 rounded-full transition-colors border border-slate-200" 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-medium text-slate-700 max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  </div>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50">
                      <div className="px-4 py-3 border-b border-slate-50 mb-1">
                        <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-500 capitalize">{user.role}</p>
                      </div>
                      
                      {user.role === 'admin' && (
                         <Link 
                           to="/dashboard"
                           className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                         >
                           <UserCircle className="w-4 h-4" />
                           Dashboard Admin
                         </Link>
                      )}

                      <Link 
                        to="/riwayat"
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        Riwayat Diagnosa
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded-full transition-colors shadow-sm shadow-blue-200">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-500 hover:text-blue-600 p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-3 py-3 rounded-md text-base font-medium ${
                      isActive ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="mt-6 pt-6 border-t border-slate-100">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                      </div>
                    </div>
                    {user.role === 'admin' && (
                      <Link to="/dashboard" className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">
                        <UserCircle className="w-5 h-5 text-slate-400" />
                        Dashboard Admin
                      </Link>
                    )}
                    <Link to="/riwayat" className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50">
                      <FileText className="w-5 h-5 text-slate-400" />
                      Riwayat Diagnosa
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50 text-left">
                      <LogOut className="w-5 h-5" />
                      Keluar
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="block w-full text-center bg-blue-600 text-white font-medium py-3 rounded-lg shadow-sm">
                    Login / Daftar
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content using Outlet */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start mb-6 md:mb-0">
              <div className="flex items-center gap-2 opacity-80">
                <Cat className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">Sistem Pakar Diagnosa Kucing</span>
              </div>
            </div>
            
            <div className="flex justify-center gap-6 md:gap-8 mb-6 md:mb-0 text-sm text-slate-500">
              <Link to="/tentang" className="hover:text-blue-600 transition-colors">Tentang Sistem</Link>
              <Link to="/kamus-penyakit" className="hover:text-blue-600 transition-colors">Kamus Penyakit</Link>
              <Link to="/diagnosa" className="hover:text-blue-600 transition-colors">Mulai Diagnosa</Link>
            </div>
          </div>
          
          <div className="mt-8 border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
            <p>&copy; 2026 Sistem Pakar Kucing. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Dibuat untuk Tugas Akhir</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
