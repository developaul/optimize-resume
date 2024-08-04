import { Skeleton } from "@/components/ui/skeleton";
import { CompatibilityAssessment, PartialObject } from "@/server/types";
import { FC } from "react";

interface SectionProps {
  primary: string;
  secondary: string;
  achievements: string[];
}
function Section({ primary, secondary, achievements }: SectionProps) {
  return (
    <div className="flex flex-col mb-6">
      <h4 className="h4">{primary}</h4>
      <p className="italic">{secondary}</p>
      <ul className="list-disc px-4">
        {achievements.map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
    </div>
  );
}

const Loader = () => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <Skeleton className="w-[100%] h-5 rounded-full bg-gray-200" />
      <Skeleton className="w-[100%] h-5 rounded-full bg-gray-200" />
      <Skeleton className="w-[80%] h-5 rounded-full bg-gray-200" />
    </div>
  );
};

interface SuggestionsProps {
  workExperiences: PartialObject<CompatibilityAssessment["workExperiences"]>;
  educations: PartialObject<CompatibilityAssessment["educations"]>;
  suggestionStudy: PartialObject<CompatibilityAssessment["suggestionStudy"]>;
  isLoading?: boolean;
}

export const Suggestions: FC<SuggestionsProps> = ({
  workExperiences,
  educations,
  suggestionStudy,
  isLoading,
}) => {
  return (
    <div className="bg-white rounded-lg p-4">
      {isLoading ? (
        <Loader />
      ) : (
        workExperiences.length > 0 && (
          <>
            <h2 className="h2">
              Descripciones para mejorar coincidencia con el puesto
            </h2>
            {workExperiences.map((workExperience) => {
              return (
                <Section
                  key={workExperience?.position}
                  primary={workExperience?.position ?? "Sin Nombre"}
                  secondary={`${workExperience?.company} | Febrero 2023 - Actualidad`}
                  achievements={[workExperience?.description ?? ""].filter(
                    Boolean
                  )}
                />
              );
            })}
          </>
        )
      )}

      {isLoading ? (
        <Loader />
      ) : (
        educations.length > 0 && (
          <>
            <h2 className="h2">Estudios</h2>
            {educations.map((education) => {
              return (
                <Section
                  key={education?.degree}
                  primary={education?.degree ?? "Sin nombre"}
                  secondary={`${education?.institution} | Febrero 2023 - Actualidad`}
                  achievements={[education?.description ?? ""].filter(Boolean)}
                />
              );
            })}
          </>
        )
      )}

      {isLoading ? (
        <Loader />
      ) : (
        suggestionStudy.length > 0 && (
          <>
            <h2 className="h2">Temas a reforzar</h2>
            <ul>
              {suggestionStudy.map((suggestion) => {
                return <li key={suggestion}>{suggestion}</li>;
              })}
            </ul>
          </>
        )
      )}
    </div>
  );
};
