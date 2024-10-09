import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(duration_ms: number): string {
  const minutes = Math.floor(duration_ms / 6000);
  const seconds = Math.floor((duration_ms % 6000) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
