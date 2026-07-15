import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  { name: 'Adobe After Effects', percentage: 90, color: '#9999FF' },
  { name: 'Adobe Premiere Pro', percentage: 95, color: '#EA77FF' },
  { name: 'DaVinci Resolve', percentage: 85, color: '#4BA1C7' },
  { name: 'Adobe Photoshop', percentage: 80, color: '#31A8FF' },
  { name: 'Filmora', percentage: 85, color: '#00D1B2' },
  { name: 'CapCut', percentage: 90, color: '#FFFFFF' },
  { name: 'Media Encoder', percentage: 75, color: '#9999FF' },
  { name: 'Illustrator', percentage: 70, color: '#FF9A00' },
];

function SkillCard({ skill, index }: { skill: typeof skills[0], index: number }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
      className="glass p-6 rounded-xl relative overflow-hidden group cursor-pointer border border-white/5 hover:border-[#8b5cf6]/50 transition-colors"
      style={{ perspective: 1000 }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/0 to-[#00e5ff]/0 group-hover:from-[#8b5cf6]/10 group-hover:to-[#00e5ff]/10 transition-colors duration-500" />
      
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center bg-black/50 border border-white/10"
            style={{ color: skill.color }}
          >
            {/* REPLACE WITH OFFICIAL LOGO SVG */}
            <span className="font-bebas text-xl">{skill.name.charAt(0)}</span>
          </div>
          <h4 className="font-space font-medium text-lg text-white group-hover:text-[#00e5ff] transition-colors">{skill.name}</h4>
        </div>
        <span className="font-bebas text-2xl text-white/50">{skill.percentage}%</span>
      </div>

      <div className="relative z-10 w-full h-2 bg-black/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ 
            background: `linear-gradient(90deg, #8b5cf6 0%, ${skill.color} 100%)` 
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-4 mb-6"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#8b5cf6]" />
            <h2 className="text-[#00e5ff] font-space tracking-widest uppercase">My Arsenal</h2>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#8b5cf6]" />
          </motion.div>
          
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bebas text-white"
          >
            Software <span className="text-gradient">Proficiency</span>
          </motion.h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
