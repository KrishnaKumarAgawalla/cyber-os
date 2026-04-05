import { motion } from "motion/react";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { useSystemData } from "../hooks/useSystemData";

const EXPERIENCE = [
  {
    company: "TECH_CORP_GLOBAL",
    role: "Senior Systems Architect",
    period: "2024 - PRESENT",
    description:
      "Leading the development of next-gen neural interfaces and distributed ledger systems.",
    achievements: [
      "Reduced system latency by 40%",
      "Implemented quantum-resistant encryption",
    ],
  },
  {
    company: "NEO_SOFT_SYSTEMS",
    role: "Full Stack Engineer",
    period: "Aug 2022 - Sep 2024",
    description:
      "Developed high-performance web applications using React and Node.js for fintech clients.",
    achievements: [
      "Scaled user base to 1M+",
      "Optimized database queries for 2x speed",
    ],
  },
  {
    company: "CYBER_DYNAMICS",
    role: "Junior Developer",
    period: "2020 - 2022",
    description:
      "Maintained legacy systems while transitioning to modern microservices architecture.",
    achievements: ["Automated CI/CD pipelines", "Resolved 500+ critical bugs"],
  },
];

export default function ExperienceContent() {
  const { memory } = useSystemData();

  const experience =
    memory
      ?.filter((item) => item.type === "EXPERIENCE")
      .sort((a, b) => {
        return b.sort_date.localeCompare(a.sort_date);
      }) || [];

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8">
      {experience.map((exp, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="relative pl-8 border-l border-white/10"
        >
          <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {exp.role}
              </h3>
              <div className="flex items-center gap-2 text-emerald-400/80 text-xs font-mono uppercase tracking-widest">
                <Briefcase size={12} />
                {exp.company}
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono bg-white/5 px-2 py-1 rounded border border-white/5">
              <Calendar size={12} />
              {exp.period}
            </div>
          </div>

          <p className="text-sm text-white/60 leading-relaxed mb-4">
            {exp.description}
          </p>

          <ul className="space-y-2">
            {exp.achievements.map((item, j) => (
              <li
                key={j}
                className="flex items-start gap-2 text-xs text-white/40"
              >
                <ChevronRight
                  size={14}
                  className="text-emerald-500/60 mt-0.5 shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
