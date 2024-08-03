"use client";

import { createContext } from "react";

interface LanguageContextProps {
  language: string;
  titles: Record<string, string>;
  levels: Record<string, string>;
}

export const LanguageContext = createContext<LanguageContextProps>(
  {} as LanguageContextProps
);
