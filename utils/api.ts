const API_BASE = "http://localhost:8000";

export const api = {
  async fetchDocuments() {
    const res = await fetch(`${API_BASE}/api/documents`);
    return res.json();
  },

  async uploadDocument(file: File) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`${API_BASE}/api/upload-document`, {
      method: "POST",
      body: fd,
    });
    return res.json();
  },

  async getDocument(id: string) {
    const res = await fetch(`${API_BASE}/api/document/${id}`);
    return res.json();
  },

  async deleteDocument(id: string) {
    const res = await fetch(`${API_BASE}/api/document/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },

  async askQuestion(documentIds: string[], question: string) {
    const res = await fetch(`${API_BASE}/api/ask-question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ document_ids: documentIds, question }),
    });
    return res.json();
  },

  async compareDocuments(documentIds: string[], criteria: string) {
    const res = await fetch(`${API_BASE}/api/compare-documents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        document_ids: documentIds,
        comparison_criteria: criteria,
      }),
    });
    return res.json();
  },

  async askLawQuestion(question: string, jurisdiction = "nepal") {
    const res = await fetch(`${API_BASE}/api/ask-law-question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, jurisdiction }),
    });
    return res.json();
  },
};
