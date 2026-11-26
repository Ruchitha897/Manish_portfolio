import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const cinematicVideos = [
  {
    id: 1,
    title: 'Cinematic Sequence I',
    category: 'Cinematic Edit',
    videoSrc: '/videos/c1.mp4'
  },
  {
    id: 2,
    title: 'Cinematic Sequence II',
    category: 'Cinematic Edit',
    videoSrc: '/videos/c2.mp4'
  }
];

export default function CinematicVideos() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  return (
    <section id="cinematic" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16 md:flex justify-between items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-4 mb-4"
            >
              <div className="h-[1px] w-12 bg-gradient-to-r from-[#8b5cf6] to-[#00e5ff]" />
              <h2 className="text-[#00e5ff] font-space tracking-widest uppercase">Cinematic Showcase</h2>
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bebas text-white"
            >
              Cinematic <span className="text-gradient">Videos</span>
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

        {/* 2 Video Blocks Grid with 3D Depth & Zero Cursor-Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: '1200px' }}>
          {cinematicVideos.map((video, index) => {
            const isFirst = index === 0;
            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => setSelectedVideo(video.id)}
                className="relative rounded-2xl overflow-hidden cursor-pointer bg-[#111] border border-white/15 aspect-video"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFirst ? 'rotateY(2.5deg) rotateX(1.5deg)' : 'rotateY(-2.5deg) rotateX(1.5deg)',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(0,229,255,0.18)',
                }}
              >
                {/* Video Preview */}
                <div className="absolute inset-0 bg-[#1a1a1a]">
                  <video 
                    src={video.videoSrc}
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                
                {/* Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none z-10" />

                {/* 3D Elevated Center Play Button */}
                <div 
                  className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#080808]/80 backdrop-blur-md flex items-center justify-center border border-[#00e5ff]/50 shadow-[0_0_30px_rgba(0,229,255,0.35)]">
                    <Play className="w-6 h-6 text-[#00e5ff] ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* 3D Card Ambient Border Glow */}
                <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none z-30" />
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Video Modal with Playback Controls */}
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
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer"
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
              className="w-full max-w-6xl aspect-video bg-transparent rounded-[20px] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {cinematicVideos.find(v => v.id === selectedVideo)?.videoSrc && (
                <div className="w-full h-full flex items-center justify-center bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[20px] shadow-[0_0_50px_rgba(139,92,246,0.3)] p-2 md:p-4 relative overflow-hidden">
                  {/* Subtle ambient glow behind the video */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/20 to-[#00e5ff]/20 opacity-50 mix-blend-overlay pointer-events-none" />
                  
                  <video 
                    src={cinematicVideos.find(v => v.id === selectedVideo)?.videoSrc}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain rounded-[20px] relative z-10 bg-black/50"
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
