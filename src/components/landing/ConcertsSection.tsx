import { useRef, useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import RainEffect from "./RainEffect";

const concerts = [
  {
    date: { day: "14", month: "ИЮН", year: "2025" },
    city: "Москва",
    venue: "Клуб «16 тонн»",
    address: "ул. Пресненский Вал, 6",
    status: "available",
  },
  {
    date: { day: "28", month: "ИЮН", year: "2025" },
    city: "Санкт-Петербург",
    venue: "Клуб «Ионотека»",
    address: "Лиговский пр., 50",
    status: "available",
  },
  {
    date: { day: "12", month: "ИЮЛ", year: "2025" },
    city: "Екатеринбург",
    venue: "Клуб «Tele-Club»",
    address: "ул. Кировградская, 32",
    status: "few",
  },
  {
    date: { day: "19", month: "ИЮЛ", year: "2025" },
    city: "Казань",
    venue: "Клуб «Работник культуры»",
    address: "ул. Баумана, 44",
    status: "sold",
  },
  {
    date: { day: "02", month: "АВГ", year: "2025" },
    city: "Новосибирск",
    venue: "Клуб «Подземка»",
    address: "ул. Ленина, 17",
    status: "available",
  },
];

const statusLabel: Record<string, { text: string; color: string }> = {
  available: { text: "Билеты есть", color: "text-blue-400" },
  few: { text: "Мало мест", color: "text-yellow-400" },
  sold: { text: "Распродано", color: "text-zinc-500" },
};

const ConcertsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="concerts" className="py-20 relative overflow-hidden">
      <RainEffect />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-950/5 to-black/0 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2
            className="text-5xl md:text-6xl mb-4 text-white tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            Концерты
          </h2>
          <p className="text-zinc-400 text-lg">Встретимся вживую</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {concerts.map((concert, index) => {
            const st = statusLabel[concert.status];
            return (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div
                  className={`flex items-center gap-6 p-5 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm transition-all duration-300 ${
                    concert.status !== "sold" ? "hover:border-blue-400/30 hover:bg-blue-950/10" : "opacity-60"
                  }`}
                >
                  {/* Дата */}
                  <div className="text-center min-w-[52px]">
                    <div className="text-2xl font-bold text-white leading-none">{concert.date.day}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">{concert.date.month}</div>
                    <div className="text-xs text-zinc-600">{concert.date.year}</div>
                  </div>

                  <div className="w-px h-12 bg-white/10" />

                  {/* Город и площадка */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name="MapPin" size={14} className="text-zinc-500 shrink-0" />
                      <span className="text-white font-medium">{concert.city}</span>
                    </div>
                    <div className="text-zinc-400 text-sm truncate">{concert.venue}</div>
                    <div className="text-zinc-600 text-xs mt-0.5">{concert.address}</div>
                  </div>

                  {/* Статус и кнопка */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`text-xs font-medium ${st.color}`}>{st.text}</span>
                    <Button
                      size="sm"
                      disabled={concert.status === "sold"}
                      className="bg-white text-black hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed text-xs px-4"
                    >
                      {concert.status === "sold" ? "Нет мест" : "Купить билет"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConcertsSection;