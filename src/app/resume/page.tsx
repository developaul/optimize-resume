"use client";

import compatibilityAssessmentSchema from "@/server/schemas/compatibilityAssessment";
import { experimental_useObject as useObject } from "ai/react";

async function fileToBase64(file: File) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target === null) return reject(new Error("No target"));
      resolve(event.target.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

const Page = () => {
  const { object: analyzerResult, submit } = useObject({
    api: "/api/cv-analyzer",
    schema: compatibilityAssessmentSchema,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const file = formData.get("file") as File;
    const apiKey = formData.get("apiKey") as string;
    const jobUrl = formData.get("jobUrl") as string;

    const base64URI = await fileToBase64(file);

    submit({ apiKey, jobUrl, base64URI, keyType: "geminis" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>This page is just for testing useObject</h1>

        <input type="text" name="apiKey" />

        <input type="file" name="file" accept="application/pdf" />

        <input type="text" name="jobUrl" />

        <button type="submit">Generate</button>
      </form>
      <div>
        <h1>Match de habilidades</h1>
        {analyzerResult?.skills?.map((skill) => {
          return (
            <div key={skill?.name}>
              <div>Nombre: {skill?.name}</div>
              <div>En el Cv: {skill?.inCv}</div>
              <div>Tipo de habilidad: {skill?.type}</div>
            </div>
          );
        })}
        <h1>Recomendaciones</h1>
        {analyzerResult?.recommendations?.map((recommendation) => {
          return (
            <div key={recommendation?.title}>
              <h2>{recommendation?.title}</h2>
              <p>{recommendation?.description}</p>
            </div>
          );
        })}
        <h1>Notas</h1>
        {analyzerResult?.notes?.map((note) => {
          return (
            <div key={note?.description}>
              <div>{note?.type}</div>
              <div>{note?.description}</div>
            </div>
          );
        })}
        <h1>palabras clave</h1>
        {((analyzerResult?.keywords?.filter((keyword) => keyword?.inCv)
          ?.length ?? 0) /
          (analyzerResult?.keywords?.length ?? 1)) *
          100}
        %<h1>Estudios Respaldados</h1>
        {analyzerResult?.educations?.map((education) => {
          return (
            <div key={education?.institution}>
              <div>{education?.institution}</div>
              <div>{education?.description}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Page;
