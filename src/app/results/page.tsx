"use client";

import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { experimental_useObject as useObject } from "ai/react";

import compatibilityAssessmentSchema from "@/server/schemas/compatibilityAssessment";
import { Maybe } from "@/server/types";

import { Separator } from "@/components/ui/separator";

import AnalysisTable from "./components/AnalysisTable";
import ImportantToKnow from "./components/ImportantToKnow";
import Recomendations from "./components/Recomendations";
import Suggestions from "./components/Suggestions";
import ActionFooter from "./components/ActionFooter";
import MatchChart from "./components/MatchChart";
import Layout from "@/components/Layout";
import CV from "@/components/cv";
import useGetProfile from "./hooks/useGetProfile";
import { LoadingIcon } from "@/components/icons";

export default function ResultPage() {
  const router = useRouter();
  const { userProfile, isProfileLoading, getProfile } = useGetProfile();

  const {
    isLoading: isFetching,
    object: resumeCurriculum,
    submit,
    stop,
  } = useObject({
    api: "/api/cv-analyzer",
    schema: compatibilityAssessmentSchema,
  });

  const [apiKey, , removeApiKey] = useLocalStorage<Maybe<string>>(
    "api_key",
    null
  );
  const [jobUrl, , removeJobUrl] = useLocalStorage<Maybe<string>>(
    "jobUrl",
    null
  );
  const [base64URI, , removeBase64URI] = useLocalStorage<Maybe<string>>(
    "base64URI",
    null
  );

  const _handleReset = () => {
    removeJobUrl();
    removeBase64URI();
    removeApiKey();

    router.push("/");
  };

  const onDowloadCVhandler = () => {
    getProfile({ apiKey, keyType: "open-ai" });
  };

  const onGoBack = () => {
    if (isFetching) {
      stop();
    }

    router.replace("/");
  };

  useEffect(() => {
    const paramsValid = Boolean(apiKey && jobUrl && base64URI);

    if (!paramsValid) {
      router.replace("/");

      return;
    }
    return () => {
      submit({
        apiKey,
        jobUrl,
        base64URI,
        keyType: "open-ai",
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = !resumeCurriculum;

  return (
    <>
      {isLoading && (
        <div className="fixed w-full h-full items-center pt-20 flex flex-col z-10">
          <h2 className="h2 mb-8">Obteniendo resultados</h2>
          <LoadingIcon className="flex items-center mr-2 h-8 w-8 animate-spin" />
        </div>
      )}
      <Layout
        title="Resultados"
        goBack={onGoBack}
        bodyClassName={`${isLoading && "blur"}`}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <section className="flex flex-1 flex-col gap-4">
            <MatchChart
              keywords={resumeCurriculum?.keywords ?? []}
              isLoading={isLoading}
            />
            <AnalysisTable
              skills={resumeCurriculum?.skills ?? []}
              isLoading={isLoading}
            />
            <ImportantToKnow
              notes={resumeCurriculum?.notes ?? []}
              isLoading={isLoading}
            />
          </section>
          <Separator orientation="vertical" className="h-100" />
          <section className="flex flex-1 flex-col gap-4">
            <Recomendations
              recommendations={resumeCurriculum?.recommendations ?? []}
              isLoading={isLoading}
            />
            <Suggestions
              workExperiences={resumeCurriculum?.workExperiences ?? []}
              educations={resumeCurriculum?.educations ?? []}
              suggestionStudy={resumeCurriculum?.suggestionStudy ?? []}
              isLoading={isLoading}
            />
          </section>
        </div>
        <ActionFooter
          onReset={_handleReset}
          isLoading={isProfileLoading}
          onDownload={onDowloadCVhandler}
        />

        {/* cv must be rendered first, then it'll be converted into a pdf file
       /* but because of the logic we don't want to show the raw component so it's yeeted away
       */}
        {!isProfileLoading && userProfile && (
          <div className="fixed translate-x-[-100%]">
            <CV profile={userProfile} />
          </div>
        )}
      </Layout>
    </>
  );
}
