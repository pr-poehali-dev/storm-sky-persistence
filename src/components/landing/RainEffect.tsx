const drops = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${(i * 2.5 + Math.sin(i * 1.7) * 12 + 50) % 100}%`,
  height: `${40 + ((i * 17) % 60)}px`,
  duration: `${0.8 + ((i * 0.07) % 1.4)}s`,
  delay: `${(i * 0.23) % 3}s`,
}));

const RainEffect = () => (
  <>
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {drops.map((d) => (
        <div
          key={d.id}
          className="absolute top-0 w-px rounded-full bg-gradient-to-b from-transparent via-blue-300/25 to-transparent"
          style={{
            left: d.left,
            height: d.height,
            animation: `rain ${d.duration} ${d.delay} linear infinite`,
          }}
        />
      ))}
    </div>
    <style>{`
      @keyframes rain {
        0%   { transform: translateY(-80px); opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 0.5; }
        100% { transform: translateY(100vh); opacity: 0; }
      }
    `}</style>
  </>
);

export default RainEffect;
