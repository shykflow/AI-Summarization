import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ease } from '../../motion/tokens';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'AI', href: '#ai-showcase' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('Home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Handle background blur on scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Handle Active Navigation Link via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const matchedLink = navLinks.find(link => link.href === `#${id}`);
            if (matchedLink) {
              setActive(matchedLink.label);
            }
          }
        });
      },
      {
        // Trigger when a section enters the middle 40% of the viewport.
        // This ensures the active section strictly updates when it feels intuitively "centered".
        rootMargin: '-30% 0px -40% 0px'
      }
    );

    // Give child components a split moment to mount in React before observing
    setTimeout(() => {
      navLinks.forEach((link) => {
        const section = document.querySelector(link.href);
        if (section) observer.observe(section);
      });
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleClick = (label, href) => {
    setActive(label);
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: ease.out }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-bg-secondary/40 backdrop-blur-md border-b border-white/5 py-0 shadow-lg' 
          : 'bg-transparent py-4 border-b border-transparent'
      }`}
    >
      <nav className="w-full px-6 md:px-12 h-16 flex items-center justify-between">
        
        {/* Logo - Left */}
        <a href="#home" className="flex items-center group" onClick={() => setActive('Home')}>
          <span className="font-heading font-bold text-lg md:text-xl text-text-primary tracking-widest uppercase transition-colors group-hover:text-accent-light">HAMZA MANSOOR</span>
        </a>

        {/* Desktop Nav - Right */}
        <ul className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <li key={link.label}>
              <motion.button
                onClick={() => handleClick(link.label, link.href)}
                whileHover="hover"
                initial="initial"
                className="relative px-3 py-2 text-sm font-medium transition-colors cursor-pointer text-text-secondary hover:text-text-primary group"
              >
                <div className="relative overflow-hidden h-5 inline-block align-middle">
                  <motion.div
                    variants={{
                      initial: { y: 0 },
                      hover: { y: '-50%' }
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col"
                  >
                    <span className="block h-5 leading-5">{link.label}</span>
                    <span className="block h-5 leading-5 text-accent-light" aria-hidden="true">{link.label}</span>
                  </motion.div>
                </div>

                {active === link.label && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2 z-50 pointer-events-auto"
          aria-label="Toggle menu"
        >
          <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }} className="w-5 h-0.5 bg-text-primary block transition-transform" />
          <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }} className="w-5 h-0.5 bg-text-primary block transition-opacity" />
          <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }} className="w-5 h-0.5 bg-text-primary block transition-transform" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={ease.spring}
            className="fixed top-16 right-0 bottom-0 w-64 glass border-l border-border p-6 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, ...ease.spring }}
                >
                  <button
                    onClick={() => handleClick(link.label, link.href)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      active === link.label ? 'text-accent-light bg-accent/10' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
