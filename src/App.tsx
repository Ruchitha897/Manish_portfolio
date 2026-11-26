import { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Portfolio from './components/Portfolio';
import CinematicVideos from './components/CinematicVideos';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import WhyChooseMe from './components/WhyChooseMe';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CinematicCanvas3D from './components/CinematicCanvas3D';
import CustomCursor from './components/CustomCursor';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#080808] text-white min-h-screen relative selection:bg-[#00e5ff] selection:text-black">
      <CustomCursor />
      <CinematicCanvas3D />
      <Preloader onComplete={() => setLoading(false)} />
      
      {!loading && (
        <div className="opacity-0 animate-[fadeIn_1s_ease-out_forwards] relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Timeline />
            <Portfolio />
            <CinematicVideos />
            <Testimonials />
            <Process />
            <WhyChooseMe />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
