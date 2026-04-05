import { motion } from "motion/react";
import { User, MessageSquare, ShieldCheck, Send } from "lucide-react";
import { useSystemData } from "../hooks/useSystemData";

export default function TestimonialsContent() {
  const { memory } = useSystemData();

  const testimonials = memory
    ?.filter((item) => item.type === "TESTIMONIAL")
    .sort((a, b) => a.sort_order - b.sort_order) || [];

  const formatSystemTime = (isoString: string) => {
    const date = new Date(isoString);
    const ymd = date.toLocaleDateString('en-GB', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }).replace(/\//g, '.'); // Converts 28/03/2026 to 28.03.2026
    
    const hm = date.toLocaleTimeString([], { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
    
    return `${ymd} // ${hm}`;
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 p-6 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2">
        {testimonials.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-2 mb-2 px-1">
              <div className="p-1 bg-white/5 rounded-full border border-white/10">
                <User size={12} className="text-white/40" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                {msg.sender} <span className="text-white/20">|</span> {msg.role}
              </span>
            </div>
            <div 
            className="max-w-[85%] p-4 rounded-2xl border bg-white/5 border-white/10 text-white/80 rounded-tl-none group hover:border-emerald-500/30 transition-colors"
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <div className="mt-2 flex items-center justify-end gap-1">
                <span className="text-[9px] font-mono text-white/20 tracking-tighter">LOG_TS: {formatSystemTime(msg.time)}</span>
                {msg.is_verified && (
                  <ShieldCheck size={10} className="text-emerald-500/50" />
                )}
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
