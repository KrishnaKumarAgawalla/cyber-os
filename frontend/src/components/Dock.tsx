import { motion } from "motion/react";
import { Terminal, LayoutGrid, MessageSquare, Search, User, FileDown, Briefcase, Code2, Star, Mail } from "lucide-react";
import { ReactNode } from "react";

interface DockItemProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  isActive: boolean;
}

const DockItem = ({ icon, label, onClick, isActive }: DockItemProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.2, y: -10 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={`relative group p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-colors duration-200 hover:z-10 ${
        isActive ? "bg-white/15 border-white/20 shadow-lg shadow-white/5" : "bg-white/5 border-white/5 hover:bg-white/10"
      } border backdrop-blur-xl shrink-0`}
    >
      <div className={`transition-colors duration-300 ${isActive ? "text-white" : "text-white/40 group-hover:text-white/80"}`}>
        {icon}
      </div>
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-medium tracking-widest uppercase text-white/90 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {label}
      </div>
      {isActive && (
        <motion.div
          layoutId="dock-indicator"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
        />
      )}
    </motion.button>
  );
};

interface DockProps {
  onOpen: (id: string) => void;
  activeWindow: string | null;
}

export default function Dock({ onOpen, activeWindow }: DockProps) {
  return (
    <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95vw] sm:w-max px-4 sm:px-0">
      <div className="relative">
        {/* Static Shelf (Glass Background) */}
        <div className="absolute inset-x-0 bottom-0 h-14 sm:h-16 glass rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 shadow-2xl shadow-black/50 -z-10" />
        
        {/* Scrollable Icons Tray */}
        <div 
          className="overflow-x-auto sm:overflow-visible no-scrollbar scroll-smooth pt-10 pb-0"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)'
          }}
        >
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-4 px-8 h-14 sm:h-16 min-w-max sm:min-w-0">
            <DockItem 
              icon={<Terminal size={24} />} 
              label="Terminal" 
              onClick={() => onOpen("terminal")}
              isActive={activeWindow === "terminal"}
            />
            <DockItem 
              icon={<User size={24} />} 
              label="Identity" 
              onClick={() => onOpen("identity")}
              isActive={activeWindow === "identity"}
            />
            <DockItem 
              icon={<Star size={24} />} 
              label="Brands" 
              onClick={() => onOpen("brands")}
              isActive={activeWindow === "brands"}
            />
            <DockItem 
              icon={<Briefcase size={24} />} 
              label="Experience" 
              onClick={() => onOpen("experience")}
              isActive={activeWindow === "experience"}
            />
            <DockItem 
              icon={<Code2 size={24} />} 
              label="Skills" 
              onClick={() => onOpen("skills")}
              isActive={activeWindow === "skills"}
            />
            <DockItem 
              icon={<LayoutGrid size={24} />} 
              label="Projects" 
              onClick={() => onOpen("projects")}
              isActive={activeWindow === "projects"}
            />
            <DockItem 
              icon={<FileDown size={24} />} 
              label="Resume" 
              onClick={() => onOpen("resume")}
              isActive={activeWindow === "resume"}
            />
            <DockItem 
              icon={<MessageSquare size={24} />} 
              label="Testimonials" 
              onClick={() => onOpen("testimonials")}
              isActive={activeWindow === "testimonials"}
            />
            <DockItem 
              icon={<Search size={24} />} 
              label="Search" 
              onClick={() => onOpen("search")}
              isActive={activeWindow === "search"}
            />
            <DockItem 
              icon={<Mail size={24} />} 
              label="Contact" 
              onClick={() => onOpen("contact")}
              isActive={activeWindow === "contact"}
            />
          </div>
      </div>
    </div>
  </div>
);
}

