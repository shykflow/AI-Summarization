import { useState, useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { motion, AnimatePresence } from 'framer-motion';

export default function SoundToggle() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const soundRef = useRef(null);

  // Initialize Howler sound object ONCE on mount
  useEffect(() => {
    soundRef.current = new Howl({
      src: ['/searching-for-answers-moire-main-version-35757-02-08.mp3'], 
      loop: true,
      volume: 1.0, // initialize at absolute max volume
      preload: true, // html5 flag removed to force Web Audio API instead of DOM audio
      onloaderror: (id, err) => {
        console.error("Audio file loading error:", err);
      },
      onplayerror: (id, err) => {
        console.error("Audio file playing error:", err);
        soundRef.current.once('unlock', () => {
          soundRef.current.play();
        });
      }
    });

    // Check localStorage preference on mount
    const savedPref = localStorage.getItem('matrix_sound_pref');
    if (savedPref === 'true') {
      setIsAudioEnabled(true);
      // We do NOT play it yet because browser policies require user interaction
    }

    return () => {
      // Cleanup on unmount
      if (soundRef.current) {
         soundRef.current.unload();
      }
    };
  }, []);

  // Global intersection observer or click listener to unlock Audio API
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (isAudioEnabled && soundRef.current && !soundRef.current.playing()) {
          soundRef.current.volume(1.0);
          soundRef.current.play();
        }
      }
      // Clean up after first interaction
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('scroll', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [hasInteracted, isAudioEnabled]);

  // Handle manual toggle
  const toggleSound = () => {
    if (!soundRef.current) return;

    const newState = !isAudioEnabled;
    setIsAudioEnabled(newState);
    localStorage.setItem('matrix_sound_pref', String(newState));
    setHasInteracted(true); // Treat clicking the button as unlocking the audio API

    if (newState) {
      soundRef.current.volume(1.0); // FORCE MAX VOLUME
      if (!soundRef.current.playing()) {
         soundRef.current.play();
      }
      console.log('Matrix Audio: Force playing track at 100% MAX volume.');
    } else {
      soundRef.current.pause(); // Direct pause
      console.log('Matrix Audio: Track paused.');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2">
      <motion.button
        onClick={toggleSound}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`group relative flex items-center gap-3 px-4 py-2 rounded border border-accent/30 bg-bg-primary/90 backdrop-blur-md overflow-hidden transition-all duration-300 ${isAudioEnabled ? 'shadow-[0_0_15px_var(--color-accent-glow)] border-accent/80' : 'hover:border-accent/60'}`}
        aria-label="Toggle ambient sound"
      >
        {/* Subtle scanline texture inside button when active */}
        <AnimatePresence>
          {isAudioEnabled && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(57,255,20,0.05)_1px,transparent_1px)] bg-[size:100%_4px] mix-blend-screen opacity-50" 
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 font-mono text-[10px] md:text-xs tracking-widest text-text-primary whitespace-nowrap uppercase">
          SOUND <span className={isAudioEnabled ? 'text-accent drop-shadow-[0_0_8px_var(--color-accent)]' : 'text-text-muted'}>[{isAudioEnabled ? 'ON' : 'OFF'}]</span>
        </div>

        {/* Dynamic visualizer indicator */}
        <div className="relative z-10 flex items-center gap-[2px] h-3">
          {[1, 2, 3].map((bar) => (
            <motion.div
              key={bar}
              animate={isAudioEnabled ? {
                height: ['30%', '100%', '40%', '80%', '20%', '90%', '50%'],
              } : {
                height: '20%'
              }}
              transition={isAudioEnabled ? {
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: bar * 0.2
              } : { duration: 0.3 }}
              className={`w-0.5 rounded-full ${isAudioEnabled ? 'bg-accent' : 'bg-text-muted/50'}`}
              style={{ minHeight: '3px' }}
            />
          ))}
        </div>
      </motion.button>
    </div>
  );
}
