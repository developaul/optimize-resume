"use client";

import { UserProfile } from "@/server/types";

import WorkExperiences from "./components/WorkExperiences";
import PersonalInfo from "./components/PersonalInfo";
import Educations from "./components/Educations";
import Languages from "./components/Languages";
import Skills from "./components/Skills";

import { LanguageProvider } from "./providers";

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
  workExperiences: [
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
  educations: [
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
  targetLanguage: "ENGLISH",
} as UserProfile;

const CVPage = () => {
  const {
    personalInfo,
    workExperiences,
    educations,
    skills,
    languages,
    targetLanguage,
  } = profile;

  return (
    <LanguageProvider language={targetLanguage}>
      <main className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <PersonalInfo {...personalInfo} />
        <WorkExperiences workExperiences={workExperiences} />
        <Educations educations={educations} />
        <Skills skills={skills} />
        <Languages languages={languages} />
      </main>
    </LanguageProvider>
  );
};

export default CVPage;