import { useEffect, useRef } from 'react';

export default function MatrixRain({ color = '#22c55e', opacity = 0.3 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const fontSize = 14;
    let columns = 0;
    let drops = [];

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        
        // Re-initialize columns and drops so it fills the new width
        columns = Math.floor(canvas.width / fontSize) + 1;
        drops = [];
        for (let x = 0; x < columns; x++) {
          // Scatter drops vertically so they are instantly visible on load
          drops[x] = Math.random() * (canvas.height / fontSize); 
        }
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ'.split('');
    
    let lastDrawTime = 0;
    const fps = 24; 
    const interval = 1000 / fps;

    const draw = (currentTime) => {
      animationFrameId = requestAnimationFrame(draw);
      
      const delta = currentTime - lastDrawTime;
      
      if (delta > interval) {
        // TRICK for transparent trailing: Fade previous frame's alpha instead of drawing a black box!
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Reset composite operation to draw the characters normally
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = 'center';

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          
          ctx.fillText(text, i * fontSize + (fontSize/2), drops[i] * fontSize);

          // Reset drop to the top randomly to keep the staggered look
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
          }

          drops[i]++;
        }
        
        lastDrawTime = currentTime - (delta % interval);
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none rounded-b-xl"
      style={{ opacity }}
    />
  );
}
