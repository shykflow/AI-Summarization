import { motion } from 'framer-motion';
import { useInView } from '../../motion/useInView';
import { staggerContainer, blurIn } from '../../motion/variants';

export default function SectionReveal({ children, className = '', id }) {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <motion.section
      ref={ref}
      id={id}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`contain-paint ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function RevealItem({ children, className = '', variant = blurIn }) {
  return (
    <motion.div variants={variant} className={className}>
      {children}
    </motion.div>
  );
}
