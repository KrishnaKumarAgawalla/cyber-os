# Project Overview (auto-generated)

## Project Structure

- .
    - .env.example
    - .gitignore
    - generate_project_overview.py
    - index.html
    - metadata.json
    - package.json
    - project_overview.md
    - README.md
    - tsconfig.json
    - vite.config.ts
    - src
        - App.tsx
        - index.css
        - main.tsx
        - components
            - BioContent.tsx
            - BrandsContent.tsx
            - ContactContent.tsx
            - Dock.tsx
            - ExperienceContent.tsx
            - ProjectsContent.tsx
            - ResumeContent.tsx
            - SearchContent.tsx
            - SkillsContent.tsx
            - TerminalContent.tsx
            - TestimonialsContent.tsx
            - Window.tsx

## File Contents

### .env.example

```
# GEMINI_API_KEY: Required for Gemini AI API calls.
# AI Studio automatically injects this at runtime from user secrets.
# Users configure this via the Secrets panel in the AI Studio UI.
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# APP_URL: The URL where this applet is hosted.
# AI Studio automatically injects this at runtime with the Cloud Run service URL.
# Used for self-referential links, OAuth callbacks, and API endpoints.
APP_URL="MY_APP_URL"
```

### .gitignore

```
node_modules/
build/
dist/
coverage/
.DS_Store
*.log
.env*
!.env.example
```

### generate_project_overview.py

```
import os
import pathlib
root = pathlib.Path(r'd:/coding Realted/cyber-os-portfolio')
md_lines = []
md_lines.append('# Project Overview (auto-generated)')
md_lines.append('')
md_lines.append('## Project Structure')
md_lines.append('')
for dirpath, dirnames, filenames in os.walk(root):
    rel = os.path.relpath(dirpath, root)
    indent = 0 if rel == '.' else rel.count(os.sep)
    if rel == '.':
        md_lines.append('- .')
    else:
        md_lines.append('    ' * indent + '- ' + os.path.basename(dirpath))
    for d in sorted(dirnames):
        md_lines.append('    ' * (indent + (0 if rel == '.' else 1)) + '- ' + d)
    for f in sorted(filenames):
        md_lines.append('    ' * (indent + (0 if rel == '.' else 1)) + '- ' + f)
md_lines.append('')
md_lines.append('## File Contents')
md_lines.append('')
for path in sorted(root.rglob('*')):
    if path.is_file():
        rel = path.relative_to(root).as_posix()
        md_lines.append(f'### {rel}')
        md_lines.append('')
        md_lines.append('```')
        try:
            text = path.read_text(encoding='utf-8')
        except Exception:
            text = path.read_text(encoding='utf-8', errors='replace')
        md_lines.extend(text.rstrip('\n').splitlines())
        md_lines.append('```')
        md_lines.append('')
out = '\n'.join(md_lines)
(root / 'project_overview.md').write_text(out, encoding='utf-8')
print('project_overview.md rewritten with full structure/content.')
```

### index.html

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Google AI Studio App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### metadata.json

```
{
  "name": "Cyber-OS Portfolio",
  "description": "A futuristic, OS-style portfolio with glassmorphism and terminal interactions.",
  "requestFramePermissions": []
}
```

### package.json

```
{
  "name": "react-example",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf dist",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^1.29.0",
    "@tailwindcss/vite": "^4.1.14",
    "@vitejs/plugin-react": "^5.0.4",
    "lucide-react": "^0.546.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "vite": "^6.2.0",
    "express": "^4.21.2",
    "dotenv": "^17.2.3",
    "motion": "^12.23.24"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "autoprefixer": "^10.4.21",
    "tailwindcss": "^4.1.14",
    "tsx": "^4.21.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.0",
    "@types/express": "^4.17.21"
  }
}
```

### project_overview.md

```
# Project Overview

## Project Structure

```
d:\coding Realted\cyber-os-portfolio
├───.env.example
├───.gitignore
├───index.html
├───metadata.json
├───package.json
├───README.md
├───tsconfig.json
├───vite.config.ts
└───src
    ├───App.tsx
    ├───index.css
    ├───main.tsx
    └───components
        ├───BioContent.tsx
        ├───BrandsContent.tsx
        ├───ContactContent.tsx
        ├───Dock.tsx
        ├───ExperienceContent.tsx
        ├───ProjectsContent.tsx
        ├───ResumeContent.tsx
        ├───SearchContent.tsx
        ├───SkillsContent.tsx
        ├───TerminalContent.tsx
        ├───TestimonialsContent.tsx
        └───Window.tsx
```

## File Content
```

### README.md

```
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/6048984f-ffab-4a33-b448-c7d33b95657a

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
```

### src/App.tsx

```
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, LayoutGrid, MessageSquare, Cpu, Wifi, Battery, Clock, Search, Briefcase, Code2, Star, Mail, User, FileDown } from "lucide-react";
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

export default function App() {
  const [activeWindow, setActiveWindow] = useState<string | null>("terminal");
  const [time, setTime] = useState(new Date());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  const toggleWindow = (id: string) => {
    setActiveWindow(activeWindow === id ? null : id);
  };

  return (
    <div className="min-h-screen mesh-gradient relative overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Spotlight Effect */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.08), transparent 80%)`
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
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-white/60">Cyber-OS v2.4</span>
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
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                Cyber-OS
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
          id="projects" 
          title="Projects - explorer.exe" 
          isOpen={activeWindow === "projects"} 
          onClose={() => setActiveWindow(null)}
          icon={<LayoutGrid size={14} />}
        >
          <ProjectsContent />
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
          id="brands" 
          title="Brands - collaboration.log" 
          isOpen={activeWindow === "brands"} 
          onClose={() => setActiveWindow(null)}
          icon={<Star size={14} />}
        >
          <BrandsContent />
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
          id="identity" 
          title="Identity - profile.sys" 
          isOpen={activeWindow === "identity"} 
          onClose={() => setActiveWindow(null)}
          icon={<User size={14} />}
        >
          <BioContent />
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
      </main>


      {/* Bottom Dock */}
      <Dock onOpen={toggleWindow} activeWindow={activeWindow} />

      {/* Ambient Noise Overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
```

### src/components/BioContent.tsx

```
import { motion } from "motion/react";
import { User, Terminal as TerminalIcon, Briefcase, GraduationCap, MapPin } from "lucide-react";

export default function BioContent() {
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
                <span className="text-emerald-400">KRISHNA KUMAR AGRAWALLA</span>
              </div>
              <div className="flex gap-4">
                <span className="text-emerald-400/50">ROLE:</span>
                <span className="text-emerald-400">ASSOCIATE CONSULTANT</span>
              </div>
              <div className="flex gap-4">
                <span className="text-emerald-400/50">ORG:</span>
                <span className="text-emerald-400">CAPGEMINI</span>
              </div>
              <div className="flex gap-4">
                <span className="text-emerald-400/50">LOC:</span>
                <span className="text-emerald-400">BANGALORE, IN</span>
              </div>
              <div className="pt-4 border-t border-white/5">
                <div className="text-emerald-400/30 mb-2">// SYSTEM_LOG</div>
                <div className="text-white/40 italic">"Continuously evolving at the intersection of data analysis and business strategy."</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="obsidian-card p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <Briefcase size={20} className="text-emerald-400 mb-2" />
              <span className="text-[10px] text-white/40 uppercase tracking-tighter">Experience</span>
              <span className="text-lg font-bold text-white">5+ Years</span>
            </div>
            <div className="obsidian-card p-4 rounded-xl flex flex-col items-center justify-center text-center">
              <GraduationCap size={20} className="text-emerald-400 mb-2" />
              <span className="text-[10px] text-white/40 uppercase tracking-tighter">Education</span>
              <span className="text-lg font-bold text-white">B.Tech</span>
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
            <p>
              My professional journey has been defined by a rapid evolution from technical execution to strategic consulting. Starting as a <span className="text-emerald-400 font-medium">Senior Analyst</span>, I focused on deep-dive data forensics and process optimization.
            </p>
            <p>
              Through consistent delivery and a keen eye for business impact, I transitioned into my current role as an <span className="text-emerald-400 font-medium">Associate Consultant at Capgemini</span>. Here, I bridge the gap between complex data landscapes and actionable business intelligence.
            </p>
            <p>
              I specialize in transforming raw information into strategic roadmaps, helping organizations navigate digital transformation with precision and clarity.
            </p>
          </div>

          <div className="pt-6">
            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-mono uppercase tracking-[0.2em]">
              <MapPin size={12} />
              Operational Status: Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### src/components/BrandsContent.tsx

```
import { motion } from "motion/react";
import { ExternalLink, Star } from "lucide-react";

const BRANDS = [
  { name: "Tesla", industry: "Automotive", logo: "https://picsum.photos/seed/tesla/100/100" },
  { name: "SpaceX", industry: "Aerospace", logo: "https://picsum.photos/seed/spacex/100/100" },
  { name: "Apple", industry: "Consumer Tech", logo: "https://picsum.photos/seed/apple/100/100" },
  { name: "Google", industry: "Internet Services", logo: "https://picsum.photos/seed/google/100/100" },
  { name: "Meta", industry: "Social Media", logo: "https://picsum.photos/seed/meta/100/100" },
  { name: "Amazon", industry: "E-commerce", logo: "https://picsum.photos/seed/amazon/100/100" },
];

export default function BrandsContent() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {BRANDS.map((brand, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -5 }}
            className="glass p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center group cursor-pointer"
          >
            <div className="relative w-12 h-12 mb-3">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 rounded-xl border border-white/10 group-hover:border-emerald-500/30 transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">
              {brand.name}
            </h3>
            <p className="text-[9px] font-mono uppercase tracking-widest text-white/30 mt-1">
              {brand.industry}
            </p>
            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={12} className="text-emerald-500" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-2xl border border-dashed border-white/10 flex flex-col items-center text-center">
        <Star size={24} className="text-yellow-500/40 mb-3" />
        <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">
          Trusted by Industry Leaders
        </h4>
      </div>
    </div>
  );
}
```

### src/components/ContactContent.tsx

```
import { motion } from "motion/react";
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Globe } from "lucide-react";

export default function ContactContent() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <h3 className="text-2xl font-bold text-white tracking-tighter uppercase italic">Get In Touch</h3>
            <p className="text-xs text-white/40 font-mono tracking-widest uppercase">
              Secure_Channel_Ready // Protocol_v4.0
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              { icon: <Mail size={18} />, label: "Email", value: "hello@cyber-os.dev", color: "text-blue-400" },
              { icon: <MapPin size={18} />, label: "Location", value: "Neo-Tokyo / Remote", color: "text-emerald-400" },
              { icon: <Globe size={18} />, label: "Timezone", value: "UTC+5:30", color: "text-purple-400" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className={`p-2 rounded-xl bg-white/5 ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-white/20">{item.label}</div>
                  <div className="text-sm font-bold text-white/80">{item.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4">
            {[
              { icon: <Github size={20} />, href: "#" },
              { icon: <Linkedin size={20} />, href: "#" },
              { icon: <Twitter size={20} />, href: "#" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:border-white/20 transition-all"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 rounded-3xl border border-white/10"
        >
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">Sender_Identity</label>
              <input
                type="text"
                placeholder="NAME..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none text-sm text-white/90 placeholder:text-white/20 focus:border-emerald-500/40 transition-colors font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">Return_Address</label>
              <input
                type="email"
                placeholder="EMAIL..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none text-sm text-white/90 placeholder:text-white/20 focus:border-emerald-500/40 transition-colors font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">Encrypted_Payload</label>
              <textarea
                placeholder="MESSAGE..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none text-sm text-white/90 placeholder:text-white/20 focus:border-emerald-500/40 transition-colors font-mono resize-none"
              />
            </div>
            <button className="w-full py-4 bg-emerald-500/20 text-emerald-400 rounded-xl font-mono text-xs uppercase tracking-[0.3em] font-bold border border-emerald-500/30 hover:bg-emerald-500/30 transition-all flex items-center justify-center gap-2 group">
              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Transmit Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
```

### src/components/Dock.tsx

```
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
            icon={<LayoutGrid size={24} />} 
            label="Projects" 
            onClick={() => onOpen("projects")}
            isActive={activeWindow === "projects"}
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
            icon={<Star size={24} />} 
            label="Brands" 
            onClick={() => onOpen("brands")}
            isActive={activeWindow === "brands"}
          />
          <DockItem 
            icon={<MessageSquare size={24} />} 
            label="Testimonials" 
            onClick={() => onOpen("testimonials")}
            isActive={activeWindow === "testimonials"}
          />
          <DockItem 
            icon={<Mail size={24} />} 
            label="Contact" 
            onClick={() => onOpen("contact")}
            isActive={activeWindow === "contact"}
          />
          <div className="w-px h-8 bg-white/10 mx-1 shrink-0" />
          <DockItem 
            icon={<FileDown size={24} />} 
            label="Resume" 
            onClick={() => onOpen("resume")}
            isActive={activeWindow === "resume"}
          />
          <DockItem 
            icon={<Search size={24} />} 
            label="Search" 
            onClick={() => onOpen("search")}
            isActive={activeWindow === "search"}
          />
          <DockItem 
            icon={<User size={24} />} 
            label="Identity" 
            onClick={() => onOpen("identity")}
            isActive={activeWindow === "identity"}
          />
        </div>
      </div>
    </div>
  </div>
);
}
```

### src/components/ExperienceContent.tsx

```
import { motion } from "motion/react";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";

const EXPERIENCE = [
  {
    company: "TECH_CORP_GLOBAL",
    role: "Senior Systems Architect",
    period: "2024 - PRESENT",
    description: "Leading the development of next-gen neural interfaces and distributed ledger systems.",
    achievements: ["Reduced system latency by 40%", "Implemented quantum-resistant encryption"],
  },
  {
    company: "NEO_SOFT_SYSTEMS",
    role: "Full Stack Engineer",
    period: "2022 - 2024",
    description: "Developed high-performance web applications using React and Node.js for fintech clients.",
    achievements: ["Scaled user base to 1M+", "Optimized database queries for 2x speed"],
  },
  {
    company: "CYBER_DYNAMICS",
    role: "Junior Developer",
    period: "2020 - 2022",
    description: "Maintained legacy systems while transitioning to modern microservices architecture.",
    achievements: ["Automated CI/CD pipelines", "Resolved 500+ critical bugs"],
  },
];

export default function ExperienceContent() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8">
      {EXPERIENCE.map((exp, i) => (
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
              <h3 className="text-lg font-bold text-white tracking-tight">{exp.role}</h3>
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
              <li key={j} className="flex items-start gap-2 text-xs text-white/40">
                <ChevronRight size={14} className="text-emerald-500/60 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
```

### src/components/ProjectsContent.tsx

```
import { motion } from "motion/react";
import { ExternalLink, Github, Layers, Zap, Shield } from "lucide-react";

const PROJECTS = [
  {
    title: "Project: NEON-CORE",
    description: "A decentralized identity management system built on the blockchain with real-time analytics.",
    tags: ["React", "Solidity", "Tailwind"],
    icon: <Zap className="text-blue-400" />,
    link: "#",
  },
  {
    title: "Project: SHIELD-OS",
    description: "A secure, encrypted operating system environment for sensitive data processing.",
    tags: ["Rust", "Wasm", "TypeScript"],
    icon: <Shield className="text-emerald-400" />,
    link: "#",
  },
  {
    title: "Project: GRID-SYNC",
    description: "Real-time collaborative workspace with low-latency synchronization and AI-driven insights.",
    tags: ["Node.js", "WebSockets", "GenAI"],
    icon: <Layers className="text-purple-400" />,
    link: "#",
  },
];

export default function ProjectsContent() {
  return (
    <div className="flex-1 overflow-y-auto p-6 grid gap-6">
      {PROJECTS.map((project, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="group relative glass p-5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-white/20"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
              {project.icon}
            </div>
            <div className="flex gap-3">
              <button className="text-white/40 hover:text-white/80 transition-colors">
                <Github size={18} />
              </button>
              <button className="text-white/40 hover:text-white/80 transition-colors">
                <ExternalLink size={18} />
              </button>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white/90 mb-2 tracking-tight group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-white/60 mb-4 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, j) => (
              <span key={j} className="px-2 py-1 text-[10px] uppercase tracking-widest font-medium bg-white/5 border border-white/10 rounded text-white/40">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
```

### src/components/ResumeContent.tsx

```
import { motion } from "motion/react";
import { FileDown, FileText, ShieldCheck, Download, ExternalLink } from "lucide-react";

export default function ResumeContent() {
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
          Professional_Resume.pdf
        </h2>
        <p className="text-[9px] sm:text-xs font-mono tracking-widest text-white/40 uppercase">
          Size: 2.4 MB | Format: PDF | Version: 2024.Q1
        </p>
      </div>

      {/* Download Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="obsidian-card px-5 py-2.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl border-emerald-500/30 hover:bg-emerald-500/10 transition-all duration-300 flex items-center gap-3 group shrink-0"
      >
        <div className="bg-emerald-500/20 p-1.5 sm:p-2 rounded-lg group-hover:bg-emerald-500/40 transition-colors">
          <Download size={16} className="sm:w-5 sm:h-5 text-emerald-400" />
        </div>
        <span className="text-[10px] sm:text-sm font-bold tracking-widest uppercase text-white">
          Download_PDF
        </span>
      </motion.button>

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
```

### src/components/SearchContent.tsx

```
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
    id: "identity",
    label: "Identity",
    description: "View professional profile and identity details",
    icon: <User size={18} />,
  },
  {
    id: "resume",
    label: "Resume",
    description: "Download professional resume and secure payload",
    icon: <FileDown size={18} />,
  },
  {
    id: "terminal",
    label: "Terminal",
    description: "View system status and current work logs",
    icon: <Terminal size={18} />,
  },
  {
    id: "projects",
    label: "Projects",
    description: "Explore the portfolio of built applications",
    icon: <LayoutGrid size={18} />,
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
    id: "brands",
    label: "Brands",
    description: "Companies and clients I've worked with",
    icon: <Star size={18} />,
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
          <span className="flex items-center gap-1">↑↓ Navigate</span>
          <span className="flex items-center gap-1">↵ Execute</span>
        </div>
        <div className="hidden sm:block">System: Search_v1.0</div>
      </div>
    </div>
  );
}
```

### src/components/SkillsContent.tsx

```
import { motion } from "motion/react";
import { Code2, Database, Globe, Cpu, Shield, Zap } from "lucide-react";

const SKILL_GROUPS = [
  {
    title: "Frontend_Core",
    icon: <Globe size={18} />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "text-blue-400",
  },
  {
    title: "Backend_Infra",
    icon: <Database size={18} />,
    skills: ["Node.js", "PostgreSQL", "Redis", "GraphQL", "Docker"],
    color: "text-emerald-400",
  },
  {
    title: "System_Architecture",
    icon: <Cpu size={18} />,
    skills: ["Microservices", "Serverless", "AWS", "CI/CD", "Kubernetes"],
    color: "text-purple-400",
  },
  {
    title: "Security_Protocols",
    icon: <Shield size={18} />,
    skills: ["OAuth 2.0", "JWT", "Encryption", "Pen-Testing", "SSL/TLS"],
    color: "text-red-400",
  },
];

export default function SkillsContent() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SKILL_GROUPS.map((group, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl bg-white/5 ${group.color} group-hover:scale-110 transition-transform`}>
                {group.icon}
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
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-4"
      >
        <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400">
          <Zap size={24} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Continuous Learning</h4>
          <p className="text-xs text-white/40 leading-relaxed">
            Currently exploring WebAssembly and Rust for high-performance edge computing modules.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
```

### src/components/TerminalContent.tsx

```
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
    <div className="flex-1 overflow-y-auto p-6 font-mono text-sm leading-relaxed text-emerald-400/90 scanlines">
      <div className="crt-text">
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
```

### src/components/TestimonialsContent.tsx

```
import { motion } from "motion/react";
import { User, MessageSquare, ShieldCheck, Send } from "lucide-react";

const MESSAGES = [
  {
    sender: "USER_01_ALPHA",
    role: "Lead Architect",
    content: "The NEON-CORE implementation was flawless. The security protocols are top-tier.",
    time: "14:05:27",
    isMe: false,
  },
  {
    sender: "USER_02_BETA",
    role: "Product Owner",
    content: "Excellent work on the GRID-SYNC synchronization layer. The latency is almost zero.",
    time: "14:05:32",
    isMe: false,
  },
  {
    sender: "SYSTEM_ADMIN",
    role: "Security Lead",
    content: "SHIELD-OS encryption standards exceed all current requirements. Highly recommended.",
    time: "14:05:45",
    isMe: false,
  },
];

export default function TestimonialsContent() {
  return (
    <div className="flex-1 flex flex-col min-h-0 p-6 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2">
        {MESSAGES.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-2 mb-2 px-1">
              <div className="p-1 bg-white/5 rounded-full border border-white/10">
                <User size={12} className="text-white/40" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                {msg.sender} <span className="text-white/20">|</span> {msg.role}
              </span>
            </div>
            <div className={`max-w-[85%] p-4 rounded-2xl border ${
              msg.isMe 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-100 rounded-tr-none" 
                : "bg-white/5 border-white/10 text-white/80 rounded-tl-none"
            }`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <div className="mt-2 flex items-center justify-end gap-1">
                <span className="text-[9px] font-mono text-white/20">{msg.time}</span>
                <ShieldCheck size={10} className="text-emerald-500/40" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Input Area */}
      <div className="relative mt-auto">
        <div className="glass p-3 rounded-xl flex items-center gap-3 border border-white/10">
          <div className="p-2 bg-white/5 rounded-lg text-white/40">
            <MessageSquare size={18} />
          </div>
          <input 
            type="text" 
            placeholder="ENCRYPTED_MESSAGE_INPUT..." 
            className="flex-1 bg-transparent border-none outline-none text-sm text-white/80 placeholder:text-white/20 font-mono"
            disabled
          />
          <button className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors">
            <Send size={18} />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-center gap-2">
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest text-emerald-500/60 uppercase">
            Secure Channel Active
          </span>
        </div>
      </div>
    </div>
  );
}
```

### src/components/Window.tsx

```
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
            animation: ["none", "window-break 0.3s ease-in-out"],
          }}
          whileHover={{
            animation: "window-break 0.2s ease-in-out",
          }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 pt-14 pb-32 sm:pt-4 sm:pb-32 pointer-events-none"
        >
          <div className="obsidian-window w-full max-w-2xl max-h-[75vh] sm:max-h-[70vh] rounded-xl overflow-hidden pointer-events-auto flex flex-col mx-2 sm:mx-0 relative">
            {/* Scanline Effect */}
            <div className="window-scanline" />
            
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
              animate={isOpen ? {
                textShadow: ["none", "2px 0 #ff0000, -2px 0 #00ffff", "none"],
                filter: ["none", "drop-shadow(2px 0 #ff0000) drop-shadow(-2px 0 #00ffff)", "none"],
              } : {}}
              transition={{ duration: 0.3, times: [0, 0.5, 1] }}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### src/index.css

```
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

:root {
  --bg: #050505;
  --accent: #00ff9d;
}

body {
  background-color: var(--bg);
  color: #ffffff;
  overflow: hidden;
  font-family: var(--font-sans);
}

.mesh-gradient {
  background-image: 
    radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
    radial-gradient(at 50% 0%, hsla(225,39%,30%,0.1) 0, transparent 50%), 
    radial-gradient(at 100% 0%, hsla(339,49%,30%,0.1) 0, transparent 50%);
  background-attachment: fixed;
}

.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.obsidian-window {
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
}

.obsidian-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.crt-text {
  text-shadow: 0 0 5px rgba(16, 185, 129, 0.5);
  animation: crt-flicker 0.15s infinite;
}

.scanlines {
  position: relative;
  overflow: hidden;
}

.scanlines::before {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
  z-index: 2;
  background-size: 100% 2px, 3px 100%;
  pointer-events: none;
}

@keyframes crt-flicker {
  0% { opacity: 0.97; }
  50% { opacity: 1; }
  100% { opacity: 0.98; }
}

@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 1px); }
  40% { transform: translate(-2px, -1px); }
  60% { transform: translate(2px, 1px); }
  80% { transform: translate(2px, -1px); }
  100% { transform: translate(0); }
}

.glitch-hover:hover {
  animation: glitch 0.2s infinite;
}

@keyframes window-break {
  0% { clip-path: inset(0 0 0 0); transform: translate(0); }
  10% { clip-path: inset(10% 0 80% 0); transform: translate(-5px); }
  20% { clip-path: inset(80% 0 10% 0); transform: translate(5px); }
  30% { clip-path: inset(40% 0 40% 0); transform: translate(-5px); }
  40% { clip-path: inset(0 0 0 0); transform: translate(0); }
  100% { clip-path: inset(0 0 0 0); transform: translate(0); }
}

.chromatic-aberration {
  text-shadow: 2px 0 #ff0000, -2px 0 #00ffff;
  filter: drop-shadow(2px 0 #ff0000) drop-shadow(-2px 0 #00ffff);
}

@keyframes scanline-flicker {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

.window-scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.05);
  opacity: 0.5;
  pointer-events: none;
  z-index: 10;
  animation: scanline-flicker 4s linear infinite;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

@layer utilities {
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
```

### src/main.tsx

```
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### tsconfig.json

```
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}
```

### vite.config.ts

```
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
```
