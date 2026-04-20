import { useRef, useEffect } from 'react';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'easeOut' | 'expoOut';
  extraScale?: number;
}

const ClickSpark = ({
  sparkColor = '#d97706', // Burnt Orange to match autumnal theme
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'easeOut',
  extraScale = 1.0,
}: ClickSparkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<any[]>([]);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 
          easing === 'linear' ? progress :
          easing === 'easeOut' ? 1 - Math.pow(1 - progress, 3) :
          1 - Math.pow(2, -10 * progress);

        if (progress >= 1) return false;

        ctx.save();
        ctx.beginPath();
        
        ctx.fillStyle = sparkColor;
        ctx.globalAlpha = 1 - progress;

        for (let i = 0; i < sparkCount; i++) {
          const angle = (i * 2 * Math.PI) / sparkCount + spark.angleOffset;
          const distance = sparkRadius * easedProgress * 2;
          const x = spark.x + Math.cos(angle) * distance;
          const y = spark.y + Math.sin(angle) * distance;
          
          const currentSize = sparkSize * (1 - progress) * extraScale;
          
          ctx.moveTo(x, y);
          ctx.arc(x, y, currentSize / 2, 0, 2 * Math.PI);
        }

        ctx.fill();
        ctx.restore();

        return true;
      });

      requestAnimationFrame(animate);
    };

    const requestRef = requestAnimationFrame(animate);

    const handleMouseDown = (e: MouseEvent) => {
      const spark = {
        x: e.clientX,
        y: e.clientY,
        startTime: performance.now(),
        angleOffset: Math.random() * Math.PI,
      };
      sparksRef.current.push(spark);
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(requestRef);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing, extraScale]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default ClickSpark;
