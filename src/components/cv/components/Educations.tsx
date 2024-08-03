import { FC, useContext } from "react";

import { IEducation, IEducations } from "@/server/types";
import { LanguageContext } from "../providers";

interface EducationsProps {
  educations: IEducations;
}

const Educations: FC<EducationsProps> = ({ educations }) => {
  const { titles } = useContext(LanguageContext);
  const { educationTitle } = titles;

  return (
    <section className="mt-4">
      <h2 className="text-2xl font-bold">{educationTitle}</h2>

      <hr className="my-2 h-0.5 bg-black" />

      {educations.map((education, index) => (
        <Education key={index} education={education} />
      ))}
    </section>
  );
};

const Education: FC<{ education: IEducation }> = ({ education }) => {
  const { institution, degree, location, startDate, endDate } = education;
  return (
    <article
      className="mt-2 flex items-center justify-between"
      key={`${institution}-${degree}-${startDate}`}
    >
      <div>
        <h3 className="text-xl font-semibold">{institution}</h3>
        <p>{degree}</p>
      </div>

      <div>
        <p className="text-sm font-semibold">{location}</p>
        <p>
          {startDate} - {endDate}
        </p>
      </div>
    </article>
  );
};

export default Educations;
