"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Projetos", href: "#projetos" },
  { name: "Sobre", href: "#sobre" },
  { name: "Currículo", href: "#curriculo" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="site-header">
      <a
        href="#inicio"
        className="wordmark"
        aria-label="Sandro Carvalho, início"
      >
        sandro<span>.dev_</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        aria-controls="main-navigation"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </button>
      <nav
        id="main-navigation"
        aria-label="Navegação principal"
        className={isOpen ? "navigation is-open" : "navigation"}
        onKeyDown={(event) => {
          if (event.key === "Escape") setIsOpen(false);
        }}
      >
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
            {item.name}
          </a>
        ))}
        <a
          className="nav-contact"
          href="#contato"
          onClick={() => setIsOpen(false)}
        >
          Vamos conversar <ArrowUpRight size={16} />
        </a>
      </nav>
    </header>
  );
}
