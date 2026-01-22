"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChatMsg, DocItem, SubTabType, TabType } from "@/types";
import { useTheme } from "@/hooks/useTheme";
import { useNotification } from "@/hooks/useNotification";
import { Notification } from "@/components/Notification";
import { ViewModal } from "@/components/ViewModal";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatArea } from "@/components/ChatArea";
import { ChatInput } from "@/components/ChatInput";
import { DocumentsTab } from "@/components/DocumentsTab";
import { api } from "@/utils/api";
import { useSearchParams } from "next/navigation";

export default function MeroLawyer() {
  const searchParams = useSearchParams();

  const { theme, setTheme, isDark, ui } = useTheme("light");
  const { notification, showNotification } = useNotification();

  const [activeTab, setActiveTab] = useState<TabType>("chat");
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>("ask");

  const [documents, setDocuments] = useState<DocItem[]>([]);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const [now, setNow] = useState<Date>(new Date());

  const [viewOpen, setViewOpen] = useState(false);
  const [viewDoc, setViewDoc] = useState<{
    id: string;
    filename: string;
    content: string;
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatUploadRef = useRef<HTMLInputElement | null>(null);
  const docsUploadRef = useRef<HTMLInputElement | null>(null);
  const currentMessageRef = useRef("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    const tab = searchParams.get("tab");

    if (tab === "compare") {
      setActiveTab("chat");
      setActiveSubTab("compare");
    } else if (tab === "law") {
      setActiveTab("chat");
      setActiveSubTab("law");
    } else if (tab === "ask") {
      setActiveTab("chat");
      setActiveSubTab("ask");
    } else if (tab === "docs") {
      setActiveTab("documents");
    }
  }, [searchParams]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  const fetchDocuments = async () => {
    try {
      const data = await api.fetchDocuments();
      if (data?.success) setDocuments(data.documents || []);
    } catch {
      showNotification("Failed to fetch documents", "error");
    }
  };

  const uploadFile = async (file: File, autoSelect: boolean) => {
    setLoading(true);
    try {
      const data = await api.uploadDocument(file);

      if (!data?.success) {
        showNotification(
          data?.detail?.error?.message || "Upload failed",
          "error",
        );
        setLoading(false);
        return;
      }

      showNotification(`Uploaded: ${file.name}`, "success");
      await fetchDocuments();

      if (autoSelect && data.document_id) {
        setSelectedDocs((prev) =>
          prev.includes(data.document_id) ? prev : [data.document_id, ...prev],
        );
        setActiveTab("chat");
        if (activeSubTab === "law") setActiveSubTab("ask");
      }
    } catch {
      showNotification("Upload failed", "error");
    }
    setLoading(false);
  };

  const handleChatUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    await uploadFile(file, true);
  };

  const handleDocsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    await uploadFile(file, false);
  };

  const handleViewDoc = async (doc: DocItem) => {
    try {
      const data = await api.getDocument(doc.id);

      if (data?.success && data?.document) {
        setViewDoc({
          id: doc.id,
          filename: data.document.filename || doc.filename,
          content: data.document.full_text || data.document.content || "",
        });
        setViewOpen(true);
        return;
      }

      setViewDoc({
        id: doc.id,
        filename: doc.filename,
        content: doc.preview || "No view endpoint found.",
      });
      setViewOpen(true);
    } catch {
      showNotification("View failed", "error");
    }
  };

  const handleDeleteDoc = async (docId: string) => {
    const ok = window.confirm("Delete this document?");
    if (!ok) return;

    try {
      const data = await api.deleteDocument(docId);

      if (!data?.success) {
        showNotification("Delete failed", "error");
        return;
      }

      showNotification("Document deleted", "success");
      setSelectedDocs((prev) => prev.filter((id) => id !== docId));
      await fetchDocuments();
      if (viewOpen) setViewOpen(false);
    } catch {
      showNotification("Delete failed", "error");
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading || isStreaming) return;

    const q = input.trim();
    const userMsg: ChatMsg = {
      role: "user",
      content: q,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setIsStreaming(true);
    currentMessageRef.current = "";

    try {
      const callbacks = {
        onMetadata: (meta: any) => {
          // Hide loading indicator when metadata arrives
          setLoading(false);

          const sources = meta.sources_referenced || meta.documents_used || [];

          // Add initial empty assistant message with metadata
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "",
              timestamp: new Date(),
              metadata: meta,
              sources,
            },
          ]);
        },
        onContent: (content: string) => {
          currentMessageRef.current += content;

          // Update the last message with streaming content
          setMessages((prev) => {
            const updated = [...prev];
            const lastMsg = updated[updated.length - 1];
            if (lastMsg && lastMsg.role === "assistant") {
              lastMsg.content = currentMessageRef.current;
            }
            return updated;
          });
        },
        onDone: () => {
          setIsStreaming(false);
          setLoading(false);
          currentMessageRef.current = "";
        },
        onError: (error: string) => {
          setIsStreaming(false);
          setLoading(false);

          // Add error message
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `❌ **Error:** ${error}\n\nPlease try again or rephrase your question.`,
              timestamp: new Date(),
            },
          ]);

          showNotification(error, "error");
        },
      };

      // Call appropriate API based on active sub-tab
      if (activeSubTab === "ask") {
        if (selectedDocs.length === 0) {
          showNotification("Select documents first.", "error");
          setLoading(false);
          setIsStreaming(false);
          return;
        }
        await api.askQuestion(selectedDocs, q, callbacks);
      } else if (activeSubTab === "compare") {
        if (selectedDocs.length < 2) {
          showNotification("Select at least 2 documents to compare.", "error");
          setLoading(false);
          setIsStreaming(false);
          return;
        }
        await api.compareDocuments(selectedDocs, q, callbacks);
      } else if (activeSubTab === "law") {
        await api.askLawQuestion(q, "nepal", callbacks, 5);
      }
    } catch (error: any) {
      setIsStreaming(false);
      setLoading(false);
      showNotification(error.message || "Request failed", "error");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `❌ **Error:** ${error.message}\n\nPlease check your inputs and try again.`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <div
      className={`min-h-screen ${ui.bgPrimary} transition-colors duration-300`}
    >
      {notification && (
        <Notification msg={notification.msg} type={notification.type} />
      )}
      {viewOpen && viewDoc && (
        <ViewModal
          doc={viewDoc}
          onClose={() => setViewOpen(false)}
          onDelete={handleDeleteDoc}
          isDark={isDark}
          ui={ui}
        />
      )}

      <div className="flex h-screen">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          theme={theme}
          toggleTheme={() => setTheme(isDark ? "light" : "dark")}
          ui={ui}
        />

        <main className="flex-1 flex flex-col min-w-0">
          <Header activeTab={activeTab} now={now} ui={ui} />

          {activeTab === "chat" ? (
            <div className="flex-1 flex min-h-0">
              <ChatSidebar
                activeSubTab={activeSubTab}
                setActiveSubTab={setActiveSubTab}
                documents={documents}
                selectedDocs={selectedDocs}
                toggleSelection={(id) =>
                  setSelectedDocs((prev) =>
                    prev.includes(id)
                      ? prev.filter((i) => i !== id)
                      : [...prev, id],
                  )
                }
                onUpload={() => chatUploadRef.current?.click()}
                loading={loading || isStreaming}
                isDark={isDark}
                ui={ui}
                uploadRef={chatUploadRef}
              />

              <input
                ref={chatUploadRef}
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.txt,.md"
                onChange={handleChatUpload}
              />

              <section className="flex-1 flex flex-col min-w-0 min-h-0">
                <ChatArea
                  messages={messages}
                  isStreaming={isStreaming}
                  showTyping={loading && !isStreaming}
                  activeSubTab={activeSubTab}
                  isDark={isDark}
                  ui={ui}
                  messagesEndRef={messagesEndRef}
                />

                <ChatInput
                  value={input}
                  onChange={setInput}
                  onSend={handleSendMessage}
                  loading={loading || isStreaming}
                  selectedDocsCount={selectedDocs.length}
                  activeSubTab={activeSubTab}
                  ui={ui}
                />
              </section>
            </div>
          ) : (
            <>
              <input
                ref={docsUploadRef}
                type="file"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.txt,.md"
                onChange={handleDocsUpload}
              />

              <DocumentsTab
                documents={documents}
                onUpload={() => docsUploadRef.current?.click()}
                onView={handleViewDoc}
                onDelete={handleDeleteDoc}
                loading={loading}
                ui={ui}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
