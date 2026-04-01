import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Square } from "lucide-react";
import { ReactNode } from "react";

interface WindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  icon?: ReactNode;
}

export default function Window({ id, title, isOpen, onClose, children, icon }: WindowProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 pt-14 pb-32 sm:pt-4 sm:pb-32 pointer-events-none"
        >
          <div className="obsidian-window w-full max-w-2xl max-h-[75vh] sm:max-h-[70vh] rounded-xl overflow-hidden pointer-events-auto flex flex-col mx-2 sm:mx-0 relative">
            {/* Title Bar */}
            <div className="h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 select-none">
              <div className="flex items-center gap-2">
                {icon && <span className="text-white/60">{icon}</span>}
                <span className="text-xs font-medium tracking-wider uppercase text-white/80">{title}</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-white/40 hover:text-white/80 transition-colors">
                  <Minus size={14} />
                </button>
                <button className="text-white/40 hover:text-white/80 transition-colors">
                  <Square size={12} />
                </button>
                <button 
                  onClick={onClose}
                  className="text-white/40 hover:text-red-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <motion.div 
              className="flex-1 flex flex-col min-h-0 relative"
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
