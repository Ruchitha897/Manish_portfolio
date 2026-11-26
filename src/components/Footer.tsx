import { Camera, PlayCircle, Briefcase } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-[#050505] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between">
        
        <div className="mb-6 md:mb-0">
          <a href="#home" className="text-3xl font-bold font-bebas tracking-widest text-white block text-center md:text-left">
            MR<span className="text-[#00e5ff]">.</span>
          </a>
        </div>

        <div className="text-gray-500 font-space text-sm mb-6 md:mb-0">
          &copy; {currentYear} Manish Reddy. All rights reserved.
        </div>

        <div className="flex space-x-6">
          <a href="#" className="text-gray-500 hover:text-[#8b5cf6] transition-colors hover:scale-110 transform duration-300">
            <Camera className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-[#ff0000] transition-colors hover:scale-110 transform duration-300">
            <PlayCircle className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-500 hover:text-[#0a66c2] transition-colors hover:scale-110 transform duration-300">
            <Briefcase className="w-5 h-5" />
          </a>
          {/* Behance Placeholder */}
          <a href="#" className="text-gray-500 hover:text-[#1769ff] transition-colors hover:scale-110 transform duration-300 font-bold font-space text-lg leading-none">
            Bē
          </a>
        </div>

      </div>
    </footer>
  );
}
