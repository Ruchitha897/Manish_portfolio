import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PenTool, Scissors, Palette, Sparkles, Volume2, UploadCloud, ArrowRight } from 'lucide-react';

const steps = [
  { name: 'Planning', icon: PenTool, desc: 'Storyboarding & structure' },
  { name: 'Editing', icon: Scissors, desc: 'Cutting & pacing' },
  { name: 'Color Grading', icon: Palette, desc: 'Visual mood & tone' },
  { name: 'Motion Graphics', icon: Sparkles, desc: 'VFX & titles' },
  { name: 'Sound Design', icon: Volume2, desc: 'Audio mixing & SFX' },
  { name: 'Final Delivery', icon: UploadCloud, desc: 'High-res export' },
];

export default function Process() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bebas text-white">The <span className="text-gradient">Editing</span> Process</h2>
        </div>

        <div ref={containerRef} className="relative flex flex-col md:flex-row items-center justify-between">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 hidden md:block -translate-y-1/2">
            <motion.div 
              initial={{ width: 0 }}
              animate={inView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#00e5ff]"
            />
          </div>

          {/* Vertical Connecting Line (Mobile) */}
          <div className="absolute top-0 left-1/2 w-[2px] h-full bg-white/10 md:hidden -translate-x-1/2">
            <motion.div 
              initial={{ height: 0 }}
              animate={inView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-[#8b5cf6] to-[#00e5ff]"
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 50 }}
              transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
              className="relative z-10 flex flex-col items-center mb-12 md:mb-0 group w-full md:w-auto"
            >
              <div className="w-20 h-20 rounded-full glass border border-white/20 flex items-center justify-center mb-4 group-hover:border-[#00e5ff] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300 bg-[#111]">
                <step.icon className="w-8 h-8 text-gray-400 group-hover:text-[#00e5ff] transition-colors" />
              </div>
              <h4 className="font-bebas text-2xl text-white mb-1 tracking-wider text-center">{step.name}</h4>
              <p className="text-gray-500 font-space text-xs uppercase tracking-widest text-center">{step.desc}</p>
              
              {/* Arrow for mobile, handled by line in desktop but could be explicit */}
              {index !== steps.length - 1 && (
                <ArrowRight className="md:hidden mt-8 text-white/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
