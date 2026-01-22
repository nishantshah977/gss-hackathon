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
import { simulateStreaming } from "@/utils/streaming";

export default function MeroLawyer() {
  const { theme, setTheme, isDark, ui } = useTheme("light");
  const { notification, showNotification } = useNotification();

  const [activeTab, setActiveTab] = useState<TabType>("chat");
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>("ask");

  const [documents, setDocuments] = useState<DocItem[]>([]);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [streamingMessage, setStreamingMessage] = useState("");

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

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingMessage]);

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
    if (!input.trim() || loading) return;

    const q = input.trim();
    const userMsg: ChatMsg = {
      role: "user",
      content: q,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setStreamingMessage("");

    try {
      let data;

      if (activeSubTab === "ask") {
        if (selectedDocs.length === 0) {
          showNotification("Select documents first.", "error");
          setLoading(false);
          return;
        }
        data = await api.askQuestion(selectedDocs, q);
      } else if (activeSubTab === "compare") {
        if (selectedDocs.length < 2) {
          showNotification("Select at least 2 documents to compare.", "error");
          setLoading(false);
          return;
        }
        data = await api.compareDocuments(selectedDocs, q);
      } else {
        data = await api.askLawQuestion(q);
      }

      if (!data?.success) {
        showNotification("Request failed", "error");
        setLoading(false);
        return;
      }

      const responseText: string = data.answer || data.comparison_result || "";
      const sources: string[] =
        data.documents_used || data.sources_referenced || [];

      simulateStreaming(responseText, (streamed) => {
        if (streamed === null) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: responseText,
              sources,
              timestamp: new Date(),
            },
          ]);
          setStreamingMessage("");
          setLoading(false);
        } else {
          setStreamingMessage(streamed);
        }
      });
    } catch {
      showNotification("Request failed", "error");
      setLoading(false);
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
                loading={loading}
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
                  streamingMessage={streamingMessage}
                  activeSubTab={activeSubTab}
                  isDark={isDark}
                  ui={ui}
                  messagesEndRef={messagesEndRef}
                />

                <ChatInput
                  value={input}
                  onChange={setInput}
                  onSend={handleSendMessage}
                  loading={loading}
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
                uploadRef={docsUploadRef}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
