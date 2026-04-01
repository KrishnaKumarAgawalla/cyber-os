import { motion } from "motion/react";
import { Code2, Database, Globe, Cpu, Shield, Zap } from "lucide-react";

const SKILL_GROUPS = [
  {
    title: "Frontend_Core",
    icon: <Globe size={18} />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "text-blue-400",
  },
  {
    title: "Backend_Infra",
    icon: <Database size={18} />,
    skills: ["Node.js", "PostgreSQL", "Redis", "GraphQL", "Docker"],
    color: "text-emerald-400",
  },
  {
    title: "System_Architecture",
    icon: <Cpu size={18} />,
    skills: ["Microservices", "Serverless", "AWS", "CI/CD", "Kubernetes"],
    color: "text-purple-400",
  },
  {
    title: "Security_Protocols",
    icon: <Shield size={18} />,
    skills: ["OAuth 2.0", "JWT", "Encryption", "Pen-Testing", "SSL/TLS"],
    color: "text-red-400",
  },
];

export default function SkillsContent() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SKILL_GROUPS.map((group, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl bg-white/5 ${group.color} group-hover:scale-110 transition-transform`}>
                {group.icon}
              </div>
              <h3 className="text-sm font-mono font-bold tracking-widest uppercase text-white/80">
                {group.title}
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill, j) => (
                <span
                  key={j}
                  className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-white/40 border border-white/5 hover:border-emerald-500/30 hover:text-emerald-400 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-4"
      >
        <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400">
          <Zap size={24} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Continuous Learning</h4>
          <p className="text-xs text-white/40 leading-relaxed">
            Currently exploring WebAssembly and Rust for high-performance edge computing modules.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
