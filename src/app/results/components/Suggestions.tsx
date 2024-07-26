import { CompatibilityAssessment, PartialObject } from "@/server/types";
import { FC } from "react";

interface SectionProps {
  primary: string;
  secondary: string;
  achievements: string[];
}
function Section({
  primary,
  secondary,
  achievements,
}: SectionProps) {
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

interface SuggestionsProps {
  workExperiences: PartialObject<CompatibilityAssessment['workExperiences']>,
  educations: PartialObject<CompatibilityAssessment['educations']>,
  suggestionStudy: PartialObject<CompatibilityAssessment['suggestionStudy']>,
}

const Suggestions: FC<SuggestionsProps> = ({ workExperiences, educations, suggestionStudy }) => {
  return (
    <div>
      {workExperiences.length > 0 && (
        <>
          <h2 className="h2">
            Descripciones para mejorar coincidencia con el puesto
          </h2>
          {workExperiences.map((workExperience) => {
            return (
              <Section
                key={workExperience?.position}
                primary={workExperience?.position ?? 'Sin Nombre'}
                secondary={`${workExperience?.company} | Febrero 2023 - Actualidad`}
                achievements={[
                  workExperience?.description ?? ''
                ].filter(Boolean)}
              />
            )  
          })}
        </>
      )}

      {educations.length > 0 && (
        <>
          <h2 className="h2">
            Estudios
          </h2>
          {educations.map((education) => {
            return (
              <Section
                key={education?.degree}
                primary={education?.degree ?? 'Sin nombre'}
                secondary={`${education?.institution} | Febrero 2023 - Actualidad`}
                achievements={[
                  education?.description ?? ''
                ].filter(Boolean)}
              />
            )  
          })}
        </>
      )}

      {suggestionStudy.length > 0 && (
        <>
          <h2 className="h2">
            Temas a reforzar
          </h2>
          <ul>
            {suggestionStudy.map((suggestion) => {
              return <li key={suggestion}>{suggestion}</li>
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default Suggestions