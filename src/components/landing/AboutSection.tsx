import { useRef, useEffect, useState } from "react";
import { Headphones, Music, Mic2, Award } from "lucide-react";

const achievements = [
  { icon: <Headphones className="w-6 h-6" />, label: "Лет в музыке", value: "5+" },
  { icon: <Music className="w-6 h-6" />, label: "Выпущено треков", value: "30+" },
  { icon: <Mic2 className="w-6 h-6" />, label: "Коллабораций", value: "20+" },
  { icon: <Award className="w-6 h-6" />, label: "Прослушиваний", value: "500К+" },
];

const AboutSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={ref} id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transform: `translateY(${(1 - scrollProgress) * 50}px)` }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 rounded-3xl transform -rotate-6"></div>
            <div className="w-full aspect-square bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-3xl relative z-10 overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/cba59d06-69fb-42f9-89e0-926360f01706/bucket/b6110a92-5828-4351-95d5-eaca3423122f.png"
                alt="Три дня дождя"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Об артисте</h2>
            <p className="text-lg mb-6 text-zinc-300">
              Три дня дождя — это атмосферная музыка на стыке электронного звука и живых эмоций.
              Каждый трек — это маленькое кино без слов: серые городские пейзажи, ночные дороги и
              то ощущение, когда за окном льёт дождь, а ты наедине с собой.
            </p>
            <p className="text-lg mb-8 text-zinc-300">
              Вдохновение приходит из повседневных деталей, которые обычно остаются незамеченными —
              звук капель по стеклу, шум города вдали, рассветный свет после долгой ночи. Музыка
              для тех, кто умеет чувствовать.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.label}
                  className={`bg-zinc-900/50 rounded-lg p-4 border border-white/10 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-2">
                    <div className="mr-2 text-white">{achievement.icon}</div>
                    <div className="text-2xl font-bold text-white">{achievement.value}</div>
                  </div>
                  <div className="text-sm text-zinc-400">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;