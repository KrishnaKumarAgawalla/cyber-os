import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";
import { useSystemData } from "../hooks/useSystemData";

export default function ProjectsContent() {
  const { memory } = useSystemData();

  const projects =
    memory
      ?.filter((item) => item.type === "PROJECT")
      .sort((a, b) => b.sort_date.localeCompare(a.sort_date)) || [];

  const githubIconUrl = memory?.find(item => item.id === "ASSET#GITHUB_ICON")?.url;

  if (!projects) return null;

  return (
    <div className="flex-1 overflow-y-auto p-6 grid gap-6">
      {projects.map((project, i) => {
        const IconComponent = (LucideIcons as any)[project.icon_type] || LucideIcons.Code2;
        
        // Status-based logic
        const isArchived = project.status === "Archived";
        const isActive = project.status === "Active";

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className={`group relative glass p-5 rounded-xl transition-all duration-300 border ${
              isArchived 
                ? "bg-white/5 border-white/5 opacity-50 hover:opacity-100 grayscale hover:grayscale-0" 
                : "bg-white/[0.02] border-white/10 hover:bg-white/5 hover:border-white/20"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div
              className={`p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors ${
                isActive ? "text-emerald-400" : "text-blue-400"
              }`}
              >
                <IconComponent size={20} />
              </div>
              <div className="flex gap-3">
                <a 
                  href={project.github_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-white/40 hover:text-white transition-colors"
                >
                  {githubIconUrl ? (
                    <img 
                      src={githubIconUrl} 
                      alt="GitHub" 
                      className="w-[18px] h-[18px] opacity-40 hover:opacity-100 transition-opacity" 
                    />
                  ) : (
                    <LucideIcons.Github size={18} />
                  )}
                </a>
                {project.live_url !== "#" && (
                  <a 
                    href={project.live_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-blue-400 transition-colors"
                  >
                    <LucideIcons.ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-white/90 mb-2 tracking-tight group-hover:text-white transition-colors">
              {project.title}
            </h3>
            {/* Status Badge */}
              <span className={`text-[9px] px-2 py-0.5 rounded-full border font-mono uppercase tracking-tighter ${
                isActive 
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                  : isArchived 
                    ? "bg-white/5 border-white/10 text-white/30"
                    : "bg-blue-500/10 border-blue-500/20 text-blue-400"
              }`}>
                {project.status}
              </span>
            </div>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, j) => (
                <span
                  key={j}
                  className="px-2 py-1 text-[10px] uppercase tracking-widest font-medium bg-white/5 border border-white/10 rounded text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
