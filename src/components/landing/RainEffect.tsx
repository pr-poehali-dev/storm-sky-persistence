const drops = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${(i * 2.5 + Math.sin(i * 1.7) * 12 + 50) % 100}%`,
  height: `${40 + ((i * 17) % 60)}px`,
  duration: `${0.8 + ((i * 0.07) % 1.4)}s`,
  delay: `${(i * 0.23) % 3}s`,
}));

const RainEffect = () => (
  <>
    {/* Размытое фото артиста на фоне */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <img
        src="https://cdn.poehali.dev/projects/cba59d06-69fb-42f9-89e0-926360f01706/bucket/e01ead0c-ac01-42a7-ae90-123a39bc4430.png"
        alt=""
        className="w-full h-full object-cover object-top"
        style={{ filter: "blur(32px) brightness(0.18) saturate(0.6)", transform: "scale(1.1)" }}
      />
    </div>
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