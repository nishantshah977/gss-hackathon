export type DocItem = {
  id: string;
  filename: string;
  upload_date: string;
  preview?: string;
  file_size?: number;
};

export type Theme = "light" | "dark";
export type TabType = "chat" | "documents";
export type SubTabType = "ask" | "compare" | "law";

export interface UITokens {
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  chip: string;
  selection: string;
  selectionSoft: string;
  hoverSoft: string;
  shadowCard: string;
}

export interface ChatMsg {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  metadata?: ChatMetadata; // ← Added
  sources?: string[]; // ← Added
}

export interface ChatMetadata {
  documents_used?: string[]; // For ask-question
  documents_compared?: string[]; // For compare-documents
  sources_referenced?: string[]; // For ask-law-question
  chunks_found?: number; // For ask-law-question
  jurisdiction?: string; // For ask-law-question
  question?: string;
  criteria?: string;
  document_count?: number;
  document_id?: string; // For review-contract
  filename?: string; // For review-contract
  document_size?: number;
  collection?: string;
  [key: string]: any; // Flexible for future additions
}
