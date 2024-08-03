import { FC, useContext } from "react";

import { ILanguage, ILanguages } from "@/server/types";
import { LanguageContext } from "./providers";

interface LanguagesProps {
  languages: ILanguages;
}

export const Languages: FC<LanguagesProps> = ({ languages }) => {
  const { titles } = useContext(LanguageContext);
  const { languageTitle } = titles;

  return (
    <section className="mt-4">
      <h2 className="text-2xl font-bold">{languageTitle}</h2>

      <hr className="my-2 h-0.5 bg-black" />

      <ul className="list-disc ml-8 mt-2">
        {languages.map(({ level, name }) => (
          <Language key={`${name}-${level}`} language={{ name, level }} />
        ))}
      </ul>
    </section>
  );
};

const Language: FC<{ language: ILanguage }> = ({ language }) => {
  const { name, level } = language;

  const { levels } = useContext(LanguageContext);

  const translatedLevel = levels[level];

  return (
    <li>
      <p>
        <span>{name}</span> - <span>{translatedLevel}</span>
      </p>
    </li>
  );
};

export default Languages;
