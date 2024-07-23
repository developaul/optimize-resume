interface SectionProps {
  jobPosition: string;
  copanyName: string;
  dates: string;
  achievements: string[];
}
function Section({
  jobPosition,
  copanyName,
  dates,
  achievements,
}: SectionProps) {
  return (
    <div className="flex flex-col mb-6">
      <h4 className="h4">{jobPosition}</h4>
      <p className="italic">{`${copanyName} | ${dates}`}</p>
      <ul className="list-disc px-4">
        {achievements.map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Suggestions() {
  return (
    <div>
      <h2 className="h2">
        Descripciones para mejorar coincidencia con el puesto
      </h2>
      <Section
        jobPosition="UX Designer Ssr"
        copanyName="Evoltis"
        dates="Febrero 2023 - Actualidad"
        achievements={[
          "Mejoré la experiencia de usuario resolviendo problemas clave y aplicando un sistema de diseño innovador que incrementó la usabilidad en un 30%.",
          "Coordiné con equipos de desarrollo para implementaciones sin problemas, lo que redujo los tiempos de entrega en un 15%. Fui reconocida por mejorar la satisfacción del cliente en un 25%.",
        ]}
      />
      <Section
        jobPosition="UX Researcher"
        copanyName="EDteam"
        dates="Febrero 2021 - Mayo 2022"
        achievements={[
          "Lideré investigaciones cualitativas y cuantitativas que proporcionaron insights estratégicos, mejorando las tasas de conversión en un 25%. ",
          "Mis análisis y experimentos resultaron en un aumento del 30% en la interacción de usuarios y mejoraron las métricas de rendimiento de la plataforma.",
        ]}
      />
    </div>
  );
}
