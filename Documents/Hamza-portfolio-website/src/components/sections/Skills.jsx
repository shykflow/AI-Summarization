import SectionReveal, { RevealItem } from '../ui/SectionReveal';
import SkillBar from '../ui/SkillBar';
import { motion } from 'framer-motion';
import { staggerContainer } from '../../motion/variants';

const skillCategories = [
  {
    title: 'AI / ML Core',
    status: 'PRODUCTION-READY',
    desc: 'Model training, architectural evaluation, and fine-tuning pipelines.',
    skills: [
      { name: 'PyTorch / JAX', level: 86 },
      { name: 'LLMs & Transformers', level: 84 },
      { name: 'RAG Systems', level: 88 },
      { name: 'MLOps / Deployment', level: 78 },
    ],
  },
  {
    title: 'Backend Systems',
    status: 'SCALABLE CLUSTER',
    desc: 'High-throughput microservices and distributed data pipelines.',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'FastAPI / Flask', level: 84 },
      { name: 'PostgreSQL / Redis', level: 75 },
      { name: 'Docker / K8s', level: 72 },
    ],
  },
  {
    title: 'Frontend & Tools',
    status: 'DEPLOYED & MONITORED',
    desc: 'Dynamic interactive interfaces and continuous integration infrastructure.',
    skills: [
      { name: 'React / TypeScript', level: 68 },
      { name: 'Git & CI/CD', level: 85 },
      { name: 'Linux / Shell', level: 80 },
      { name: 'Cloud (AWS/GCP)', level: 75 },
    ],
  },
];

export default function Skills() {
  let globalIndex = 0;

  return (
    <SectionReveal id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <RevealItem>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-accent font-mono text-sm">03.</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Capabilities Dashboard</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent max-w-sm ml-4" />
          </div>
        </RevealItem>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((cat, catIdx) => (
            <RevealItem key={cat.title}>
              <div className="relative rounded-lg border border-border/50 bg-bg-secondary/40 backdrop-blur-md p-6 group hover:border-accent/30 transition-colors shadow-2xl h-full flex flex-col overflow-hidden">
                {/* HUD Corner Framing */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent opacity-40 z-10" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent opacity-40 z-10" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent opacity-40 z-10" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent opacity-40 z-10" />
                
                {/* Faint Grid Overlay inside card */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(57,255,20,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50 z-0" />

                {/* Header Context */}
                <div className="relative z-10 flex flex-col md:flex-row lg:flex-col justify-between items-start md:items-center lg:items-start gap-4 mb-6 border-b border-border/60 pb-5">
                   <div>
                      <h3 className="text-[15px] font-bold font-mono text-text-primary uppercase tracking-widest mb-1.5">{cat.title}</h3>
                      <p className="text-[11px] text-text-muted font-mono leading-relaxed line-clamp-2 md:line-clamp-none">{cat.desc}</p>
                   </div>
                   <div className="flex shrink-0 items-center gap-2 px-2.5 py-1 bg-bg-primary border border-border rounded shadow-inner">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--color-accent)]" />
                      <span className="text-[10px] font-mono text-accent tracking-widest uppercase">{cat.status}</span>
                   </div>
                </div>

                {/* Segmented Skill Bars */}
                <motion.div variants={staggerContainer} className="relative z-10 space-y-5 flex-1 flex flex-col justify-center">
                  {cat.skills.map((skill) => {
                    const idx = globalIndex++;
                    return <SkillBar key={skill.name} {...skill} index={idx} />;
                  })}
                </motion.div>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
