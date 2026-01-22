import React from "react";
import { Scale } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMsg, SubTabType, UITokens } from "@/types";
import { ChatMessage } from "./ChatMessage";
import Spline from "@splinetool/react-spline";

interface ChatAreaProps {
  messages: ChatMsg[];
  streamingMessage: string;
  activeSubTab: SubTabType;
  isDark: boolean;
  ui: UITokens;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  streamingMessage,
  activeSubTab,
  isDark,
  ui,
  messagesEndRef,
}) => (
  <div className={`flex-1 min-h-0 overflow-y-auto p-6 ${ui.bgPrimary}`}>
    {messages.length === 0 && !streamingMessage && (
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-md">
          <div
            className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 ${ui.selectionSoft}`}
          >
            <Scale className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className={`text-2xl font-bold mb-3 ${ui.textPrimary}`}>
            {activeSubTab === "ask" && "Ask About Your Documents"}
            {activeSubTab === "compare" && "Compare Documents"}
            {activeSubTab === "law" && "Legal AI Assistant"}
          </h2>
          <p className={ui.textSecondary}>
            {activeSubTab === "ask" &&
              "Select documents on the left and ask questions grounded in them."}
            {activeSubTab === "compare" &&
              "Select 2+ documents to compare differences and conflicts."}
            {activeSubTab === "law" &&
              "Ask general legal questions (no document grounding)."}
          </p>
        </div>
      </div>
    )}

    <div className="max-w-3xl mx-auto space-y-6">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className="animate-in slide-in-from-bottom-3 duration-300"
        >
          <ChatMessage msg={msg} isDark={isDark} ui={ui} />
        </div>
      ))}

      {streamingMessage && (
        <div className="flex gap-3 animate-in fade-in duration-200">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${ui.selectionSoft}`}
          >
            <Scale size={18} className="text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className={`${ui.bgSecondary} rounded-3xl rounded-tl-md px-5 py-4 border ${ui.border} ${ui.shadowCard}`}
            >
              <div
                className={`prose max-w-none ${isDark ? "prose-invert" : ""}`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {streamingMessage + "\n\n▍"}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    <div ref={messagesEndRef} />
  </div>
);
