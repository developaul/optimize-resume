import React, { FC } from "react";
import {
  IEducation,
  ILanguages,
  IPersonalInfo,
  ISkills,
  IWorkExperience,
  UserProfile,
} from "@/server/types";

const profile: UserProfile = {
  personalInfo: {
    firstName: "Juan",
    lastName: "Perez",
    email: "juanperez@gmail.com",
    phone: "123456789",
    address: "Calle 123, 123 123 123",
    linkedin: "https://www.linkedin.com/in/juanperez",
    description: `Más de 15 años de experiencia como Desarrollador de Software. Lideré el desarrollo FrontEnd en Adevinta, logrando un 40% de mejora en la entrega de productos, un 25% en rendimiento web y una plataforma unificada. Como Divulgador, tengo el canal de programación más visto de Twitch en español.`,
  },
  workExperience: [
    {
      company: "Google",
      position: "Software Engineer",
      startDate: "2021",
      endDate: "2023",
      location: "Madrid",
      currentlyWorking: true,
      responsibilities: ["Developing software", "Maintaining software"],
    },
    {
      company: "Microsoft",
      position: "Software Engineer",
      startDate: "2020",
      endDate: "2021",
      location: "Madrid",
      currentlyWorking: false,
      responsibilities: ["Developing software", "Maintaining software"],
    },
  ],
  education: [
    {
      institution: "Universidad de Madrid",
      degree: "Master's degree",
      location: "Madrid",
      startDate: "2018",
      endDate: "2021",
      fieldOfStudy: "Computer Science",
    },
    {
      institution: "Universidad de Madrid",
      degree: "Bachelor's degree",
      location: "Madrid",
      startDate: "2016",
      endDate: "2018",
      fieldOfStudy: "Computer Science",
    },
  ],
  skills: [
    {
      name: "JavaScript",
      level: "BEGINNER",
    },
    {
      name: "React",
      level: "BEGINNER",
    },
    {
      name: "Node.js",
      level: "BEGINNER",
    },
    {
      name: "TypeScript",
      level: "INTERMEDIATE",
    },
  ],
  languages: [
    {
      name: "Spanish",
      level: "NATIVE",
    },
    {
      name: "English",
      level: "BEGINNER",
    },
  ],
} as UserProfile;

/** TODO: Move each component to its own file and create generic components to reuse them in each component */
const CVPage = () => {
  const { personalInfo, workExperience, education, skills, languages } =
    profile;

  return (
    <main className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <PersonalInfo {...personalInfo} />
      <WorkExperience workExperience={workExperience} />
      <Education education={education} />
      <Skills skills={skills} />
      <Languages languages={languages} />
    </main>
  );
};

export default CVPage;

const PersonalInfo: FC<IPersonalInfo> = ({
  firstName,
  lastName,
  email,
  phone,
  address,
  linkedin,
  description,
}) => {
  return (
    <section>
      <h1 className="text-3xl font-bold text-center">
        {firstName} {lastName}
      </h1>
      <p className="text-center">
        {address} · {linkedin} · {phone} · {email}
      </p>

      <hr className="my-2 h-0.5 bg-black" />

      <p>{description}</p>
    </section>
  );
};

const WorkExperience: FC<{ workExperience: IWorkExperience }> = ({
  workExperience,
}) => {
  return (
    <section className="mt-4">
      <h2 className="text-2xl font-bold">Experiencia Profesional</h2>

      <hr className="my-2 h-0.5 bg-black" />

      {workExperience.map(
        ({
          company,
          position,
          startDate,
          endDate,
          location,
          responsibilities,
        }) => (
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
        )
      )}
    </section>
  );
};

const Education: FC<{ education: IEducation }> = ({ education }) => {
  return (
    <section className="mt-4">
      <h2 className="text-2xl font-bold">Educacion</h2>

      <hr className="my-2 h-0.5 bg-black" />

      {education.map(
        ({ degree, institution, location, startDate, endDate }) => (
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
        )
      )}
    </section>
  );
};

export const Skills: FC<{ skills: ISkills }> = ({ skills }) => {
  return (
    <section className="mt-4">
      <h2 className="text-2xl font-bold">Habilidades</h2>

      <hr className="my-2 h-0.5 bg-black" />

      <ul className="list-disc ml-8 mt-2">
        {skills.map(({ level, name }, index) => (
          <li key={index}>
            <p>
              <span>{name}</span> - <span>{level}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const Languages: FC<{ languages: ILanguages }> = ({ languages }) => {
  return (
    <section className="mt-4">
      <h2 className="text-2xl font-bold">Idiomas</h2>

      <hr className="my-2 h-0.5 bg-black" />

      <ul className="list-disc ml-8 mt-2">
        {languages.map(({ level, name }) => (
          <li key={`${name}-${level}`}>
            <p>
              <span>{name}</span> - <span>{level}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
