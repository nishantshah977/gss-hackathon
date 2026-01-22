import React from "react";
import { Scale, MessageSquare, FileText, Sun, Moon } from "lucide-react";
import { Theme, TabType, UITokens } from "@/types";
import Link from "next/link";

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  theme: Theme;
  toggleTheme: () => void;
  ui: UITokens;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
  ui,
}) => (
  <aside
    className={`w-20 ${ui.bgSecondary} border-r ${ui.border} flex flex-col items-center py-6 gap-6`}
  >
    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
      <Link href="/">
      <Scale className="w-6 h-6 text-white" />
      </Link>
    </div>

    <div className="flex-1 flex flex-col gap-3">
      <button
        onClick={() => setActiveTab("chat")}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
          activeTab === "chat" ? ui.selectionSoft : ""
        } ${activeTab === "chat" ? "text-blue-600" : ui.textSecondary} ${ui.hoverSoft}`}
        title="Chat"
      >
        <MessageSquare size={22} />
      </button>

      <button
        onClick={() => setActiveTab("documents")}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
          activeTab === "documents" ? ui.selectionSoft : ""
        } ${activeTab === "documents" ? "text-blue-600" : ui.textSecondary} ${ui.hoverSoft}`}
        title="Documents"
      >
        <FileText size={22} />
      </button>
    </div>

    <button
      onClick={toggleTheme}
      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${ui.bgTertiary} ${ui.hoverSoft} transition-all duration-200`}
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-blue-600" />
      )}
    </button>
  </aside>
);
