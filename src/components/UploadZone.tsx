import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "motion/react";
import { Upload, File, X, Loader2, Briefcase } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface UploadZoneProps {
  onAnalysisComplete: (result: any) => void;
}

export default function UploadZone({ onAnalysisComplete }: UploadZoneProps) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
  });

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Analysis failed");
      }

      const result = await response.json();
      onAnalysisComplete(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="glass rounded-3xl p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* File Upload Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Upload className="w-5 h-5 text-indigo-400" />
              Upload Resume
            </h3>
            
            <div
              {...getRootProps()}
              className={cn(
                "relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 p-10 flex flex-col items-center justify-center gap-4",
                isDragActive ? "border-indigo-500 bg-indigo-500/5" : "border-white/10 hover:border-white/20 hover:bg-white/5",
                file ? "border-emerald-500/50 bg-emerald-500/5" : ""
              )}
            >
              <input {...getInputProps()} />
              
              <AnimatePresence mode="wait">
                {file ? (
                  <motion.div
                    key="file"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4">
                      <File className="w-8 h-8 text-emerald-400" />
                    </div>
                    <p className="text-sm font-medium text-white mb-1 truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Upload className="w-8 h-8 text-zinc-400" />
                    </div>
                    <p className="text-sm font-medium text-white mb-1">
                      Drop your resume here
                    </p>
                    <p className="text-xs text-zinc-500">
                      Supports PDF and DOCX (Max 10MB)
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Job Description Section */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-400" />
              Job Description (Optional)
            </h3>
            
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here for tailored analysis and skill matching..."
              className="flex-1 w-full rounded-2xl bg-white/5 border border-white/10 p-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none min-h-[200px]"
            />
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}

        <div className="mt-12 flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing}
            className={cn(
              "px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-xl",
              !file || isAnalyzing
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : "bg-gradient-premium text-white hover:scale-105 active:scale-95 shadow-indigo-500/25"
            )}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Analyzing Your Resume...
              </>
            ) : (
              <>
                Start AI Analysis
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
