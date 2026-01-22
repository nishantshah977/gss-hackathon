import { useState, useMemo } from "react";
import { Theme, UITokens } from "@/types";

export const useTheme = (initialTheme: Theme = "light") => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const isDark = theme === "dark";

  const ui = useMemo<UITokens>(
    () => ({
      bgPrimary: isDark ? "bg-[#0B0F14]" : "bg-[#F6F7FB]",
      bgSecondary: isDark ? "bg-[#0F1620]" : "bg-white",
      bgTertiary: isDark ? "bg-[#121B26]" : "bg-[#F0F2F7]",
      border: isDark ? "border-[#1F2A37]" : "border-[#E5E7EB]",
      textPrimary: isDark ? "text-slate-50" : "text-slate-900",
      textSecondary: isDark ? "text-slate-400" : "text-slate-600",
      chip: isDark ? "bg-[#0B1220] text-slate-200" : "bg-blue-50 text-blue-700",
      selection: isDark ? "bg-blue-600 text-white" : "bg-blue-600 text-white",
      selectionSoft: isDark ? "bg-[#0B2448]" : "bg-blue-100",
      hoverSoft: isDark ? "hover:bg-white/5" : "hover:bg-black/5",
      shadowCard: isDark
        ? "shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
        : "shadow-sm",
    }),
    [isDark],
  );

  return { theme, setTheme, isDark, ui };
};
