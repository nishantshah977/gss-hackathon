import React from "react";
import { Scale } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMsg, UITokens } from "@/types";

interface ChatMessageProps {
  msg: ChatMsg;
  isDark: boolean;
  ui: UITokens;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  msg,
  isDark,
  ui,
}) => {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%]">
          <div className="bg-blue-600 text-white rounded-3xl rounded-tr-md px-5 py-3.5">
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
              {msg.content}
            </ReactMarkdown>
          </div>

          {msg.sources && msg.sources.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className={`text-xs font-semibold mb-2 ${ui.textSecondary}`}>
                Sources
              </p>
              <div className="flex flex-wrap gap-2">
                {msg.sources.map((src, i) => (
                  <span
                    key={i}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium ${ui.chip}`}
                  >
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
