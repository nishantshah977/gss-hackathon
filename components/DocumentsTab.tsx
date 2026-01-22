import React from "react";
import { Upload, FileText, Eye, Trash2 } from "lucide-react";
import { DocItem, UITokens } from "@/types";

interface DocumentsTabProps {
  documents: DocItem[];
  onUpload: () => void;
  onView: (doc: DocItem) => void;
  onDelete: (id: string) => void;
  loading: boolean;
  ui: UITokens;
}

export const DocumentsTab: React.FC<DocumentsTabProps> = ({
  documents,
  onUpload,
  onView,
  onDelete,
  loading,
  ui,
}) => (
  <div className={`flex-1 min-h-0 overflow-y-auto p-8 ${ui.bgPrimary}`}>
    <div className="max-w-6xl mx-auto">
      <button
        type="button"
        onClick={onUpload}
        disabled={loading}
        className={`${ui.bgSecondary} border-2 border-dashed ${ui.border} rounded-3xl p-10 text-center w-full cursor-pointer hover:border-blue-600 transition-all duration-300 mb-8 disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className={`text-xl font-bold mb-2 ${ui.textPrimary}`}>
          Upload Document
        </h3>
        <p className={ui.textSecondary}>PDF, Images, or Text/Markdown files</p>
        {loading && (
          <div className="mt-4 w-40 h-1 bg-blue-600 mx-auto rounded-full animate-pulse" />
        )}
      </button>

      <div>
        <h2 className={`text-xl font-bold mb-6 ${ui.textPrimary}`}>
          Your Documents ({documents.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={`${ui.bgSecondary} rounded-2xl p-5 border ${ui.border} ${ui.hoverSoft} transition-all duration-200`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${ui.selectionSoft}`}
                >
                  <FileText className="text-blue-600" size={22} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold truncate mb-1 ${ui.textPrimary}`}
                  >
                    {doc.filename}
                  </h3>
                  <p className={`text-xs ${ui.textSecondary}`}>
                    {new Date(doc.upload_date).toLocaleDateString()}{" "}
                    {doc.file_size
                      ? `• ${(doc.file_size / 1024).toFixed(0)} KB`
                      : ""}
                  </p>
                  <p
                    className={`text-xs ${ui.textSecondary} mt-2 line-clamp-2`}
                  >
                    {doc.preview || ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => onView(doc)}
                  className={`flex-1 px-3 py-2 rounded-lg ${ui.bgTertiary} ${ui.hoverSoft} text-sm font-semibold ${ui.textPrimary}`}
                >
                  <Eye size={16} className="inline mr-1" />
                  View
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(doc.id)}
                  className={`px-3 py-2 rounded-lg ${ui.bgTertiary} ${ui.hoverSoft} text-sm ${ui.textPrimary}`}
                  title="Delete"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {documents.length === 0 && (
          <div
            className={`${ui.bgSecondary} border ${ui.border} rounded-3xl p-10 text-center mt-6`}
          >
            <p className={`text-lg font-semibold ${ui.textPrimary}`}>
              No documents uploaded yet
            </p>
            <p className={`text-sm ${ui.textSecondary} mt-2`}>
              Upload a doc to enable grounded Q&A and comparisons.
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);
