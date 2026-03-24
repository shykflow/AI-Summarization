import SectionReveal, { RevealItem } from '../ui/SectionReveal';
import MagneticButton from '../ui/MagneticButton';

const projects = [
  {
    title: 'Enterprise RAG Engine',
    description: 'Production retrieval-augmented generation system capable of ingesting proprietary datasets and processing 10K+ complex queries daily with sub-200ms latency. Integrates perfectly with dynamic FAISS indexes and structured metadata.',
    tags: ['Python', 'LangChain', 'FAISS', 'FastAPI', 'GPT-4'],
    metrics: [
      { label: 'Latency', value: '180ms', trend: '↓ 82%' },
      { label: 'Throughput', value: '10K/day' },
      { label: 'Uptime', value: '99.99%' },
      { label: 'Vector DB', value: '1.2M Docs' },
    ],
    Visual: () => (
      <div className="w-full h-full flex flex-col gap-3 p-6 font-mono text-xs">
         <div className="flex justify-between items-end border-b border-border pb-2 mb-2">
           <span className="text-text-muted">LATENCY PROFILE (ms)</span>
           <span className="text-accent">P99: 210ms</span>
         </div>
         {/* CSS Flex Bar Chart */}
         <div className="flex-1 flex items-end gap-2 mt-4 px-2">
            {[450, 420, 380, 200, 180, 150].map((h, i) => (
               <div key={i} className={`flex-1 transition-colors relative group rounded-t-sm ${i >= 3 ? 'bg-accent shadow-[0_0_15px_var(--color-accent-glow)]' : 'bg-border/40'}`} style={{ height: `${(h/450)*100}%` }}>
                 <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-accent transition-opacity">{h}</div>
                 <div className={`absolute bottom-0 w-full h-1 ${i >= 3 ? 'bg-white' : 'bg-text-muted'}`} />
               </div>
            ))}
         </div>
         <div className="flex justify-between text-text-muted mt-2 border-t border-border pt-2">
           <span>v1.0 Deploy (BM25 baseline)</span>
           <span className="text-accent-light">v2.0 Deploy (Hybrid Vector+Semantic)</span>
         </div>
      </div>
    )
  },
  {
    title: 'Model Fine-Tuning Platform',
    description: 'End-to-end distributed platform for fine-tuning domain-specific language models using LoRA adapters, maximizing hardware utilization and drastically reducing training costs.',
    tags: ['PyTorch', 'PEFT', 'Transformers', 'A100 Cluster'],
    metrics: [
      { label: 'Loss', value: '0.12', trend: 'Converged' },
      { label: 'Hardware', value: '8x A100 80GB' },
      { label: 'Cost / Run', value: '-65%' }
    ],
    Visual: () => (
      <div className="w-full h-full flex flex-col gap-4 p-6 font-mono text-xs">
        <span className="text-text-muted border-b border-border pb-2">TRAINING PIPELINE SEQUENCE (EPOCHS)</span>
        {/* Gantt Chart Style Timeline */}
        <div className="space-y-5 flex-1 mt-4">
          {[
            { name: 'Dataset Tokenization & Masking', w: '30%', ml: '0%', fill: 'bg-border/60' },
            { name: 'LoRA Adapter Injection', w: '15%', ml: '30%', fill: 'bg-accent-light opacity-50' },
            { name: 'Distributed Multi-GPU Training', w: '40%', ml: '45%', fill: 'bg-accent shadow-[0_0_15px_var(--color-accent-glow)]' },
            { name: 'PPL Evaluation & Checkpointing', w: '15%', ml: '85%', fill: 'bg-accent-light opacity-80' }
          ].map((phase, i) => (
            <div key={i} className="relative group">
              <div className="flex justify-between mb-1.5">
                <span className="text-text-secondary group-hover:text-text-primary transition-colors">{phase.name}</span>
              </div>
              <div className="w-full bg-bg-primary h-2.5 rounded-full overflow-hidden flex border border-border bg-opacity-50">
                <div className={`h-full ${phase.fill}`} style={{ width: phase.w, marginLeft: phase.ml }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: 'Neural Event Data Architecture',
    description: 'Real-time event streaming and inference architecture built to ingest raw unstructured documents and map them against dense vector spaces completely asynchronously.',
    tags: ['Kafka', 'Snowflake Cortex', 'Spark', 'Docker'],
    metrics: [
      { label: 'Ingestion Rate', value: '5GB/sec' },
      { label: 'Node Clusters', value: '12 Active' },
      { label: 'Data Loss', value: 'Zero Drop' },
      { label: 'Scale', value: 'Auto-Scaling' },
    ],
    Visual: () => (
      <div className="w-full h-full flex flex-col gap-4 p-6 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="text-text-muted">SYSTEM ARCHITECTURE (REAL-TIME STREAM)</span>
          <span className="flex items-center gap-2 text-accent"><span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_var(--color-accent)]" /> LIVE</span>
        </div>
        <div className="flex-1 flex flex-col gap-3 justify-center">
          {[
            { label: 'Apache Kafka Event Ingestion', active: 'border-border/60 text-text-muted', blocks: 8 },
            { label: 'Spark Streaming Processing', active: 'border-border/60 text-text-muted', blocks: 6 },
            { label: 'Deep Vector Encoding Node', active: 'border-accent text-accent shadow-[inset_0_0_20px_var(--color-accent-glow)] bg-accent/5', blocks: 5 },
            { label: 'Snowpipe & Snowflake Cortex', active: 'border-border/60 text-text-muted', blocks: 7 }
          ].map((sys, i) => (
             <div key={i} className={`flex items-center gap-4 border ${sys.active} rounded bg-bg-primary/50 p-2.5 group hover:border-accent/50 transition-colors`}>
                <span className="w-48 truncate">{sys.label}</span>
                <div className="flex-1 flex gap-1 h-3 opacity-60">
                  {Array(sys.blocks).fill(0).map((_, j) => (
                    <div key={j} className="flex-1 bg-current rounded-sm" style={{ opacity: Math.random() * 0.5 + 0.2 }} />
                  ))}
                </div>
             </div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: 'Autonomous Code Reviewer',
    description: 'Multi-agent LLM framework executing deep static analysis, security flaw identification, and generating architectural recommendations dynamically for every GitHub PR.',
    tags: ['OpenAI', 'GitHub API', 'TypeScript', 'Multi-Agent'],
    metrics: [
      { label: 'PRs Analyzed', value: '50K+' },
      { label: 'Agents', value: '3 Active' },
      { label: 'Cost / PR', value: '$0.02' }
    ],
    Visual: () => (
      <div className="w-full h-full p-6 font-mono text-xs flex flex-col bg-[#020503] text-accent font-medium rounded-xl border-border">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4 border-b border-accent/20 pb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
          <div className="w-2.5 h-2.5 rounded-full bg-border" />
          <span className="ml-2 text-text-muted">agent_execution_log.sh</span>
        </div>
        {/* Terminal Body */}
        <div className="flex-1 flex flex-col gap-2.5 opacity-90 overflow-hidden tracking-wider">
          <p>{'>'} spawn analyzer_agent_v2 --watch</p>
          <p className="text-text-secondary">  [OK] connected to GitHub webhook listener</p>
          <p>{'>'} cloning repository delta (14 files changed)...</p>
          <p>{'>'} executing AST scanning & security pattern matching...</p>
          <p className="text-yellow-400">  [WARN] unhandled promise rejection pattern found in src/api.ts:42</p>
          <p>{'>'} dispatching recommendation_agent for patch generation...</p>
          <p className="mt-auto pt-3 border-t border-accent/20 border-dashed text-accent-light">
            [SYS] Review completed in 12.4s. GitHub comment posted successfully.
          </p>
        </div>
      </div>
    )
  }
];

export default function Projects() {
  return (
    <SectionReveal id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <RevealItem>
          <div className="flex items-center gap-4 mb-20">
            <span className="text-accent font-mono text-sm">02.</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Engineering Showcase</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent max-w-sm ml-4" />
          </div>
        </RevealItem>

        <div className="flex flex-col gap-24 md:gap-32">
          {projects.map((project, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <RevealItem key={project.title}>
                <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${!isLeft ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Text Content Block */}
                  <div className="w-full lg:w-5/12 space-y-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs font-mono rounded bg-bg-primary border border-border text-accent-light shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-6 border-t border-border/50">
                      {project.metrics.map(m => (
                        <div key={m.label} className="flex flex-col">
                          <span className="text-xs font-mono text-text-muted mb-1">{m.label}</span>
                          <span className="text-lg font-bold text-text-primary flex items-center gap-2">
                            {m.value}
                            {m.trend && <span className="text-[10px] font-mono text-accent px-1.5 py-0.5 bg-accent/10 rounded">{m.trend}</span>}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Generic button blocks removed based on user spec */}
                  </div>

                  {/* Technical Visual Dashboard Block */}
                  <div className="w-full lg:w-7/12 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] relative rounded-lg border border-border/50 bg-bg-secondary/40 backdrop-blur-md overflow-hidden group shadow-2xl">
                    {/* Futuristic Corner Anchors */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent opacity-50 z-10" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-accent opacity-50 z-10" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-accent opacity-50 z-10" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent opacity-50 z-10" />
                    
                    {/* Render Specific Architectural Visual */}
                    <div className="relative w-full h-full z-0 p-1">
                      <project.Visual />
                    </div>

                    {/* Subtle Scanline Overlay to enforce dashboard motif */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(57,255,20,0.02)_1px,transparent_1px)] bg-[size:100%_4px] opacity-30 z-20 mix-blend-screen" />
                  </div>

                </div>
              </RevealItem>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
