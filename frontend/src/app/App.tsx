import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Routes, Route, useNavigate, Navigate, useLocation, Outlet } from "react-router";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, RadialBarChart, RadialBar
} from "recharts";
import {
  LayoutDashboard, Database, List, BookOpen, Stethoscope, ClipboardList,
  FileText, Info, Bell, Search, ChevronRight, ChevronDown, Eye, Edit2,
  Trash2, Plus, X, Check, Download, Printer, RefreshCw, LogOut,
  Cat, Activity, Award, TrendingUp, Calendar, User, Filter, ArrowLeft,
  Heart, Shield, AlertTriangle, ChevronLeft, Menu
} from "lucide-react";

import AppLayout from "../components/layout/AppLayout";
import PenyakitScreen from "../pages/PenyakitScreen";
import GejalaScreen from "../pages/Gejala";
import PengetahuanPage from "../pages/Pengetahuan";
import LaporanScreen from "../pages/Laporan";
import CetakHasilScreen from "../pages/CetakHasil";

// Import real pages to replace inline dummy screens
import RiwayatPage from "../pages/Riwayat";
import DiagnosaPage from "../pages/Diagnosa";
import DashboardPage from "../pages/Dashboard";
import HasilPage from "../pages/Hasil";
import PerhitunganPage from "../pages/Perhitungan";
import RankingPage from "../pages/Ranking";
import LoginPage from "../pages/Login";
import LandingPage from "../pages/LandingPage";
import KamusPenyakit from "../pages/KamusPenyakit";
import UserLayout from "../components/layout/UserLayout";
import TentangScreen from "../pages/Tentang";

import { AuthProvider, useAuth } from "../context/AuthContext";

type Screen =
  | "login" | "dashboard" | "penyakit" | "gejala" | "pengetahuan"
  | "diagnosa" | "hasil" | "perhitungan" | "ranking" | "riwayat"
  | "laporan" | "tentang" | "cetak-hasil";

// ─── ROOT ─────────────────────────────────────────────────────────────────────
/**
 * Komponen inner yang memiliki akses ke router context.
 * Dipisah dari App() agar useNavigate bisa dipanggil di dalam BrowserRouter.
 */
function AppRoutes() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // nav callback: menerima Screen lalu navigate ke path yang sesuai
  const nav = useCallback((s: Screen) => {
    const pathMap: Record<Screen, string> = {
      login:       "/login",
      dashboard:   "/dashboard",
      penyakit:    "/penyakit",
      gejala:      "/gejala",
      pengetahuan: "/pengetahuan",
      diagnosa:    "/diagnosa",
      hasil:       "/hasil",
      perhitungan: "/perhitungan",
      ranking:     "/ranking",
      riwayat:     "/riwayat",
      laporan:     "/laporan",
      tentang:     "/tentang",
      "cetak-hasil": "/cetak-hasil",
    };
    navigate(pathMap[s]);
  }, [navigate]);

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-[#EEF4FB]">Loading...</div>;
  }

  // Role Guard function
  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user || user.role !== 'admin') {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  // Dynamic Layout: Returns AppLayout if Admin, otherwise UserLayout
  const DynamicLayout = () => {
    const loc = useLocation();
    
    // Mapping path to title and current for AppLayout
    const getAppLayoutProps = () => {
      const p = loc.pathname;
      if (p.includes('diagnosa')) return { current: 'diagnosa' as Screen, title: 'Diagnosa Penyakit' };
      if (p.includes('hasil')) return { current: 'hasil' as Screen, title: 'Hasil Diagnosa' };
      if (p.includes('perhitungan')) return { current: 'perhitungan' as Screen, title: 'Perhitungan Bayes' };
      if (p.includes('ranking')) return { current: 'ranking' as Screen, title: 'Ranking Penyakit' };
      if (p.includes('riwayat')) return { current: 'riwayat' as Screen, title: 'Riwayat Diagnosa' };
      if (p.includes('cetak-hasil')) return { current: 'cetak-hasil' as Screen, title: 'Cetak Hasil' };
      if (p.includes('tentang')) return { current: 'tentang' as Screen, title: 'Tentang Sistem' };
      if (p.includes('kamus-penyakit')) return { current: 'penyakit' as Screen, title: 'Kamus Penyakit' };
      return { current: 'dashboard' as Screen, title: 'Dashboard' };
    };

    // If the user is an admin, they should always get the Sidebar layout for consistency
    if (user && user.role === 'admin') {
      const props = getAppLayoutProps();
      return (
        <AppLayout current={props.current} title={props.title} onNav={nav}>
          <Outlet />
        </AppLayout>
      );
    }
    
    // Otherwise, show the public top-navbar layout
    return <UserLayout />;
  };

  return (
    <Routes>
      {/* ═══ Public Routes — DynamicLayout (Top Navbar for User, Sidebar for Admin) ═══ */}
      <Route element={<DynamicLayout />}>
        <Route path="/"              element={<LandingPage />} />
        <Route path="/diagnosa"      element={<DiagnosaPage onNav={nav} />} />
        <Route path="/hasil"         element={<HasilPage onNav={nav} />} />
        <Route path="/perhitungan"   element={<PerhitunganPage onNav={nav} />} />
        <Route path="/ranking"       element={<RankingPage onNav={nav} />} />
        <Route path="/kamus-penyakit" element={<KamusPenyakit />} />
        <Route path="/tentang"       element={<TentangScreen />} />
        <Route path="/riwayat"       element={<RiwayatPage onNav={nav} />} />
        <Route path="/cetak-hasil"   element={<CetakHasilScreen onNav={nav} />} />
      </Route>

      {/* ═══ Auth Routes ═══ */}
      <Route path="/login" element={
        user ? <Navigate to={user.role === 'admin' ? "/dashboard" : "/"} replace /> : <LoginPage />
      } />

      {/* ═══ Admin Routes — AppLayout (Sidebar) ═══ */}
      <Route path="/dashboard"   element={<AdminRoute><DashboardPage onNav={nav} /></AdminRoute>} />
      <Route path="/penyakit"    element={<AdminRoute><PenyakitScreen onNav={nav} /></AdminRoute>} />
      <Route path="/gejala"      element={<AdminRoute><GejalaScreen onNav={nav} /></AdminRoute>} />
      <Route path="/pengetahuan" element={<AdminRoute><PengetahuanPage onNav={nav} /></AdminRoute>} />
      <Route path="/laporan"     element={<AdminRoute><LaporanScreen onNav={nav} /></AdminRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
