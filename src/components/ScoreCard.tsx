import { motion } from "motion/react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

interface ScoreCardProps {
  scores: {
    overall: number;
    atsCompatibility: number;
    skillRelevance: number;
    experienceStrength: number;
    formatting: number;
  };
}

export default function ScoreCard({ scores }: ScoreCardProps) {
  const radarData = [
    { subject: "ATS", A: scores.atsCompatibility, fullMark: 100 },
    { subject: "Skills", A: scores.skillRelevance, fullMark: 100 },
    { subject: "Experience", A: scores.experienceStrength, fullMark: 100 },
    { subject: "Formatting", A: scores.formatting, fullMark: 100 },
  ];

  return (
    <div className="glass rounded-3xl p-8 h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Main Score Circle */}
      <div className="relative w-48 h-48 mb-8">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-white/5"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            strokeDasharray="283"
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 - (283 * scores.overall) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl font-bold text-white"
          >
            {scores.overall}
          </motion.span>
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Overall Score</span>
        </div>
      </div>

      {/* Radar Chart Breakdown */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 500 }} 
            />
            <Radar
              name="Score"
              dataKey="A"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Background Glow */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl -z-10" />
    </div>
  );
}
