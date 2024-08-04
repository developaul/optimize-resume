import { Skeleton } from "@/components/ui/skeleton";
import { CompatibilityAssessment, PartialObject } from "@/server/types";
import { FC } from "react";

interface RecomendationsProps {
  recommendations: PartialObject<CompatibilityAssessment["recommendations"]>;
  isLoading?: boolean;
}

export const Recomendations: FC<RecomendationsProps> = ({
  recommendations,
  isLoading,
}) => {
  return (
    <div className="bg-blueLight rounded-lg p-4">
      <h4 className="h4 mb-2">Recomendaciones:</h4>
      {isLoading ? (
        <Skeleton className="w-[100%] h-5 rounded-full bg-blueMiddle" />
      ) : (
        <ul className="list-disc px-4">
          {recommendations.map((recommendation) => {
            return (
              <li key={`Recommendation-${recommendation?.title}`}>
                <strong>{recommendation?.title}</strong>:{" "}
                {recommendation?.description}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
