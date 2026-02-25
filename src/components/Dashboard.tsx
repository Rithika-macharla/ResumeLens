import { motion } from "motion/react";
import {
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Target,
  Award,
  BookOpen,
  Download,
  Share2,
  RefreshCw
} from "lucide-react";
import { AnalysisResult } from "../types";
import ScoreCard from "./ScoreCard";
import SkillMatch from "./SkillMatch";
import Suggestions from "./Suggestions";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface DashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function Dashboard({ result, onReset }: DashboardProps) {
  const handleDownloadPDF = async () => {
    const element = document.getElementById("dashboard-content");
    if (!element) return;

    const canvas = await html2canvas(element, {
      backgroundColor: "#030303",
      scale: 2,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`ResumeLens-Analysis-${result.personalInfo.name || 'Report'}.pdf`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold mb-2"
          >
            Analysis Dashboard
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400"
          >
            Detailed breakdown for <span className="text-white font-medium">{result.personalInfo.name || 'Your Resume'}</span>
          </motion.p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="p-3 rounded-xl glass glass-hover text-zinc-400 hover:text-white"
            title="Start New Analysis"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export PDF
          </button>
        </div>
      </div>

      <div id="dashboard-content" className="space-y-8">
        {/* Top Section: Scores and Summary */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ScoreCard scores={result.scores} />
          </div>

          <div className="lg:col-span-2 glass rounded-3xl p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              Executive Summary
            </h3>
            <p className="text-zinc-400 leading-relaxed mb-8">
              {result.summary}
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <h4 className="text-emerald-400 font-medium mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Key Strengths
                </h4>
                <ul className="space-y-2">
                  {result.analysis.strengths.slice(0, 3).map((s, i) => (
                    <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                <h4 className="text-amber-400 font-medium mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Areas for Improvement
                </h4>
                <ul className="space-y-2">
                  {result.analysis.weaknesses.slice(0, 3).map((w, i) => (
                    <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Skills and Job Match */}
        <div className="grid lg:grid-cols-2 gap-8">
          <SkillMatch jobMatch={result.jobMatch} skills={result.sections.skills} />
          <Suggestions analysis={result.analysis} />
        </div>

        {/* Bottom Section: Experience and Education Preview */}
        <div className="glass rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              Extracted Content Preview
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Work Experience</h4>
              <div className="space-y-8">
                {result.sections.experience.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l border-white/10">
                    <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] rounded-full bg-indigo-500" />
                    <h5 className="font-semibold text-white">{exp.role}</h5>
                    <p className="text-sm text-indigo-400 mb-2">{exp.company} • {exp.duration}</p>
                    <p className="text-sm text-zinc-400 line-clamp-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6">Education & Projects</h4>
              <div className="space-y-6">
                {result.sections.education.map((edu, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <h5 className="font-semibold text-white">{edu.degree}</h5>
                    <p className="text-sm text-zinc-400">{edu.institution} • {edu.year}</p>
                  </div>
                ))}

                <div className="pt-4">
                  <h5 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Top Projects</h5>
                  <div className="grid gap-4">
                    {result.sections.projects.slice(0, 2).map((proj, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <h6 className="font-medium text-white mb-1">{proj.name}</h6>
                        <p className="text-xs text-zinc-400">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
