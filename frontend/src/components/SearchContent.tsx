import { useState, useEffect, useRef, ReactNode, KeyboardEvent } from "react";
import { motion } from "motion/react";
import { Terminal, LayoutGrid, MessageSquare, Command, ChevronRight, Briefcase, Code2, Star, Mail, User, FileDown } from "lucide-react";

interface SearchItem {
  id: string;
  label: string;
  description: string;
  icon: ReactNode;
}

const SEARCH_ITEMS: SearchItem[] = [
  {
    id: "terminal",
    label: "Terminal",
    description: "View system status and current work logs",
    icon: <Terminal size={18} />,
  },
  {
    id: "identity",
    label: "Identity",
    description: "View professional profile and identity details",
    icon: <User size={18} />,
  },
  {
    id: "brands",
    label: "Brands",
    description: "Companies and clients I've worked with",
    icon: <Star size={18} />,
  },
  {
    id: "experience",
    label: "Experience",
    description: "Professional history and career timeline",
    icon: <Briefcase size={18} />,
  },
  {
    id: "skills",
    label: "Skills",
    description: "Technical stack and core competencies",
    icon: <Code2 size={18} />,
  },
  {
    id: "projects",
    label: "Projects",
    description: "Explore the portfolio of built applications",
    icon: <LayoutGrid size={18} />,
  },
  {
    id: "resume",
    label: "Resume",
    description: "Download professional resume and secure payload",
    icon: <FileDown size={18} />,
  },
  {
    id: "testimonials",
    label: "Testimonials",
    description: "Read secure communications from collaborators",
    icon: <MessageSquare size={18} />,
  },
  {
    id: "contact",
    label: "Contact",
    description: "Initiate secure communication channel",
    icon: <Mail size={18} />,
  },
];

interface SearchContentProps {
  onNavigate: (id: string) => void;
}

export default function SearchContent({ onNavigate }: SearchContentProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filteredItems = SEARCH_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      if (filteredItems[selectedIndex]) {
        onNavigate(filteredItems[selectedIndex].id);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 font-mono p-4 sm:p-6">
      <div className="relative mb-4 sm:mb-6 shrink-0">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/60">
          <Command size={18} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="SEARCH..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 sm:py-4 pl-12 pr-4 outline-none text-sm text-white/90 placeholder:text-white/20 focus:border-emerald-500/40 transition-colors"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2" ref={scrollRef}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, i) => (
            <motion.button
              key={item.id}
              ref={(el) => (itemRefs.current[i] = el)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setSelectedIndex(i)}
              className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-200 border ${
                selectedIndex === i
                  ? "bg-white/10 border-white/20"
                  : "bg-transparent border-transparent text-white/40 hover:text-white/60"
              }`}
            >
              <div className={`p-2 rounded-lg ${selectedIndex === i ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5"}`}>
                {item.icon}
              </div>
              <div className="flex-1 text-left">
                <div className={`text-xs sm:text-sm font-bold tracking-tight ${selectedIndex === i ? "text-white" : "text-white/80"}`}>
                  {item.label}
                </div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-widest opacity-60 line-clamp-1">
                  {item.description}
                </div>
              </div>
              {selectedIndex === i && (
                <motion.div
                  layoutId="search-arrow"
                  className="text-emerald-500 hidden sm:block"
                >
                  <ChevronRight size={18} />
                </motion.div>
              )}
            </motion.button>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-white/20">
            <div className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-2">No matches</div>
          </div>
        )}
      </div>

      <div className="mt-4 sm:mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[8px] sm:text-[9px] text-white/20 uppercase tracking-widest">
        <div className="flex gap-2 sm:gap-4">
          <span className="flex items-center gap-1 text-white/30">↑↓ Navigate</span>
          <span className="flex items-center gap-1 text-white/30">↵ Execute</span>
        </div>
        <div className="hidden sm:block text-white/30">System: Search_v1.0</div>
      </div>
    </div>
  );
}
