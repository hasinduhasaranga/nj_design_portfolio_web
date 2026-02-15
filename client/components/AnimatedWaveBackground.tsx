import React, { useEffect, useRef } from 'react';

export const AnimatedWaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; baseYa: number; phase: number; speed: number }[] = [];
    
    // Settings to match your image
    const particleCount = 150; 
    const lineCount = 12;
    const color = '#00d2ff';

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < lineCount; i++) {
        const baseY = (canvas.height / (lineCount + 1)) * (i + 1);
        for (let j = 0; j < particleCount; j++) {
          particles.push({
            x: (canvas.width / particleCount) * j,
            y: baseY,
            baseYa: baseY,
            phase: j * 0.2 + i, // Offset each particle for wave effect
            speed: 0.02 + Math.random() * 0.02
          });
        }
      }
    };

    const draw = () => {
      ctx.fillStyle = '#050b16'; // Deep navy background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Move horizontally (Left to Right flow)
        p.x += 1.5;
        if (p.x > canvas.width) p.x = 0;

        // Wave motion (Up and Down)
        const waveHeight = 30;
        p.y = p.baseYa + Math.sin(p.x * 0.01 + p.phase) * waveHeight;

        // Draw the "particle"
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.6; // Subtle transparency
        ctx.fill();

        // Add glow to particles
        ctx.shadowBlur = 5;
        ctx.shadowColor = color;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // Sits behind your content
        background: '#050b16',
        display: 'block'
      }}
    />
  );
};