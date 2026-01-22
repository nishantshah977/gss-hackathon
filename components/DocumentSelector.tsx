import React from "react";
import { FileText, Check } from "lucide-react";
import { DocItem, UITokens } from "@/types";

interface DocumentSelectorProps {
  documents: DocItem[];
  selectedDocs: string[];
  toggleSelection: (id: string) => void;
  isDark: boolean;
  ui: UITokens;
}

export const DocumentSelector: React.FC<DocumentSelectorProps> = ({
  documents,
  selectedDocs,
  toggleSelection,
  isDark,
  ui,
}) => (
  <div className="flex-1 min-h-0 overflow-y-auto p-4">
    <div className="flex items-center justify-between mb-3">
      <h3 className={`text-sm font-semibold ${ui.textPrimary}`}>
        Selected Docs
      </h3>
      <span className={`text-xs ${ui.textSecondary}`}>
        {selectedDocs.length} selected
      </span>
    </div>

    <div className="space-y-2">
      {documents.length === 0 && (
        <div className={`${ui.bgTertiary} border ${ui.border} rounded-2xl p-4`}>
          <p className={`text-sm ${ui.textPrimary} font-semibold`}>
            No documents yet
          </p>
          <p className={`text-xs ${ui.textSecondary} mt-1`}>
            Upload a PDF/image/text, then ask questions grounded in it.
          </p>
        </div>
      )}

      {documents.map((doc) => {
        const selected = selectedDocs.includes(doc.id);
        return (
          <div
            key={doc.id}
            className={`p-3 rounded-2xl border ${
              selected
                ? "border-blue-600 bg-blue-600 text-white"
                : `${ui.border} ${ui.bgTertiary}`
            } cursor-pointer transition-all`}
            onClick={() => toggleSelection(doc.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  selected
                    ? "bg-blue-700"
                    : isDark
                      ? "bg-emerald-500/15"
                      : "bg-emerald-100"
                }`}
              >
                <FileText
                  size={18}
                  className={
                    selected
                      ? "text-white"
                      : isDark
                        ? "text-emerald-300"
                        : "text-emerald-700"
                  }
                />
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={`font-semibold text-sm truncate text-black ${selected ? "text-white" : ui.textPrimary}`}
                >
                  {doc.filename}
                </p>
                <p
                  className={`text-xs mt-0.5 ${selected ? "text-blue-100" : ui.textSecondary}`}
                >
                  {new Date(doc.upload_date).toLocaleDateString()}
                </p>
              </div>

              {selected && <Check size={18} className="text-white" />}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
