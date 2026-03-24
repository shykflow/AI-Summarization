import { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../motion/useInView';
import { fadeUp } from '../../motion/variants';
import { duration, ease } from '../../motion/tokens';

const SkillBar = memo(function SkillBar({ name, level, index = 0 }) {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  
  const totalSegments = 16;
  const activeSegments = Math.round((level / 100) * totalSegments);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="space-y-1.5 group"
    >
      <div className="flex justify-between items-end mb-1">
        <span className="text-xs font-mono text-text-primary tracking-wide line-clamp-1">{name}</span>
        <span className="text-[9px] font-mono text-accent/80 tracking-widest uppercase flex items-center gap-1.5">
           {level >= 90 ? 'SYS.OPT' : (level >= 82 ? 'SYS.RDY' : 'SYS.STBL')}
        </span>
      </div>
      <div className="flex gap-[2px] h-[3px] w-full">
        {Array.from({ length: totalSegments }).map((_, i) => {
           const isActive = i < activeSegments;
           const isLeadingEdge = i === activeSegments - 1; // High-glow leading edge
           return (
             <motion.div
               key={i}
               initial={{ opacity: 0.1, scaleY: 0.5 }}
               animate={isInView ? { 
                 opacity: isActive ? (isLeadingEdge ? 1 : 0.85) : 0.15,
                 scaleY: 1
               } : {}}
               transition={{ delay: index * 0.05 + (i * 0.03), duration: 0.15, ease: 'easeOut' }}
               className={`flex-1 rounded-[1px] transition-colors duration-500 ${isActive ? 'bg-accent' : 'bg-text-muted/30'} ${isLeadingEdge ? 'shadow-[0_0_8px_var(--color-accent)] animate-pulse' : ''} group-hover:${isActive && !isLeadingEdge ? 'bg-accent-light' : ''}`}
             />
           )
        })}
      </div>
    </motion.div>
  );
});

export default SkillBar;
