import React from "react";
import Link from "next/link";
import { Scale, FileText, MessageSquare, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neutral-900 dark:bg-white rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-white dark:text-neutral-900" />
            </div>
            <span className="text-lg font-semibold">Mero Lawyer</span>
          </div>
          <Link href="/lawyer">
            <button className="px-5 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition">
              Get Started
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content - Centered */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 overflow-auto">
        <div className="w-full max-w-6xl">
          <div className="text-center space-y-8 mb-12">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Legal clarity,
                <br />
                simplified
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Get clear answers to legal questions, analyze documents, and
                understand constitutional matters with ease.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/lawyer">
                <button className="flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition">
                  <Scale className="w-4 h-4" />
                  Start Chat
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/lawyer?tab=compare">
                <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition">
                  <FileText className="w-4 h-4" />
                  Compare Documents
                </button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              {
                icon: Scale,
                title: "Ask Questions",
                description: "Get instant answers with clear responses.",
              },
              {
                icon: FileText,
                title: "Compare Documents",
                description: "See differences with detailed analysis.",
              },
              {
                icon: MessageSquare,
                title: "Simple Interface",
                description: "Navigate easily with intuitive design.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition"
              >
                <div className="w-10 h-10 bg-neutral-50 dark:bg-neutral-800 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-neutral-900 dark:text-white" />
                </div>
                <h3 className="text-base font-semibold mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            © 2025 Mero Lawyer
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
