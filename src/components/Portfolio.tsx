import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, PlayCircle, Camera } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Neon Nights',
    category: 'Cinematic Edit',
    description: 'A highly visual, fast-paced cinematic sequence showcasing city life.',
    duration: '2:15',
    software: 'After Effects, Premiere Pro',
    layout: 'md:col-span-2 md:row-span-2', // Large featured card
    videoSrc: '/videos/portfolio_video_1.mp4'
  },
  {
    id: 2,
    title: 'Brand Anthem',
    category: 'Commercial',
    description: 'High-energy promotional video for a sports apparel brand.',
    duration: '1:30',
    software: 'Premiere Pro, DaVinci Resolve',
    layout: 'md:col-span-1 md:row-span-1',
    videoSrc: '/videos/portfolio_video_2.mp4'
  },
  {
    id: 3,
    title: 'Tech Review 2025',
    category: 'YouTube',
    description: 'Engaging tech review with motion graphics and smooth transitions.',
    duration: '10:45',
    software: 'Premiere Pro, After Effects',
    layout: 'md:col-span-1 md:row-span-1',
    videoSrc: '/videos/portfolio_video_3.mp4'
  },
  {
    id: 4,
    title: 'Summer Vibes',
    category: 'Instagram Reel',
    description: 'Trendy, fast-paced reel with trending audio and effects.',
    duration: '0:30',
    software: 'CapCut, Premiere Pro',
    layout: 'md:col-span-1 md:row-span-2', // Vertical layout for reel
    videoSrc: '/videos/portfolio_video_4.mp4'
  },
  {
    id: 5,
    title: 'Echoes',
    category: 'Music Video',
    description: 'Creative music video editing with heavy color grading and VFX.',
    duration: '3:45',
    software: 'Premiere Pro, After Effects, DaVinci',
    layout: 'md:col-span-2 md:row-span-1', // Wide layout
    videoSrc: '/videos/portfolio_video_5.mp4'
  }
];

export default function Portfolio() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="mb-16 md:flex justify-between items-end">
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

        {/* Grid/Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[300px] gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => setSelectedVideo(project.id)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${project.layout} bg-[#111] border border-white/10`}
            >
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-[#1a1a1a] transition-transform duration-700 group-hover:scale-105">
                {project.videoSrc ? (
                  <video 
                    src={project.videoSrc}
                    autoPlay muted loop playsInline
                    className="w-full h-full object-cover opacity-70"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-700 font-space opacity-50">
                    Thumbnail Placeholder ({project.category})
                  </div>
                )}
              </div>

              {/* Light Sweep Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden z-10">
                <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:animate-sweep" />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 z-10" />

              {/* Play Button Center */}
              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-100 scale-100 md:opacity-0 md:group-hover:opacity-100 md:scale-50 md:group-hover:scale-100 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[#00e5ff] text-xs font-space font-bold tracking-widest uppercase mb-2 flex items-center">
                      {project.category === 'YouTube' && <PlayCircle className="w-4 h-4 mr-1.5" />}
                      {project.category === 'Instagram Reel' && <Camera className="w-4 h-4 mr-1.5" />}
                      {project.category}
                    </span>
                    <h4 className="text-3xl font-bebas text-white mb-2">{project.title}</h4>
                    <p className="text-gray-300 text-sm font-light max-w-sm opacity-100 h-auto md:opacity-0 md:h-0 md:group-hover:opacity-100 md:group-hover:h-auto transition-all duration-300 overflow-hidden">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end text-xs font-space text-gray-400 space-y-1">
                    <span className="bg-white/10 px-2 py-1 rounded backdrop-blur-sm">{project.duration}</span>
                    <span className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">{project.software}</span>
                  </div>
                </div>
              </div>
              
              {/* Animated Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#8b5cf6]/50 rounded-2xl transition-colors duration-300 z-30 pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>

      {/* Video Modal */}
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
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedVideo(null)}
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
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/20 to-[#00e5ff]/20 opacity-50 mix-blend-overlay" />
                  
                  <video 
                    src={projects.find(p => p.id === selectedVideo)?.videoSrc}
                    controls
                    autoPlay
                    className="w-full h-full object-contain rounded-[20px] relative z-10 bg-black/50"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 bg-[#111] rounded-[20px] overflow-hidden border border-white/10 shadow-2xl flex flex-col items-center justify-center text-gray-500 font-space space-y-4">
                  <Play className="w-16 h-16 opacity-20" />
                  <p>Video Player Placeholder for Project {selectedVideo}</p>
                  <p className="text-sm">Replace this div with your actual video or iframe</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
