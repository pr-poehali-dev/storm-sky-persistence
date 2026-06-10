import { useEffect, useRef } from "react";

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
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
    const ripples: Ripple[] = [];
    const dropCount = 180;
    const puddleY = () => canvas.height - 60;

    const createDrop = (randomY = false): RainDrop => ({
      x: Math.random() * canvas.width,
      y: randomY ? Math.random() * canvas.height : -Math.random() * 300,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 4 + 2,
      opacity: Math.random() * 0.25 + 0.05,
      width: Math.random() * 0.8 + 0.2,
    });

    const createRipple = (x: number): Ripple => ({
      x,
      y: puddleY(),
      radius: 1,
      maxRadius: Math.random() * 18 + 8,
      opacity: 0.35,
      speed: Math.random() * 0.6 + 0.3,
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();

    for (let i = 0; i < dropCount; i++) {
      drops.push(createDrop(true));
    }

    let frameCount = 0;

    const animate = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ночное небо
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, "rgba(4, 6, 18, 1)");
      skyGrad.addColorStop(0.5, "rgba(7, 11, 28, 1)");
      skyGrad.addColorStop(1, "rgba(3, 5, 14, 1)");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Синеватое свечение снизу (отражение города)
      const cityGlow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height,
        0,
        canvas.width / 2, canvas.height,
        canvas.width * 0.8
      );
      cityGlow.addColorStop(0, "rgba(20, 50, 110, 0.18)");
      cityGlow.addColorStop(0.6, "rgba(10, 20, 60, 0.08)");
      cityGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = cityGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Туман — несколько слоёв
      const fogLayers = [
        { y: canvas.height * 0.72, h: canvas.height * 0.12, opacity: 0.07 },
        { y: canvas.height * 0.80, h: canvas.height * 0.10, opacity: 0.10 },
        { y: canvas.height * 0.88, h: canvas.height * 0.12, opacity: 0.13 },
      ];
      for (const fog of fogLayers) {
        const fogGrad = ctx.createLinearGradient(0, fog.y, 0, fog.y + fog.h);
        fogGrad.addColorStop(0, `rgba(80, 110, 180, 0)`);
        fogGrad.addColorStop(0.5, `rgba(80, 110, 180, ${fog.opacity})`);
        fogGrad.addColorStop(1, `rgba(80, 110, 180, 0)`);
        ctx.fillStyle = fogGrad;
        ctx.fillRect(0, fog.y, canvas.width, fog.h);
      }

      // Лужа внизу
      const puddleGrad = ctx.createLinearGradient(0, puddleY() - 30, 0, canvas.height);
      puddleGrad.addColorStop(0, "rgba(15, 30, 70, 0)");
      puddleGrad.addColorStop(0.3, "rgba(15, 35, 80, 0.55)");
      puddleGrad.addColorStop(1, "rgba(8, 18, 45, 0.85)");
      ctx.fillStyle = puddleGrad;
      ctx.fillRect(0, puddleY() - 30, canvas.width, canvas.height);

      // Отражение в луже — размытые полосы
      ctx.save();
      ctx.globalAlpha = 0.12;
      for (let i = 0; i < 6; i++) {
        const rx = (canvas.width / 7) * (i + 0.5);
        const reflGrad = ctx.createLinearGradient(rx - 20, puddleY(), rx + 20, canvas.height);
        reflGrad.addColorStop(0, "rgba(100, 150, 255, 0.6)");
        reflGrad.addColorStop(1, "rgba(100, 150, 255, 0)");
        ctx.fillStyle = reflGrad;
        ctx.fillRect(rx - 2, puddleY(), 4, canvas.height - puddleY());
      }
      ctx.restore();

      // Капли дождя
      for (const drop of drops) {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - drop.width * 0.5, drop.y + drop.length);
        ctx.strokeStyle = `rgba(140, 180, 255, ${drop.opacity})`;
        ctx.lineWidth = drop.width;
        ctx.stroke();

        drop.y += drop.speed;
        drop.x -= drop.speed * 0.12;

        if (drop.y > puddleY()) {
          if (Math.random() < 0.3) {
            ripples.push(createRipple(drop.x));
          }
          Object.assign(drop, createDrop(false));
        }
      }

      // Круги на луже
      if (frameCount % 8 === 0) {
        const rx = Math.random() * canvas.width;
        ripples.push(createRipple(rx));
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.radius * 2.5, r.radius * 0.7, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(140, 180, 255, ${r.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        r.radius += r.speed;
        r.opacity -= 0.012;

        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
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
