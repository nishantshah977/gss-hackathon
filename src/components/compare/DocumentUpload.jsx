import React, { useState } from "react";
import { useForm } from "react-hook-form";
import handleSubmitCompare from "./upload";

const DocumentUpload = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");
    setComparisonResult(null);

    try {
      const res = await handleSubmitCompare(data);
      console.log(res)
      if (res.success) {
        setComparisonResult(res.comparison_result || "Comparison completed successfully!");
      } else if (res.detail) {
        // Map backend error codes to friendly messages
        switch (res.detail) {
          case "At least 2 documents required for comparison":
            setErrorMessage("Please upload both old and new documents.");
            break;
          case "Not all documents found":
            setErrorMessage("Some documents could not be found on the server.");
            break;
          default:
            setErrorMessage(`Comparison failed: ${res.detail}`);
        }
      } else {
        setErrorMessage("Unknown error occurred during comparison.");
      }
    } catch (err) {
      console.error("Error comparing documents:", err);
      setErrorMessage("Network or server error occurred. Please try again.");
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mt-10 mb-10">
        Document Comparison
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center h-full">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full pl-20 mx-auto"
          style={{ paddingTop: "100px" }}
        >
          {/* Old Document */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
              Upload Old Document
            </h2>
            <div>
              <label htmlFor="oldFile" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Select Old Document
              </label>
              <input
                type="file"
                id="oldFile"
                {...register("oldFile", { required: "Please upload the old document." })}
                className="block w-full text-sm text-gray-500 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:file:bg-blue-900 dark:file:text-blue-300 dark:hover:file:bg-blue-800"
              />
              {errors.oldFile && <p className="text-red-500 text-sm mt-2">{errors.oldFile.message}</p>}
            </div>
          </div>

          {/* New Document */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
              Upload New Document
            </h2>
            <div>
              <label htmlFor="newFile" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Select New Document
              </label>
              <input
                type="file"
                id="newFile"
                {...register("newFile", { required: "Please upload the new document." })}
                className="block w-full text-sm text-gray-500 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:file:bg-blue-900 dark:file:text-blue-300 dark:hover:file:bg-blue-800"
              />
              {errors.newFile && <p className="text-red-500 text-sm mt-2">{errors.newFile.message}</p>}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10 text-center">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Comparing..." : "Compare Documents"}
          </button>
        </div>
      </form>

      {/* Error message */}
      {errorMessage && (
        <div className="mt-6 max-w-3xl mx-auto p-4 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-lg shadow">
          {errorMessage}
        </div>
      )}

      {/* Comparison Result */}
      {comparisonResult && (
        <div className="mt-6 max-w-3xl mx-auto p-4 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Comparison Result:</h3>
          <p className="whitespace-pre-line">{comparisonResult}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
