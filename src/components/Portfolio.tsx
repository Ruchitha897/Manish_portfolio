import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers,
  Compass
} from 'lucide-react';

export interface VideoProject {
  id: number;
  title: string;
  category: 'Cinematic' | 'Commercial' | 'Social' | 'Music Video' | 'YouTube';
  description: string;
  duration: string;
  software: string;
  videoSrc: string;
  aspect: '16:9' | '9:16';
  badge?: string;
}

const projects: VideoProject[] = [
  {
    id: 1,
    title: 'Neon Nights',
    category: 'Cinematic',
    description: 'A highly visual, fast-paced cinematic sequence showcasing vibrant city nightlife and neon atmosphere.',
    duration: '2:15',
    software: 'After Effects, Premiere Pro',
    videoSrc: '/videos/portfolio_video_1.mp4',
    aspect: '9:16',
    badge: 'Featured Reel'
  },
  {
    id: 2,
    title: 'Cinematic Sequence I',
    category: 'Cinematic',
    description: 'Masterfully edited narrative sequence with atmospheric pacing and cinematic color grading.',
    duration: '1:45',
    software: 'DaVinci Resolve, Premiere Pro',
    videoSrc: '/videos/c1.mp4',
    aspect: '16:9',
    badge: '16:9 Cinema'
  },
  {
    id: 3,
    title: 'Brand Anthem',
    category: 'Commercial',
    description: 'High-energy promotional video for a premium sports apparel brand with kinetic typography and rhythm.',
    duration: '1:30',
    software: 'Premiere Pro, DaVinci Resolve',
    videoSrc: '/videos/portfolio_video_2.mp4',
    aspect: '9:16',
    badge: 'Commercial'
  },
  {
    id: 4,
    title: 'Cinematic Sequence II',
    category: 'Cinematic',
    description: 'High-tension narrative sequence featuring complex sound design and seamless color transitions.',
    duration: '2:10',
    software: 'Premiere Pro, After Effects',
    videoSrc: '/videos/c2.mp4',
    aspect: '16:9',
    badge: '16:9 Cinema'
  },
  {
    id: 5,
    title: 'Tech Review 2025',
    category: 'YouTube',
    description: 'Engaging modern tech review with smooth motion graphics, clean lower thirds, and dynamic b-roll cuts.',
    duration: '10:45',
    software: 'Premiere Pro, After Effects',
    videoSrc: '/videos/portfolio_video_3.mp4',
    aspect: '9:16',
    badge: 'YouTube'
  },
  {
    id: 6,
    title: 'Project Alpha',
    category: 'Cinematic',
    description: 'Moody cinematic showcase focused on visual rhythm, deep shadows, and emotional storytelling.',
    duration: '2:00',
    software: 'Premiere Pro, After Effects',
    videoSrc: '/videos/vid_1.mp4',
    aspect: '9:16'
  },
  {
    id: 7,
    title: 'Summer Vibes',
    category: 'Social',
    description: 'Trendy, fast-paced Instagram reel with viral sound synchronization and dynamic punch-ins.',
    duration: '0:30',
    software: 'CapCut, Premiere Pro',
    videoSrc: '/videos/portfolio_video_4.mp4',
    aspect: '9:16',
    badge: 'Instagram Reel'
  },
  {
    id: 8,
    title: 'Echoes',
    category: 'Music Video',
    description: 'Creative music video editing with heavy color grading, stylized speed ramps, and seamless visual effects.',
    duration: '3:45',
    software: 'Premiere Pro, After Effects, DaVinci',
    videoSrc: '/videos/portfolio_video_5.mp4',
    aspect: '9:16',
    badge: 'Music Video'
  },
  {
    id: 9,
    title: 'Project Beta',
    category: 'Commercial',
    description: 'High-impact commercial showcase built for high engagement and client conversion.',
    duration: '1:30',
    software: 'DaVinci Resolve',
    videoSrc: '/videos/vid_2.mp4',
    aspect: '9:16'
  }
];

const categories = ['All', 'Cinematic', 'Commercial', 'Social', 'YouTube', 'Music Video'] as const;

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'3d-carousel' | '3d-grid'>('3d-carousel');
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);

  // 3D Carousel Physics & State
  const [angle, setAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [radius, setRadius] = useState(460);
  const [tiltX] = useState(0);

  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const animFrameId = useRef<number>(0);
  const targetAngleRef = useRef<number | null>(null);

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const count = filteredProjects.length;
  const angleStep = 360 / Math.max(1, count);

  // Adjust radius based on viewport width
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setRadius(300);
      } else if (w < 1024) {
        setRadius(380);
      } else {
        setRadius(460);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Main 3D Animation Loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Handle programmatic target animation (e.g., Reset, Prev, Next)
      if (targetAngleRef.current !== null) {
        const diff = targetAngleRef.current - angle;
        if (Math.abs(diff) < 0.2) {
          setAngle(targetAngleRef.current);
          targetAngleRef.current = null;
        } else {
          setAngle(prev => prev + diff * Math.min(1, dt * 8));
        }
      }
      // Handle active continuous auto-rotation
      else if (isAutoRotating && !isHovered && !isDragging && !selectedVideo) {
        setAngle(prev => (prev + 12 * dt) % 360000);
      }
      // Handle inertia decay after drag
      else if (!isDragging && Math.abs(velocity.current) > 0.05) {
        setAngle(prev => prev + velocity.current);
        velocity.current *= 0.92;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [isAutoRotating, isHovered, isDragging, selectedVideo, angle]);

  // Mouse / Touch Drag Handlers
  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    targetAngleRef.current = null;
    dragStartX.current = clientX;
    dragStartAngle.current = angle;
    lastX.current = clientX;
    velocity.current = 0;
  };

  const handlePointerMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartX.current;
    // Rotation sensitivity
    const newAngle = dragStartAngle.current + deltaX * 0.35;
    velocity.current = (clientX - lastX.current) * 0.3;
    lastX.current = clientX;
    setAngle(newAngle);
  }, [isDragging]);

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Keyboard controls for modal navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null);
      } else if (selectedVideo) {
        const currentIndex = filteredProjects.findIndex(p => p.id === selectedVideo.id);
        if (e.key === 'ArrowRight' && currentIndex < filteredProjects.length - 1) {
          setSelectedVideo(filteredProjects[currentIndex + 1]);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
          setSelectedVideo(filteredProjects[currentIndex - 1]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo, filteredProjects]);

  // Rotation Control Actions
  const handlePlayRotation = () => {
    targetAngleRef.current = null;
    setIsAutoRotating(true);
  };

  const handleStopRotation = () => {
    setIsAutoRotating(false);
    velocity.current = 0;
    targetAngleRef.current = null;
  };

  const handleResetView = () => {
    setIsAutoRotating(false);
    velocity.current = 0;
    // Smoothly snap to the nearest front-aligned card
    const nearestMultiple = Math.round(angle / angleStep) * angleStep;
    targetAngleRef.current = nearestMultiple;
  };

  const handleStepRotation = (direction: 'prev' | 'next') => {
    setIsAutoRotating(false);
    velocity.current = 0;
    const step = direction === 'next' ? -angleStep : angleStep;
    targetAngleRef.current = Math.round((angle + step) / angleStep) * angleStep;
  };

  return (
    <section id="portfolio" className="py-28 relative overflow-hidden bg-[#080808]">
      {/* 3D Atmospheric Lighting and Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] bg-gradient-to-r from-[#8b5cf6]/10 via-[#00e5ff]/10 to-[#8b5cf6]/10 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 md:flex justify-between items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-3 mb-3 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
              <span className="text-[#00e5ff] font-space text-xs tracking-widest uppercase font-semibold">
                Interactive 3D Showcase
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bebas text-white leading-none tracking-wide"
            >
              Cinematic <span className="text-gradient">Portfolio</span>
            </motion.h2>
          </div>

          {/* View Mode Switcher */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 md:mt-0 flex items-center space-x-2 bg-black/60 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md"
          >
            <button
              onClick={() => setViewMode('3d-carousel')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-space font-semibold transition-all ${
                viewMode === '3d-carousel'
                  ? 'bg-gradient-to-r from-[#8b5cf6] to-[#00e5ff] text-white shadow-[0_0_20px_rgba(0,229,255,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>3D Carousel</span>
            </button>
            <button
              onClick={() => setViewMode('3d-grid')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-space font-semibold transition-all ${
                viewMode === '3d-grid'
                  ? 'bg-gradient-to-r from-[#8b5cf6] to-[#00e5ff] text-white shadow-[0_0_20px_rgba(0,229,255,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3D Wall</span>
            </button>
          </motion.div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                targetAngleRef.current = 0;
              }}
              className={`px-4 py-2 rounded-xl text-xs font-space transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ===================== VIEW MODE 1: 3D REVOLVING CAROUSEL ===================== */}
        {viewMode === '3d-carousel' && (
          <div className="relative w-full py-8 select-none">
            
            {/* Interactive 3D Rotation Stage */}
            <div
              className="relative w-full h-[520px] md:h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible"
              style={{ perspective: '1200px' }}
              onPointerDown={(e) => handlePointerDown(e.clientX)}
              onPointerMove={(e) => handlePointerMove(e.clientX)}
              onPointerUp={handlePointerUp}
              onPointerLeave={() => {
                handlePointerUp();
                setIsHovered(false);
              }}
              onMouseEnter={() => setIsHovered(true)}
            >
              {/* Floor Perspective Holographic Ring */}
              <div
                className="absolute w-[600px] h-[600px] md:w-[750px] md:h-[750px] rounded-full pointer-events-none"
                style={{
                  transform: 'rotateX(82deg) translateZ(-260px)',
                  background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, rgba(139,92,246,0.06) 45%, transparent 70%)',
                  border: '1px solid rgba(0,229,255,0.15)',
                  boxShadow: '0 0 80px rgba(0,229,255,0.15)',
                }}
              />

              {/* 3D Carousel Cylinder Ring */}
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${angle}deg) rotateX(${tiltX}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.1s linear',
                }}
              >
                {filteredProjects.map((project, i) => {
                  const cardAngle = i * angleStep;
                  const relAngle = ((cardAngle + angle) % 360 + 540) % 360 - 180;
                  const cosAngle = Math.cos((relAngle * Math.PI) / 180);
                  const isFront = cosAngle > 0.1;
                  const isCenter = Math.abs(relAngle) < angleStep * 0.6;
                  const opacity = Math.max(0.3, (cosAngle + 1) / 2);

                  return (
                    <div
                      key={project.id}
                      className="absolute rounded-2xl overflow-hidden glass transition-all duration-300"
                      style={{
                        width: window.innerWidth < 640 ? '240px' : window.innerWidth < 1024 ? '280px' : '320px',
                        height: window.innerWidth < 640 ? '380px' : window.innerWidth < 1024 ? '430px' : '480px',
                        transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                        transformStyle: 'preserve-3d',
                        opacity: isFront ? opacity : 0.25,
                        filter: isFront ? `brightness(${0.6 + cosAngle * 0.4})` : 'brightness(0.3) blur(2px)',
                        pointerEvents: isFront ? 'auto' : 'none',
                        zIndex: Math.round(cosAngle * 100),
                        border: isCenter
                          ? '2px solid rgba(0,229,255,0.6)'
                          : '1px solid rgba(255,255,255,0.1)',
                        boxShadow: isCenter
                          ? '0 0 40px rgba(0,229,255,0.25), 0 20px 40px rgba(0,0,0,0.8)'
                          : '0 15px 30px rgba(0,0,0,0.6)',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVideo(project);
                      }}
                    >
                      {/* Video Preview */}
                      <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden">
                        <video
                          src={project.videoSrc}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      </div>

                      {/* Top Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-space tracking-wider uppercase text-[#00e5ff]">
                          {project.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-space text-gray-300">
                          {project.duration}
                        </span>
                      </div>

                      {/* Center Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                            isCenter
                              ? 'bg-[#00e5ff] text-black shadow-[0_0_30px_rgba(0,229,255,0.6)] scale-110'
                              : 'bg-white/20 text-white hover:bg-white/40 hover:scale-105 border border-white/20'
                          }`}
                        >
                          <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                        </div>
                      </div>

                      {/* Bottom Info Banner */}
                      <div className="absolute bottom-0 inset-x-0 p-5 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <h3 className="text-2xl font-bebas text-white tracking-wide mb-1 leading-tight drop-shadow-md">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-400 font-space line-clamp-1 mb-2 font-light">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between text-[11px] font-space text-gray-400 border-t border-white/10 pt-2">
                          <span className="text-gray-300 truncate max-w-[170px]">{project.software}</span>
                          <span className="text-[#00e5ff] flex items-center">
                            Play <Maximize2 className="w-3 h-3 ml-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3D Rotation Controls Bar */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl max-w-3xl mx-auto shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
              
              {/* Steppers & Reset */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleStepRotation('prev')}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
                  title="Previous Video"
                  aria-label="Previous Video"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleStepRotation('next')}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
                  title="Next Video"
                  aria-label="Next Video"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleResetView}
                  className="px-3.5 h-10 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center space-x-2 text-xs font-space text-gray-300 hover:text-white transition-colors cursor-pointer"
                  title="Reset 3D View to Front"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#00e5ff]" />
                  <span>Reset View</span>
                </button>
              </div>

              {/* Play / Stop Rotation Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePlayRotation}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-space font-bold transition-all cursor-pointer ${
                    isAutoRotating
                      ? 'bg-gradient-to-r from-[#8b5cf6] to-[#00e5ff] text-white shadow-[0_0_25px_rgba(0,229,255,0.4)]'
                      : 'bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" fill={isAutoRotating ? "currentColor" : "none"} />
                  <span>Play Rotation</span>
                </button>

                <button
                  onClick={handleStopRotation}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-space font-bold transition-all cursor-pointer ${
                    !isAutoRotating
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                      : 'bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Stop Rotation</span>
                </button>
              </div>

              {/* Status Hint */}
              <div className="hidden lg:flex items-center space-x-2 text-xs font-space text-gray-400">
                <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
                <span>Drag to spin • Click to expand</span>
              </div>
            </div>

          </div>
        )}

        {/* ===================== VIEW MODE 2: 3D INTERACTIVE WALL ===================== */}
        {viewMode === '3d-grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                onClick={() => setSelectedVideo(project)}
                className="group relative rounded-2xl overflow-hidden glass border border-white/10 hover:border-[#00e5ff]/50 transition-all duration-300 aspect-[16/10] cursor-pointer bg-[#0c0c0c] shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
              >
                <div className="absolute inset-0 bg-[#0a0a0a]">
                  <video
                    src={project.videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

                <div className="absolute top-4 left-4 z-20">
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-space tracking-wider uppercase text-[#00e5ff]">
                    {project.category}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5 z-20">
                  <h3 className="text-2xl font-bebas text-white tracking-wide leading-tight mb-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs font-space text-gray-400">
                    <span>{project.software}</span>
                    <span className="text-[#00e5ff]">{project.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* ===================== CINEMATIC 3D THEATER MODAL ===================== */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Top Close Button */}
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close Theater"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="relative w-full max-w-5xl rounded-3xl bg-[#0d0d0d] border border-white/15 shadow-[0_0_80px_rgba(0,229,255,0.25)] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Player Frame */}
              <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                <video
                  src={selectedVideo.videoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Project Meta Details Below Video */}
              <div className="p-6 md:p-8 bg-[#0a0a0a] border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-xs font-space uppercase text-[#00e5ff] font-semibold">
                      {selectedVideo.category}
                    </span>
                    <span className="text-gray-400 text-xs font-space">
                      Duration: {selectedVideo.duration}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bebas text-white tracking-wide">
                    {selectedVideo.title}
                  </h2>
                  <p className="text-sm text-gray-300 font-light mt-1 max-w-2xl">
                    {selectedVideo.description}
                  </p>
                </div>

                <div className="flex flex-col md:items-end text-xs font-space text-gray-400 shrink-0">
                  <span className="text-gray-500 uppercase tracking-wider mb-1">Software Used</span>
                  <span className="text-white font-medium bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                    {selectedVideo.software}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
