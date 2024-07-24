import { CompatibilityAssessment } from "@/server/types";
import { FC } from "react";

interface RecomendationsProps {
  recommendations: CompatibilityAssessment['recommendations']
}

const Recomendations: FC<RecomendationsProps> = ({ recommendations }) => {
  return (
    <div className="bg-blueLight rounded-lg p-4">
      <h4 className="h4 mb-2">Recomendaciones:</h4>
      <ul className="list-disc px-4">
        {recommendations.map((recommendation) => {
          return (
            <li key={`Recommendation-${recommendation.title}`}>
              <strong>{recommendation.title}</strong>: {recommendation.description}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default Recomendations