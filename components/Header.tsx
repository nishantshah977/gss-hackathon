"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TabType, UITokens } from "@/types";

interface HeaderProps {
  activeTab: TabType;
  ui: UITokens;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, ui }) => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // set immediately on mount, then tick every second
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const { date, time } = useMemo(() => {
    if (!now) return { date: "—", time: "—" };

    // Force a consistent locale + timezone to avoid server/client differences
    const locale = "en-US";
    const timeZone = "Asia/Kathmandu";

    const date = new Intl.DateTimeFormat(locale, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      timeZone,
    }).format(now);

    const time = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone,
    }).format(now);

    return { date, time };
  }, [now]);

  return (
    <header className={`${ui.bgSecondary} border-b ${ui.border} px-6 py-5`}>
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className={`text-2xl font-bold ${ui.textPrimary}`}>
            {activeTab === "chat" ? "Mero Lawyer" : "Documents"}
          </h1>
          <p className={`text-sm ${ui.textSecondary} mt-0.5`}>
            {activeTab === "chat"
              ? "Document-grounded legal assistant"
              : "Upload, view, and delete stored documents"}
          </p>
        </div>

        <div className="text-right flex-shrink-0">
          {/* Suppress hydration warning just in case something still differs */}
          <div
            className={`text-sm font-semibold ${ui.textPrimary}`}
            suppressHydrationWarning
          >
            {time}
          </div>
          <div
            className={`text-xs ${ui.textSecondary}`}
            suppressHydrationWarning
          >
            {date}
          </div>
        </div>
      </div>
    </header>
  );
};
