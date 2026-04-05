import { motion } from "motion/react";
import { ExternalLink, Star } from "lucide-react";
import { useSystemData } from "../hooks/useSystemData";

export default function BrandsContent() {
  const { memory } = useSystemData();
  const brands = memory?.filter(item => item.type === "BRAND") || [];

  if (!brands) return null;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {brands.map((brand, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="glass p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center group cursor-pointer"
              onClick={() =>
                brand.url !== "#" && window.open(brand.url, "_blank")
              }
            >
              <div className="relative w-12 h-12 mb-3">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                  crossOrigin="anonymous"
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
      </div>

      <div className="p-6 pt-2 border-white/5 bg-black/20 backdrop-blur-md">
        <div className="p-4 rounded-2xl border border-dashed border-white/10 flex flex-col items-center text-center">
          <Star size={20} className="text-yellow-500/40 mb-2" />
          <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
            Trusted by Industry Leaders
          </h4>
        </div>
      </div>
    </div>
  );
}
