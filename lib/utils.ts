import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function waitfor(time: number) {
  return await new Promise((e) => {
    setTimeout(() => {
      e("");
    }, time || 5000);
  });
}
