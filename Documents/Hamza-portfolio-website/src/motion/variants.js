import { duration, ease, delay } from './tokens';

// Checks if user prefers reduced motion
const prefersReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

const wrap = (variant) =>
  prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : variant;

export const fadeUp = wrap({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.medium, ease: ease.out },
  },
});

export const fadeIn = wrap({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.medium, ease: ease.out },
  },
});

export const blurIn = wrap({
  hidden: { opacity: 0, filter: 'blur(8px)', y: 15 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: duration.slow, ease: ease.out },
  },
});

export const scaleIn = wrap({
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.medium, ease: ease.out },
  },
});

export const slideRight = wrap({
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.medium, ease: ease.out },
  },
});

export const staggerContainer = wrap({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: delay.stagger,
      delayChildren: delay.section,
    },
  },
});

export const staggerFast = wrap({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
});
