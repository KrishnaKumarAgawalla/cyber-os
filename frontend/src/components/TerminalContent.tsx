import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useSystemData } from "../hooks/useSystemData";

const STATUS_TEXT = [
  "> INITIALIZING SYSTEM...",
  "> LOADING CORE MODULES...",
  "> ESTABLISHING SECURE CONNECTION...",
  "> CURRENT STATUS: ACTIVE",
  "> ROLE: FULL-STACK ARCHITECT",
  "> LOCATION: THE GRID",
  "> CURRENT FOCUS: BUILDING CYBER-OS INTERFACES",
  "> SKILLS: REACT, TYPESCRIPT, NODE, MOTION, GEN-AI",
  "> STATUS: OPEN FOR INNOVATION",
];

export default function TerminalContent() {
  const { memory } = useSystemData();
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const config = memory?.find(item => item.type === "TERMINAL_CONFIG");

  const terminalSequence = [
    ...(config?.boot_sequence || ["> INITIALIZING..."]),
    `> IDENTIFIED_USER: KRISHNA_KUMAR_AGRAWALLA`,
    `> CURRENT_ROLE: ${config?.user_role || "Unavailable"}`,
    `> LOCATION: ${config?.location || "SECRET"}`,
    `> CORE_STACK: ${config?.core_tech?.join(", ") || "NA"}`,
    "> STATUS: OPEN_FOR_INNOVATION",
  ]

  useEffect(() => {
    if (currentIndex < terminalSequence.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, terminalSequence[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="flex-1 overflow-y-auto p-6 font-mono text-sm leading-relaxed text-emerald-400/90">
      <div>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-2 group"
          >
            <span className="text-emerald-500/40 shrink-0">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}]</span>
            <span className="group-last:text-white group-last:font-bold">
              {line}
            </span>
          </motion.div>
        ))}
        {currentIndex < terminalSequence.length && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-emerald-400 ml-1"
          />
        )}
      </div>
    </div>
  );
}
