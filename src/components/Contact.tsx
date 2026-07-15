import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MessageCircle, Camera, PlayCircle } from 'lucide-react';

export default function Contact() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-[#0a0a0a]">
      {/* Floating Background Shapes */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-gradient-to-br from-[#8b5cf6]/10 to-transparent rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-gradient-to-tr from-[#00e5ff]/10 to-transparent rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-12" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-6xl md:text-8xl font-bebas text-white mb-6">Let's <span className="text-gradient">Work</span> Together</h2>
          <p className="text-gray-400 font-light mb-12 max-w-lg">
            Have a project in mind? Let's discuss how we can bring your vision to life through cinematic editing.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12 mb-12 w-full">
            <a href="mailto:manishworks02@gmail.com" className="flex items-center space-x-4 text-gray-300 hover:text-white group bg-white/5 px-6 py-4 rounded-xl border border-white/5 hover:border-[#00e5ff]/50 transition-all w-full md:w-auto justify-center">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00e5ff] transition-colors">
                <Mail className="w-5 h-5 group-hover:text-[#00e5ff] transition-colors" />
              </div>
              <span className="font-space">manishworks02@gmail.com</span>
            </a>
            <a href="https://wa.me/918309706664" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 text-gray-300 hover:text-white group bg-white/5 px-6 py-4 rounded-xl border border-white/5 hover:border-[#25D366]/50 transition-all w-full md:w-auto justify-center">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#25D366] transition-colors">
                <MessageCircle className="w-5 h-5 group-hover:text-[#25D366] transition-colors" />
              </div>
              <span className="font-space">+91 83097 06664</span>
            </a>
          </div>

          <div className="flex justify-center space-x-4">
            {[Camera, PlayCircle, Mail].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-110">
                <Icon className="w-5 h-5" />
              </a>
            ))}
            {/* Behance Placeholder using text since lucide doesn't have it natively sometimes */}
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#1769ff] hover:text-white transition-all duration-300 transform hover:scale-110 font-bold font-space">
              Bē
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
