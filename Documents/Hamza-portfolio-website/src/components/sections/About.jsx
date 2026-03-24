import SectionReveal, { RevealItem } from '../ui/SectionReveal';

export default function About() {
  return (
    <SectionReveal id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <RevealItem>
          <div className="flex items-center gap-4 mb-12">
            <span className="text-accent font-mono text-sm">06.</span>
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
            <div className="h-px flex-1 bg-border max-w-xs" />
          </div>
        </RevealItem>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-3 space-y-4">
            <RevealItem>
              <p className="text-text-secondary leading-relaxed">
                I'm a Senior AI Engineer with deep expertise in building and deploying production-grade machine learning systems. My focus is on large language models, retrieval-augmented generation, and real-time inference pipelines.
              </p>
            </RevealItem>
            <RevealItem>
              <p className="text-text-secondary leading-relaxed">
                Over the past several years, I've designed systems that process millions of queries, fine-tuned models for domain-specific accuracy, and built the tooling that makes AI practical in enterprise settings.
              </p>
            </RevealItem>
            <RevealItem>
              <p className="text-text-secondary leading-relaxed">
                When I'm not training models, I'm exploring new research in attention mechanisms, multi-modal AI, and efficient inference strategies. I believe in building AI that's both powerful and responsible.
              </p>
            </RevealItem>
          </div>

          <div className="md:col-span-2">
            <RevealItem>
              <div className="rounded-xl border border-border bg-bg-card/40 backdrop-blur-md p-6">
                <h3 className="text-sm font-mono text-accent-light mb-4 uppercase tracking-wider">Quick Facts</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">▸</span>
                    <span>3+ years of experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">▸</span>
                    <span>Specialized in LLMs & RAG systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">▸</span>
                    <span>Open source contributor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">▸</span>
                    <span>Conference speaker & writer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">▸</span>
                    <span>Based in — available remote</span>
                  </li>
                </ul>
              </div>
            </RevealItem>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
