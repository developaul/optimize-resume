import { FC } from "react";
import { Button } from "@/components/ui/button";

interface ActionFooterProps {
  onReset?: () => void;
  onDownload?: () => void;
  isLoading?: boolean;
}

export const ActionFooter: FC<ActionFooterProps> = ({
  onReset,
  onDownload,
  isLoading,
}) => {
  return (
    <div className="bg-white shadow-md rounded-xl flex flex-col items-center p-4">
      <h2 className="h2">Obtén tu cv mejorado</h2>
      <Button
        disabled={isLoading}
        className="bg-blue hover:bg-purple-500"
        onClick={onDownload}
      >
        Descargar .pdf
      </Button>
      <p className="p">*Te recomendamos revisarlo antes de enviarlo</p>
      <Button
        className="bg-white hover:bg-gray-100 text-black shadow-[0_2px_4px_rgba(30,41,59,0.25)]
"
        onClick={onReset}
      >
        Haz una nueva consulta
      </Button>
    </div>
  );
};
