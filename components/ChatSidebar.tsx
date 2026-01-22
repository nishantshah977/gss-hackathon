import React from "react";
import { Upload, Scale } from "lucide-react";
import { SubTabType, DocItem, UITokens } from "@/types";
import { DocumentSelector } from "./DocumentSelector";

interface ChatSidebarProps {
  activeSubTab: SubTabType;
  setActiveSubTab: (tab: SubTabType) => void;
  documents: DocItem[];
  selectedDocs: string[];
  toggleSelection: (id: string) => void;
  onUpload: () => void;
  loading: boolean;
  isDark: boolean;
  ui: UITokens;
  uploadRef: React.RefObject<HTMLInputElement | null>;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  activeSubTab,
  setActiveSubTab,
  documents,
  selectedDocs,
  toggleSelection,
  onUpload,
  loading,
  isDark,
  ui,
  uploadRef,
}) => (
  <section
    className={`w-80 ${ui.bgSecondary} border-r ${ui.border} flex flex-col min-h-0`}
  >
    <div className={`p-4 border-b ${ui.border}`}>
      <div className={`${ui.bgTertiary} rounded-xl p-1 flex gap-1`}>
        {(["ask", "compare", "law"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setActiveSubTab(k)}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeSubTab === k
                ? `${ui.bgSecondary} ${ui.textPrimary} shadow-sm`
                : ui.textSecondary
            }`}
          >
            {k === "ask"
              ? "Ask Docs"
              : k === "compare"
                ? "Compare"
                : "Legal AI"}
          </button>
        ))}
      </div>

      {activeSubTab !== "law" && (
        <div className="mt-3">
          <input
            ref={uploadRef}
            type="file"
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg,.txt,.md"
          />
          <button
            onClick={onUpload}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2.5 text-sm font-semibold flex items-center justify-center gap-2"
            disabled={loading}
          >
            <Upload size={16} />
            Upload & Auto-Select
          </button>
        </div>
      )}
    </div>

    <div className="px-4 pt-4">
      <div className={`${ui.bgTertiary} border ${ui.border} rounded-2xl p-4`}>
        <h3 className={`text-sm font-semibold ${ui.textPrimary} mb-2`}>
          Why use this tool?
        </h3>
        <ul className={`text-xs ${ui.textSecondary} space-y-2 leading-relaxed`}>
          <li>
            <span className="font-semibold text-blue-600">
              Grounded answers:
            </span>{" "}
            uses your docs, not "vibes".
          </li>
          <li>
            <span className="font-semibold text-blue-600">Citations:</span>{" "}
            shows which files were used.
          </li>
          <li>
            <span className="font-semibold text-blue-600">
              Compare & detect conflicts:
            </span>{" "}
            great for legal texts.
          </li>
        </ul>
      </div>
    </div>

    {activeSubTab !== "law" ? (
      <DocumentSelector
        documents={documents}
        selectedDocs={selectedDocs}
        toggleSelection={toggleSelection}
        isDark={isDark}
        ui={ui}
      />
    ) : (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <Scale className={`w-14 h-14 mx-auto mb-3 ${ui.textSecondary}`} />
          <p className={`text-sm ${ui.textSecondary}`}>
            Ask any legal question
          </p>
        </div>
      </div>
    )}
  </section>
);
