import React from "react";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { UITokens } from "@/types";

interface ViewModalProps {
  doc: {
    id: string;
    filename: string;
    content: string;
  };
  onClose: () => void;
  onDelete: (id: string) => void;
  isDark: boolean;
  ui: UITokens;
}

export const ViewModal: React.FC<ViewModalProps> = ({
  doc,
  onClose,
  onDelete,
  isDark,
  ui,
}) => (
  <div
    className={`fixed ${isDark ? "text-white" : "text-black"} inset-0 z-50 bg-black/55 flex items-center justify-center p-4`}
  >
    <div
      className={`${ui.bgSecondary} ${ui.shadowCard} border ${ui.border} w-full max-w-3xl rounded-3xl overflow-hidden`}
    >
      <div
        className={`px-5 py-4 border-b ${ui.border} flex items-center justify-between`}
      >
        <div className="min-w-0">
          <p className={`text-sm ${ui.textSecondary}`}>Document</p>
          <h3 className={`text-lg font-semibold ${ui.textPrimary} truncate`}>
            {doc.filename}
          </h3>
        </div>
        <button
          onClick={onClose}
          className={`w-10 h-10 rounded-xl ${ui.bgTertiary} ${ui.hoverSoft} flex items-center justify-center`}
        >
          <X size={18} className={ui.textSecondary} />
        </button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto p-5">
        <div className={`${ui.bgTertiary} border ${ui.border} rounded-2xl p-4`}>
          <div className={`prose max-w-none ${isDark ? "prose-invert" : ""}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {doc.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <div
        className={`px-5 py-4 border-t ${ui.border} flex items-center justify-end gap-2`}
      >
        <button
          onClick={onClose}
          className={`${ui.bgTertiary} ${ui.hoverSoft} px-4 py-2 rounded-xl text-sm font-medium ${ui.textPrimary}`}
        >
          Close
        </button>
        <button
          onClick={() => onDelete(doc.id)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-sm font-medium text-white"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);
