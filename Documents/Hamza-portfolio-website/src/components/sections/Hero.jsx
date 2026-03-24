import { lazy, Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, blurIn, fadeUp } from '../../motion/variants';
import { delay } from '../../motion/tokens';
import MagneticButton from '../ui/MagneticButton';

const TypewrittenLabel = ({ eng, jp, delayOffset }) => {
  const [text, setText] = useState('');
  const [isJp, setIsJp] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delayOffset);
    return () => clearTimeout(t);
  }, [delayOffset]);

  useEffect(() => {
    if (!started) return;

    const targetText = isJp ? jp : eng;
    let timeout;

    if (isDeleting) {
      if (text === '') {
        setIsJp(!isJp);
        setIsDeleting(false);
        timeout = setTimeout(() => {}, 500);
      } else {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
      }
    } else {
      if (text === targetText) {
        timeout = setTimeout(() => setIsDeleting(true), 4000);
      } else {
        timeout = setTimeout(() => setText(targetText.slice(0, text.length + 1)), 80);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, isJp, eng, jp, started]);

  return (
    <>
      <span className="text-[9px] lg:text-[10px] font-mono text-text-primary tracking-widest uppercase opacity-90 shadow-sm whitespace-nowrap min-w-[5px]">
        {text}
      </span>
      <motion.span 
        animate={{ opacity: [1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1.5 h-3.5 bg-accent ml-0.5"
      />
    </>
  );
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(57, 255, 20, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 relative z-10"
      >
        <motion.h1 variants={blurIn} className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-3xl">
          <span className="text-gradient">AI Engineer</span>
          <br />
          Building Intelligent Systems
        </motion.h1>

        <motion.p variants={blurIn} className="text-lg md:text-xl text-text-secondary max-w-xl mb-8 leading-relaxed">
          I design and deploy production-grade AI pipelines — from fine-tuned LLMs to real-time retrieval-augmented generation.
        </motion.p>

          <div className="flex flex-wrap gap-4 relative z-20">
            <MagneticButton
              className="px-6 py-3 rounded-lg bg-accent text-bg-primary font-bold text-sm hover:opacity-90 transition-opacity glow-accent shadow-[0_0_20px_var(--color-accent-glow)]"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in touch
            </MagneticButton>
            <MagneticButton
              className="px-6 py-3 rounded-lg border border-border text-text-secondary font-medium text-sm hover:border-accent hover:text-text-primary transition-colors"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View projects →
            </MagneticButton>
          </div>
          
        {/* Floating Technical Labels (Desktop Only) */}
        <div className="absolute right-0 md:right-4 lg:right-12 xl:right-24 top-1/2 -translate-y-1/2 hidden md:block w-[350px] lg:w-[500px] h-[500px] pointer-events-none z-0">
          {[
            { eng: 'LLM Orchestration', jp: '大規模言語モデル', top: '15%', right: '25%' },
            { eng: 'RAG Architectures', jp: '検索拡張生成', top: '35%', right: '-5%' },
            { eng: 'Multi-Agent Systems', jp: 'マルチエージェント', top: '60%', right: '40%' },
            { eng: 'Vector Embeddings', jp: 'ベクトル埋め込み', top: '80%', right: '10%' },
            { eng: 'Production MLOps', jp: '機械学習基盤', top: '25%', right: '60%' },
          ].map((lbl, i) => (
            <motion.div
              key={lbl.eng}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                 opacity: 1, 
                 scale: 1,
                 y: [0, -12, 0],
                 x: [0, 6, 0]
              }}
              transition={{
                 opacity: { duration: 1, delay: i * 0.15 },
                 scale: { duration: 1, delay: i * 0.15, ease: 'easeOut' },
                 y: { duration: 6 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 },
                 x: { duration: 7 + (i % 2), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }
              }}
              style={{ top: lbl.top, right: lbl.right }}
              className="absolute flex items-center gap-2 lg:gap-3 px-3 lg:px-5 py-2 lg:py-2.5 rounded-full border border-accent/20 bg-bg-card/40 backdrop-blur-md shadow-[0_0_15px_rgba(57,255,20,0.05)] min-w-[200px]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--color-accent)] shrink-0" />
              <div className="flex items-center">
                <TypewrittenLabel eng={lbl.eng} jp={lbl.jp} delayOffset={i * 800} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
