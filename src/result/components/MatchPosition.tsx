import { CompatibilityAssessment, PartialObject } from "@/server/types";
import { FC } from "react";

interface MatchPositionProps {
  keywords?: PartialObject<CompatibilityAssessment["keywords"]>;
}

export const MatchPosition: FC<MatchPositionProps> = ({ keywords }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="h2 text-center">Conicidencia con el puesto</h2>
      <h4>
        {((keywords ?? []).filter((keyword) => keyword?.inCv).length /
          (keywords?.length || 1)) *
          100}
        %
      </h4>
      <small className="small">Puede mejorar</small>
    </div>
  );
};
