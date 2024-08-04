import { Skeleton } from "@/components/ui/skeleton";
import { CompatibilityAssessment, PartialObject } from "@/server/types";
import { FC } from "react";

function TabItem({ label }: { label: string }) {
  return (
    <div className="p-2 rounded-md bg-white">
      <p className="p">{label}</p>
    </div>
  );
}

interface ImportantToKnowProps {
  notes: PartialObject<CompatibilityAssessment["notes"]>;
  isLoading?: boolean;
}

export const ImportantToKnow: FC<ImportantToKnowProps> = ({
  notes = [],
  isLoading,
}) => {
  if (!notes.length) return null;

  return (
    <div className="bg-orangeLight rounded-lg p-4">
      <h4 className="h4 mb-2">Detalles:</h4>
      <div className="flex flex-wrap gap-2 ">
        {isLoading ? (
          <Skeleton className="w-[100%] h-5 rounded-full bg-orange-100" />
        ) : (
          notes.map((note) => {
            return (
              <TabItem
                label={note!.type!}
                key={`Note-${note?.type}-${note?.description}`}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ImportantToKnow;
