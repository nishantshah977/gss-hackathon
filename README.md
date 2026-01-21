# Document Analysis API

A powerful FastAPI-based document analysis system that uses OCR, vector embeddings, and AI to process, compare, and answer questions about uploaded documents. Includes specialized legal/constitutional document querying capabilities.

## Features

- 📄 **Document Upload & OCR**: Upload images, PDFs, and text files with automatic text extraction using Tesseract OCR
- 🔍 **Semantic Search**: Vector-based document search powered by Milvus and sentence transformers
- 💬 **Question Answering**: Ask natural language questions about your documents
- 📊 **Document Comparison**: Compare multiple documents with AI-powered analysis
- ⚖️ **Legal Document Queries**: Specialized system for laws and constitutional documents
- 🗄️ **Dual Storage**: MongoDB for metadata and full text, Milvus for vector embeddings
- 🤖 **AI-Powered**: Uses OpenAI-compatible API for intelligent responses

## Tech Stack

- **FastAPI**: High-performance async web framework
- **Milvus**: Vector database for semantic search
- **MongoDB**: Document storage and metadata management
- **Pytesseract**: OCR for image and PDF text extraction
- **Sentence Transformers**: Generate embeddings (all-MiniLM-L6-v2)
- **OpenAI API**: Language model for question answering and analysis

## Prerequisites

### System Requirements

1. **Python 3.8+**
2. **Tesseract OCR**
   - Windows: Download from [GitHub](https://github.com/UB-Mannheim/tesseract/wiki)
   - macOS: `brew install tesseract`
   - Linux: `sudo apt-get install tesseract-ocr`

3. **MongoDB**
   - Install from [MongoDB Downloads](https://www.mongodb.com/try/download/community)
   - Or use Docker: `docker run -d -p 27017:27017 mongo:latest`

4. **Milvus**
   - **Option 1 - Docker (Recommended)**:
     ```bash
     wget https://github.com/milvus-io/milvus/releases/download/v2.3.0/milvus-standalone-docker-compose.yml -O docker-compose.yml
     docker-compose up -d
     ```
   - **Option 2 - Milvus Lite**:
     ```bash
     pip install milvus
     ```

## Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd gss-backend
```

### 2. Create Virtual Environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Create requirements.txt

If you don't have one, create it with:

```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
pytesseract==0.3.10
pillow==10.1.0
pymilvus==2.3.3
motor==3.3.2
httpx==0.25.2
pdf2image==1.16.3
python-multipart==0.0.6
sentence-transformers==2.2.2
pydantic==2.5.0
pydantic-settings==2.1.0
```

### 5. Configure Tesseract Path

Edit `main.py` and set your Tesseract path:

```python
# Windows example
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# macOS/Linux (usually in PATH, no need to set)
# pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'
```

### 6. Set Environment Variables (Optional)

```bash
# .env file
MONGO_URL=mongodb://localhost:27017
MILVUS_HOST=localhost
MILVUS_PORT=19530
```

## Running the Application

### Start the Server

```bash
python main.py
```

Or with uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`

### Access API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### 1. Upload Document

Upload and process a document with OCR.

```bash
POST /api/upload-document
```

**Example:**

```bash
curl -X POST "http://localhost:8000/api/upload-document" \
  -F "file=@document.pdf" \
  -F "metadata=Project report"
```

**Response:**

```json
{
  "success": true,
  "document_id": "uuid-here",
  "filename": "document.pdf",
  "text_length": 1500,
  "message": "Document uploaded and processed successfully"
}
```

### 2. Ask Question About Documents

Ask questions about specific uploaded documents.

```bash
POST /api/ask-question
```

**Example:**

```bash
curl -X POST "http://localhost:8000/api/ask-question" \
  -H "Content-Type: application/json" \
  -d '{
    "document_ids": ["uuid-1", "uuid-2"],
    "question": "What are the main findings?"
  }'
```

**Response:**

```json
{
  "success": true,
  "question": "What are the main findings?",
  "answer": "Based on the documents...",
  "documents_used": ["document1.pdf", "document2.pdf"]
}
```

### 3. Compare Documents

Compare multiple documents with AI analysis.

```bash
POST /api/compare-documents
```

**Example:**

```bash
curl -X POST "http://localhost:8000/api/compare-documents" \
  -H "Content-Type: application/json" \
  -d '{
    "document_ids": ["uuid-1", "uuid-2"],
    "comparison_criteria": "differences in methodology"
  }'
```

### 4. Ask Legal Question

Query about laws and constitutional matters.

```bash
POST /api/ask-law-question
```

**Example:**

```bash
curl -X POST "http://localhost:8000/api/ask-law-question" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What are the requirements for citizenship?",
    "jurisdiction": "Nepal"
  }'
```

### 5. Upload Legal Document

Add legal documents to the specialized legal database.

```bash
POST /api/upload-legal-document
```

**Example:**

```bash
curl -X POST "http://localhost:8000/api/upload-legal-document" \
  -F "file=@constitution.pdf" \
  -F "source=Nepal Constitution 2015" \
  -F "jurisdiction=Nepal"
```

### 6. List Documents

Get all uploaded documents.

```bash
GET /api/documents
```

### 7. Delete Document

Remove a document from the system.

```bash
DELETE /api/document/{document_id}
```

## Supported File Types

- **Images**: PNG, JPG, JPEG, TIFF, BMP (with OCR)
- **Text**: TXT, MD
- **PDF**: Converted to images and processed with OCR

## Architecture

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│       FastAPI Server            │
│  ┌──────────────────────────┐  │
│  │  Document Upload & OCR   │  │
│  │  (Pytesseract)           │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │  Embedding Generation    │  │
│  │  (Sentence Transformers) │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │  Question Answering      │  │
│  │  (OpenAI API)            │  │
│  └──────────────────────────┘  │
└────────┬──────────────┬─────────┘
         │              │
    ┌────▼────┐    ┌───▼────┐
    │ MongoDB │    │ Milvus │
    │(Metadata)│   │(Vectors)│
    └─────────┘    └────────┘
```

## Configuration

### Custom LLM Endpoint

The default endpoint is `https://free-llm-ai.onrender.com/v1/chat/completions`. To use your own:

```python
# In main.py, modify the call_llm function
response = await client.post(
    "YOUR_OPENAI_COMPATIBLE_ENDPOINT",
    json={...}
)
```

### Embedding Model

Change the embedding model in `main.py`:

```python
embedding_model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
EMBEDDING_DIM = 384  # Update dimension accordingly
```

### MongoDB Connection

```python
MONGO_URL = "mongodb://username:password@host:port"
```

## Troubleshooting

### Tesseract Not Found

**Error:** `TesseractNotFoundError`

**Solution:** Install Tesseract and set the path in `main.py`

### Milvus Connection Failed

**Error:** `Failed to connect to Milvus`

**Solution:**

- Ensure Milvus is running: `docker-compose ps`
- Check connection details in environment variables

### MongoDB Connection Error

**Solution:**

- Start MongoDB: `sudo systemctl start mongod` (Linux)
- Or: `brew services start mongodb-community` (macOS)

### PDF Processing Issues

**Error:** `PDF processing requires pdf2image library`

**Solution:**

```bash
pip install pdf2image

# Also install poppler:
# Windows: Download from https://github.com/oschwartz10612/poppler-windows/releases/
# macOS: brew install poppler
# Linux: sudo apt-get install poppler-utils
```

### Memory Issues with Large Documents

For large documents, consider:

- Chunking text before embedding
- Increasing system RAM
- Using a smaller embedding model

## Performance Optimization

1. **Batch Processing**: Upload multiple documents via script
2. **Caching**: Implement Redis for frequently accessed results
3. **Async Processing**: Use Celery for background OCR processing
4. **Index Tuning**: Adjust Milvus index parameters for your use case

## Security Considerations

⚠️ **Important for Production:**

- Add authentication (JWT, OAuth2)
- Implement rate limiting
- Validate and sanitize all inputs
- Use HTTPS in production
- Restrict file upload sizes
- Implement access control for documents

## Example Usage with Python

```python
import requests

# Upload a document
with open('document.pdf', 'rb') as f:
    response = requests.post(
        'http://localhost:8000/api/upload-document',
        files={'file': f},
        data={'metadata': 'Research paper'}
    )
    doc_id = response.json()['document_id']

# Ask a question
response = requests.post(
    'http://localhost:8000/api/ask-question',
    json={
        'document_ids': [doc_id],
        'question': 'What is the main conclusion?'
    }
)
print(response.json()['answer'])
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:

- Create an issue on GitHub
- Contact: your-email@example.com

## Roadmap

- [ ] Add support for DOCX files
- [ ] Implement user authentication
- [ ] Add document versioning
- [ ] Create web interface
- [ ] Support for more languages in OCR
- [ ] Export analysis results to PDF/DOCX
- [ ] Real-time collaboration features

## Acknowledgments

- FastAPI for the excellent web framework
- Milvus for vector database capabilities
- Tesseract for OCR functionality
- Anthropic for the Claude AI inspiration

---

**Built with ❤️ for document analysis and legal research**
