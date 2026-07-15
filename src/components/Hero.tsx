import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Animated Gradients & Noise */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#080808]" />
        
        {/* Animated Blur Blobs */}
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-[#8b5cf6]/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] bg-[#00e5ff]/15 rounded-full blur-[150px]"
        />
        
        {/* Noise Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />
      </div>

      {/* Floating Particles (Simple CSS implementation) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -1000],
              x: Math.random() * 200 - 100,
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
            className="absolute rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-10%',
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div style={{ y: yText, opacity }} className="flex flex-col space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#00e5ff] font-space tracking-widest text-sm uppercase"
          >
            Professional Video Editor
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bebas leading-[0.9]"
          >
            MANISH<br/>
            <span className="text-gradient">REDDY</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-lg md:text-xl max-w-md font-light"
          >
            Creating visuals that tell unforgettable stories. Cinematic editing for modern brands and creators.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a href="#portfolio" className="relative group px-8 py-4 bg-white text-black font-space font-medium overflow-hidden rounded-sm">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Portfolio</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#00e5ff] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </a>
            
            <a href="#contact" className="px-8 py-4 border border-white/20 text-white font-space font-medium hover:bg-white/5 transition-colors rounded-sm">
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* Profile Image & Rings */}
        <motion.div style={{ y: yImage, opacity }} className="relative flex justify-center lg:justify-end">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Rotating Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20px] rounded-full border border-[#8b5cf6]/30 border-dashed"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-40px] rounded-full border border-[#00e5ff]/20"
            />
            
            {/* Image Placeholder with Glowing Border */}
            <div className="absolute inset-0 rounded-full border-gradient p-[2px] animate-pulse">
              <div className="w-full h-full rounded-full bg-[#111] overflow-hidden relative">
                {/* Image will go here */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-space text-sm">
                  Profile Image Placeholder
                </div>
                {/* Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#8b5cf6]/20 to-transparent mix-blend-overlay" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
