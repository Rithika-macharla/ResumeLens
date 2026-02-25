import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { History, FileText, Calendar, ChevronRight } from "lucide-react";
import { HistoryItem } from "../types";

interface HistoryProps {
  onSelect: (item: HistoryItem) => void;
}

export default function HistoryList({ onSelect }: HistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch("/api/history");
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("Failed to fetch history", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;
  if (history.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-8">
        <History className="w-5 h-5 text-indigo-400" />
        <h3 className="text-xl font-semibold">Recent Analyses</h3>
      </div>

      <div className="grid gap-4">
        {history.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ x: 4 }}
            onClick={() => onSelect(item)}
            className="w-full text-left glass glass-hover rounded-2xl p-4 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                <FileText className="w-6 h-6 text-zinc-400 group-hover:text-indigo-400" />
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">{item.filename}</h4>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    Score: {item.score}
                  </span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
