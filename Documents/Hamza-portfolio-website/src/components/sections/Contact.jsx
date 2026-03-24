import SectionReveal, { RevealItem } from '../ui/SectionReveal';
import MagneticButton from '../ui/MagneticButton';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <SectionReveal id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <RevealItem>
          {/* Main Cinematic Terminal Container */}
          <div className="relative w-full rounded-2xl border border-accent/40 bg-[#020503] shadow-[0_0_50px_rgba(57,255,20,0.05),inset_0_0_80px_rgba(57,255,20,0.02)] overflow-hidden flex flex-col md:flex-row group">
             
             {/* HUD Top Bar */}
             <div className="absolute top-0 left-0 right-0 h-10 border-b border-accent/20 bg-accent/[0.03] flex justify-between items-center px-6 z-20">
               <div className="flex items-center gap-3">
                 <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_var(--color-accent)]" />
                 <span className="text-[10px] md:text-[11px] font-bold font-mono text-accent tracking-widest uppercase">CONNECTION_ESTABLISHED</span>
               </div>
               <div className="flex items-center gap-4 text-[9px] font-mono tracking-widest hidden sm:flex opacity-70">
                 <span className="text-text-muted">SECURE NODE</span>
                 <span className="text-accent/30">/</span>
                 <span className="text-accent drop-shadow-[0_0_5px_var(--color-accent)]">TRANSMISSION READY</span>
               </div>
             </div>
             
             {/* Global Container Scanline Texture */}
             <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(57,255,20,0.02)_1px,transparent_1px)] bg-[size:100%_4px] mix-blend-screen opacity-70 z-30" />
             
             {/* Left Content Column (Cinematic CTA) */}
             <div className="relative z-40 w-full md:w-[55%] lg:w-[50%] p-8 pt-20 md:p-12 md:pt-24 lg:p-16 flex flex-col justify-center">
                <span className="text-accent font-mono text-xs md:text-sm tracking-[0.2em] mb-4">05. INITIATE CONTACT</span>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight mb-6 leading-[1.1] glow-text text-text-primary">
                  Start the <br/>
                  <span className="text-gradient">Transmission.</span>
                </h2>
                
                <p className="text-text-secondary text-base lg:text-lg mb-10 leading-relaxed font-sans max-w-lg">
                  Whether you need an orchestration kernel architected from scratch, a deep learning logic pipeline optimized, or just want to establish a secure handshake about AI research—the network is ready.
                </p>
                
                <MagneticButton
                  className="w-full sm:w-auto px-8 py-4 md:py-5 rounded-lg border border-accent/80 bg-accent/5 text-accent font-mono text-xs md:text-sm tracking-widest uppercase hover:bg-accent hover:text-bg-primary transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] relative overflow-hidden group/btn"
                  onClick={() => window.location.href = 'mailto:hamzaa722@gmail.com'}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                     <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover/btn:bg-bg-primary animate-pulse" />
                     [ SECURE HANDSHAKE ]
                  </span>
                  {/* Hover Sweep Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-0 bg-accent transition-transform duration-500 ease-out z-0" />
                </MagneticButton>
             </div>

             {/* Right Graphic Column (Neo Framework Integration) */}
             <div className="relative w-full md:w-[45%] lg:w-[50%] h-[400px] md:h-auto overflow-hidden bg-bg-card/20 border-t md:border-t-0 md:border-l border-accent/20 flex items-end justify-center pt-10">
                {/* Background Reactor Glow behind Neo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-accent/10 blur-[100px] pointer-events-none z-0" />
                
                {/* Embedded Cinematic Asset */}
                <motion.img 
                  src="/ChatGPT Image Mar 21, 2026, 05_40_49 PM.png"
                  alt="System Architect"
                  loading="lazy"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  // CSS Filter Array: Rotates native tones into the Matrix Neon Green color palette while keeping the shadows crisp
                  className="w-full max-w-[500px] h-auto object-contain object-bottom relative z-10 brightness-[0.85] contrast-[1.1] sepia-[0.3] hue-rotate-[70deg] saturate-[1.2] drop-shadow-[0_0_15px_rgba(57,255,20,0.15)] group-hover:brightness-100 group-hover:drop-shadow-[0_0_30px_rgba(57,255,20,0.3)] transition-all duration-700 pointer-events-none"
                />

                {/* Overlaid Terminal Diagnostics */}
                <div className="absolute bottom-6 right-6 z-20 hidden lg:flex flex-col items-end gap-1 opacity-60">
                   <span className="text-[8px] font-mono text-accent tracking-[0.3em]">NODE ACCESSED</span>
                   <div className="w-12 h-px bg-accent/50" />
                   <span className="text-[8px] font-mono text-text-muted mt-1 tracking-widest">ID: MR. ANDERSON</span>
                </div>
             </div>

          </div>
        </RevealItem>

      </div>
    </SectionReveal>
  );
}
