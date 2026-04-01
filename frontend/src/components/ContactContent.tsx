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
