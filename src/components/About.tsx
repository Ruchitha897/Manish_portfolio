import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  const stats = [
    { value: 1, suffix: "+", label: "Years Experience" },
  ];

  return (
    <section id="about" ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#00e5ff]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Image - Fully responsive, no crop, no zoom */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-auto rounded-2xl overflow-hidden glass shadow-[0_8px_32px_rgba(139,92,246,0.15)] border border-white/10 bg-[#0a0a0a] group hover:border-[#8b5cf6]/40 transition-all duration-500"
        >
          {/* Subtle gradient layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#00e5ff]/5 pointer-events-none z-10" />

          {/* Original photograph */}
          <img 
            src="/about-image.jpeg" 
            alt="About Manish Reddy - Trained by Karanam Srinu"
            className="w-full h-auto object-contain object-center block relative z-10"
          />

          {/* Subtle bottom gradient for contrast */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none z-20" />

          {/* Training Credit Badge */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-30">
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#080808]/85 backdrop-blur-md border border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
              <Award className="w-4 h-4 text-[#00e5ff] shrink-0" />
              <span className="font-space text-xs sm:text-sm font-semibold tracking-wider uppercase text-white drop-shadow-sm">
                TRAINED BY KARANAM SRINU
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center space-x-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#8b5cf6] to-[#00e5ff]" />
            <h2 className="text-[#00e5ff] font-space tracking-widest uppercase text-sm font-medium">About Me</h2>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bebas mb-8 tracking-wide text-white leading-none"
          >
            Crafting <span className="text-gradient">Visuals</span> that leave an impact
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mb-12 font-light leading-relaxed"
          >
            "I specialize in editing cinematic videos, reels, commercials, YouTube content and social media videos with strong storytelling and engaging visuals."
          </motion.p>

          <div className="flex flex-wrap gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass px-6 py-4 rounded-xl border border-white/10 flex flex-col space-y-1 shadow-[0_4px_20px_rgba(139,92,246,0.08)]"
              >
                <div className="text-4xl md:text-5xl font-bebas text-white leading-none">
                  {stat.value}<span className="text-gradient">{stat.suffix}</span>
                </div>
                <div className="text-xs md:text-sm font-space text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
