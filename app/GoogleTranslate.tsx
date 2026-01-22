"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit: () => void;
  }
}

export default function GoogleTranslateWidget() {
  const [isTranslated, setIsTranslated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Safe global init - cast to any to avoid modifier conflict
    (window as any).googleTranslateElementInit = () => {
      try {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "ne,en",
              layout:
                (window.google.translate.TranslateElement as any)
                  .InlineLayout?.SIMPLE ?? 0,
              autoDisplay: false,
            },
            "google_translate_element"
          );
          // Longer delay to ensure element is fully ready
          setTimeout(() => setIsLoaded(true), 1000);
        }
      } catch (error) {
        console.error("Error initializing Google Translate:", error);
      }
    };

    // Add Google Translate script
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Hide default Google Translate UI
    const style = document.createElement("style");
    style.innerHTML = `
      .goog-te-banner-frame { display: none !important; }
      .goog-te-gadget-simple { display: none !important; }
      .goog-te-gadget { display: none !important; }
      body { top: 0 !important; }
      .goog-text-highlight { background-color: transparent !important; }
    `;
    document.head.appendChild(style);

    return () => {
      script.remove();
      style.remove();
    };
  }, []);

  const toggleTranslate = () => {
    try {
      // Find the select element
      const select = document.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement;
      
      if (!select) {
        console.warn("Google Translate select not found");
        return;
      }

      // Set the target language
      const targetLang = isTranslated ? "" : "ne";
      select.value = targetLang;

      // Create and dispatch multiple events to ensure translation
      const events = [
        new Event("change", { bubbles: true, cancelable: true }),
        new Event("input", { bubbles: true, cancelable: true }),
        new Event("touchstart", { bubbles: true, cancelable: true }),
        new Event("touchend", { bubbles: true, cancelable: true }),
      ];

      events.forEach((event) => {
        select.dispatchEvent(event);
      });

      // Also trigger click if available
      const options = select.querySelectorAll("option");
      options.forEach((opt) => {
        if (opt.value === targetLang) {
          opt.selected = true;
        }
      });

      // Update state
      setIsTranslated(!isTranslated);
      
      console.log(`Translation toggled to: ${targetLang || "English"}`);
    } catch (error) {
      console.error("Error toggling translate:", error);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={toggleTranslate}
        disabled={!isLoaded}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold
          rounded-lg transition-all duration-200 whitespace-nowrap
          ${
            isTranslated
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }
          disabled:opacity-40 disabled:cursor-not-allowed
        `}
        title={isTranslated ? "Show in English" : "Translate to Nepali (नेपाली)"}
      >
        <span className="text-sm">🌐</span>
        <span>{isTranslated ? "EN" : "नेपाली"}</span>
      </button>

      {/* Hidden Google Translate element */}
      <div id="google_translate_element" className="hidden" />
    </div>
  );
}