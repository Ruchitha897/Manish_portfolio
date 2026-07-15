import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sandeep Varma",
    role: "Content Creator",
    review: "Manish is an absolute wizard with Premiere Pro. He transformed my raw footage into a cinematic masterpiece. His sense of pacing and color grading is unmatched.",
    stars: 5
  },
  {
    name: "Karthik Reddy",
    role: "Marketing Director",
    review: "We hired Manish for a brand anthem video, and he delivered beyond our expectations. Fast, professional, and incredibly creative.",
    stars: 5
  },
  {
    name: "Priya K",
    role: "YouTuber",
    review: "The retention on my videos skyrocketed after Manish started editing them. He knows exactly how to keep the audience engaged.",
    stars: 5
  },
  {
    name: "Venkatesh Babu",
    role: "Film Director",
    review: "A true artist. Manish doesn't just cut clips together; he crafts a story. I look forward to working with him on my next documentary.",
    stars: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 relative overflow-hidden border-y border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 text-center">
        <h2 className="text-5xl md:text-7xl font-bebas text-white">Client <span className="text-gradient">Feedback</span></h2>
      </div>

      <div className="relative w-full overflow-hidden flex group">
        {/* Left/Right Fades */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        
        {/* Marquee Track */}
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max">
          {/* Duplicate array for seamless looping */}
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div 
              key={i} 
              className="w-[350px] md:w-[450px] mx-4 glass p-8 rounded-2xl border border-white/5 flex-shrink-0"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#00e5ff] p-[2px]">
                  <div className="w-full h-full rounded-full bg-[#111] flex items-center justify-center overflow-hidden">
                    {/* Placeholder image */}
                    <span className="text-xs text-gray-500 font-space text-center leading-tight">Photo<br/>Here</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-space font-medium">{t.name}</h4>
                  <span className="text-gray-500 text-sm">{t.role}</span>
                </div>
              </div>
              
              <div className="flex space-x-1 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-[#00e5ff]" fill="currentColor" />
                ))}
              </div>
              
              <p className="text-gray-300 font-light italic">"{t.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
