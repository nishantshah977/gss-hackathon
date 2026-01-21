export default async function handleSubmitCompare (data) {
    try {
    const oldFile = data.oldFile[0];
    const newFile = data.newFile[0];

    // 1️⃣ Upload files
    const formData1 = new FormData();
    formData1.append("file", oldFile);

    const res1 = await fetch("http://localhost:8000/api/upload", {
      method: "POST",
      body: formData1,
    });
    const oldDoc = await res1.json(); // { document_id: "uuid-1" }

    const formData2 = new FormData();
    formData2.append("file", newFile);

    const res2 = await fetch("http://localhost:8000/api/upload", {
      method: "POST",
      body: formData2,
    });
    const newDoc = await res2.json(); // { document_id: "uuid-2" }

    // 2️⃣ Call compare API
    const compareRes = await fetch("http://localhost:8000/api/compare-documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        document_ids: [oldDoc.document_id, newDoc.document_id],
        comparison_criteria: "differences in methodology",
      }),
    });

    const result = await compareRes.json();

    // 3️⃣ Show result
    console.log("Comparison Result:", result);
    alert("Check console for comparison result");
    return result

    reset();
  } catch (err) {
    return "Document upload failed"
  }
}