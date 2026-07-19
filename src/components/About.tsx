import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';


export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const stats = [
    { value: 1, suffix: "+", label: "Years Experience" },
  ];

  return (
    <section id="about" ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Image Parallax */}
        <div className="relative h-[600px] rounded-lg overflow-hidden glass group shadow-[0_8px_32px_rgba(139,92,246,0.15)] border border-white/10">
          <motion.div style={{ y: yImage }} className="absolute inset-[-100px] bg-[#111]">
            <img 
              src="/about-image.jpeg" 
              alt="About Manish Reddy"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent opacity-80 pointer-events-none" />
        </div>

        {/* Right Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center space-x-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#8b5cf6] to-[#00e5ff]" />
            <h2 className="text-[#00e5ff] font-space tracking-widest uppercase">About Me</h2>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bebas mb-8"
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex flex-col space-y-2"
              >
                <div className="text-4xl md:text-5xl font-bebas text-white">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm font-space text-gray-400 uppercase tracking-wider">
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
