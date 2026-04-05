import { motion } from "motion/react";
import { FileDown, FileText, ShieldCheck, Download } from "lucide-react";
import { useSystemData } from "../hooks/useSystemData";

export default function ResumeContent() {
  const { memory } = useSystemData();

  // Find the resume entry in your system data
  const resumeData = memory?.find((item) => item.type === "RESUME");
  const currentYear = new Date().getFullYear();

  // Fallback values while loading or if data is missing
  const resumeTitle = resumeData?.file_name || "Professional_Resume.pdf";
  const resumeUrl = resumeData?.url || "#";
  const fileSize = resumeData?.file_size || "128 KB";
  const version = resumeData?.version || `${currentYear}.Q1`;

  return (
    <div className="p-4 sm:p-6 h-full flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 overflow-hidden">
      {/* Central Document Icon with Obsidian Effect */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative group shrink-0"
      >
        <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-all duration-500 animate-pulse" />
        <div className="relative obsidian-card p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-emerald-500/10 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-[2rem] sm:rounded-[2.5rem]" />
          <FileText size={50} className="sm:w-16 sm:h-16 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
        </div>
      </motion.div>

      {/* Title and Description */}
      <div className="space-y-1 sm:space-y-2 shrink-0">
        <h2 className="text-lg sm:text-2xl font-bold tracking-tighter text-white uppercase italic break-words max-w-xs sm:max-w-none">
          {resumeTitle}
        </h2>
        <p className="text-[9px] sm:text-xs font-mono tracking-widest text-white/40 uppercase">
          Size: {fileSize} | Format: PDF | Version: {version}
        </p>
      </div>

      {/* Download Button */}
      <motion.a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        download={resumeTitle}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="obsidian-card px-5 py-2.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl border-emerald-500/30 hover:bg-emerald-500/10 transition-all duration-300 flex items-center gap-3 group shrink-0 cursor-pointer"
      >
        <div className="bg-emerald-500/20 p-1.5 sm:p-2 rounded-lg group-hover:bg-emerald-500/40 transition-colors">
          <Download size={16} className="sm:w-5 sm:h-5 text-emerald-400" />
        </div>
        <span className="text-[10px] sm:text-sm font-bold tracking-widest uppercase text-white">
          Download_PDF
        </span>
      </motion.a>

      {/* Footer: Verified Secure Payload */}
      <div className="pt-2 sm:pt-6 shrink-0">
        <div className="flex items-center gap-2">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span className="text-[8px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-white/40">
            VERIFIED_SECURE_PAYLOAD
          </span>
        </div>
      </div>

      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
