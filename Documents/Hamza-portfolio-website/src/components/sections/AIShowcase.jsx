import { motion } from 'framer-motion';
import SectionReveal, { RevealItem } from '../ui/SectionReveal';
import { useInView } from '../../motion/useInView';
import { duration, ease } from '../../motion/tokens';

const pipelineStages = [
  { 
    id: 'stage-1',
    label: 'Ingestion & Security', 
    icon: '🛡️', 
    desc: 'Input Processing',
    capabilities: ['Query Parsing', 'Input Guardrails', 'PII Masking']
  },
  { 
    id: 'stage-2',
    label: 'Orchestration', 
    icon: '⚡', 
    desc: 'Agents & Routing',
    capabilities: ['LangChain / LlamaIndex', 'Tool Calling', 'Agentic Logic']
  },
  { 
    id: 'stage-3',
    label: 'RAG Architecture', 
    icon: '🔍', 
    desc: 'Context Retrieval',
    capabilities: ['Vector Databases', 'Semantic Search', 'Cross-Encoder Reranking']
  },
  { 
    id: 'stage-4',
    label: 'Synthesis', 
    icon: '🧠', 
    desc: 'LLM Generation',
    capabilities: ['Prompt Engineering', 'Fine-Tuning (LoRA)', 'Model Ensembles']
  },
  { 
    id: 'stage-5',
    label: 'MLOps & Eval', 
    icon: '📈', 
    desc: 'Production OS',
    capabilities: ['Deployment (vLLM)', 'Output Evaluation', 'Telemetry Analytics']
  },
];

function AdvancedPipeline() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  // Animation constants for the synchronized electric pulse
  const CycleDuration = 5; // 5 seconds total for 1 full pulse sequence
  const TravelTime = 0.5; // Pulse takes 0.5s to cross the connector
  const StageInterval = CycleDuration / pipelineStages.length; // 1 second per stage

  return (
    <div ref={ref} className="relative w-full overflow-x-auto pb-8 hide-scrollbar">
      <div className="flex items-start min-w-[900px] justify-between px-4 pt-10">
        {pipelineStages.map((stage, i) => {
          
          const delayTime = i * StageInterval; // Creates the perfect sequential wave: 0s, 1s, 2s, 3s, 4s
          
          return (
            <div key={stage.id} className="relative flex-1 flex flex-col items-center">
              
              {/* Connector Line (points to next node) */}
              {i < pipelineStages.length - 1 && (
                <div className="absolute top-8 left-[50%] w-full h-[2px] bg-white/5 z-0">
                  {/* Energy Pulse traveling through wire */}
                  <motion.div
                    className="absolute top-0 left-0 h-full w-[30%] bg-gradient-to-r from-transparent via-accent-light to-transparent"
                    animate={isInView ? {
                       left: ['0%', '100%', '100%'],
                       opacity: [0, 1, 0, 0]
                    } : {}}
                    transition={{
                      duration: CycleDuration,
                      times: [
                         0, 
                         0.1, // 0.5s travel time
                         0.15, // Fades out
                         1 // Waits until next global cycle
                      ], 
                      repeat: Infinity,
                      delay: delayTime + 0.5, // Starts traveling 0.5s after current node illuminates, arriving exactly at 1.0s for the next node!
                      ease: 'linear'
                    }}
                  />
                </div>
              )}

              {/* Node Core */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: duration.medium, ease: ease.out }}
                className="relative z-10 w-16 h-16 rounded-2xl border border-white/10 bg-bg-card flex items-center justify-center text-2xl mb-6 flex-shrink-0"
              >
                {/* Node Neon Glow (Triggers sequentially when pulse hits) */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={isInView ? {
                    boxShadow: [
                      '0px 0px 0px 0px rgba(57, 255, 20, 0)',
                      '0px 0px 30px 5px rgba(57, 255, 20, 0.6)', 
                      '0px 0px 0px 0px rgba(57, 255, 20, 0)',
                      '0px 0px 0px 0px rgba(57, 255, 20, 0)'
                    ],
                    borderColor: [
                      'rgba(57, 255, 20, 0.1)',
                      'rgba(57, 255, 20, 1)', 
                      'rgba(57, 255, 20, 0.1)',
                      'rgba(57, 255, 20, 0.1)'
                    ]
                  } : {}}
                  transition={{
                    duration: CycleDuration,
                    times: [
                      0, 
                      0.1, // Hits peak glow fast instantly
                      0.4, // Fades out slowly
                      1 // Waits for next cycle
                    ],
                    repeat: Infinity,
                    delay: delayTime, // Offset for sequence
                    ease: "easeOut"
                  }}
                />
                <span className="relative z-10">{stage.icon}</span>
              </motion.div>

              {/* Stage Details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.15 + 0.3, duration: duration.medium }}
                className="flex flex-col items-center text-center px-3 w-full"
              >
                <h3 className="font-heading text-sm track-[0.1em] text-text-primary mb-1 uppercase font-bold">{stage.label}</h3>
                <p className="text-[11px] text-accent mb-4 font-mono uppercase">{stage.desc}</p>
                
                <div className="flex flex-col gap-1.5 w-full max-w-[160px]">
                  {stage.capabilities.map((cap, capIdx) => (
                    <div 
                      key={capIdx}
                      className="text-[11px] py-1.5 px-2 rounded-md border border-white/5 bg-white/[0.02] text-text-secondary whitespace-nowrap shadow-sm hover:border-accent/30 transition-colors cursor-default"
                    >
                      {cap}
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

const AppliedAILayer = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 mt-4 border-t border-accent/20">
    
    {/* Context Tokens Gauge */}
    <div className="flex flex-col gap-3 p-5 rounded-lg bg-[#040805] border border-accent/20 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 blur-2xl pointer-events-none" />
      <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Active Context Window</span>
      <div className="flex items-end gap-1 mt-1">
         <span className="text-4xl font-heading text-text-primary">128</span>
         <span className="text-base font-mono text-accent pb-1">K</span>
      </div>
      <div className="w-full h-1.5 bg-bg-primary rounded-full overflow-hidden border border-border mt-2">
         <div className="w-[85%] h-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
      </div>
      <div className="flex justify-between text-[9px] font-mono text-text-muted mt-1">
         <span>0 Tokens</span>
         <span>Limit (128K)</span>
      </div>
    </div>

    {/* Live Node Flow (Mini Network View) */}
    <div className="flex flex-col gap-3 p-5 rounded-lg bg-[#040805] border border-accent/20 relative">
      <div className="flex justify-between items-center mb-1">
         <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Agent Swarm Logic</span>
         <span className="text-[9px] font-mono text-accent px-1.5 py-0.5 bg-accent/10 border border-accent/20 rounded">SYNCED</span>
      </div>
      <div className="flex-1 flex justify-between items-center px-2 py-4">
         <div className="w-8 h-8 rounded-full border border-accent flex items-center justify-center bg-accent/10 shadow-[0_0_10px_var(--color-accent-glow)]"><span className="w-2 h-2 bg-accent rounded-full animate-pulse" /></div>
         <div className="flex-1 h-[2px] bg-gradient-to-r from-accent to-accent/20" />
         <div className="w-10 h-10 rounded-md border border-accent/40 bg-bg-primary flex items-center justify-center z-10"><span className="text-sm">🧠</span></div>
         <div className="flex-1 h-[2px] bg-gradient-to-r from-accent/20 to-accent" />
         <div className="w-8 h-8 rounded-full border border-accent flex items-center justify-center bg-accent/10 shadow-[0_0_10px_var(--color-accent-glow)]"><span className="w-2 h-2 bg-accent rounded-full animate-pulse" /></div>
      </div>
      <div className="flex justify-between w-full text-[10px] font-mono text-text-secondary text-center px-1">
         <span>Planner<br/><span className="text-[8px] text-text-muted">Node</span></span>
         <span>Executive<br/><span className="text-[8px] text-text-muted">Kernel</span></span>
         <span>ToolGen<br/><span className="text-[8px] text-text-muted">Node</span></span>
      </div>
    </div>

    {/* Metric Throughput Chart */}
    <div className="flex flex-col gap-3 p-5 rounded-lg bg-[#040805] border border-accent/20 relative">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">System Throughput</span>
        <span className="text-[9px] font-mono text-accent">REQ / SEC</span>
      </div>
      <div className="flex-1 flex items-end gap-2 pt-2 pb-1">
         {[40, 65, 45, 80, 55, 90, 75, 100].map((h, i) => (
           <div key={i} className={`flex-1 transition-colors rounded-t-sm relative group ${i === 7 ? 'bg-accent shadow-[0_0_10px_var(--color-accent)]' : 'bg-border/60 hover:bg-accent/40'}`} style={{ height: `${h}%` }}>
             <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity">{h}</div>
           </div>
         ))}
      </div>
      <div className="flex justify-between text-[9px] font-mono text-text-muted mt-2 border-t border-accent/10 pt-2">
         <span>t-60s</span>
         <span>Live Now</span>
      </div>
    </div>

  </div>
);

export default function AIShowcase() {
  return (
    <SectionReveal id="ai-showcase" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <RevealItem>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent font-mono text-sm">04.</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Enterprise AI Systems</h2>
            <div className="h-px flex-1 bg-border max-w-sm hidden md:block" />
          </div>
        </RevealItem>

        <RevealItem>
          <p className="text-text-secondary mb-12 max-w-2xl text-base md:text-lg leading-relaxed">
            I design and deploy end-to-end AI architectures built strictly for production. From orchestrating intelligent agents to fine-tuning LLMs with rigorous guardrails and deep evaluation metrics.
          </p>
        </RevealItem>

        <RevealItem>
          {/* Futuristic Cyber Monitor Wrapper */}
          <div className="relative w-full rounded-xl border border-accent/50 bg-[#020503] shadow-[0_0_40px_rgba(57,255,20,0.1),inset_0_0_80px_rgba(57,255,20,0.03)] overflow-hidden flex flex-col group">
             
             {/* Monitor HUD Top Bar */}
             <div className="w-full flex justify-between items-center px-4 md:px-6 py-2.5 border-b border-accent/20 bg-accent/[0.03]">
               <div className="flex items-center gap-3">
                 <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--color-accent)]" />
                 <span className="text-[11px] md:text-xs font-bold font-mono text-accent tracking-widest uppercase">AISYS_MONITOR_v2</span>
               </div>
               
               <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest hidden sm:flex">
                 <span className="text-text-muted">UPTIME: 99.99%</span>
                 <span className="text-accent/30">/</span>
                 <span className="text-accent">LIVE DEPLOYMENT</span>
                 <span className="text-accent/30">/</span>
                 <span className="text-text-primary drop-shadow-[0_0_5px_var(--color-accent)]">STATUS: ACTIVE</span>
               </div>
               
               <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-1.5 rounded-full bg-border" />
                  <div className="w-8 h-1.5 rounded-full bg-border" />
                  <div className="w-12 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
               </div>
             </div>
             
             {/* Global Screen Scanline Texture */}
             <div className="absolute top-[42px] bottom-0 left-0 right-0 pointer-events-none bg-[linear-gradient(rgba(57,255,20,0.02)_1px,transparent_1px)] bg-[size:100%_4px] mix-blend-screen opacity-70 z-50 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
             
             <div className="p-6 md:p-8 lg:p-10 relative z-10 flex flex-col gap-8">
                {/* Embedded Original Pipeline Visualization */}
                <div className="relative pointer-events-auto">
                   <AdvancedPipeline />
                </div>

                {/* Second Layer: Applied AI System Visualizations */}
                <div className="relative pointer-events-auto">
                   <AppliedAILayer />
                </div>
             </div>
             
             {/* Minimal Base/Stand Trim Line */}
             <div className="absolute bottom-0 left-[20%] right-[20%] h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-40 blur-sm" />
          </div>
        </RevealItem>
      </div>
    </SectionReveal>
  );
}
