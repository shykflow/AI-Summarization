import { lazy, Suspense, useState } from 'react';
import './index.css';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import CustomCursor from './components/ui/CustomCursor';
import ScrollRing from './components/ui/ScrollRing';
import SoundToggle from './components/ui/SoundToggle';
import MatrixIntro from './components/ui/MatrixIntro';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import AIShowcase from './components/sections/AIShowcase';
import Terminal from './components/sections/Terminal';
import MatrixPuzzle from './components/ui/MatrixPuzzle';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

const AIOrb = lazy(() => import('./components/three/AIOrb'));

export default function App() {
  useSmoothScroll();
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary relative overflow-hidden">
      <CustomCursor />
      
      {/* 
        The Matrix Intro traps the screen securely. 
        It will instantly execute onComplete() if `sessionStorage` flags it as already seen. 
      */}
      <MatrixIntro onComplete={() => setIntroComplete(true)} />

      {/* Conditionally reveal the entire portfolio only after the Intro clears its initial states */}
      {introComplete && (
        <>
          <ScrollRing />
          <SoundToggle />
          
          {/* Global 3D Background Layer */}
          <div className="fixed inset-0 pointer-events-none z-[1]">
            <Suspense fallback={null}>
              <AIOrb />
            </Suspense>
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 flex flex-col">
            <Navbar />
            <Hero />
            <Projects />
            <Skills />
            <AIShowcase />
            <Terminal />
            <About />
            <Contact />
            <MatrixPuzzle />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}
