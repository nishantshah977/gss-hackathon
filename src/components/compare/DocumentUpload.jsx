import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import handleSubmitCompare from "./upload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * DocumentUpload.jsx
 * - uses react-hook-form for file inputs
 * - uploads & compares via handleSubmitCompare (your upload.js)
 * - shows validation/API errors via toast (deduped with toastId)
 * - supports Tailwind dark mode
 */

const DocumentUpload = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState(null);

  // Helper to show error toast with dedupe via toastId
  const showError = (message, id) => {
    // use provided id or fallback to a stable hash (message)
    toast.error(message, { toastId: id ?? message, position: "top-right", autoClose: 5000 });
  };

  // Watch react-hook-form errors and show toast(s) once per error key
  useEffect(() => {
    if (!errors) return;

    // For each field error, show toast once (toastId prevents duplicates)
    Object.keys(errors).forEach((fieldKey) => {
      const msg = errors[fieldKey]?.message || "Invalid input";
      showError(msg, `form-error-${fieldKey}`);
    });
    // Only run when `errors` object changes
  }, [errors]);

  const onSubmit = async (data) => {
    setLoading(true);
    setComparisonResult(null);

    try {
      const res = await handleSubmitCompare(data);

      // handle standard backend response object
      if (res && typeof res === "object") {
        if (res.success) {
          // success: show result in UI (user said success handling later)
          setComparisonResult(res.comparison_result || "Comparison completed successfully!");
        } else if (res.detail) {
          // map common backend messages to user-friendly text
          let friendly = "";
          switch (res.detail) {
            case "At least 2 documents required for comparison":
              friendly = "Please upload both old and new documents.";
              break;
            case "Not all documents found":
              friendly = "Some documents could not be found on the server.";
              break;
            default:
              friendly = `Comparison failed: ${res.detail}`;
          }
          showError(friendly, `api-error-${res.detail}`);
        } else {
          showError("Unknown error occurred during comparison.", "api-error-unknown");
        }
      } else {
        // handle unexpected return types (string, null, etc.)
        const text = String(res ?? "Document upload failed");
        showError(text, "api-error-generic");
      }
    } catch (err) {
      // network or thrown error
      console.error("Error comparing documents:", err);
      const msg = err?.message ? `Error: ${err.message}` : "Network or server error occurred. Please try again.";
      showError(msg, "network-error");
    } finally {
      setLoading(false);
      reset(); // clears form inputs only
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-200 dark:bg-gray-800 transition-colors flex flex-col">
      <ToastContainer newestOnTop limit={3} />

      <div className="relative top-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
          Document Comparison
        </h1>

      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex justify-center flex-col gap-10">
  <div
    className="
      relative -top-12                     /* 👈 moves cards UP */
      grid grid-cols-1 md:grid-cols-2
      gap-12                               /* more space between cards */
      max-w-6xl                            /* wider cards */
      w-full
      px-6
      mx-auto
    "
  >
    {/* Old Document */}
    <div className="p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg min-h-[260px]">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
        Upload Old Document
      </h2>

      <label
        htmlFor="oldFile"
        className="block text-gray-700 dark:text-gray-300 font-medium mb-3"
      >
        Select Old Document
      </label>

      <input
        type="file"
        id="oldFile"
        {...register("oldFile", { required: "Please upload the old document." })}
        className="block w-full text-sm text-gray-500 dark:text-gray-200
          file:mr-4 file:py-3 file:px-6
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
          focus:outline-none focus:ring-2 focus:ring-blue-500
          dark:file:bg-blue-900 dark:file:text-blue-300 dark:hover:file:bg-blue-800"
      />
    </div>

    {/* New Document */}
    <div className="p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg min-h-[260px]">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
        Upload New Document
      </h2>

      <label
        htmlFor="newFile"
        className="block text-gray-700 dark:text-gray-300 font-medium mb-3"
      >
        Select New Document
      </label>

      <input
        type="file"
        id="newFile"
        {...register("newFile", { required: "Please upload the new document." })}
        className="block w-full text-sm text-gray-500 dark:text-gray-200
          file:mr-4 file:py-3 file:px-6
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
          focus:outline-none focus:ring-2 focus:ring-blue-500
          dark:file:bg-blue-900 dark:file:text-blue-300 dark:hover:file:bg-blue-800"
      />
    </div>
  </div>

  {/* Submit Button */}
  <div className="mt-6 text-center w-full">
    <button
      type="submit"
      disabled={loading}
      className={`bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Comparing..." : "Compare Documents"}
    </button>
  </div>
</form>


      {/* Comparison Result (kept for now, success toast handled later per your instruction) */}
      {comparisonResult && (
        <div className="mt-6 max-w-3xl mx-auto p-4 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Comparison Result:</h3>
          <pre className="whitespace-pre-wrap text-sm">{comparisonResult}</pre>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
