import React, { useState, useEffect } from "react";
import { Scale } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMsg, UITokens } from "@/types";

interface ChatMessageProps {
  msg: ChatMsg;
  isDark: boolean;
  ui: UITokens;
  isStreaming?: boolean;
}

// Streaming cursor component
const StreamingCursor: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-block w-0.5 h-5 bg-blue-600 ml-0.5 align-middle transition-opacity duration-100 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};

// Typing indicator component
export const TypingIndicator: React.FC<{ isDark: boolean; ui: UITokens }> = ({
  isDark,
  ui,
}) => {
  return (
    <div className={`flex gap-4 ${isDark ? "text-white" : "text-black"}`}>
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${ui.selectionSoft}`}
      >
        <Scale size={18} className="text-blue-600" />
      </div>

      <div className="flex-1 min-w-0">
        <div
          className={`${ui.bgSecondary} rounded-3xl rounded-tl-md px-5 py-4 border ${ui.border} ${ui.shadowCard}`}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div
                className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                style={{ animationDelay: "0ms", animationDuration: "1s" }}
              />
              <div
                className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                style={{ animationDelay: "150ms", animationDuration: "1s" }}
              />
              <div
                className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
                style={{ animationDelay: "300ms", animationDuration: "1s" }}
              />
            </div>
            <span className={`text-sm ${ui.textSecondary}`}>
              AI Lawyer is thinking...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ChatMessage: React.FC<ChatMessageProps> = ({
  msg,
  isDark,
  ui,
  isStreaming = false,
}) => {
  // User message
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%]">
          <div className="bg-blue-600 text-white rounded-3xl rounded-tr-md px-5 py-3.5 shadow-lg">
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
              {msg.content}
            </p>
          </div>
          <p className={`text-xs ${ui.textSecondary} mt-1.5 text-right`}>
            {msg.timestamp?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    );
  }

  // Assistant message
  return (
    <div className={`flex gap-4 ${isDark ? "text-white" : "text-black"}`}>
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${ui.selectionSoft}`}
      >
        <Scale size={18} className="text-blue-600" />
      </div>

      <div className="flex-1 min-w-0">
        <div
          className={`${ui.bgSecondary} rounded-3xl rounded-tl-md px-5 py-4 border ${ui.border} ${ui.shadowCard}`}
        >
          <div className={`prose max-w-none ${isDark ? "prose-invert" : ""}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {msg.content || " "}
            </ReactMarkdown>
            {isStreaming && msg.content && <StreamingCursor />}
          </div>

          {/* Metadata section */}
          {msg.metadata && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className={`text-xs font-semibold mb-2 ${ui.textSecondary}`}>
                Analysis Details
              </p>
              <div className="flex flex-wrap gap-2">
                {msg.metadata.documents_used && (
                  <span
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium ${ui.chip}`}
                  >
                    📄 {msg.metadata.documents_used.length} document(s)
                  </span>
                )}
                {msg.metadata.chunks_found !== undefined && (
                  <span
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium ${ui.chip}`}
                  >
                    🔍 {msg.metadata.chunks_found} relevant chunk(s)
                  </span>
                )}
                {msg.metadata.jurisdiction && (
                  <span
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium ${ui.chip}`}
                  >
                    ⚖️ {msg.metadata.jurisdiction}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Sources section */}
          {msg.sources && msg.sources.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className={`text-xs font-semibold mb-2 ${ui.textSecondary}`}>
                Sources Referenced
              </p>
              <div className="flex flex-wrap gap-2">
                {msg.sources.map((src, i) => (
                  <span
                    key={i}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium ${ui.chip} flex items-center gap-1.5`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    {src}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className={`text-xs ${ui.textSecondary} mt-2`}>
          {msg.timestamp?.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};
