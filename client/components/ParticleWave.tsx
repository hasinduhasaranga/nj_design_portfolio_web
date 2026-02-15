import React, { useEffect, useRef } from 'react';

export const ParticleWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const config = {
      layers: 18,              // Reduced for performance
      linesPerLayer: 3,       // Total of 24 lines (was 90)
      speed: 0.012,
      baseAmplitude: 190,
      color: '#0080ff',
    };

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent?.clientWidth || window.innerWidth;
      canvas.height = parent?.clientHeight || window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += config.speed;

      // Disable shadow for performance
      ctx.shadowBlur = 0;

      for (let l = 0; l < config.layers; l++) {
        for (let i = 0; i < config.linesPerLayer; i++) {
          ctx.beginPath();
          
          const alpha = (0.03 + (l / config.layers) * 0.18).toFixed(3);
          ctx.strokeStyle = `rgba(0, 128, 255, ${alpha})`;
          ctx.lineWidth = 1.5;

          for (let x = 0; x <= canvas.width; x += 5) { // Larger step for performance
            const progress = x / canvas.width;
            const taper = Math.sin(progress * Math.PI);

            const wave1 = Math.sin(progress * 6 - time * 2 + l * 0.3);
            const wave2 = Math.sin(progress * 15 - time * 4 + i * 0.2);
            const wave3 = Math.cos(time + progress * 3);

            const combinedWave = (wave1 * 0.6 + wave2 * 0.3 + wave3 * 0.1);
            const y = (canvas.height / 2) + (combinedWave * config.baseAmplitude * taper);

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
      }

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
      className="absolute inset-0 w-full h-full z-0 pointer-events-none scale-150"
      style={{ display: 'block' }}
    />
  );
};