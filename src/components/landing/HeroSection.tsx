import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Disc3, Music2, AudioWaveform } from "lucide-react";
import RainEffect from "./RainEffect";

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  const stats = [
    { icon: <Play className="w-6 h-6" />, label: "Треков выпущено", value: "70+" },
    { icon: <Disc3 className="w-6 h-6" />, label: "Прослушиваний", value: "4М+" },
    { icon: <Music2 className="w-6 h-6" />, label: "Лет в музыке", value: "5+" },
    { icon: <AudioWaveform className="w-6 h-6" />, label: "Коллабораций", value: "20+" },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden">
      <RainEffect />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none"></div>

      <div
        className="relative pt-40 pb-16 px-4 flex items-center min-h-screen"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-6xl md:text-9xl mb-6 tracking-wide relative" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #fff 0%, #ff4444 30%, #ff0000 50%, #cc0000 70%, #fff 100%)", backgroundSize: "200% auto", animation: "shimmer-red 3s linear infinite" }}>
                Три дня дождя
              </span>
              <style>{`@keyframes shimmer-red { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }`}</style>
            </h1>
            <div className="mb-8 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              <p className="text-2xl md:text-3xl font-light mb-3 tracking-wide bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #fff 0%, #c084fc 30%, #a855f7 50%, #7c3aed 70%, #fff 100%)", backgroundSize: "200% auto", animation: "shimmer-purple 3s linear infinite" }}>
                Музыка, которая спасёт тебя.
              </p>
              <p className="text-base md:text-lg font-light tracking-wide bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #a1a1aa 0%, #c084fc 30%, #a855f7 50%, #7c3aed 70%, #a1a1aa 100%)", backgroundSize: "200% auto", animation: "shimmer-purple 3s linear infinite" }}>
                «Вайбовые треки на стыке электронного и живого звука — для тех, кто чувствует больше, чем слышит.»
              </p>
              <style>{`@keyframes shimmer-purple { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }`}</style>
            </div>
            <div className="relative inline-block">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-zinc-200 text-lg px-8 py-6 rounded-full transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <span className="relative z-10">Слушать музыку</span>
                  <span
                    className={`ml-2 relative z-10 transition-transform duration-200 ${
                      isHovered ? "translate-x-1" : ""
                    }`}
                  >
                    &rarr;
                  </span>
                </a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="bg-zinc-900/50 rounded-xl p-6 backdrop-blur-lg border border-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20">
                  <div className="mb-2 text-white/70 flex justify-center">{stat.icon}</div>
                  <div className="text-3xl font-bold mb-1 text-white">{stat.value}</div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;