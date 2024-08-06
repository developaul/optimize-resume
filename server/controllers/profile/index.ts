import { generateObject } from "ai";

import { IContext } from "@/server/types";
import { urlSchema } from "../validator";

import UserProfileSchema from "@/server/schemas/userProfles";
import scrapperController from "../scrapper";
import fileController from "../files";

interface GetProfileArgs {
  jobContent: string;
  base64URI: string;
}

class ProfileController {
  async getProfile(args: GetProfileArgs, context: IContext) {
    const { jobContent, base64URI } = args;
    const { model } = context;

    const promises = [fileController.convertBase64PdfToText(base64URI)];

    if (urlSchema.safeParse(jobContent).success) {
      promises.push(scrapperController.getTextByUrl(jobContent, context));
    } else {
      promises.push(Promise.resolve(jobContent));
    }

    const [cvContent, jobContentText] = await Promise.all(promises);

    const prompt = `
      Eres un asistente AI especializado en optimizar CVs. Tu tarea es analizar el siguiente CV de un candidato:

      ${cvContent}

      Y la siguiente descripción del puesto al que está aplicando:

      ${jobContentText}

      Basándote en esta información, genera una versión optimizada del CV que destaque las cualidades más relevantes del candidato para este puesto específico.

      Instrucciones:

      1. Analiza cuidadosamente el contenido del CV y la descripción del puesto proporcionados.
      2. Identifica las habilidades, experiencias y cualificaciones del candidato que mejor se alineen con los requisitos del puesto.
      3. Reorganiza y reformula la información del CV para resaltar estos aspectos relevantes.
      4. Asegúrate de que toda la información generada se base exclusivamente en el CV original del candidato. No inventes ni agregues información que no esté presente en el CV original.
      5. Estructura la información optimizada del CV de la siguiente manera:

        a. Información personal:
        - Descripción: Crea un resumen profesional optimizado que destaque las fortalezas del candidato en relación con el puesto.
        - Incluye nombre, apellido, email y, si están disponibles, teléfono, dirección, y enlaces a LinkedIn, GitHub y portfolio.

        b. Educación:
        - Para cada institución educativa, incluye el nombre, el título obtenido, el campo de estudio (si es relevante), fechas de inicio y fin, una descripción que enfatice aspectos relevantes para el puesto, la ubicación y el estado actual de los estudios.

        c. Experiencia laboral:
        - Para cada experiencia, incluye el nombre de la empresa, el puesto, fechas de inicio y fin, ubicación, una descripción que destaque logros y responsabilidades relevantes para el puesto al que se aplica, si es el trabajo actual, y una lista de responsabilidades enfocadas en tareas relacionadas con el puesto.

        d. Habilidades:
        - Lista las habilidades relevantes para el puesto, indicando el nivel de competencia (principiante, intermedio, avanzado o experto).

        e. Certificaciones (si las hay):
        - Incluye el nombre de la certificación, la organización que la emitió, la fecha de emisión y, si corresponde, la fecha de vencimiento.

        f. Expectativa salarial:
        - Proporciona la cantidad y la moneda basándote en la información del CV original.

        g. Idiomas:
        - Lista los idiomas que conoce el candidato y su nivel de competencia (principiante, intermedio, avanzado o nativo).

        h. Idioma objetivo:
        - Indica si el CV debe estar en inglés o español, según el requisito del puesto.

      6. Prioriza la información más relevante para el puesto en cada sección.
      7. Ajusta el tono y el lenguaje del CV para que se alinee mejor con la cultura y los requisitos de la empresa a la que se está aplicando.
      8. Si el puesto requiere un idioma específico, asegúrate de que el CV esté optimizado en ese idioma.

      Recuerda: Tu objetivo es optimizar el CV existente, no crear uno nuevo. Toda la información debe basarse en el CV original del candidato.
    `;

    const { object } = await generateObject({
      model,
      schema: UserProfileSchema,
      prompt,
    });

    return object;
  }
}

const profileController = new ProfileController();

export default profileController;
