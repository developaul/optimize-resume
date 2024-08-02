"use client";

import { UserProfile } from "@/server/types";

import WorkExperiences from "./components/WorkExperiences";
import PersonalInfo from "./components/PersonalInfo";
import Educations from "./components/Educations";
import Languages from "./components/Languages";
import Skills from "./components/Skills";

import { LanguageProvider } from "./providers";
import { FC } from "react";

interface CVPageProps {
  profile: UserProfile
}

const CVPage: FC<CVPageProps> = ({profile}) => {
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
      <main id="content-id" className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
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
