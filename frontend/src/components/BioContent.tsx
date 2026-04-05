import { motion } from "motion/react";
import { User, Terminal as TerminalIcon, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { useSystemData } from "../hooks/useSystemData";

export default function BioContent() {
  const { memory } = useSystemData();
  const identity = memory?.find(item => item.id === "IDENTITY#PRIMARY");

  if (!identity) return null;

  return (
    <div className="p-6 h-full overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Stylized Terminal Identity Profile */}
        <div className="space-y-6">
          <div className="obsidian-card rounded-xl overflow-hidden">
            <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
              <TerminalIcon size={14} className="text-emerald-400" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">Identity_Profile.sys</span>
            </div>
            <div className="p-6 font-mono text-xs sm:text-sm space-y-4">
              <div className="flex gap-4">
                <span className="text-emerald-400/50">NAME:</span>
                <span className="text-emerald-400">{identity?.name || ""}</span>
              </div>
              <div className="flex gap-4">
                <span className="text-emerald-400/50">ROLE:</span>
                <span className="text-emerald-400">{identity?.role || ""}</span>
              </div>
              <div className="flex gap-4">
                <span className="text-emerald-400/50">ORG:</span>
                <span className="text-emerald-400">{identity?.org || ""}</span>
              </div>
              <div className="flex gap-4">
                <span className="text-emerald-400/50">LOC:</span>
                <span className="text-emerald-400">{identity?.loc || ""}</span>
              </div>
              <div className="pt-4 border-t border-white/5">
                <div className="text-emerald-400/30 mb-2">// SYSTEM_LOG</div>
                <div className="text-white/40 italic">{identity?.system_log || ""}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="obsidian-card p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <Briefcase size={20} className="text-emerald-400 mb-2" />
              <span className="text-[10px] text-white/40 uppercase tracking-tighter">Experience</span>
              <span className="text-lg font-bold text-white">{identity?.experience || ""}</span>
            </div>
            <div className="obsidian-card p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <GraduationCap size={20} className="text-emerald-400 mb-2" />
              <span className="text-[10px] text-white/40 uppercase tracking-tighter">Education</span>
              <span className="text-lg font-bold text-white">{identity?.education || ""}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Professional Bio */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <User size={24} className="text-emerald-400" />
              Professional Identity
            </h2>
            <div className="w-12 h-1 bg-emerald-500/50 rounded-full" />
          </div>

          <div className="space-y-4 text-white/70 leading-relaxed text-sm sm:text-base">
          {identity?.bio_segments?.map((paragraph: any[], pIdx: number) => (
              <p key={pIdx}>
                {paragraph.map((segment, sIdx) => (
                  <span 
                    key={sIdx} 
                    className={segment.highlight ? "text-emerald-400 font-medium" : ""}
                  >
                    {segment.text}
                  </span>
                ))}
              </p>
            ))}
          </div>

          <div className="pt-6">
            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-mono uppercase tracking-[0.2em]">
              <MapPin size={12} />
              Operational Status: {identity?.operational_status || "Inactive"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
