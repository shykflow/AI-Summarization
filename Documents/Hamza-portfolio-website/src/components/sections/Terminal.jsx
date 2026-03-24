import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionReveal, { RevealItem } from '../ui/SectionReveal';
import { useInView } from '../../motion/useInView';
import MatrixRain from '../ui/MatrixRain';

const logLines = [
  { type: 'info', text: '$ python main.py --mode=inference' },
  { type: 'info', text: '[INFO] Loading model weights... (llama-3.1-8b-instruct)' },
  { type: 'success', text: '[OK] Model loaded in 2.3s | VRAM: 6.2GB' },
  { type: 'info', text: '[INFO] Initializing vector store (FAISS, dim=4096)' },
  { type: 'success', text: '[OK] Index loaded: 847,293 vectors' },
  { type: 'info', text: '[INFO] Starting inference server on :8080' },
  { type: 'success', text: '[OK] Server ready — avg latency: 142ms' },
  { type: 'info', text: '[INFO] Processing query: "Explain attention mechanism"' },
  { type: 'info', text: '[INFO] Retrieved 5 chunks (cosine_sim > 0.82)' },
  { type: 'success', text: '[OK] Response generated in 198ms ✓' },
];

function TerminalLine({ line, delay, isVisible }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      setShowCursor(true);
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(line.text.slice(0, i + 1));
        i++;
        if (i >= line.text.length) {
          clearInterval(interval);
          setShowCursor(false);
          setIsDone(true);
        }
      }, 18);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, line.text, delay]);

  if (!isVisible && !isDone) return null;

  const colorClass = line.type === 'success' ? 'text-terminal-green' : 'text-text-secondary';

  return (
    <div className={`font-mono text-xs md:text-sm ${colorClass} leading-relaxed`}>
      {displayed}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-1.5 h-4 bg-terminal-green ml-0.5 align-middle"
        />
      )}
    </div>
  );
}

export default function Terminal() {
  const [ref, isInView] = useInView({ threshold: 0.3 });

  return (
    <SectionReveal id="terminal" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <RevealItem>
          <div className="flex items-center gap-4 mb-12">
            <span className="text-accent font-mono text-sm">05.</span>
            <h2 className="text-3xl md:text-4xl font-bold">System Output</h2>
            <div className="h-px flex-1 bg-border max-w-xs" />
          </div>
        </RevealItem>

        <RevealItem>
          <div ref={ref} className="rounded-xl border border-border overflow-hidden bg-bg-card/20 backdrop-blur-md">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-bg-secondary/40 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-text-muted font-mono">inference-server</span>
            </div>

            <div className="bg-terminal-bg/60 p-4 md:p-6 min-h-[280px] relative overflow-hidden flex flex-col justify-end rounded-b-xl">
              <MatrixRain color="#39ff14" opacity={0.3} />
              
              <div className="relative z-10 space-y-1 pointer-events-none">
                {logLines.map((line, i) => (
                  <TerminalLine
                    key={i}
                    line={line}
                    delay={i * 400}
                    isVisible={isInView}
                  />
                ))}
              </div>
            </div>
          </div>
        </RevealItem>
      </div>
    </SectionReveal>
  );
}
