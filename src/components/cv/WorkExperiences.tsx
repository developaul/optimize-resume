import { FC, useContext } from "react";

import { IWorkExperience, IWorkExperiences } from "@/server/types";
import { LanguageContext } from "./providers";

interface WorkExperiencesProps {
  workExperiences: IWorkExperiences;
}

const WorkExperiences: FC<WorkExperiencesProps> = ({ workExperiences }) => {
  const { titles } = useContext(LanguageContext);
  const { workExperienceTitle } = titles;

  return (
    <section className="mt-4">
      <h2 className="text-2xl font-bold">{workExperienceTitle}</h2>

      <hr className="my-2 h-0.5 bg-black" />

      {workExperiences.map((workExperience, index) => (
        <WorkExperience key={index} workExperience={workExperience} />
      ))}
    </section>
  );
};

const WorkExperience: FC<{ workExperience: IWorkExperience }> = ({
  workExperience,
}) => {
  const { company, position, startDate, endDate, location, responsibilities } =
    workExperience;

  return (
    <article className="mt-2" key={`${company}-${position}-${startDate}`}>
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">{company}</h3>
          <p>{position}</p>
        </div>

        <div>
          <p className="text-sm font-semibold">{location}</p>
          <p>
            {startDate} - {endDate}
          </p>
        </div>
      </header>

      <ul className="list-disc ml-8 mt-2">
        {responsibilities.map((responsibility, index) => (
          <li key={index}>{responsibility}</li>
        ))}
      </ul>
    </article>
  );
};

export default WorkExperiences;
