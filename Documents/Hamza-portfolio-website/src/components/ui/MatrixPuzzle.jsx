import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PUZZLES = [
  { sequence: [2, 4, 8, 16], answer: '32', type: 'Powers of 2' },
  { sequence: [1, 1, 2, 3, 5], answer: '8', type: 'Fibonacci' },
  { sequence: [9, 7, 5, 3], answer: '1', type: 'Linear Descent' },
  { sequence: [1, 4, 9, 16], answer: '25', type: 'Squares' },
  { sequence: [3, 6, 9, 12], answer: '15', type: 'Linear Ascent' },
  { sequence: [2, 3, 5, 7, 11], answer: '13', type: 'Primes' },
  { sequence: [100, 50, 25], answer: '12.5', type: 'Halving' }
];

export default function MatrixPuzzle() {
  const [puzzle, setPuzzle] = useState(PUZZLES[0]);
  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const inputRef = useRef(null);

  // Initialize with a random puzzle
  useEffect(() => {
    rollNewPuzzle();
  }, []);

  const rollNewPuzzle = () => {
    const randomPuzzle = PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
    setPuzzle(randomPuzzle);
    setInputVal('');
    setStatus('idle');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      validateSequence();
    }
  };

  const validateSequence = () => {
    if (!inputVal.trim()) return;

    if (inputVal.trim() === puzzle.answer) {
      setStatus('success');
    } else {
      setStatus('error');
      // Briefly show error, then reset to try again
      setTimeout(() => {
        setStatus('idle');
        setInputVal('');
        if (inputRef.current) inputRef.current.focus();
      }, 1500);
    }
  };

  return (
    <section className="py-12 md:py-24 relative overflow-hidden flex justify-center">
      {/* Decorative background grid line */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-border/40 -translate-y-1/2 z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 max-w-2xl w-full mx-6 p-[1px] rounded-lg overflow-hidden group/puzzle"
      >
        {/* Dynamic Border Gradient Container */}
        <div className={`absolute inset-0 transition-colors duration-500 ${
           status === 'success' ? 'bg-accent shadow-[0_0_30px_var(--color-accent-glow)]' : 
           status === 'error' ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 
           'bg-border/60 group-hover/puzzle:bg-accent/40'
        }`} />

        <div className="relative w-full h-full bg-[#020503] border border-transparent rounded-lg p-6 md:p-8 flex flex-col items-center text-center">
          
          {/* Scanline Texture */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(57,255,20,0.02)_1px,transparent_1px)] bg-[size:100%_4px] mix-blend-screen z-0" />
          
          {/* Header */}
          <div className="relative z-10 flex items-center gap-3 mb-6">
             <span className={`w-2 h-2 rounded-full animate-pulse blur-[1px] ${
                status === 'success' ? 'bg-accent' : 
                status === 'error' ? 'bg-red-500' : 'bg-text-muted'
             }`} />
             <span className="font-mono text-[10px] md:text-xs tracking-widest text-text-muted uppercase">
               SYSTEM_VERIFICATION_REQUIRED
             </span>
          </div>

          <AnimatePresence mode="wait">
             {status === 'success' ? (
                <motion.div
                   key="success"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   className="relative z-10 flex flex-col items-center py-4"
                >
                   <span className="text-xl md:text-2xl font-bold font-mono text-accent drop-shadow-[0_0_10px_var(--color-accent)] mb-2">ACCESS GRANTED</span>
                   <span className="text-sm font-mono text-text-muted mb-6">PATTERN_DECODED: {puzzle.type.toUpperCase()}</span>
                   
                   <button 
                     onClick={rollNewPuzzle}
                     className="px-6 py-2 border border-accent/40 text-accent font-mono text-xs hover:bg-accent/10 transition-colors rounded"
                   >
                     [ INITIATE_NEW_SEQUENCE ]
                   </button>
                </motion.div>
             ) : (
                <motion.div
                   key="interaction"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   className="relative z-10 flex flex-col items-center w-full"
                >
                   {/* The Sequence Terminal */}
                   <div className="font-mono text-base md:text-lg lg:text-xl text-text-primary tracking-widest mb-8 flex flex-wrap justify-center items-center gap-2">
                     <span className="text-accent-light opacity-60 mr-2">&gt; DECRYPT:</span>
                     {puzzle.sequence.map((num, i) => (
                       <span key={i} className="text-text-primary">{num},</span>
                     ))}
                     
                     {/* Input Bracket */}
                     <span className="flex items-center text-accent mx-2 group">
                       [
                       <input 
                         ref={inputRef}
                         type="text"
                         value={inputVal}
                         onChange={(e) => setInputVal(e.target.value)}
                         onKeyDown={handleKeyDown}
                         className="w-12 md:w-16 bg-transparent outline-none text-center text-accent drop-shadow-[0_0_5px_var(--color-accent)] font-bold transition-all placeholder:text-accent/20"
                         placeholder="_"
                         maxLength={4}
                         disabled={status === 'error'}
                       />
                       ]
                     </span>
                   </div>

                   {/* Status Messaging Area */}
                   <div className="h-6 flex items-center justify-center">
                     {status === 'error' ? (
                       <span className="text-red-500 font-mono text-xs tracking-widest drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse">
                         SEQUENCE CORRUPTED // RETRY
                       </span>
                     ) : (
                       <span className="text-text-muted font-mono text-[10px] tracking-widest opacity-60">
                         AWAITING INPUT (PRESS ENTER)
                       </span>
                     )}
                   </div>
                </motion.div>
             )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
