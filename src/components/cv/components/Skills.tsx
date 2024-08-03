import { FC, useContext } from "react";

import { ISkill, ISkills } from "@/server/types";
import { getTitlesByLanguage } from "@/lib/utils";
import { LanguageContext } from "../providers";

interface SkillsProps {
  skills: ISkills;
}

export const Skills: FC<SkillsProps> = ({ skills }) => {
  const { titles } = useContext(LanguageContext);
  const { skillsTitle } = titles;

  return (
    <section className="mt-4">
      <h2 className="text-2xl font-bold">{skillsTitle}</h2>

      <hr className="my-2 h-0.5 bg-black" />

      <ul className="list-disc ml-8 mt-2">
        {skills.map((skill, index) => (
          <Skill key={index} skill={skill} />
        ))}
      </ul>
    </section>
  );
};

const Skill: FC<{ skill: ISkill }> = ({ skill }) => {
  const { name } = skill;
  return (
    <li>
      <p>
        <span>{name}</span>
      </p>
    </li>
  );
};

export default Skills;
