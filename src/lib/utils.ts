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
