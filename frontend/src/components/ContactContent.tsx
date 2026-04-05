import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Send, MapPin, Globe } from "lucide-react";
import { useSystemData } from "../hooks/useSystemData";

export default function ContactContent() {
  const { memory } = useSystemData();
  const [status, setStatus] = useState<
    "IDLE" | "SENDING" | "SUCCESS" | "ERROR"
  >("IDLE");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}?action=${import.meta.env.VITE_CONTACT_ACTION}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("SUCCESS");
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error();
      }
    } catch (err) {
      setStatus("ERROR");
    }
  };

  const contact = memory?.find((item) => item.id === "CONTACT#PRIMARY");

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
            <h3 className="text-2xl font-bold text-white tracking-tighter uppercase italic">
              Get In Touch
            </h3>
            <p className="text-xs text-white/40 font-mono tracking-widest uppercase">
              Secure_Channel_Ready // Protocol_v4.0
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                icon: <Mail size={18} />,
                label: "Email",
                value: contact?.email,
                color: contact?.styling.email_color,
              },
              {
                icon: <MapPin size={18} />,
                label: "Location",
                value: contact?.location,
                color: contact?.styling.location_color,
              },
              {
                icon: <Globe size={18} />,
                label: "Timezone",
                value: contact?.timezone,
                color: contact?.styling.timezone_color,
              },
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
                  <div className="text-[9px] font-mono uppercase tracking-widest text-white/20">
                    {item.label}
                  </div>
                  <div className="text-sm md:text-xs font-bold text-white/80">
                    {item.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4">
            {contact?.socials.map((social: any, i: number) => (
              <motion.a
                key={i}
                href={social?.url}
                target="_blank"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="group p-2 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:border-white/20 transition-all"
              >
                <img
                  src={social?.icon_url}
                  alt={social?.platform}
                  className="w-[25px] h-[25px] opacity-50 group-hover:opacity-100 transition-opacity"
                  crossOrigin="anonymous"
                ></img>
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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">
                Sender_Identity
              </label>
              <input
                name="name"
                type="text"
                placeholder="NAME..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none text-sm text-white/90 placeholder:text-white/20 focus:border-emerald-500/40 transition-colors font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">
                Return_Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="EMAIL..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none text-sm text-white/90 placeholder:text-white/20 focus:border-emerald-500/40 transition-colors font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/40 ml-1">
                Encrypted_Payload
              </label>
              <textarea
                name="message"
                placeholder="MESSAGE..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none text-sm text-white/90 placeholder:text-white/20 focus:border-emerald-500/40 transition-colors font-mono resize-none"
              />
            </div>
            <button disabled={status === "SENDING"} className="w-full py-4 bg-emerald-500/20 text-emerald-400 rounded-xl font-mono text-xs uppercase tracking-[0.3em] font-bold border border-emerald-500/30 hover:bg-emerald-500/30 transition-all flex items-center justify-center gap-2 group">
              <Send
                size={16}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
              {status === "SENDING" ? "TRANSMITTING..." : status === "SUCCESS" ? "MESSAGE_DELIVERED" : "TRANSMIT_MESSAGE"}
            </button>
            {status === "ERROR" && <p className="text-[10px] text-red-400 font-mono text-center">CRITICAL_FAILURE: LINK_TIMEOUT</p>}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
