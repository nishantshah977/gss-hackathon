import React from "react";
import { ChatMsg, SubTabType, UITokens } from "@/types";
import { ChatMessage, TypingIndicator } from "@/components/ChatMessage";

interface ChatAreaProps {
  messages: ChatMsg[];
  isStreaming: boolean;
  showTyping: boolean;
  activeSubTab: SubTabType;
  isDark: boolean;
  ui: UITokens;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  isStreaming,
  showTyping,
  activeSubTab,
  isDark,
  ui,
  messagesEndRef,
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center max-w-md">
            <div
              className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${ui.selectionSoft}`}
            >
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${ui.textPrimary}`}>
              {activeSubTab === "law"
                ? "Ask Legal Questions"
                : activeSubTab === "compare"
                  ? "Compare Documents"
                  : "Analyze Your Documents"}
            </h3>
            <p className={`text-sm ${ui.textSecondary}`}>
              {activeSubTab === "law"
                ? "Search through Nepal's legal database for answers to your legal questions"
                : activeSubTab === "compare"
                  ? "Select at least 2 documents to compare their provisions and terms"
                  : "Upload documents and ask questions to get AI-powered legal analysis"}
            </p>
          </div>
        </div>
      )}

      {messages.map((msg, idx) => (
        <ChatMessage
          key={idx}
          msg={msg}
          isDark={isDark}
          ui={ui}
          isStreaming={
            isStreaming &&
            idx === messages.length - 1 &&
            msg.role === "assistant"
          }
        />
      ))}

      {showTyping && <TypingIndicator isDark={isDark} ui={ui} />}

      <div ref={messagesEndRef} />
    </div>
  );
};
