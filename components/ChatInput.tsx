import React from "react";
import { ArrowUp } from "lucide-react";
import { SubTabType, UITokens } from "@/types";
import GoogleTranslate from "next-google-translate-widget";

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  loading: boolean;
  selectedDocsCount: number;
  activeSubTab: SubTabType;
  ui: UITokens;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  loading,
  selectedDocsCount,
  activeSubTab,
  ui,
}) => (
  <div className={`${ui.bgSecondary} border-t ${ui.border} p-4`}>
    <div className="max-w-3xl mx-auto">
      <div
        className={`${ui.bgTertiary} border ${ui.border} rounded-3xl px-4 py-3 flex items-end gap-3`}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask a question..."
          className={`
    flex-1
    bg-transparent
    outline-none
    ${ui.textPrimary}
    placeholder:text-slate-400
    leading-relaxed
    py-3

    text-left
    
  `}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
        />

        <button
          onClick={onSend}
          disabled={loading || !value.trim()}
          className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Send"
        >
          <ArrowUp size={20} />
        </button>
      </div>

      {activeSubTab !== "law" && (
        <div className="flex items-center justify-between mt-2">
          <p className={`text-xs ${ui.textSecondary}`}>
            {selectedDocsCount > 0
              ? `Using ${selectedDocsCount} document(s)`
              : "Upload/select a doc to ask grounded questions"}
          </p>
          {loading && (
            <p className={`text-xs ${ui.textSecondary}`}>Thinking…</p>
          )}
        </div>
      )}
    </div>
  </div>
);
