import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UploadZone from "./components/UploadZone";
import Dashboard from "./components/Dashboard";
import HistoryList from "./components/History";
import { AnalysisResult, HistoryItem } from "./types";

export default function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [view, setView] = useState<"home" | "dashboard">("home");

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setView("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setAnalysisResult(item.analysis);
    setView("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setView("home");
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <AnimatePresence mode="wait">
          {view === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <UploadZone onAnalysisComplete={handleAnalysisComplete} />
              <HistoryList onSelect={handleSelectHistory} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="pt-24"
            >
              {analysisResult && (
                <Dashboard
                  result={analysisResult}
                  onReset={handleReset}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} ResumeLens AI. All rights reserved.
            Built with Gemini 2.5 Flash.
          </p>
        </div>
      </footer>
    </div>
  );
}

