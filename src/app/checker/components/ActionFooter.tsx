import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ActionFooterProps {
  isLoading?: boolean;
}

export default function ActionFooter({ isLoading = false }: ActionFooterProps) {
  return (
    <Card className="shadow-md rounded-xl flex flex-col items-center p-4">
      {!isLoading && (
        <>
          <h2 className="h2">Obtén tu cv mejorado</h2>
          <Button className="bg-blue hover:bg-purple-500">
            Descargar .pdf
          </Button>
        </>
      )}
      <p className="p">*Te recomendamos revisarlo antes de enviarlo</p>
      <Button className="bg-white hover:bg-gray-100 text-black">
        Haz una nueva consulta
      </Button>
    </Card>
  );
}
