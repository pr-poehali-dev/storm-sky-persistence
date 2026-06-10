import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-3xl tracking-wide text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
          Три дня дождя
        </a>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:bg-white/10"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex absolute md:relative top-full left-0 w-full md:w-auto bg-black/95 md:bg-transparent flex-col md:flex-row`}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0">
            <li>
              <button
                onClick={() => scrollToSection("licenses")}
                className="text-white hover:text-blue-400 transition-colors"
              >
                Музыка
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className="text-white hover:text-blue-400 transition-colors"
              >
                Об артисте
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("concerts")}
                className="text-white hover:text-blue-400 transition-colors"
              >
                Концерты
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-white hover:text-blue-400 transition-colors"
              >
                Контакты
              </button>
            </li>
          </ul>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://vk.ru/threedaysrain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
            aria-label="ВКонтакте"
          >
            <Icon name="Users" size={20} />
          </a>
          <a
            href="https://t.me/everydayrain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
            aria-label="Telegram"
          >
            <Icon name="Send" size={20} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;