'use client';


import { Menu, X } from 'lucide-react';
import Link from 'next/link';
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
    <header className="w-full mx-auto  bg-background shadow-sm ">
      <div className="mx-auto max-w-5xl px-4 py-10 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl flex items-baseline">
          <span className='font-bold text-2xl'>
            Sandro
          </span>
          <span className='font-extralight opacity-50'>
            , Front-end_
          </span>
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex gap-6 text-2xl">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-muted opacity-40 hover:text-white hover:opacity-70 transition-colors "
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Botão de ação */}
        {/* <div className="hidden md:block">
          <button >
            <a href="#comecar">Começar</a>
          </button>
        </div> */}

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
            <Link
              key={item.name}
              href={item.href}
              className="block text-gray-500 hover:text-shadow-gray-100 hover:opacity-100 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          {/* <button className="w-full" >
            <a href="#comecar">Começar</a>
          </button> */}
        </div>
      )}
    </header>
  );
}
