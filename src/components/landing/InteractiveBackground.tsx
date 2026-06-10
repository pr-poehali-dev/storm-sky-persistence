import { useEffect, useRef } from "react";

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
}

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const drops: RainDrop[] = [];
    const dropCount = 180;

    const createDrop = (randomY = false): RainDrop => ({
      x: Math.random() * canvas.width,
      y: randomY ? Math.random() * canvas.height : -Math.random() * canvas.height,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 4 + 2,
      opacity: Math.random() * 0.25 + 0.05,
      width: Math.random() * 0.8 + 0.2,
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();

    for (let i = 0; i < dropCount; i++) {
      drops.push(createDrop(true));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ночное небо с туманом
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(5, 8, 20, 1)");
      gradient.addColorStop(0.4, "rgba(8, 12, 30, 1)");
      gradient.addColorStop(1, "rgba(3, 5, 12, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Мягкое синеватое свечение снизу
      const glow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height,
        0,
        canvas.width / 2, canvas.height,
        canvas.width * 0.7
      );
      glow.addColorStop(0, "rgba(30, 60, 120, 0.12)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Капли дождя
      for (const drop of drops) {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - drop.width, drop.y + drop.length);
        ctx.strokeStyle = `rgba(140, 180, 255, ${drop.opacity})`;
        ctx.lineWidth = drop.width;
        ctx.stroke();

        drop.y += drop.speed;
        drop.x -= drop.speed * 0.15;

        if (drop.y > canvas.height) {
          Object.assign(drop, createDrop(false));
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />;
};

export default InteractiveBackground;
