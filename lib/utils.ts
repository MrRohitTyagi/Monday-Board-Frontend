import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function waitfor(time?: number) {
  return await new Promise((e) => {
    setTimeout(() => {
      e("");
    }, time || 5000);
  });
}

export function grc({
  bp,
  css,
}: {
  bp: "sm" | "md" | "lg" | "xl";
  css: ClassValue;
}) {
  const classes = typeof css === "string" ? css.split(" ") : [];
  const arr = [];

  for (const c of classes) {
    if (c) arr.push(`${bp}:${c.trim()}`);
  }
  console.log(arr.join(" "));

  return twMerge(clsx(arr.join(" ")));
}
