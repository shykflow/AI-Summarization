import { useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { scaleIn } from '../../motion/variants';

const ProjectCard = memo(function ProjectCard({ title, description, tags, image, link, github }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  };

  return (
    <motion.article
      ref={cardRef}
      variants={scaleIn}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="group relative rounded-xl border border-border bg-bg-card/40 backdrop-blur-md overflow-hidden"
    >
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-xl transition-opacity duration-500 pointer-events-none ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          boxShadow: '0 0 30px rgba(124, 58, 237, 0.2), inset 0 0 30px rgba(124, 58, 237, 0.05)',
        }}
      />

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 to-transparent z-10" />
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/20 to-bg-secondary flex items-center justify-center">
            <span className="text-4xl opacity-30">⚡</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 relative z-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags?.map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs font-mono rounded-full border border-accent/30 text-accent-light bg-accent/5">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">{description}</p>

        {/* Actions */}
        <div className="flex gap-3">
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-accent-light hover:text-accent transition-colors">
              Live ↗
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-text-muted hover:text-text-primary transition-colors">
              Code →
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
});

export default ProjectCard;
