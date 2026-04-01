import { motion } from "motion/react";
import { ExternalLink, Github, Layers, Zap, Shield } from "lucide-react";

const PROJECTS = [
  {
    title: "Project: NEON-CORE",
    description: "A decentralized identity management system built on the blockchain with real-time analytics.",
    tags: ["React", "Solidity", "Tailwind"],
    icon: <Zap className="text-blue-400" />,
    link: "#",
  },
  {
    title: "Project: SHIELD-OS",
    description: "A secure, encrypted operating system environment for sensitive data processing.",
    tags: ["Rust", "Wasm", "TypeScript"],
    icon: <Shield className="text-emerald-400" />,
    link: "#",
  },
  {
    title: "Project: GRID-SYNC",
    description: "Real-time collaborative workspace with low-latency synchronization and AI-driven insights.",
    tags: ["Node.js", "WebSockets", "GenAI"],
    icon: <Layers className="text-purple-400" />,
    link: "#",
  },
];

export default function ProjectsContent() {
  return (
    <div className="flex-1 overflow-y-auto p-6 grid gap-6">
      {PROJECTS.map((project, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="group relative glass p-5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-white/20"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
              {project.icon}
            </div>
            <div className="flex gap-3">
              <button className="text-white/40 hover:text-white/80 transition-colors">
                <Github size={18} />
              </button>
              <button className="text-white/40 hover:text-white/80 transition-colors">
                <ExternalLink size={18} />
              </button>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white/90 mb-2 tracking-tight group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-white/60 mb-4 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, j) => (
              <span key={j} className="px-2 py-1 text-[10px] uppercase tracking-widest font-medium bg-white/5 border border-white/10 rounded text-white/40">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
