import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Levels, Titles } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFullName = (firstName: string, lastName: string) => {
  return [firstName, lastName].filter(Boolean).join(" ");
};

export const getTitlesByLanguage = (language: string) => {
  return Titles[language];
};

export const getLevelsByLanguage = (language: string) => {
  return Levels[language];
};

export async function fileToBase64(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target === null) return reject(new Error("No target"));
      resolve(event.target.result as string);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}