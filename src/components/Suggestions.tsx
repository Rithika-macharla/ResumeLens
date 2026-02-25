import { motion } from "motion/react";
import { Sparkles, ArrowRight, Zap } from "lucide-react";

interface SuggestionsProps {
  analysis: {
    suggestions: string[];
    missingKeywords: string[];
    actionVerbImprovements: Array<{
      original: string;
      suggested: string;
    }>;
  };
}

export default function Suggestions({ analysis }: SuggestionsProps) {
  return (
    <div className="glass rounded-3xl p-8">
      <h3 className="text-xl font-semibold mb-8 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-purple-400" />
        AI Optimization Tips
      </h3>

      <div className="space-y-8">
        {/* General Suggestions */}
        <div className="space-y-4">
          {analysis.suggestions.map((suggestion, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">{suggestion}</p>
            </div>
          ))}
        </div>

        {/* Action Verb Improvements */}
        {analysis.actionVerbImprovements.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              Action Verb Upgrades
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {analysis.actionVerbImprovements.map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-zinc-500 line-through">{item.original}</span>
                    <ArrowRight className="w-3 h-3 text-zinc-600" />
                    <span className="text-sm font-bold text-yellow-400">{item.suggested}</span>
                  </div>
                  <p className="text-[10px] text-zinc-500">Stronger impact verb</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Missing Keywords */}
        <div>
          <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Target Keywords to Add</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.missingKeywords.map((keyword, i) => (
              <span 
                key={i} 
                className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300"
              >
                + {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
