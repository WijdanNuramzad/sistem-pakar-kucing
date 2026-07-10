import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import type { Screen } from "../../types";

// ─── APP LAYOUT WRAPPER ───────────────────────────────────────────────────────

interface AppLayoutProps {
  current: Screen;
  onNav: (s: Screen) => void;
  title: string;
  children: React.ReactNode;
}

export default function AppLayout({ current, onNav, title, children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex h-full bg-[#EEF4FB]" style={{ fontFamily: "Inter, sans-serif" }}>
      <Sidebar current={current} onNav={onNav} collapsed={collapsed} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={title} onToggleSidebar={() => setCollapsed(c => !c)} onNav={onNav} />
        <main className="flex-1 overflow-y-auto p-5 space-y-5">
          {children}
        </main>
      </div>
    </div>
  );
}
