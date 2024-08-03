"use client";

import { FC, PropsWithChildren, useMemo } from "react";

import { LanguageContext } from "./context";
import { getLevelsByLanguage, getTitlesByLanguage } from "@/lib/utils";

interface LanguageProviderProps extends PropsWithChildren {
  language: string;
}

export const LanguageProvider: FC<LanguageProviderProps> = ({
  children,
  language,
}) => {
  const titles = useMemo(() => getTitlesByLanguage(language), [language]);

  const levels = useMemo(() => getLevelsByLanguage(language), [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        titles,
        levels,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
