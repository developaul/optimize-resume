"use client";

import { FC } from "react";

import { UserProfile } from "@/server/types";

import WorkExperiences from "./WorkExperiences";
import PersonalInfo from "./PersonalInfo";
import Educations from "./Educations";
import Languages from "./Languages";
import Skills from "./Skills";

import { LanguageProvider } from "./providers";

interface CVProps {
  profile: UserProfile;
}

const CV: FC<CVProps> = ({ profile }) => {
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
      <main
        id="content-id"
        className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8"
      >
        <PersonalInfo {...personalInfo} />
        <WorkExperiences workExperiences={workExperiences} />
        <Educations educations={educations} />
        <Skills skills={skills} />
        <Languages languages={languages} />
      </main>
    </LanguageProvider>
  );
};

export default CV;
