import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

// --- TWEAKABLE AI HUD PARAMETERS ---
const HUD_CONFIG = {
  ringSpeed: {
    outer: 270,    // Outer ring degrees to rotate on full scroll
    middle: -180,  // Middle ring degrees
    inner: 360     // Inner ring degrees
  },
  labelOpacity: 0.9,
  arcGlowIntensity: 1.0,
  pulseSeconds: 4, // Speed of the energy pulse traveling the inner ring
  
  // High-End AI Systems Vocabulary
  outerTerms: Array(4).fill('EMBEDDINGS • RETRIEVAL • RERANKING • INFERENCE • AGENTS • TOOL CALLING • CONTEXT WINDOW • EVALUATION • GUARDRAILS • FINE-TUNING • MEMORY • ORCHESTRATION • ').join(''),
  
  // Telemetry Micro-Metrics 
  metrics: [
    'LATENCY: 42ms', 
    'CONFIDENCE: 0.98', 
    'TOP-K: 5', 
    'CONTEXT: 128K'
  ]
};

export default function ScrollRing() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Scroll-bound rotations (hardware accelerated via willChange)
  const rotateOuter = useTransform(scrollYProgress, [0, 1], [0, HUD_CONFIG.ringSpeed.outer]);
  const rotateMiddle = useTransform(scrollYProgress, [0, 1], [0, HUD_CONFIG.ringSpeed.middle]);
  const rotateInner = useTransform(scrollYProgress, [0, 1], [0, HUD_CONFIG.ringSpeed.inner]);

  // Lock rotations to 0 on reduced motion devices
  const rO = prefersReducedMotion ? 0 : rotateOuter;
  const rM = prefersReducedMotion ? 0 : rotateMiddle;
  const rI = prefersReducedMotion ? 0 : rotateInner;

  return (
    <motion.div 
      style={{ willChange: 'transform' }} 
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.15] md:scale-[1.20] z-0 pointer-events-none w-[800px] h-[800px] opacity-[0.70] overflow-hidden md:overflow-visible flex justify-center items-center"
    >
      
      {/* OUTER RING: Knowledge Base & Orchestration Terms */}
      <motion.div 
        style={{ rotate: rO, willChange: 'transform' }} 
        className="absolute inset-0 flex items-center justify-center translate-z-0"
      >
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
             <path id="outerTextPath" d="M 400, 20 A 380,380 0 1,1 399.9,20" />
          </defs>
          <circle cx="400" cy="400" r="390" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="2 8" opacity="0.6" />
          <circle cx="400" cy="400" r="375" stroke="var(--color-border-hover)" strokeWidth="1" opacity="0.5" />
          
          <text fill="var(--color-accent-light)" fontSize="9" letterSpacing="0.15em" opacity={HUD_CONFIG.labelOpacity} className="font-heading uppercase">
            <textPath href="#outerTextPath" startOffset="0%" textAnchor="start">
              {HUD_CONFIG.outerTerms}
            </textPath>
          </text>

          {/* AI Data Nodes */}
          <circle cx="400" cy="10" r="4" fill="var(--color-accent)" />
          <circle cx="400" cy="790" r="4" fill="var(--color-accent)" />
          <circle cx="10" cy="400" r="4" fill="var(--color-accent)" />
          <circle cx="790" cy="400" r="4" fill="var(--color-accent)" />
          
          {/* Subtle telemetry connectors projecting outward */}
          <path d="M400 10 L400 -10 M400 790 L400 810 M10 400 L-10 400 M790 400 L810 400" stroke="var(--color-accent)" strokeWidth="2" opacity="0.8" />
        </svg>
      </motion.div>

      {/* MIDDLE RING: Attention Tokens & Micro-Metrics */}
      <motion.div 
        style={{ rotate: rM, willChange: 'transform' }} 
        className="absolute inset-0 flex items-center justify-center translate-z-0"
      >
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Track background */}
          <circle cx="300" cy="300" r="280" stroke="var(--color-border)" strokeWidth="1" opacity="0.7" />
          
          {/* Token Flow Ticks - representing chunks of data passing through the attention heads */}
          <circle cx="300" cy="300" r="270" stroke="var(--color-accent-light)" strokeWidth="8" strokeDasharray="3 40" strokeLinecap="round" opacity="0.4" />
          
          {/* System Metrics pinned to the ring natively rotating */}
          <text x="300" y="15" fill="var(--color-text-secondary)" fontSize="9" textAnchor="middle" className="font-mono tracking-widest">{HUD_CONFIG.metrics[0]}</text>
          <text x="300" y="595" fill="var(--color-text-secondary)" fontSize="9" textAnchor="middle" className="font-mono tracking-widest">{HUD_CONFIG.metrics[1]}</text>
          
          <text x="15" y="300" fill="var(--color-text-secondary)" fontSize="9" textAnchor="middle" transform="rotate(-90 15 300)" className="font-mono tracking-widest">{HUD_CONFIG.metrics[2]}</text>
          <text x="595" y="300" fill="var(--color-text-secondary)" fontSize="9" textAnchor="middle" transform="rotate(90 595 300)" className="font-mono tracking-widest">{HUD_CONFIG.metrics[3]}</text>
        </svg>
      </motion.div>

      {/* INNER RING: Inference Pipeline Energy Pulse */}
      <motion.div 
        style={{ rotate: rI, willChange: 'transform' }} 
        className="absolute inset-0 flex items-center justify-center translate-z-0"
      >
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Static logic gates */}
          <circle cx="200" cy="200" r="180" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="10 30" opacity="1.0" />
          
          {/* Primary active arc segments mapping to pipeline state */}
          <circle cx="200" cy="200" r="165" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="90 200" strokeLinecap="round" opacity="0.7" />
          
          {/* Active Runtime Energy Pulse */}
          <circle 
            cx="200" cy="200" r="165" 
            stroke="var(--color-terminal-green)" 
            strokeWidth="3" 
            strokeDasharray="30 1037" 
            strokeLinecap="round"
            className="hud-spin-infinite"
            style={{ 
              opacity: HUD_CONFIG.arcGlowIntensity, 
              filter: 'drop-shadow(0 0 8px var(--color-terminal-green))',
              animationDuration: `${HUD_CONFIG.pulseSeconds}s`
            }}
          />
        </svg>
      </motion.div>

      {/* Center Ambient Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />
    </motion.div>
  );
}
