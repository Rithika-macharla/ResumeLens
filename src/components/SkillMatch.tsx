import { motion } from "motion/react";
import { Target, CheckCircle2, XCircle, Lightbulb } from "lucide-react";

interface SkillMatchProps {
  jobMatch: {
    matchPercentage: number;
    missingSkills: string[];
    recommendedSkills: string[];
  };
  skills: string[];
}

export default function SkillMatch({ jobMatch, skills }: SkillMatchProps) {
  return (
    <div className="glass rounded-3xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-400" />
          Skill Match Analysis
        </h3>
        <div className="px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold">
          {jobMatch.matchPercentage}% Match
        </div>
      </div>

      <div className="space-y-8">
        {/* Identified Skills */}
        <div>
          <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Identified Skills</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span 
                key={i} 
                className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        {jobMatch.missingSkills.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400" />
              Missing from Job Description
            </h4>
            <div className="flex flex-wrap gap-2">
              {jobMatch.missingSkills.map((skill, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 rounded-lg bg-red-500/5 border border-red-500/10 text-xs text-red-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Skills */}
        <div>
          <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Recommended to Learn
          </h4>
          <div className="grid gap-3">
            {jobMatch.recommendedSkills.map((skill, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-sm text-zinc-300">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
