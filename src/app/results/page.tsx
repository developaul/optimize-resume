"use client";

import { useEffect } from "react";
import { useLocalStorage } from 'usehooks-ts'
import { useRouter } from "next/navigation";
import { experimental_useObject as useObject } from "ai/react";

import compatibilityAssessmentSchema from "@/server/schemas/compatibilityAssessment";
import { Maybe } from "@/server/types";

import { Separator } from "@/components/ui/separator";

import MatchPosition from "./components/MatchPosition";
import AnalysisTable from "./components/AnalysisTable";
import ImportantToKnow from "./components/ImportantToKnow";
import Recomendations from "./components/Recomendations";
import Suggestions from "./components/Suggestions";
import ActionFooter from "./components/ActionFooter";

export default function ResultPage() {
  const router = useRouter();

  const { object: resumeCurriculum, submit } = useObject({
    api: "/api/cv_analyzer",
    schema: compatibilityAssessmentSchema,
  });

  const [apiKey] = useLocalStorage<Maybe<string>>('api_key', null)
  const [jobUrl] = useLocalStorage<Maybe<string>>('jobUrl', null)
  const [base64URI] = useLocalStorage<Maybe<string>>('base64URI', null)

  useEffect(() => {
    const paramsValid = Boolean(apiKey && jobUrl && base64URI)

    if(!paramsValid) {
      router.replace('/')

      return
    }

    submit({
      apiKey, 
      jobUrl, 
      base64URI, 
      keyType: 'geminis' 
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-gray-100 p-4 h-screen overflow-auto">
      <div className="w-full max-w-screen-2xl m-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <section className="flex flex-1 flex-col gap-4">
            <MatchPosition keywords={resumeCurriculum?.keywords ?? []}/>
            <AnalysisTable skills={resumeCurriculum?.skills ?? []}/>
            <ImportantToKnow notes={resumeCurriculum?.notes ?? []}/>
          </section>
          <Separator orientation="vertical" className="h-100" />
          <section className="flex flex-1 flex-col gap-4">
            <Recomendations recommendations={resumeCurriculum?.recommendations ?? []}/>
            <Suggestions 
							workExperiences={resumeCurriculum?.workExperiences ?? []} 
							educations={resumeCurriculum?.educations ?? []}
							suggestionStudy={resumeCurriculum?.suggestionStudy ?? []}
							/>
          </section>
        </div>
        <ActionFooter />
      </div>
    </div>
  );
}
