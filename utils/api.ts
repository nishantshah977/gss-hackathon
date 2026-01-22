const API_BASE = "http://localhost:8000";

// Types for streaming responses
export interface StreamMetadata {
  type: "metadata";
  [key: string]: any;
}

export interface StreamContent {
  type: "content";
  content: string;
}

export interface StreamDone {
  type: "done";
}

export interface StreamError {
  type: "error";
  message: string;
}

export type StreamEvent =
  | StreamMetadata
  | StreamContent
  | StreamDone
  | StreamError;

export interface StreamCallbacks {
  onMetadata?: (metadata: any) => void;
  onContent?: (content: string) => void;
  onDone?: () => void;
  onError?: (error: string) => void;
}

// Helper function to parse SSE stream
async function parseSSEStream(
  response: Response,
  callbacks: StreamCallbacks,
): Promise<void> {
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("No response body");
  }

  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");

      // Keep the last incomplete line in buffer
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6)) as StreamEvent;

            switch (data.type) {
              case "metadata":
                callbacks.onMetadata?.(data);
                break;
              case "content":
                callbacks.onContent?.(data.content);
                break;
              case "done":
                callbacks.onDone?.();
                break;
              case "error":
                callbacks.onError?.(data.message);
                break;
            }
          } catch (e) {
            console.error("Failed to parse SSE data:", e);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export const api = {
  // ============================================================================
  // DOCUMENT MANAGEMENT (Non-streaming)
  // ============================================================================

  async fetchDocuments() {
    const res = await fetch(`${API_BASE}/api/documents`);
    if (!res.ok) {
      throw new Error(`Failed to fetch documents: ${res.statusText}`);
    }
    return res.json();
  },

  async uploadDocument(file: File, metadata?: string) {
    const fd = new FormData();
    fd.append("file", file);
    if (metadata) {
      fd.append("metadata", metadata);
    }

    const res = await fetch(`${API_BASE}/api/upload-document`, {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      throw new Error(`Upload failed: ${res.statusText}`);
    }
    return res.json();
  },

  async getDocument(id: string) {
    const res = await fetch(`${API_BASE}/api/document/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch document: ${res.statusText}`);
    }
    return res.json();
  },

  async deleteDocument(id: string) {
    const res = await fetch(`${API_BASE}/api/document/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`Delete failed: ${res.statusText}`);
    }
    return res.json();
  },

  // ============================================================================
  // STREAMING ENDPOINTS
  // ============================================================================

  /**
   * Ask a question about specific documents (streaming)
   * @param documentIds Array of document IDs to analyze
   * @param question The legal question to ask
   * @param callbacks Handlers for stream events
   */
  async askQuestion(
    documentIds: string[],
    question: string,
    callbacks: StreamCallbacks,
  ): Promise<void> {
    const res = await fetch(`${API_BASE}/api/ask-question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ document_ids: documentIds, question }),
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.statusText}`);
    }

    await parseSSEStream(res, callbacks);
  },

  /**
   * Compare multiple documents (streaming)
   * @param documentIds Array of document IDs to compare (min 2)
   * @param criteria Comparison criteria (optional)
   * @param callbacks Handlers for stream events
   */
  async compareDocuments(
    documentIds: string[],
    criteria: string | null,
    callbacks: StreamCallbacks,
  ): Promise<void> {
    const res = await fetch(`${API_BASE}/api/compare-documents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        document_ids: documentIds,
        comparison_criteria: criteria,
      }),
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.statusText}`);
    }

    await parseSSEStream(res, callbacks);
  },

  /**
   * Ask a legal question (searches laws_constitution collection) (streaming)
   * @param question The legal question
   * @param jurisdiction Jurisdiction (e.g., "nepal", "usa", "general")
   * @param callbacks Handlers for stream events
   * @param topK Number of relevant chunks to retrieve (default: 5)
   */
  async askLawQuestion(
    question: string,
    jurisdiction: string,
    callbacks: StreamCallbacks,
    topK: number = 5,
  ): Promise<void> {
    const res = await fetch(`${API_BASE}/api/ask-law-question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, jurisdiction, top_k: topK }),
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.statusText}`);
    }

    await parseSSEStream(res, callbacks);
  },

  /**
   * Review a contract (streaming)
   * @param documentId The contract document ID
   * @param callbacks Handlers for stream events
   */
  async reviewContract(
    documentId: string,
    callbacks: StreamCallbacks,
  ): Promise<void> {
    const res = await fetch(`${API_BASE}/api/review-contract`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ document_id: documentId }),
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.statusText}`);
    }

    await parseSSEStream(res, callbacks);
  },

  // ============================================================================
  // HEALTH & STATUS
  // ============================================================================

  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) {
      throw new Error(`Health check failed: ${res.statusText}`);
    }
    return res.json();
  },

  async getStatus() {
    const res = await fetch(`${API_BASE}/`);
    if (!res.ok) {
      throw new Error(`Status check failed: ${res.statusText}`);
    }
    return res.json();
  },
};

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

/*

// Example 1: Upload a document
try {
  const result = await api.uploadDocument(file, "Employment contract 2024");
  console.log("Uploaded:", result.document_id);
} catch (error) {
  console.error("Upload failed:", error);
}

// Example 2: Ask a question with streaming
let fullAnswer = "";

await api.askQuestion(
  ["doc-id-1", "doc-id-2"],
  "What are the termination clauses?",
  {
    onMetadata: (meta) => {
      console.log("Documents used:", meta.documents_used);
    },
    onContent: (content) => {
      fullAnswer += content;
      console.log("Streaming:", content);
      // Update UI here: setText(fullAnswer)
    },
    onDone: () => {
      console.log("Complete answer:", fullAnswer);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  }
);

// Example 3: Ask a law question
let legalAnswer = "";

await api.askLawQuestion(
  "What are the rights of tenants in Nepal?",
  "nepal",
  {
    onMetadata: (meta) => {
      console.log("Sources:", meta.sources_referenced);
      console.log("Chunks found:", meta.chunks_found);
    },
    onContent: (content) => {
      legalAnswer += content;
      // Update UI in real-time
    },
    onDone: () => {
      console.log("Legal research complete");
    },
    onError: (error) => {
      console.error("Legal query failed:", error);
    },
  },
  5 // top_k
);

// Example 4: Compare documents
let comparison = "";

await api.compareDocuments(
  ["contract-1", "contract-2"],
  "payment terms and liability clauses",
  {
    onMetadata: (meta) => {
      console.log("Comparing:", meta.documents_compared);
    },
    onContent: (content) => {
      comparison += content;
      // Update UI
    },
    onDone: () => {
      console.log("Comparison complete");
    },
    onError: (error) => {
      console.error("Comparison failed:", error);
    },
  }
);

// Example 5: Review a contract
let review = "";

await api.reviewContract("contract-id-123", {
  onMetadata: (meta) => {
    console.log("Reviewing:", meta.filename);
  },
  onContent: (content) => {
    review += content;
    // Update UI with streaming review
  },
  onDone: () => {
    console.log("Contract review complete");
  },
  onError: (error) => {
    console.error("Review failed:", error);
  },
});

// Example 6: React component usage
function LegalAssistant() {
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAskQuestion = async (question: string) => {
    setIsLoading(true);
    setAnswer("");

    try {
      await api.askLawQuestion(
        question,
        "nepal",
        {
          onContent: (content) => {
            setAnswer((prev) => prev + content);
          },
          onDone: () => {
            setIsLoading(false);
          },
          onError: (error) => {
            console.error(error);
            setIsLoading(false);
          },
        }
      );
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => handleAskQuestion("What is the legal marriage age?")}>
        Ask Question
      </button>
      {isLoading && <div>Loading...</div>}
      <div>{answer}</div>
    </div>
  );
}

*/
