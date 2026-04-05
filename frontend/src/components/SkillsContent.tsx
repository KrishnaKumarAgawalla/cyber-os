import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";
import { useSystemData } from "../hooks/useSystemData";

export default function SkillsContent() {
  const { memory } = useSystemData();

  const skillGroups =
    memory
      ?.filter((item) => item.type === "SKILL")
      .sort((a, b) => a.sort_order - b.sort_order) || [];

  const learningStatus = memory?.find(
    (item) => item.type === "LEARNING_STATUS",
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {skillGroups.map((group, i) => {
          const IconComponent = (LucideIcons as any)[group.icon_type] || LucideIcons.Code2;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-2 rounded-xl bg-white/5 ${group.color_class} group-hover:scale-110 transition-transform group-hover:bg-white/10 transition-colors`}
                >
                  <IconComponent size={18} />
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
          );
        })}
      </div>

      {learningStatus && (<motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-4  "
      >
        <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
          {(() => {
              const StatusIcon = (LucideIcons as any)[learningStatus.status_icon] || LucideIcons.Zap;
              return <StatusIcon size={24} />;
            })()}
        </div>
        <div className="relative z-10">
            <h4 className="text-[10px] font-bold text-emerald-400/80 mb-1 uppercase tracking-[0.3em]">System_Update</h4>
            <p className="text-xs text-white/50 leading-relaxed font-mono italic">
              {learningStatus.current_focus}
            </p>
          </div>
      </motion.div>)}
    </div>
  );
}
