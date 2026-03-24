// Central motion tokens for consistent animation across the app
export const duration = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.0,
  xslow: 1.5,
};

export const ease = {
  smooth: [0.25, 0.1, 0.25, 1],
  out: [0.0, 0.0, 0.2, 1],
  inOut: [0.4, 0, 0.2, 1],
  spring: { type: "spring", stiffness: 300, damping: 30 },
  softSpring: { type: "spring", stiffness: 150, damping: 25 },
};

export const delay = {
  stagger: 0.1,
  section: 0.2,
  hero: 0.15,
};
