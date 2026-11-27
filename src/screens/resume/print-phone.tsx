'use client';

import { useSyncExternalStore } from "react";
import { RESUME_PHONE_PARTS } from "@/i18n/resume-data";

const subscribe = () => () => {};

/**
 * Telefone da versão de impressão (PDF). Renderizado só no cliente: não
 * aparece no HTML servido da página /curriculo.
 */
export function PrintPhone({ label }: { label: string }) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  if (!mounted) return null;
  const [ddd, a, b] = RESUME_PHONE_PARTS;
  return <> | {label}: {`${ddd} ${a}-${b}`}</>;
}
