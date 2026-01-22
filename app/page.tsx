// ==================== FILE: src/app/page.tsx ====================
"use client";

import React from "react";
import Link from "next/link";
import Spline from "@splinetool/react-spline";
import {
  Scale,
  FileText,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-hidden">
      {/* Spline Background - Full Page */}
      <div className="fixed inset-0 z-0">
        <Spline
          scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-6 md:px-12 lg:px-20 py-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">Mero Lawyer</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/features"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          <Link href="/chat">
            <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </Link>
        </header>

        {/* Hero Section */}
        <section className="flex-1 px-6 md:px-12 lg:px-20 py-20 flex items-center">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 rounded-full">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  AI-Powered Legal Assistant
                </span>
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Hello, <span className="text-blue-600">Sianturi</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  Understanding law shouldn't be complicated. Get AI-powered
                  legal insights, document analysis, and constitutional
                  guidance.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Case under legal review - 2-4 weeks",
                  "Documents received - Completed",
                  "Smart document comparison ready",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/chat">
                  <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-medium rounded-2xl hover:bg-blue-700 transition-colors">
                    <Scale className="w-5 h-5" />
                    Talk About Constitution
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>

                <Link href="/documents">
                  <button className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-600 dark:hover:border-blue-600 transition-colors">
                    <FileText className="w-5 h-5" />
                    Compare Documents
                  </button>
                </Link>
              </div>

              <div className="flex items-center gap-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div>
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Cases Handled
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold">5K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Documents
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold">99%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Success Rate
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Case Card */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-8 backdrop-blur-md bg-white/80 dark:bg-gray-900/80">
                {/* Case Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/50 rounded-xl flex items-center justify-center">
                      <Scale className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Case Status
                      </div>
                      <div className="font-semibold">Under Legal Review</div>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-lg border border-blue-200 dark:border-blue-900">
                    2-4 weeks
                  </div>
                </div>

                {/* Case Title */}
                <div className="mb-6 p-6 bg-blue-600 rounded-2xl">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Surgery Infection
                  </h3>
                  <div className="flex items-center gap-2 text-blue-100 text-sm">
                    <span>Emma Wilson</span>
                    <span>•</span>
                    <span>#MN-23109</span>
                  </div>
                </div>

                {/* Case Progress */}
                <div className="mb-6">
                  <div className="text-sm font-semibold mb-3">
                    Case Progress
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-950/50 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          Documents received
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Completed
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          Case under legal review
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          In Progress
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-400">
                          Decision: Accepted
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Pending
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="mb-6">
                  <div className="text-sm font-semibold mb-3">Documents</div>
                  <div className="space-y-2">
                    {[
                      {
                        name: "Medical report",
                        size: "2.4 MB",
                        date: "Jan 16, 2025",
                      },
                      {
                        name: "Hospital discharge",
                        size: "1.8 MB",
                        date: "Jan 15, 2025",
                      },
                      {
                        name: "Photos - post surgery",
                        size: "5.2 MB",
                        date: "Jan 14, 2025",
                      },
                    ].map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-800"
                      >
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-950/50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {doc.name}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            PDF • {doc.size} • {doc.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Section */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="font-semibold text-sm">Chat</span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900">
                      <div className="text-sm text-blue-900 dark:text-blue-100">
                        Reminder: Please upload your ID to proceed.
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        System
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="text-sm">
                          We've received your medical report. Thank you!
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          Emma Wilson • 2h
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Chat your legal team..."
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-blue-600 dark:focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 md:px-12 lg:px-20 py-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose Mero Lawyer?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Powerful features designed to make legal information accessible
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Scale,
                  title: "Ask Questions",
                  description:
                    "Get instant, AI-powered answers to your legal queries with accurate, easy-to-understand responses.",
                  color: "blue",
                },
                {
                  icon: FileText,
                  title: "Compare Documents",
                  description:
                    "Upload multiple documents and see differences clearly with AI-powered analysis and insights.",
                  color: "purple",
                },
                {
                  icon: MessageSquare,
                  title: "User-Friendly Design",
                  description:
                    "Navigate with ease using our intuitive dashboard, clean sidebar, and seamless experience.",
                  color: "green",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-600 dark:hover:border-blue-600 transition-colors"
                >
                  <div
                    className={`w-12 h-12 bg-${feature.color}-100 dark:bg-${feature.color}-950/50 rounded-xl flex items-center justify-center mb-6`}
                  >
                    <feature.icon
                      className={`w-6 h-6 text-${feature.color}-600`}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-12 lg:px-20 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="p-12 md:p-16 bg-blue-600 rounded-3xl text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Simplify Legal Matters?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust Mero Lawyer for clear,
                accurate legal guidance.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/chat">
                  <button className="px-8 py-4 bg-white text-blue-600 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                    Get Started Free
                  </button>
                </Link>
                <Link href="/about">
                  <button className="px-8 py-4 bg-transparent text-white font-medium rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transition-colors">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 md:px-12 lg:px-20 py-8 border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 Mero Lawyer. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
