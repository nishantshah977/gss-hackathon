import React, { useMemo } from "react";
import { TabType, UITokens } from "@/types";
import GoogleTranslateWidget from "@/app/GoogleTranslate";

interface HeaderProps {
  activeTab: TabType;
  now: Date;
  ui: UITokens;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, now, ui }) => {
  const { date, time } = useMemo(() => {
    const date = now.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return { date, time };
  }, [now]);

  return (
    <header className={`${ui.bgSecondary} border-b ${ui.border} px-6 py-5`}>
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className={`text-2xl font-bold ${ui.textPrimary}`}>
            {activeTab === "chat" ? "Mero Lawyer" : "Documents"}
          </h1>
          <p className={`text-sm ${ui.textSecondary} mt-0.5`}>
            {activeTab === "chat"
              ? "Document-grounded legal assistant"
              : "Upload, view, and delete stored documents"}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <GoogleTranslateWidget />
          
          <div className="text-right">
            <div className={`text-sm font-semibold ${ui.textPrimary}`}>
              {time}
            </div>
            <div className={`text-xs ${ui.textSecondary}`}>{date}</div>
          </div>
        </div>
      </div>
    </header>
  );
};