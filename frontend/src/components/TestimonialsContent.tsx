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
