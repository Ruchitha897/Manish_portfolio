import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Neon Nights',
    category: 'Cinematic Edit',
    description: 'A highly visual, fast-paced cinematic sequence showcasing city life.',
    duration: '2:15',
    software: 'After Effects, Premiere Pro',
    videoSrc: '/videos/portfolio_video_1.mp4'
  },
  {
    id: 2,
    title: 'Brand Anthem',
    category: 'Commercial',
    description: 'High-energy promotional video for a sports apparel brand.',
    duration: '1:30',
    software: 'Premiere Pro, DaVinci Resolve',
    videoSrc: '/videos/portfolio_video_2.mp4'
  },
  {
    id: 3,
    title: 'Tech Review 2025',
    category: 'YouTube',
    description: 'Engaging tech review with motion graphics and smooth transitions.',
    duration: '10:45',
    software: 'Premiere Pro, After Effects',
    videoSrc: '/videos/portfolio_video_3.mp4'
  },
  {
    id: 4,
    title: 'Summer Vibes',
    category: 'Instagram Reel',
    description: 'Trendy, fast-paced reel with trending audio and effects.',
    duration: '0:30',
    software: 'CapCut, Premiere Pro',
    videoSrc: '/videos/portfolio_video_4.mp4'
  },
  {
    id: 5,
    title: 'Echoes',
    category: 'Music Video',
    description: 'Creative music video editing with heavy color grading and VFX.',
    duration: '3:45',
    software: 'Premiere Pro, After Effects, DaVinci',
    videoSrc: '/videos/portfolio_video_5.mp4'
  },
  {
    id: 6,
    title: 'Project Alpha',
    category: 'Cinematic',
    description: 'A newly added cinematic sequence.',
    duration: '2:00',
    software: 'Premiere Pro, After Effects',
    videoSrc: '/videos/vid_1.mp4'
  },
  {
    id: 7,
    title: 'Project Beta',
    category: 'Commercial',
    description: 'High energy commercial showcase.',
    duration: '1:30',
    software: 'DaVinci Resolve',
    videoSrc: '/videos/vid_2.mp4'
  }
];

export default function Portfolio() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  // Automatic 3D Rotation State
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [radius, setRadius] = useState(380);

  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const targetAngleRef = useRef<number | null>(null);

  const count = projects.length;
  const angleStep = 360 / count;

  // Responsive radius calculation
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setRadius(260);
      } else if (width < 1024) {
        setRadius(320);
      } else {
        setRadius(380);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous Automatic 3D Rotation Loop
  useEffect(() => {
    const animate = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = currentTime;

      // Handle smooth snap transition to target angle (Reset / Prev / Next)
      if (targetAngleRef.current !== null) {
        const diff = targetAngleRef.current - rotationAngle;
        if (Math.abs(diff) < 0.15) {
          setRotationAngle(targetAngleRef.current);
          targetAngleRef.current = null;
        } else {
          setRotationAngle(prev => prev + diff * Math.min(1, delta * 6));
        }
      }
      // Continuous automatic rotation when active and modal is closed
      else if (isRotating && !selectedVideo) {
        // 2x faster continuous automatic 3D rotation (36 degrees per second) on mobile and laptop
        setRotationAngle(prev => (prev + 36 * delta) % 360000);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isRotating, selectedVideo, rotationAngle]);

  // Rotation Controls
  const handlePlayRotation = () => {
    targetAngleRef.current = null;
    setIsRotating(true);
  };

  const handleStopRotation = () => {
    setIsRotating(false);
    targetAngleRef.current = null;
  };

  const handleResetView = () => {
    setIsRotating(false);
    const nearestMultiple = Math.round(rotationAngle / angleStep) * angleStep;
    targetAngleRef.current = nearestMultiple;
  };

  const handleStepPrev = () => {
    setIsRotating(false);
    targetAngleRef.current = Math.round((rotationAngle + angleStep) / angleStep) * angleStep;
  };

  const handleStepNext = () => {
    setIsRotating(false);
    targetAngleRef.current = Math.round((rotationAngle - angleStep) / angleStep) * angleStep;
  };

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden bg-[#080808]">
      {/* 3D Atmospheric Depth Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] bg-gradient-to-r from-[#8b5cf6]/10 via-[#00e5ff]/10 to-[#8b5cf6]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header with Exact Original Text */}
        <div className="mb-14 md:flex justify-between items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-4 mb-4"
            >
              <div className="h-[1px] w-12 bg-gradient-to-r from-[#8b5cf6] to-[#00e5ff]" />
              <h2 className="text-[#00e5ff] font-space tracking-widest uppercase">Selected Works</h2>
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bebas text-white"
            >
              Featured <span className="text-gradient">Projects</span>
            </motion.h3>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:block text-gray-400 font-space"
          >
            Hover and click to play
          </motion.div>
        </div>

        {/* 3D Automatic Rotating Carousel Stage */}
        <div className="relative w-full py-6 flex flex-col items-center select-none">
          
          {/* Perspective Viewport */}
          <div
            className="relative w-full h-[460px] sm:h-[500px] md:h-[540px] flex items-center justify-center overflow-visible"
            style={{ perspective: '1500px' }}
          >
            {/* Subtle Floor Ambient Lighting Ring & 3D Perspective Disc */}
            <div
              className="absolute w-[600px] h-[600px] md:w-[780px] md:h-[780px] rounded-full pointer-events-none"
              style={{
                transform: 'rotateX(78deg) translateZ(-250px)',
                background: 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, rgba(139,92,246,0.08) 45%, transparent 70%)',
                border: '1px solid rgba(0,229,255,0.25)',
                boxShadow: '0 0 70px rgba(0,229,255,0.18), inset 0 0 40px rgba(139,92,246,0.12)',
              }}
            />
            <div
              className="absolute w-[420px] h-[420px] md:w-[540px] md:h-[540px] rounded-full pointer-events-none"
              style={{
                transform: 'rotateX(78deg) translateZ(-246px)',
                border: '1px dashed rgba(139,92,246,0.3)',
              }}
            />

            {/* Rotating 3D Cylinder Anchor */}
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${rotationAngle}deg)`,
                willChange: 'transform',
              }}
            >
              {projects.map((project, index) => {
                const cardBaseAngle = index * angleStep;
                const relAngle = ((cardBaseAngle + rotationAngle) % 360 + 540) % 360 - 180;
                const cosAngle = Math.cos((relAngle * Math.PI) / 180);
                const isFacingFront = cosAngle > -0.15;
                const isCenter = Math.abs(relAngle) < angleStep * 0.55;

                // Realistic atmospheric lighting falloff based on 3D rotation position
                const opacity = Math.max(0.35, (cosAngle + 1.2) / 2.2);
                const brightness = Math.max(0.45, 0.55 + cosAngle * 0.45);
                const depthScale = Math.max(0.85, 0.9 + cosAngle * 0.1);

                return (
                  <div
                    key={project.id}
                    onClick={() => setSelectedVideo(project.id)}
                    className="absolute w-[200px] sm:w-[240px] lg:w-[280px] h-[340px] sm:h-[400px] lg:h-[460px] rounded-2xl overflow-hidden cursor-pointer bg-[#111] border transition-[border-color,box-shadow] duration-300"
                    style={{
                      transform: `rotateY(${cardBaseAngle}deg) translateZ(${radius}px) scale(${depthScale})`,
                      transformStyle: 'preserve-3d',
                      opacity: isFacingFront ? opacity : 0.25,
                      filter: `brightness(${brightness})`,
                      pointerEvents: isFacingFront ? 'auto' : 'none',
                      zIndex: Math.round(cosAngle * 100),
                      borderColor: isCenter
                        ? 'rgba(0,229,255,0.7)'
                        : 'rgba(255,255,255,0.12)',
                      boxShadow: isCenter
                        ? '0 0 45px rgba(0,229,255,0.35), 0 25px 50px rgba(0,0,0,0.9)'
                        : '0 15px 35px rgba(0,0,0,0.75)',
                    }}
                  >
                    {/* Continuous Auto-Playing Video Preview */}
                    <div className="absolute inset-0 bg-[#1a1a1a] overflow-hidden">
                      <video
                        src={project.videoSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>

                    {/* Gradient Overlay for Cinematic Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none" />

                    {/* Category Pill Tag */}
                    <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-space tracking-wider uppercase text-[#00e5ff] font-medium">
                        {project.category}
                      </span>
                    </div>

                    {/* Center Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div
                        className={`w-13 h-13 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                          isCenter
                            ? 'bg-[#00e5ff] text-black shadow-[0_0_25px_rgba(0,229,255,0.6)]'
                            : 'bg-white/15 text-white border border-white/25 shadow-lg'
                        }`}
                      >
                        <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                      </div>
                    </div>

                    {/* Bottom Metadata Banner with Original Titles */}
                    <div className="absolute bottom-0 inset-x-0 p-4 z-10 pointer-events-none">
                      <h4 className="text-xl md:text-2xl font-bebas text-white tracking-wide truncate mb-1">
                        {project.title}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] font-space text-gray-400">
                        <span className="truncate max-w-[150px]">{project.software}</span>
                        <span className="text-gray-300 font-medium">{project.duration}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Minimal 3D Rotation Controls Bar (Strictly Icon Only - Zero New Text) */}
          <div className="mt-8 flex items-center justify-center space-x-3 p-2 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.7)]">
            <button
              onClick={handleStepPrev}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
              title="Previous"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handlePlayRotation}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                isRotating
                  ? 'bg-gradient-to-r from-[#8b5cf6] to-[#00e5ff] text-white shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                  : 'bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:bg-white/15'
              }`}
              title="Play Rotation"
              aria-label="Play Rotation"
            >
              <Play className="w-4 h-4 ml-0.5" fill={isRotating ? "currentColor" : "none"} />
            </button>

            <button
              onClick={handleStopRotation}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                !isRotating
                  ? 'bg-red-500/25 text-red-400 border border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                  : 'bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:bg-white/15'
              }`}
              title="Stop Rotation"
              aria-label="Stop Rotation"
            >
              <Pause className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetView}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Reset View"
              aria-label="Reset View"
            >
              <RotateCcw className="w-4 h-4 text-[#00e5ff]" />
            </button>

            <button
              onClick={handleStepNext}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
              title="Next"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>

      {/* Video Modal with Full Native Playback Controls */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setSelectedVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer p-2 rounded-full bg-white/10"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-6xl aspect-video bg-transparent rounded-[20px] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {projects.find(p => p.id === selectedVideo)?.videoSrc ? (
                <div className="w-full h-full flex items-center justify-center bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[20px] shadow-[0_0_50px_rgba(139,92,246,0.3)] p-2 md:p-4 relative overflow-hidden">
                  {/* Subtle ambient glow behind the video */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/20 to-[#00e5ff]/20 opacity-50 mix-blend-overlay pointer-events-none" />
                  
                  <video 
                    src={projects.find(p => p.id === selectedVideo)?.videoSrc}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain rounded-[20px] relative z-10 bg-black/50"
                  />
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
