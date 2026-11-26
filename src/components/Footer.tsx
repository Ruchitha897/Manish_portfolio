import { Camera, PlayCircle, Mail, MessageCircle, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#050505] border-t border-white/10 relative z-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-[150px] bg-gradient-to-b from-[#00e5ff]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <a href="#home" className="text-3xl font-bold font-bebas tracking-widest text-white block">
            MR<span className="text-[#00e5ff]">.</span>
          </a>
          <span className="text-xs font-space text-gray-400 mt-1">
            Cinematic Video Editor & Filmmaker
          </span>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 font-space text-xs text-center">
          &copy; {currentYear} Manish Reddy. All rights reserved. • 3D Cinematic Portfolio
        </div>

        {/* Social Icons & Back to top */}
        <div className="flex items-center space-x-4">
          <a
            href="mailto:manishworks02@gmail.com"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#00e5ff] hover:border-[#00e5ff]/50 transition-all hover:scale-110"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/918309706664"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#25D366] hover:border-[#25D366]/50 transition-all hover:scale-110"
            title="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#8b5cf6] hover:border-[#8b5cf6]/50 transition-all hover:scale-110"
            title="Instagram"
          >
            <Camera className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#ff0000] hover:border-[#ff0000]/50 transition-all hover:scale-110"
            title="YouTube"
          >
            <PlayCircle className="w-4 h-4" />
          </a>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer ml-2"
            title="Back to Top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-[#00e5ff]" />
          </button>
        </div>

      </div>
    </footer>
  );
}
