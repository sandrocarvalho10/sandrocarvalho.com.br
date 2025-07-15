import { useState } from "react";
import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button"; // Opcional: usando shadcn/ui

const navigation = [
  { name: "Início", href: "#" },
  { name: "Sobre", href: "#sobre" },
  { name: "Serviços", href: "#servicos" },
  { name: "Contato", href: "#contato" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">
          MinhaMarca
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex space-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-blue-600 transition"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Botão de ação */}
        <div className="hidden md:block">
          <Button asChild>
            <a href="#comecar">Começar</a>
          </Button>
        </div>

        {/* Botão hambúrguer (mobile) */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 shadow-md">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block text-gray-700 hover:text-blue-600 transition"
            >
              {item.name}
            </a>
          ))}
          <Button className="w-full" asChild>
            <a href="#comecar">Começar</a>
          </Button>
        </div>
      )}
    </header>
  );
}
