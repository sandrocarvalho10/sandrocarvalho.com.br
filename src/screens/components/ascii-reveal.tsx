'use client';

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";

/**
 * Retrato em ASCII desenhado em <canvas>. Ao passar o mouse (ou tocar, no
 * celular) os caracteres se dissolvem em "poeira" e revelam o conteúdo de
 * fundo (`children`). Ao sair, o retrato se recompõe.
 *
 * Por que canvas e não um <span> por caractere (como no HTML original)?
 * São ~5.300 glifos: no DOM seriam 5.300 elementos com transição. No canvas
 * é um único elemento, e só há frames durante a transição; parado, custa zero.
 *
 * Formato de `src` (JSON): { cols: number, rows: string[], colors: string[] }
 * — `colors[y]` tem 6 hex por coluna (cor de cada caractere da linha y).
 */

interface AsciiData {
  cols: number;
  rows: string[];
  colors: string[];
}

interface Glyph {
  x: number; // coluna
  y: number; // linha
  ch: string;
  color: string;
  delay: number; // 0..MAX_DELAY
  vx: number; // deslocamento final, em células
  vy: number;
  dust: number; // índice inicial na rampa de densidade
}

interface AsciiRevealProps {
  src?: string;
  /** Rótulo acessível do card */
  label: string;
  /** Conteúdo revelado por trás do retrato */
  children?: React.ReactNode;
  className?: string;
}

const DURATION_OUT = 1100; // ms para dissolver
const DURATION_IN = 900; // ms para recompor
const MAX_DELAY = 0.5; // fração da animação usada como atraso escalonado
const RAMP = "@%#*+=-:. "; // denso -> vazio: o glifo "vira poeira"
const FONT_FAMILY = '"Courier New", Consolas, monospace';
const TOP_CROP = 9; // linhas vazias no topo da arte, ignoradas no enquadramento
const FOCUS_X = 0.6; // centro do rosto (fração da largura da arte)
// Proporção do retrato (largura : altura). 1 = como está no JSON (a arte
// atual já é a versão mais magra); 1.3 = "1:1.3", largura em ~77%.
const ASPECT = 1;
const SLIM = 1 / ASPECT;
const TOP_MARGIN = 0.02; // folga acima da cabeça (fração da altura)
const GAMMA = 0.8; // < 1 clareia os tons escuros sem estourar os claros
const GAIN = 1.15; // brilho geral, para casar com as cores dos ícones

/** Clareia "#rrggbb": curva gamma + ganho, por canal (preserva o matiz). */
function brighten(hex: string) {
  let out = "#";
  for (let i = 0; i < 6; i += 2) {
    const c = parseInt(hex.substr(i, 2), 16) / 255;
    const v = Math.min(255, Math.round(Math.pow(c, GAMMA) * GAIN * 255));
    out += v.toString(16).padStart(2, "0");
  }
  return out;
}

export function AsciiReveal({
  src = "/ascii/retrato.json",
  label,
  children,
  className,
}: AsciiRevealProps) {
  // Começa o download do JSON junto com o HTML, sem esperar a hidratação
  preload(src, { as: "fetch", crossOrigin: "anonymous" });

  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [ready, setReady] = useState(false);

  // Estado de animação fora do React (muda a cada frame)
  const anim = useRef({ progress: 0, target: 0, raf: 0, last: 0 });
  const draw = useRef<() => void>(() => {});

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let glyphs: Glyph[] = [];
    let data: AsciiData | null = null;
    let cancelled = false;
    // Geometria atual (em px CSS)
    let fs = 0, cw = 0, ox = 0, oy = 0;

    const layout = () => {
      if (!data) return;
      // clientWidth/Height ignoram transforms (tilt, float, entrada)
      const width = box.clientWidth;
      const height = box.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // Escala horizontal SLIM: os glifos ficam mais estreitos; as posições x
      // são calculadas em px de tela e divididas por SLIM ao desenhar.
      ctx.setTransform(dpr * SLIM, 0, 0, dpr, 0, 0);

      // Proporção real do caractere na fonte monoespaçada
      ctx.font = `700 100px ${FONT_FAMILY}`;
      const ratio = ctx.measureText("M").width / 100;
      const rows = data.rows.length;
      // "cover" pela altura: o retrato preenche o card (num card estreito, caber
      // na largura deixaria cada caractere com ~2px e o rosto ilegível).
      // Centraliza no rosto e corta as laterais, sem deixar faixa vazia.
      fs = Math.max(
        (height * (1 - TOP_MARGIN)) / (rows - TOP_CROP),
        width / (data.cols * ratio * SLIM)
      );
      cw = fs * ratio * SLIM;
      const artW = data.cols * cw;
      ox = Math.min(0, Math.max(width - artW, width / 2 - artW * FOCUS_X));
      oy = height - rows * fs;
      ctx.font = `700 ${fs}px ${FONT_FAMILY}`;
      ctx.textBaseline = "top";
      render();
    };

    const render = () => {
      ctx.clearRect(0, 0, box.clientWidth / SLIM, box.clientHeight);
      const p = anim.current.progress;
      const span = 1 - MAX_DELAY;
      // Distância máxima da "poeira", em px
      const reach = cw * 18;

      for (let i = 0; i < glyphs.length; i++) {
        const g = glyphs[i];
        const t = p <= g.delay ? 0 : Math.min(1, (p - g.delay) / span);

        if (t === 0) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = g.color;
          ctx.fillText(g.ch, (ox + g.x * cw) / SLIM, oy + g.y * fs);
          continue;
        }
        if (t >= 1) continue;

        const alpha = 1 - Math.pow(t, 1.4);
        const ease = t * t; // acelera ao se afastar, como areia levada pelo vento
        const ch = RAMP[Math.min(RAMP.length - 1, g.dust + Math.floor(t * (RAMP.length - g.dust)))];
        ctx.globalAlpha = alpha;
        ctx.fillStyle = g.color;
        ctx.fillText(ch, (ox + g.x * cw + g.vx * ease * reach) / SLIM, oy + g.y * fs + g.vy * ease * reach);
      }
      ctx.globalAlpha = 1;
    };
    draw.current = render;

    const build = (d: AsciiData) => {
      const rows = d.rows.length;
      const out: Glyph[] = [];
      for (let y = 0; y < rows; y++) {
        const line = d.rows[y];
        for (let x = 0; x < d.cols; x++) {
          const ch = line[x];
          if (!ch || ch === " ") continue;
          const r = Math.random();
          // Dissolve em diagonal (de cima/esquerda para baixo/direita) com ruído
          const sweep = (x / d.cols) * 0.45 + (y / rows) * 0.55;
          const idx = RAMP.indexOf(ch);
          out.push({
            x,
            y,
            ch,
            color: brighten(d.colors[y].substr(x * 6, 6)),
            delay: Math.min(MAX_DELAY, (sweep * 0.7 + r * 0.3) * MAX_DELAY),
            vx: 0.35 + Math.random() * 0.9,
            vy: -(0.5 + Math.random() * 1.1),
            dust: idx >= 0 ? idx : 3,
          });
        }
      }
      return out;
    };

    fetch(src)
      .then((r) => r.json() as Promise<AsciiData>)
      .then((d) => {
        if (cancelled) return;
        data = d;
        glyphs = build(d);
        layout();
        setReady(true);
      })
      .catch(() => {
        /* sem retrato: o card mostra só o fundo */
      });

    const ro = new ResizeObserver(() => layout());
    ro.observe(box);

    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [src]);

  // Anima `progress` em direção a `target`; para sozinho ao chegar.
  // Cada mudança de hover reinicia o loop a partir do progresso atual, então
  // entrar/sair no meio da transição inverte suavemente, sem pular.
  useEffect(() => {
    const a = anim.current;
    a.target = revealed ? 1 : 0;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      a.progress = a.target;
      draw.current();
      return;
    }

    const stop = () => {
      cancelAnimationFrame(a.raf);
      a.raf = 0;
      a.last = 0;
    };

    const step = (now: number) => {
      const dt = a.last ? now - a.last : 16;
      a.last = now;
      const dur = a.target > a.progress ? DURATION_OUT : DURATION_IN;
      const delta = dt / dur;
      a.progress = a.target > a.progress
        ? Math.min(a.target, a.progress + delta)
        : Math.max(a.target, a.progress - delta);
      draw.current();
      if (a.progress !== a.target) {
        a.raf = requestAnimationFrame(step);
      } else {
        a.raf = 0;
        a.last = 0;
      }
    };

    // Antes só agendava se `a.raf` fosse 0. No StrictMode (dev) o cleanup
    // cancelava o frame sem zerar o id, e nenhum hover animava mais.
    stop();
    a.raf = requestAnimationFrame(step);
    return stop;
  }, [revealed]);

  return (
    <div
      role="img"
      aria-label={label}
      tabIndex={0}
      data-revealed={revealed}
      className={`group/reveal outline-none ${className ?? ""}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && setRevealed(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setRevealed(false)}
      onPointerUp={(e) => e.pointerType !== "mouse" && setRevealed((v) => !v)}
      onFocus={() => setRevealed(true)}
      onBlur={() => setRevealed(false)}
    >
      {/* Fundo revelado */}
      <div className="absolute inset-0">{children}</div>

      {/* Retrato: passa da base do card para o float não deixar faixa vazia */}
      <div ref={boxRef} className="absolute inset-x-0 top-0 -bottom-8 animate-float motion-reduce:animate-none">
        <canvas
          ref={canvasRef}
          aria-hidden
          className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </div>
  );
}
