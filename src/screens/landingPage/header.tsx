'use client';

import { Menu, X } from 'lucide-react';
import { Button } from '@/styles/components/ui/button';
import { useState } from 'react';

const navigation = [
  { name: 'Início', href: '#' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Serviços', href: '#servicos' },
  { name: 'Contato', href: '#contato' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 z-50 bg-background shadow-sm">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-primary">MinhaMarca</div>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-muted hover:text-primary transition-colors"
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
          className="md:hidden text-muted"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-background px-4 pb-4 space-y-2 border-t border-border transition-all">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block text-muted hover:text-primary transition-colors"
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
