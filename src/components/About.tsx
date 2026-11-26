import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Film, CheckCircle2 } from 'lucide-react';
import TiltCard3D from './TiltCard3D';

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  const stats = [
    { value: 1, suffix: "+", label: "Years Experience" },
  ];

  return (
    <section id="about" ref={containerRef} className="py-32 relative overflow-hidden bg-[#080808]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#00e5ff]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Image with Interactive 3D Holographic Tilt */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <TiltCard3D maxTilt={10} glare={true} scale={1.01} className="w-full">
            <div className="relative w-full h-auto rounded-3xl overflow-hidden glass shadow-[0_15px_45px_rgba(0,0,0,0.8)] border border-white/15 bg-[#0a0a0a] group hover:border-[#00e5ff]/50 transition-all duration-500">
              {/* Subtle gradient layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 via-transparent to-[#00e5ff]/5 pointer-events-none z-10" />

              {/* Original photograph */}
              <img 
                src="/about-image.jpeg" 
                alt="About Manish Reddy - Trained by Karanam Srinu"
                className="w-full h-auto object-contain object-center block relative z-10"
              />

              {/* Subtle bottom gradient for contrast */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-20" />

              {/* Training Credit Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-30">
                <div className="inline-flex items-center space-x-3 px-4 py-3 rounded-2xl bg-[#080808]/90 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:border-[#00e5ff]/60 transition-all">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#00e5ff] p-[1px] shrink-0">
                    <div className="w-full h-full rounded-[11px] bg-black flex items-center justify-center">
                      <Award className="w-4 h-4 text-[#00e5ff]" />
                    </div>
                  </div>
                  <div>
                    <span className="font-space text-xs sm:text-sm font-bold tracking-wider uppercase text-white block drop-shadow-md">
                      TRAINED BY KARANAM SRINU
                    </span>
                    <span className="text-[10px] font-space text-gray-400 flex items-center mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-[#00e5ff] mr-1" />
                      Certified Video Editor
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard3D>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#8b5cf6] to-[#00e5ff]" />
            <h2 className="text-[#00e5ff] font-space tracking-widest uppercase text-sm font-semibold">About Me</h2>
          </div>

          <h3 className="text-5xl md:text-6xl font-bebas mb-8 tracking-wide text-white leading-none">
            Crafting <span className="text-gradient">Visuals</span> that leave an impact
          </h3>

          <p className="text-gray-300 text-lg mb-10 font-light leading-relaxed border-l-2 border-[#8b5cf6]/40 pl-5">
            "I specialize in editing cinematic videos, reels, commercials, YouTube content and social media videos with strong storytelling and engaging visuals."
          </p>

          <div className="flex flex-wrap gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass px-7 py-5 rounded-2xl border border-white/10 flex items-center space-x-4 shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-[#8b5cf6]/40 transition-colors"
              >
                <div className="text-5xl font-bebas text-white leading-none">
                  {stat.value}<span className="text-gradient">{stat.suffix}</span>
                </div>
                <div className="text-xs font-space text-gray-400 uppercase tracking-wider leading-snug font-medium">
                  {stat.label}
                </div>
              </div>
            ))}

            <div className="glass px-7 py-5 rounded-2xl border border-white/10 flex items-center space-x-3 text-xs font-space text-gray-300">
              <Film className="w-5 h-5 text-[#00e5ff]" />
              <div>
                <span className="text-white font-bold block font-space">Cinematic Storyteller</span>
                <span className="text-gray-400">Pacing • Motion • Grading</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
