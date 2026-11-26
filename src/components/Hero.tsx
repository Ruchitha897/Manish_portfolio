import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Film, Compass, ChevronDown } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yText = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden perspective-1200"
    >
      {/* Background Animated Gradients & 3D Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#080808]" />
        
        {/* Dynamic 3D Follow Spotlight */}
        <motion.div
          animate={{
            x: mousePos.x * 60,
            y: mousePos.y * 60,
          }}
          transition={{ type: 'spring', damping: 40, stiffness: 100 }}
          className="absolute top-1/4 left-1/3 w-[50vw] h-[50vw] bg-gradient-to-tr from-[#8b5cf6]/20 via-[#00e5ff]/15 to-transparent rounded-full blur-[140px]"
        />

        {/* Ambient Blur Blobs */}
        <motion.div 
          animate={{
            scale: [1, 1.25, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#00e5ff]/10 rounded-full blur-[160px]"
        />
        
        {/* Subtle Cyber Perspective Grid Floor */}
        <div 
          className="absolute inset-x-0 bottom-0 h-[40vh] opacity-15 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            transform: `perspective(600px) rotateX(72deg) translateY(${mousePos.y * -15}px)`,
            transformOrigin: 'bottom center',
            maskImage: 'linear-gradient(to top, black 20%, transparent 90%)',
            WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 90%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Text Content with 3D Depth */}
        <motion.div 
          style={{ y: yText, opacity }} 
          className="flex flex-col space-y-6"
        >
          {/* 3D Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-max shadow-[0_0_20px_rgba(0,229,255,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-[#00e5ff]" />
            <span className="text-[#00e5ff] font-space tracking-widest text-xs uppercase font-semibold">
              Professional Video Editor & Filmmaker
            </span>
          </motion.div>
          
          {/* Main 3D Kinetic Typography */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bebas leading-[0.88] tracking-wide"
            style={{
              textShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 40px rgba(139,92,246,0.2)',
            }}
          >
            MANISH<br/>
            <span className="text-gradient drop-shadow-[0_0_35px_rgba(0,229,255,0.4)]">REDDY</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-300 text-lg md:text-xl max-w-lg font-light leading-relaxed"
          >
            Creating visuals that tell unforgettable stories. High-end cinematic editing, color grading, and motion design for modern brands and visionary creators.
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a 
              href="#portfolio" 
              className="relative group px-8 py-4 bg-white text-black font-space font-semibold overflow-hidden rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(0,229,255,0.5)] transition-all duration-300 flex items-center space-x-2"
            >
              <Compass className="w-4 h-4 text-black group-hover:text-white transition-colors z-10" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Explore 3D Reel
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#00e5ff] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </a>
            
            <a 
              href="#contact" 
              className="px-8 py-4 border border-white/20 text-white font-space font-medium hover:bg-white/10 hover:border-white/40 transition-all rounded-xl backdrop-blur-md"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="pt-6 border-t border-white/10 flex items-center space-x-8 text-xs font-space text-gray-400"
          >
            <div>
              <span className="text-white font-bold text-base block font-bebas tracking-wide">4K & 8K</span>
              <span>Ultra-HD Quality</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-white font-bold text-base block font-bebas tracking-wide">DaVinci & Premiere</span>
              <span>Pro Color & Audio</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-white font-bold text-base block font-bebas tracking-wide">Worldwide</span>
              <span>Remote Collaboration</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right 3D Profile Hologram / Card */}
        <motion.div 
          style={{ y: yImage, opacity }} 
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div 
            style={{
              rotateY: mousePos.x * 15,
              rotateX: -mousePos.y * 15,
              transformStyle: 'preserve-3d',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px]"
          >
            {/* Outer Rotating 3D Ring 1 */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-25px] rounded-full border border-[#8b5cf6]/35 border-dashed pointer-events-none"
              style={{ transform: 'translateZ(20px)' }}
            />
            {/* Outer Rotating 3D Ring 2 */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-45px] rounded-full border border-[#00e5ff]/25 pointer-events-none"
              style={{ transform: 'translateZ(10px)' }}
            />
            
            {/* Floating 3D Badge on Top Right */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-2 z-30 px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-xl border border-white/20 shadow-[0_0_25px_rgba(0,229,255,0.4)] flex items-center space-x-2"
              style={{ transform: 'translateZ(60px)' }}
            >
              <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
              <span className="text-[11px] font-space uppercase text-white font-bold tracking-wider">
                Available for Hire
              </span>
            </motion.div>

            {/* Image Container with Floating 3D Depth & Glow */}
            <div 
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8b5cf6] via-[#00e5ff]/30 to-[#00e5ff] p-[3px] shadow-[0_0_60px_rgba(139,92,246,0.3)] hover:shadow-[0_0_90px_rgba(0,229,255,0.5)] transition-shadow duration-500"
              style={{ transform: 'translateZ(30px)' }}
            >
              <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-2xl overflow-hidden relative group">
                <img 
                  src="/hero_image.webp" 
                  alt="Manish Reddy - Video Editor & Filmmaker" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                {/* Inner Cinematic Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#8b5cf6]/20 via-transparent to-[#00e5ff]/20 mix-blend-overlay pointer-events-none" />
              </div>
            </div>

            {/* Bottom floating film badge */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-2 z-30 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(139,92,246,0.3)] flex items-center space-x-2.5"
              style={{ transform: 'translateZ(50px)' }}
            >
              <Film className="w-4 h-4 text-[#8b5cf6]" />
              <span className="text-xs font-space text-white font-medium">
                Cinematic Color & Cuts
              </span>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 text-gray-500 hover:text-white transition-colors cursor-pointer"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] font-space tracking-widest uppercase">Scroll Down</span>
        <ChevronDown className="w-4 h-4 text-[#00e5ff]" />
      </motion.div>
    </section>
  );
}
