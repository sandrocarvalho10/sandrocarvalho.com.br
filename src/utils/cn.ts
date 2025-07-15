// utils/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Junta clsx com tailwind-merge para resolver conflitos (ex: 'p-2' vs 'p-4')
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
