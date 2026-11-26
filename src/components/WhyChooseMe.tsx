import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Clapperboard, MonitorPlay, Infinity as InfinityIcon, Share2, ThumbsUp } from 'lucide-react';

const reasons = [
  { icon: Zap, title: "Fast Delivery", desc: "Quick turnarounds without compromising on quality." },
  { icon: Clapperboard, title: "Creative Storytelling", desc: "Every cut serves a purpose to keep the audience hooked." },
  { icon: MonitorPlay, title: "Professional Quality", desc: "Broadcast-ready output with premium color grading." },
  { icon: InfinityIcon, title: "Unlimited Revisions", desc: "We work together until you are 100% satisfied." },
  { icon: Share2, title: "Social Media Expert", desc: "Optimized formats for TikTok, Reels, and YouTube Shorts." },
  { icon: ThumbsUp, title: "Client Satisfaction", desc: "A proven track record of happy clients worldwide." },
];

export default function WhyChooseMe() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#8b5cf6] to-[#00e5ff]" />
            <h2 className="text-[#00e5ff] font-space tracking-widest uppercase">The Advantage</h2>
            <div className="h-[1px] w-12 bg-gradient-to-l from-[#8b5cf6] to-[#00e5ff]" />
          </motion.div>
          <h3 className="text-5xl md:text-7xl font-bebas text-white">Why Choose <span className="text-gradient">Me</span></h3>
        </div>

        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1200px' }}
        >
          {reasons.map((reason, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="glass p-8 rounded-2xl border border-white/10 relative shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(0,229,255,0.08)] bg-[#111]/80 backdrop-blur-xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 3D Ambient Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 to-[#00e5ff]/5 pointer-events-none rounded-2xl" />
              
              <div className="relative z-10 flex flex-col items-start" style={{ transform: 'translateZ(10px)' }}>
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                  <reason.icon className="w-6 h-6 text-[#00e5ff]" />
                </div>
                
                <h4 className="text-2xl font-bebas text-white mb-2 tracking-wide">{reason.title}</h4>
                <p className="text-gray-400 font-light text-sm">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
