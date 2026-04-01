import { useState, useEffect } from "react";
import { motion } from "motion/react";

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
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < STATUS_TEXT.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, STATUS_TEXT[currentIndex]]);
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
            className="mb-2"
          >
            {line}
          </motion.div>
        ))}
        {currentIndex < STATUS_TEXT.length && (
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
