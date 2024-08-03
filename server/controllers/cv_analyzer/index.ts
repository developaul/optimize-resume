import { IContext } from "@/server/types";
import fileController from "../files";
import scrapperController from "../scrapper";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import CompatibilityAssessmentSchema from "@/server/schemas/compatibilityAssessment";

interface AnalyzeArgs {
  base64URI: string;
  jobUrl: string;
}

const model = {
  GOOGLE_GENERATIVE_AI: google("models/gemini-1.5-pro-latest"),
  OPENAI: openai("gpt-4o"),
}[process.env.IA!];

class CvAnalyzerController {
  async analyze({ base64URI, jobUrl }: AnalyzeArgs, context: IContext) {
    const cvHtml = await fileController.convertBase64PdfToText(base64URI);

    const publicationHtml = await scrapperController.getTextByUrl(
      jobUrl,
      context
    );

    const prompt = `
Eres especialista en reclutamiento y por eso te voy a pasar un currículum vitae (CV) estilo json y la descripción de una oferta de trabajo para que la evalúes y digas qué mejoras se le pueden hacer al CV para que pueda ser elegido. por esa oferta de trabajo. 
La respuesta debe ser concisa y explicar brevemente las mejoras a realizar.
Verificar que el plan de estudios tenga las habilidades solicitadas en la oferta, que el acerca tenga datos interesantes para el puesto y en este caso dar alguna recomendación.
Cv: \`${cvHtml}\`
Offer: \`${publicationHtml}\`

y el resultado lo vas a retornar en el siguiente formato como json, analizalo y hazlo paso a paso.

## Reglas y Pasos a considerar:
  - Para los nombres de las habilidades, haz uso de los nombres mas usados para describir dicha habilidad en su area.
  - Usa la semilla 42, para generar el siguiente resultado.
  - La temperatura como modelo para evitar resultados bien variados, cambialo a 0.5.
  - Evitar uso de "etc"
  - Valida paso a paso si la skill se encuentra en el CV del candidato.
  - Tratar de retornar los skills, keywords, recommendations, education, suggestionStudy, notes
  - Una vez tengas listo la respuesta, analiza si la respuesta esta bien, junto a los logs. Y en base a ello, corrige tu respuesta antes de retornar.
  - Las fechas en formato: ISODate

# Descripcion de los datos que se solicita

  - skills: // Lista de habilidades requeridas por el puesto.
    - inCv: // Si la habilidad esta en el (CV)
    - isRequiredInPublication: // Si la habilidad esta en la oferta de trabajo.
    - types: // listas q tan compatible es el skill con el tipo, y pesa el nivel de compatibilidad. Esto se usara para q escogas cual es el tipo principal de skill
    - type: // en base a types, escoge el type principal que describira el skill

  - keywords: // Lista de palabras clave presentes en la oferta y en el CV. En base a este numero de coincidencias, calcularemos un porcentaje de match entre el CV y la oferta de trabajo.

  - recommendations: /* 
    Recomendaciones para mejorar el CV. Por ejemplo: describir mejor su experiencia laboral, su desempeño. Mejorar su redaccion en las experiencias o educacion. Omision de posible habilidad de trabajo adquirido para calzar mejor con un requerimiento de la oferta de trabajo, etc.
    Ademas, estas recomendaciones deben ser descritas de forma consisa y breve.
  */

  - educations: // Busca de la lista de estudios que tiene el CV, que sean relevantes resaltar en la oferta de trabajo
    - description: // debe indicar porque el estudio es relevante para la oferta de trabajo con una excelente redaccion
  - workExperiences: // Busca de la lista de experiencia de trabajo que tiene el CV, que sean relevantes resaltar en la oferta de trabajo
    - description: // debe indicar porque dicha experiencia es relevante para la oferta de trabajo con una excelente redaccion

  - notes: // Notas adicionales que el candidato debe tener en cuenta, como por ejemplo: El salario de la oferta de trabajo es muy bajo respecto a lo solicitado del CV, el lugar de trabajo se encuentra en cierto lugar y se aleja mucho de la direccion del candidato, el tipo de trabajo que se solicita (full_time, part_time, remoto, etc)

  - logs: // Este campo es para q me des detalle de tu forma de analizar y expliques xq en ciertos casos tengo campos por ejemplo en estudio vacio. Tambien indicame porque no se encontro nada en notas. Esto me servira para mejorar mi prompt

  - suggestionStudy: // En base a los logs, lista un conjunto de temas de estudio que el candidato no respalda.
`;

    const result = await streamObject({
      model: model!,
      schema: CompatibilityAssessmentSchema,
      prompt,
    });

    return result;
  }
}

const cvAnalyzerController = new CvAnalyzerController();

export default cvAnalyzerController;
