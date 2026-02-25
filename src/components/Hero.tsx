import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8"
        >
          <Sparkles className="w-3 h-3" />
          <span>Powered by Gemini 3 Flash</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Elevate Your Career with <br />
          <span className="text-gradient">AI-Powered Resume Analysis</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10"
        >
          Get instant ATS feedback, skill matching, and intelligent suggestions to land your dream job.
          Professional analysis for the modern job market.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-premium text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
          >
            Analyze Resume <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />
    </div>
  );
}
