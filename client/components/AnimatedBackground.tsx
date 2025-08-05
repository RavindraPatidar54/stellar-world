import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation parameters
    const lines: Array<{
      x: number;
      y: number;
      height: number;
      speed: number;
      opacity: number;
      glowIntensity: number;
    }> = [];

    // Create vertical lines
    for (let i = 0; i < 100; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        height: Math.random() * 200 + 50,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        glowIntensity: Math.random() * 20 + 10,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgb(16, 44, 87)'); // Dark blue
      gradient.addColorStop(1, 'rgb(8, 22, 44)'); // Darker blue
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated vertical lines
      lines.forEach((line) => {
        // Update position
        line.y -= line.speed;
        if (line.y + line.height < 0) {
          line.y = canvas.height + Math.random() * 100;
          line.x = Math.random() * canvas.width;
        }

        // Create glowing effect
        ctx.shadowColor = '#00bfff';
        ctx.shadowBlur = line.glowIntensity;
        
        // Draw the line
        const lineGradient = ctx.createLinearGradient(0, line.y, 0, line.y + line.height);
        lineGradient.addColorStop(0, `rgba(0, 191, 255, 0)`);
        lineGradient.addColorStop(0.5, `rgba(0, 191, 255, ${line.opacity})`);
        lineGradient.addColorStop(1, `rgba(0, 191, 255, 0)`);
        
        ctx.fillStyle = lineGradient;
        ctx.fillRect(line.x, line.y, 2, line.height);

        // Add small bright dots at the top
        ctx.shadowBlur = 15;
        ctx.fillStyle = `rgba(0, 191, 255, ${line.opacity + 0.3})`;
        ctx.fillRect(line.x, line.y, 3, 8);
      });

      // Reset shadow
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(to bottom, rgb(16, 44, 87), rgb(8, 22, 44))' }}
    />
  );
}
