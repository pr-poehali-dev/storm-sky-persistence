import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
    <footer className="bg-black py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Три дня дождя. Все права защищены.
          </p>
          <div className="flex space-x-5">
            <a
              href="https://vk.ru/threedaysrain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="ВКонтакте"
            >
              <Icon name="Users" size={22} />
            </a>
            <a
              href="https://t.me/everydayrain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="Telegram"
            >
              <Icon name="Send" size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
