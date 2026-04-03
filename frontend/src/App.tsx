import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Terminal,
  LayoutGrid,
  MessageSquare,
  Cpu,
  Wifi,
  Battery,
  Clock,
  Search,
  Briefcase,
  Code2,
  Star,
  Mail,
  User,
  FileDown,
} from "lucide-react";
import Window from "./components/Window";
import Dock from "./components/Dock";
import TerminalContent from "./components/TerminalContent";
import ProjectsContent from "./components/ProjectsContent";
import TestimonialsContent from "./components/TestimonialsContent";
import SearchContent from "./components/SearchContent";
import ExperienceContent from "./components/ExperienceContent";
import SkillsContent from "./components/SkillsContent";
import BrandsContent from "./components/BrandsContent";
import ContactContent from "./components/ContactContent";
import BioContent from "./components/BioContent";
import ResumeContent from "./components/ResumeContent";
import { useSystemData } from "./hooks/useSystemData";

export default function App() {
  const { memory, isBooting } = useSystemData();
  const [activeWindow, setActiveWindow] = useState<string | null>("terminal");
  const [time, setTime] = useState(new Date());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const systemConfig = memory?.find((item) => item.id === "CONFIG#GLOBAL");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!isBooting && systemConfig) {
      document.title = `${systemConfig.desktopTitle || "K-OS"}`;
    }
  }, [isBooting, systemConfig]);

  const toggleWindow = (id: string) => {
    setActiveWindow(activeWindow === id ? null : id);
  };

  if (isBooting) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-emerald-400 text-xs tracking-[0.5em]"
        >
          INITIALIZING K-OS MEMORY...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-gradient relative overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Spotlight Effect */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.08), transparent 80%)`,
        }}
      />

      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-10 z-40 flex items-center justify-between px-4 sm:px-6 bg-black/20 backdrop-blur-md border-b border-white/5 select-none">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-emerald-400" />
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-white/60">
              {systemConfig?.osName || "K-OS"} {systemConfig?.version || "v1.0"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-5 text-white/60">
          <div className="flex items-center gap-2 sm:gap-3">
            <Wifi size={14} />
            <Battery size={14} className="hidden sm:block" />
            <div className="w-px h-3 bg-white/10 hidden sm:block" />
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase">
              {time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </header>

      {/* Desktop Content */}
      <main className="relative z-10 pt-16 pb-32 h-screen flex flex-col items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {activeWindow === null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="text-center select-none"
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white/10 mb-4 uppercase italic">
                K-OS
              </h1>
              <p className="text-[9px] sm:text-xs font-mono tracking-[0.3em] sm:tracking-[0.5em] text-white/20 uppercase px-4">
                System Ready. Select a module from the dock.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <Window
          id="terminal"
          title="Terminal - status.sh"
          isOpen={activeWindow === "terminal"}
          onClose={() => setActiveWindow(null)}
          icon={<Terminal size={14} />}
        >
          <TerminalContent />
        </Window>

        <Window
          id="identity"
          title="Identity - profile.sys"
          isOpen={activeWindow === "identity"}
          onClose={() => setActiveWindow(null)}
          icon={<User size={14} />}
        >
          <BioContent />
        </Window>

        <Window
          id="brands"
          title="Brands - collaboration.log"
          isOpen={activeWindow === "brands"}
          onClose={() => setActiveWindow(null)}
          icon={<Star size={14} />}
        >
          <BrandsContent />
        </Window>

        <Window
          id="experience"
          title="Experience - history.md"
          isOpen={activeWindow === "experience"}
          onClose={() => setActiveWindow(null)}
          icon={<Briefcase size={14} />}
        >
          <ExperienceContent />
        </Window>

        <Window
          id="skills"
          title="Skills - tech_stack.json"
          isOpen={activeWindow === "skills"}
          onClose={() => setActiveWindow(null)}
          icon={<Code2 size={14} />}
        >
          <SkillsContent />
        </Window>

        <Window
          id="projects"
          title="Projects - explorer.exe"
          isOpen={activeWindow === "projects"}
          onClose={() => setActiveWindow(null)}
          icon={<LayoutGrid size={14} />}
        >
          <ProjectsContent />
        </Window>

        <Window
          id="resume"
          title="Resume - secure_payload.pdf"
          isOpen={activeWindow === "resume"}
          onClose={() => setActiveWindow(null)}
          icon={<FileDown size={14} />}
        >
          <ResumeContent />
        </Window>

        <Window
          id="testimonials"
          title="Testimonials - secure_comms.log"
          isOpen={activeWindow === "testimonials"}
          onClose={() => setActiveWindow(null)}
          icon={<MessageSquare size={14} />}
        >
          <TestimonialsContent />
        </Window>

        <Window
          id="search"
          title="System Search - query.sh"
          isOpen={activeWindow === "search"}
          onClose={() => setActiveWindow(null)}
          icon={<Search size={14} />}
        >
          <SearchContent onNavigate={(id) => setActiveWindow(id)} />
        </Window>

        <Window
          id="contact"
          title="Contact - secure_channel.sh"
          isOpen={activeWindow === "contact"}
          onClose={() => setActiveWindow(null)}
          icon={<Mail size={14} />}
        >
          <ContactContent />
        </Window>
      </main>

      {/* Bottom Dock */}
      <Dock onOpen={toggleWindow} activeWindow={activeWindow} />

      {/* Ambient Noise Overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
