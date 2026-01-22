import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import handleSubmitCompare from "./upload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function DocumentUpload() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  // toast helper (dedupes using toastId)
  const showError = (message, id) => {
    toast.error(message, { toastId: id ?? message, position: "top-right", autoClose: 5000 });
  };

  // show validation errors (once per error key)
  useEffect(() => {
    if (!errors) return;
    Object.keys(errors).forEach((fieldKey) => {
      const msg = errors[fieldKey]?.message || "Invalid input";
      showError(msg, `form-error-${fieldKey}`);
    });
  }, [errors]);

  // Close overlay handler — also reset the form so inputs clear after user sees result
  const closeOverlay = useCallback(() => {
    setShowOverlay(false);
    setComparisonResult(null);
    reset(); // clear file inputs AFTER user has seen the result
  }, [reset]);

  // allow ESC to close overlay
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && showOverlay) closeOverlay();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showOverlay, closeOverlay]);

  const onSubmit = async (data) => {
    setLoading(true);
    setComparisonResult(null);

    // Basic guard (react-hook-form required already checks, but safe)
    if (!data.oldFile?.length || !data.newFile?.length) {
      showError("Please select both documents before comparing.", "missing-files");
      setLoading(false);
      return;
    }

    try {
      const res = await handleSubmitCompare(data);

      if (res && typeof res === "object") {
        if (res.success) {
          setComparisonResult(res.comparison_result ?? "Comparison completed successfully.");
          setShowOverlay(true);
        } else if (res.detail) {
          // friendly mapping for known messages
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
        // handle unexpected return values gracefully
        showError(String(res ?? "Document upload failed"), "api-error-generic");
      }
    } catch (err) {
      console.error("Error comparing documents:", err);
      const msg = err?.message ? `Error: ${err.message}` : "Network or server error occurred. Please try again.";
      showError(msg, "network-error");
    } finally {
      // stop loading — do NOT reset() here so user can see result in overlay
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-800 transition-colors py-16 px-4 md:px-12 lg:px-20 flex items-start md:items-center">
    <ToastContainer newestOnTop limit={3} />

    {/* Center card - slightly elevated on desktop so page doesn't look empty */}
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
        {/* Header */}
        <div className="px-6 md:px-10 py-8 md:py-10 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
                Document Comparison
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 max-w-2xl">
                Upload two documents and get an AI-powered comparison that highlights differences and summarizes changes.
              </p>
            </div>

            {/* Quick action on header for wide screens (keeps UI compact) */}
            <div className="hidden md:flex items-center gap-3">
              <div className="text-xs text-gray-500 dark:text-gray-400">Accepted: PDF, DOC, DOCX, TXT</div>
            </div>
          </div>
        </div>

        {/* Form area */}
        <section className="px-6 md:px-10 py-8 md:py-10">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            {/* Grid: stacked on mobile, two columns on md+; cards larger on web */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Old Document Card */}
              <div className="p-6 md:p-8 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col justify-between min-h-60">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    Old Document
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    The previous version or original file you want to compare.
                  </p>
                </div>

                <div className="mt-2 flex items-center gap-4">
                  <label
                    htmlFor="oldFile"
                    className="inline-flex items-center gap-3 rounded-md cursor-pointer px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 hover:shadow-sm transition"
                  >
                    <input
                      id="oldFile"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      {...register("oldFile", { required: "Please upload the old document." })}
                      className="sr-only"
                    />
                    <span className="text-sm">Choose file</span>
                  </label>

                  {/* Filename preview placeholder (keeps layout neat on web) */}
                  <div className="flex-1 text-sm text-gray-600 dark:text-gray-400 truncate">
                    {/* show filename if you add a state for it; placeholder keeps spacing */}
                    No file selected
                  </div>
                </div>
              </div>

              {/* New Document Card */}
              <div className="p-6 md:p-8 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col justify-between min-h-60">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    New Document
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    The updated or revised version to compare against the old file.
                  </p>
                </div>

                <div className="mt-2 flex items-center gap-4">
                  <label
                    htmlFor="newFile"
                    className="inline-flex items-center gap-3 rounded-md cursor-pointer px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 hover:shadow-sm transition"
                  >
                    <input
                      id="newFile"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      {...register("newFile", { required: "Please upload the new document." })}
                      className="sr-only"
                    />
                    <span className="text-sm">Choose file</span>
                  </label>

                  <div className="flex-1 text-sm text-gray-600 dark:text-gray-400 truncate">
                    No file selected
                  </div>
                </div>
              </div>
            </div>

            {/* Submit area - align right on wide screens, centered on mobile */}
            <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4">
              <div className="hidden md:block text-sm text-gray-600 dark:text-gray-400">
                We securely upload your files and generate an AI-powered comparison.
              </div>

              <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center gap-3 justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition
                    ${loading ? "opacity-60 cursor-not-allowed" : ""}
                  `}
                >
                  {loading && (
                    <svg
                      className="animate-spin -ml-1 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                  )}
                  <span>{loading ? "Comparing..." : "Compare Documents"}</span>
                </button>

                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 md:ml-3 text-center md:text-left">
                  Tip: Clear filenames help the AI reference files more accurately.
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>

    {/* Result overlay */}
    {showOverlay && (
      <div
        className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-6"
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl p-6 relative">
          <button
            aria-label="Close result"
            onClick={closeOverlay}
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          >
            ✕
          </button>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Comparison Result</h2>

          <div className="max-h-[60vh] overflow-auto rounded-md border border-gray-100 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
            {comparisonResult ?? "No result was returned from the server."}
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              onClick={() => closeOverlay()}
              className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}