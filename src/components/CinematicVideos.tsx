import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Film, Maximize2 } from 'lucide-react';
import TiltCard3D from './TiltCard3D';

const cinematicVideos = [
  {
    id: 1,
    title: 'Cinematic Sequence I',
    category: 'Cinematic Edit',
    videoSrc: '/videos/c1.mp4',
    description: 'Atmospheric narrative sequence with color grading and visual storytelling.'
  },
  {
    id: 2,
    title: 'Cinematic Sequence II',
    category: 'Cinematic Edit',
    videoSrc: '/videos/c2.mp4',
    description: 'High-tension narrative sequence featuring rhythmic sound design and cinematic lighting.'
  }
];

export default function CinematicVideos() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  return (
    <section id="cinematic" className="py-32 relative overflow-hidden bg-[#080808]">
      {/* 3D Background Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#8b5cf6]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#00e5ff]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:flex justify-between items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-3 mb-4 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <Film className="w-3.5 h-3.5 text-[#00e5ff]" />
              <h2 className="text-[#00e5ff] font-space tracking-widest uppercase text-xs font-semibold">
                Director's Spotlight
              </h2>
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bebas text-white tracking-wide leading-none"
            >
              Cinematic <span className="text-gradient">Videos</span>
            </motion.h3>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center space-x-2 text-gray-400 font-space text-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
            <span>3D Interactive Cards • Click to expand</span>
          </motion.div>
        </div>

        {/* 2 Video Blocks Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cinematicVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <TiltCard3D maxTilt={8} glare={true} scale={1.01} className="w-full">
                <div
                  onClick={() => setSelectedVideo(video.id)}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer bg-[#0c0c0c] border border-white/10 hover:border-[#00e5ff]/50 transition-all duration-500 aspect-video shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
                >
                  {/* Video Preview */}
                  <div className="absolute inset-0 bg-[#0a0a0a] transition-transform duration-700 group-hover:scale-105">
                    <video 
                      src={video.videoSrc}
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>

                  {/* Light Sweep Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden z-10">
                    <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:animate-sweep" />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300 z-10" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-xs font-space tracking-wider uppercase text-[#00e5ff] font-medium">
                      {video.category}
                    </span>
                  </div>

                  {/* Play Button Center */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-100 scale-100 md:opacity-0 md:group-hover:opacity-100 md:scale-50 md:group-hover:scale-100 transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-[0_0_30px_rgba(0,229,255,0.4)] text-white group-hover:bg-[#00e5ff] group-hover:text-black transition-colors">
                      <Play className="w-6 h-6 ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Bottom Info Banner */}
                  <div className="absolute bottom-0 inset-x-0 p-6 z-20 flex items-end justify-between">
                    <div>
                      <h4 className="text-3xl font-bebas text-white tracking-wide drop-shadow-md">
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-300 font-space font-light line-clamp-1 max-w-sm">
                        {video.description}
                      </p>
                    </div>
                    <div className="text-xs font-space text-[#00e5ff] flex items-center shrink-0">
                      <span>Watch in 4K</span>
                      <Maximize2 className="w-3.5 h-3.5 ml-1.5" />
                    </div>
                  </div>

                  {/* Animated 3D Border Glow */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#00e5ff]/40 rounded-3xl transition-colors duration-300 z-30 pointer-events-none" />
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Video Modal with Full Playback Controls */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-12"
            onClick={() => setSelectedVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer p-2 rounded-full bg-white/10"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close video player"
            >
              <X className="w-8 h-8" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-6xl aspect-video bg-transparent rounded-[24px] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {cinematicVideos.find(v => v.id === selectedVideo)?.videoSrc && (
                <div className="w-full h-full flex items-center justify-center bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[24px] shadow-[0_0_60px_rgba(0,229,255,0.3)] p-2 md:p-4 relative overflow-hidden">
                  {/* Subtle ambient glow behind the video */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/20 to-[#00e5ff]/20 opacity-50 mix-blend-overlay pointer-events-none" />
                  
                  <video 
                    src={cinematicVideos.find(v => v.id === selectedVideo)?.videoSrc}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain rounded-[20px] relative z-10 bg-black/70 shadow-2xl"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
