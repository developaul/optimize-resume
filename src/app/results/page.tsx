"use client";
import MatchPosition from "./components/MatchPosition";
import AnalysisTable from "./components/AnalysisTable";
import ImportantToKnow from "./components/ImportantToKnow";
import Recomendations from "./components/Recomendations";
import Suggestions from "./components/Suggestions";
import ActionFooter from "./components/ActionFooter";
import { Separator } from "@/components/ui/separator";
import { CompatibilityAssessment } from "@/server/types";

const resumeCurriculum: CompatibilityAssessment = {
  "workExperiences": [
    {
      "description": "La experiencia como Asesor de Telemarketing en Belcorp es relevante porque te permitió desarrollar habilidades de comunicación, atención al cliente y ventas por teléfono, aspectos clave para la posición de Asesor de Televentas en Pacífico Seguros.",
      "startDate": "2021-05-01",
      "endDate": "2021-10-01",
      "responsibilities": [],
      "company": "Belcorp, Lima",
      "currentlyWorking": false,
      "position": "Asesora de Telemarketing"
    },
    {
      "company": "Camara de Comercio Empresarial, Lince",
      "currentlyWorking": false,
      "responsibilities": [],
      "endDate": "2022-02-01",
      "startDate": "2021-11-01",
      "position": "Asesora de Ventas",
      "description": "Tu experiencia como Asesor de Ventas en la Cámara de Comercio Empresarial te brindó la oportunidad de interactuar con clientes, identificar sus necesidades y ofrecerles productos o servicios, habilidades transferibles al puesto de Asesor de Televentas."
    },
    {
      "currentlyWorking": false,
      "company": "Contacto BPO, Breña",
      "description": "El rol de Teleoperadora de Ventas en Contacto BPO es particularmente relevante ya que te familiarizó con el manejo de llamadas, la gestión de objeciones y el cierre de ventas por teléfono, habilidades cruciales para un Asesor de Televentas de seguros.",
      "responsibilities": [],
      "endDate": "2022-10-01",
      "position": "Teleoperadora de Ventas",
      "startDate": "2022-08-01"
    },
    {
      "currentlyWorking": false,
      "endDate": "2023-09-01",
      "responsibilities": [],
      "startDate": "2023-07-01",
      "description": "Si bien no está directamente relacionado con los seguros, tu experiencia como Asesora Comercial en Manzana Verde te permitió desarrollar habilidades de venta, atención al cliente y posiblemente negociación, aspectos valiosos para la posición en Pacífico Seguros.",
      "company": "Manzana Verde, Barranco",
      "position": "Asesora Comercial"
    },
    {
      "startDate": "2023-10-06",
      "endDate": "2024-08-04",
      "responsibilities": [],
      "company": "Allmark BPO, San Isidro",
      "description": "Tu experiencia como Asesora Comercial en Allmark BPO es relevante porque te permitió desarrollar habilidades de comunicación, atención al cliente y ventas, aspectos clave para la posición de Asesor de Televentas en Pacífico Seguros.",
      "currentlyWorking": false,
      "position": "Asesora Comercial"
    }
  ],
  "educations": [
    {
      "description": "Si bien no se menciona directamente en la oferta, tener conocimientos en Administración y Marketing puede ser valioso para un Asesor de Televentas en el rubro de seguros. Podrías complementar tu formación con cursos o certificaciones en seguros para alinear aún más tu perfil a la posición.",
      "endDate": "2025-07-26",
      "startDate": "2021-03-25",
      "institution": "Universidad Privada del Norte, Tingo Maria, Lima",
      "degree": "Administración y Marketing"
    }
  ],
  "recommendations": [
    {
      "title": "Habilidades",
      "description": "Incluir en la sección de habilidades \\\"Microsoft Excel\\\"  y especificar el nivel que se posee."
    },
    {
      "title": "Formato",
      "description": "Agregar una sección de \\\"Software\\\" o \\\"Herramientas digitales\\\" para destacar el manejo de herramientas como Microsoft Excel."
    },
    {
      "title": "Experiencia Laboral",
      "description": "Mencionar experiencia en la gestión de relaciones con clientes, incluyendo ejemplos concretos de cómo se ha utilizado en roles anteriores."
    },
    {
      "description": "Considerar la posibilidad de realizar cursos o certificaciones en seguros para fortalecer el perfil y hacerlo más atractivo para empresas del sector.",
      "title": "Formación"
    }
  ],
  "notes": [],
  "skills": [
    {
      "inCv": true,
      "type": "COMMUNICATION_SKILLS",
      "name": "Técnica de ventas",
      "isRequiredInPublication": true,
      "types": [
        {
          "type": "COMMUNICATION_SKILLS",
          "weight": 0.8
        },
        {
          "type": "CUSTOMER_SERVICE_SKILLS",
          "weight": 0.6
        }
      ]
    },
    {
      "types": [
        {
          "type": "COMMUNICATION_SKILLS",
          "weight": 0.8
        },
        {
          "type": "CUSTOMER_SERVICE_SKILLS",
          "weight": 0.6
        }
      ],
      "isRequiredInPublication": true,
      "name": "Negociación",
      "inCv": true,
      "type": "COMMUNICATION_SKILLS"
    },
    {
      "isRequiredInPublication": true,
      "name": "Atención al cliente",
      "types": [
        {
          "type": "CUSTOMER_SERVICE_SKILLS",
          "weight": 1
        }
      ],
      "inCv": true,
      "type": "CUSTOMER_SERVICE_SKILLS"
    },
    {
      "inCv": true,
      "type": "COMMUNICATION_SKILLS",
      "types": [
        {
          "type": "COMMUNICATION_SKILLS",
          "weight": 0.8
        },
        {
          "type": "CUSTOMER_SERVICE_SKILLS",
          "weight": 0.6
        }
      ],
      "name": "Ventas",
      "isRequiredInPublication": true
    },
    {
      "type": "TECHNICAL_SKILLS",
      "name": "Microsoft Excel",
      "inCv": false,
      "isRequiredInPublication": true,
      "types": [
        {
          "weight": 1,
          "type": "TECHNICAL_SKILLS"
        }
      ]
    },
    {
      "types": [
        {
          "weight": 1,
          "type": "CUSTOMER_SERVICE_SKILLS"
        }
      ],
      "type": "CUSTOMER_SERVICE_SKILLS",
      "inCv": false,
      "isRequiredInPublication": true,
      "name": "Gestión de relaciones con clientes"
    }
  ],
  "keywords": [
    {
      "inPublication": true,
      "value": "Técnica de ventas",
      "inCv": true
    },
    {
      "inCv": true,
      "value": "Negociación",
      "inPublication": true
    },
    {
      "inPublication": true,
      "value": "Atención al cliente",
      "inCv": true
    },
    {
      "inPublication": true,
      "inCv": true,
      "value": "Ventas"
    },
    {
      "inCv": false,
      "value": "Microsoft Excel",
      "inPublication": true
    },
    {
      "inCv": false,
      "value": "Gestión de relaciones con clientes",
      "inPublication": true
    }
  ],
  "suggestionStudy": [
    "Microsoft Excel",
    "Gestión de relaciones con clientes",
    "Seguros"
  ],
  "logs": [
    "No se encontraron habilidades relacionadas a Microsoft Excel o gestión de clientes en el CV, se recomienda agregarlas si se posee experiencia.",
    "No se encontraron notas relevantes para agregar.",
    "Se sugiere agregar cursos o certificaciones en seguros para complementar su formación."
  ]
}

export default function Checker() {
  return (
    <div className="bg-gray-100 p-4 h-screen overflow-auto">
      <div className="w-full max-w-screen-2xl m-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <section className="flex flex-1 flex-col gap-4">
            <MatchPosition keywords={resumeCurriculum.keywords}/>
            <AnalysisTable skills={resumeCurriculum.skills}/>
            <ImportantToKnow notes={resumeCurriculum.notes}/>
          </section>
          <Separator orientation="vertical" className="h-100" />
          <section className="flex flex-1 flex-col gap-4">
            <Recomendations recommendations={resumeCurriculum.recommendations}/>
            <Suggestions 
							workExperiences={resumeCurriculum.workExperiences} 
							educations={resumeCurriculum.educations}
							suggestionStudy={resumeCurriculum.suggestionStudy}
							/>
          </section>
        </div>
        <ActionFooter />
      </div>
    </div>
  );
}
