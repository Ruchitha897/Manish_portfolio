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

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 grid lg:grid-cols-2 gap-12 items-center" style={{ perspective: '1200px' }}>
        {/* Text Content with 3D Depth */}
        <motion.div 
          style={{ y: yText, opacity, transformStyle: 'preserve-3d' }} 
          className="flex flex-col space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#00e5ff] font-space tracking-widest text-sm uppercase drop-shadow-[0_2px_10px_rgba(0,229,255,0.4)]"
          >
            Professional Video Editor
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bebas leading-[0.9] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
          >
            MANISH<br/>
            <span className="text-gradient">REDDY</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-lg md:text-xl max-w-md font-light leading-relaxed"
          >
            Creating visuals that tell unforgettable stories. Cinematic editing for modern brands and creators.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a 
              href="#portfolio" 
              className="relative px-8 py-4 bg-gradient-to-r from-white via-gray-100 to-white text-black font-space font-medium rounded-xl shadow-[0_10px_30px_rgba(255,255,255,0.15)] border border-white/40"
            >
              <span className="relative z-10">View Portfolio</span>
            </a>
            
            <a 
              href="#contact" 
              className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white font-space font-medium rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* 3D Profile Showcase with Gyroscopic Orbital Rings & Depth */}
        <motion.div 
          style={{ y: yImage, opacity, perspective: '1200px' }} 
          className="relative flex justify-center lg:justify-end"
        >
          <div 
            className="relative w-72 h-72 md:w-96 md:h-96"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* 3D Deep Ambient Glow Plate */}
            <div 
              className="absolute -inset-10 rounded-full bg-gradient-to-tr from-[#8b5cf6]/25 via-transparent to-[#00e5ff]/25 blur-[60px] pointer-events-none"
              style={{ transform: 'translateZ(-50px)' }}
            />

            {/* 3D Gyroscopic Ring 1 - Cyan primary orbit */}
            <motion.div 
              animate={{ rotateZ: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 rounded-full border border-[#00e5ff]/35 border-dashed"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'rotateX(65deg) rotateY(18deg)',
                boxShadow: '0 0 25px rgba(0,229,255,0.15)',
              }}
            />

            {/* 3D Gyroscopic Ring 2 - Purple counter orbit */}
            <motion.div 
              animate={{ rotateZ: -360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-14 rounded-full border border-[#8b5cf6]/30"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'rotateX(55deg) rotateY(-28deg)',
                boxShadow: '0 0 25px rgba(139,92,246,0.15)',
              }}
            />
            
            {/* 3D Floating Portrait Disc with Smooth Dimensional Float */}
            <motion.div 
              animate={{ 
                y: [0, -12, 0],
                rotateX: [0, 4, 0],
                rotateY: [0, -4, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8b5cf6] via-[#00e5ff]/50 to-[#00e5ff] p-[3px] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_60px_rgba(0,229,255,0.35),0_0_90px_rgba(139,92,246,0.25)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div 
                className="w-full h-full rounded-full bg-black/60 backdrop-blur-2xl overflow-hidden relative"
                style={{ transform: 'translateZ(15px)' }}
              >
                <img 
                  src="/hero_image.webp" 
                  alt="Manish Reddy" 
                  className="w-full h-full object-cover object-center"
                />
                {/* Inner Cinematic 3D Lighting Layer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#8b5cf6]/25 via-transparent to-[#00e5ff]/20 mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
