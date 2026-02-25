import { motion } from "motion/react";
import { ScanEye, Github, Twitter } from "lucide-react";

export default function Navbar() {
  const scrollToUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const scrollToHero = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToHero}>
            <div className="w-8 h-8 rounded-lg bg-gradient-premium flex items-center justify-center">
              <ScanEye className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">ResumeLens</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" onClick={scrollToUpload} className="hover:text-white transition-colors">Analyzer</a>
            <a href="#" onClick={scrollToUpload} className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
            <button onClick={scrollToUpload} className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
