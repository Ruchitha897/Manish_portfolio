import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function FeaturedProject() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-[#111]">
      {/* Floating Gradients */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-[#8b5cf6] rounded-full blur-[150px] mix-blend-screen pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#00e5ff] font-space tracking-widest uppercase mb-4 block">Masterpiece</span>
          <h2 className="text-5xl md:text-7xl font-bebas text-white">The <span className="text-gradient">Horizon</span> Project</h2>
        </motion.div>

        <div className="relative h-[60vh] md:h-[80vh] w-full rounded-3xl overflow-hidden group glass shadow-[0_8px_32px_rgba(139,92,246,0.15)] border border-white/10 flex items-center justify-center bg-[#0a0a0a]">
          {/* Subtle background for empty space */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#00e5ff]/5 pointer-events-none" />

          {/* Parallax Image container with padding so it isn't cropped or obscured by text */}
          <motion.div style={{ y: yImage }} className="absolute inset-0 flex items-center justify-center p-8 pb-40 md:p-16 md:pb-56">
             <img 
               src="/IMG-20.jpeg" 
               alt="Featured Project"
               className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
             />
          </motion.div>
          
          {/* Text background overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

          {/* Project Details Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row justify-between items-end">
            <div className="mb-8 md:mb-0">
               <h3 className="text-4xl md:text-5xl font-bebas text-white mb-4">Horizon Zero</h3>
               <p className="text-gray-300 font-light max-w-lg leading-relaxed">
                 An immersive cinematic experience built for the web. Combining heavy visual effects with seamless storytelling to create a truly unforgettable piece of art.
               </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm font-space">
              <div>
                <span className="text-gray-500 block mb-1 uppercase tracking-wider text-xs">Role</span>
                <span className="text-white font-medium">Lead Editor & VFX</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1 uppercase tracking-wider text-xs">Client</span>
                <span className="text-white font-medium">Sony Music</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1 uppercase tracking-wider text-xs">Duration</span>
                <span className="text-white font-medium">4:30</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1 uppercase tracking-wider text-xs">Software</span>
                <span className="text-white font-medium">Resolve, After Effects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
