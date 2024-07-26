import { Skeleton } from "@/components/ui/skeleton";

interface RecomendationsProps {
  isLoading?: boolean;
}

export default function Recomendations({
  isLoading = false,
}: RecomendationsProps) {
  return (
    <div className="bg-blueLight rounded-lg p-4">
      <h4 className="h4 mb-2">Recomendaciones:</h4>
      {isLoading ? (
        <Skeleton className="w-[100%] h-5 rounded-full bg-blueMiddle" />
      ) : (
        <ul className="list-disc px-4">
          <li>
            Es importante incluir una sección de educación para mostrar tus
            logros académicos.
          </li>
          <li>
            Es posible que estés usando una plantilla de currículum incompatible
            con los sistemas ATS o que la hayas etiquetado con un nombre poco
            convencional.
          </li>
        </ul>
      )}
    </div>
  );
}
