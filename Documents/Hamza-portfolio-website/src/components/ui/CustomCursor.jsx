import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isMoving, setIsMoving] = useState(false);
  const requestRef = useRef();

  const mouse = useRef({ x: -100, y: -100 });
  const cursor = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Hide default cursor on mobile devices
    if (window.innerWidth <= 768) return;

    const handleMouseMove = (e) => {
      if (!isMoving) {
        setIsMoving(true);
        if (cursorRef.current) cursorRef.current.style.opacity = '1';
        if (dotRef.current) dotRef.current.style.opacity = '1';
      }

      mouse.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.current.x}px`;
        dotRef.current.style.top = `${mouse.current.y}px`;
      }
    };

    const animateCursor = () => {
      if (isMoving) {
        cursor.current.x += (mouse.current.x - cursor.current.x) * 0.15;
        cursor.current.y += (mouse.current.y - cursor.current.y) * 0.15;

        if (cursorRef.current) {
          cursorRef.current.style.left = `${cursor.current.x}px`;
          cursorRef.current.style.top = `${cursor.current.y}px`;
        }
      }
      requestRef.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animateCursor);

      // Event delegation for interactive hover effects
      const handleDocumentMouseOver = (e) => {
        const target = e.target.closest('a, button, .btn, input, textarea, select');
        if (target && isMoving) {
          cursorRef.current?.classList.add('cursor-hover');
          dotRef.current?.classList.add('cursor-hover');
        }
      };
  
      const handleDocumentMouseOut = (e) => {
        const target = e.target.closest('a, button, .btn, input, textarea, select');
        if (target && isMoving) {
          cursorRef.current?.classList.remove('cursor-hover');
          dotRef.current?.classList.remove('cursor-hover');
        }
      };

    document.addEventListener('mouseover', handleDocumentMouseOver);
    document.addEventListener('mouseout', handleDocumentMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleDocumentMouseOver);
      document.removeEventListener('mouseout', handleDocumentMouseOut);
      cancelAnimationFrame(requestRef.current);
      document.documentElement.classList.remove('no-cursor');
    };
  }, [isMoving]);

  // CSS handles hiding on mobile, but we can also avoid rendering it.
  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" style={{ opacity: 0 }} />
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
    </>
  );
}
