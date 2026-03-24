import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MatrixIntro({ onComplete }) {
  // Initialize isVisible natively from sessionStorage to prevent ghost-frame rendering
  const [isVisible, setIsVisible] = useState(() => {
    return sessionStorage.getItem('matrix_intro_played') !== 'true';
  });
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 1. Check strict session bypass (if isVisible initialized to false, just ungate the App instantly)
    if (!isVisible) {
      onComplete();
      return;
    }

    // 2. Cinematic timed payload sequence
    const timers = [
      setTimeout(() => setStep(1), 1200), // Wait 1.2s before first console log
      setTimeout(() => setStep(2), 2200),
      setTimeout(() => setStep(3), 3200),
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('matrix_intro_played', 'true');
        // Instantly mount the DOM underneath while the overlay dissolves
        onComplete();
      }, 4500) // Kept on screen for 4.5 total seconds
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="matrix-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#010201] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        >
          {/* Subtle Scanline CRT Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(57,255,20,0.03)_1px,transparent_1px)] bg-[size:100%_4px] mix-blend-screen z-0" />
          
          <div className="relative z-10 font-mono tracking-widest flex flex-col items-center md:items-start max-w-2xl w-full">
            
            {/* Main Glitch Header */}
            <motion.h1 
              initial={{ opacity: 0, textShadow: "0px 0px 5px rgba(239,68,68,0)", filter: "blur(10px)", y: -10 }}
              animate={{ opacity: 1, textShadow: "0px 0px 20px rgba(239,68,68,0.6)", filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-2xl md:text-4xl text-red-500 font-bold mb-10 w-full text-center tracking-[0.1em]"
            >
              YOUR SYSTEM HAS BEEN COMPROMISED
            </motion.h1>

            {/* Simulated Server Console Trace */}
            <div className="flex flex-col items-start space-y-4 text-xs md:text-sm md:text-base text-accent opacity-90 mx-auto md:mx-0 font-semibold drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]">
              <AnimatePresence>
                {step >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    &gt; <span className="text-red-400">UNAUTHORIZED ACCESS DETECTED</span>
                  </motion.div>
                )}
                {step >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    &gt; INITIATING RECOVERY PROTOCOL ...
                  </motion.div>
                )}
                {step >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    &gt; REBUILDING INTERFACE
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-2.5 h-4 bg-accent ml-2 relative top-0.5"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
