import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const experiences = [
  {
    year: '2025 - Present',
    title: 'Professional Freelance Video Editor',
    company: 'Self Employed',
    description: 'Specializing in cinematic storytelling and engaging visual content.',
    work: ['YouTube Editing', 'Instagram Reels', 'Commercial Videos', 'Wedding Films', 'Brand Promotions'],
  },
  // Add more items here later if needed
];

function TimelineItem({ item, index }: { item: typeof experiences[0], index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-center justify-between md:justify-normal w-full mb-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Center Dot */}
      <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-[#8b5cf6] shadow-[0_0_15px_#8b5cf6] transform -translate-x-1/2 z-10">
        <motion.div 
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full h-full rounded-full bg-[#00e5ff]"
        />
      </div>

      {/* Content Card */}
      <div className={`w-[90%] md:w-[45%] ml-auto md:ml-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass p-8 rounded-2xl border border-white/5 relative group hover:border-[#8b5cf6]/30 transition-colors"
        >
          {/* Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-[#00e5ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
          
          <div className="relative z-10">
            <span className="text-[#00e5ff] font-space font-bold tracking-wider mb-2 block">{item.year}</span>
            <h4 className="text-2xl md:text-3xl font-bebas text-white mb-1">{item.title}</h4>
            <span className="text-gray-400 font-space text-sm mb-4 block">{item.company}</span>
            <p className="text-gray-300 font-light mb-6">{item.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {item.work.map((work, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-space text-gray-300">
                  {work}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bebas text-white"
          >
            My <span className="text-gradient">Journey</span>
          </motion.h2>
        </div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 transform -translate-x-1/2">
            <motion.div 
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-[#8b5cf6] to-[#00e5ff]"
            />
          </div>

          {/* Experience Items */}
          <div className="relative z-10 py-10">
            {experiences.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
