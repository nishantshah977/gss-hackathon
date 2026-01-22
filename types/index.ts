export type DocItem = {
  id: string;
  filename: string;
  upload_date: string;
  preview?: string;
  file_size?: number;
};

export type ChatMsg = {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  sources?: string[];
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
