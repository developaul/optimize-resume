import { IContext } from "@/server/types";
import fileController from '../files'
import scrapperController from '../scrapper'
import UserProfileSchema from "@/server/schemas/userProfles";
import JobPostingSchema from "@/server/schemas/job";

interface AnalyzeArgs {
  fileString: string;
  publicationUrl: string;
}

class CvAnalyzerController {
  async analyze ({ fileString, publicationUrl }: AnalyzeArgs, context: IContext) {
    const cvHtml = fileController.getTextByBase64File(fileString)

    const publicationHtml = scrapperController.getTextByUrl(publicationUrl, context)

    const userProfileSchemaString = JSON.stringify(UserProfileSchema._def)
    const jobSchemaString = JSON.stringify(JobPostingSchema._def)

    const prompt = `
      Eres un experto en ingeniería de prompts para ia. Te dare instrucciones en forma de código con comentarios y quiero que lo interpretes y lo transformes en un prompt.

      Comencemos:

      input: {
        cvHtml,
        publicationHtml
      }

      enum SkillType {
        technical_skills, # Por ejemplo: Pruebas de viabilidad, Diseño user flow, etc.
        soft_skill, # Comunicacion, Liderazgo, etc.
        technological_skills # Figma, Photoshop, AdobeXD, etc.
      }

      # Las notas son solo aviso que informaran al candidato que debe considerar revisar primero antes de enviar su cv a la publicación del aviso.
      enum NoteType {
        low_salary, # Alerta en caso que salario sea menor al salario esperado por el candidato
        availability, # tipo que indica si el aviso indica que tipo de trabajo estan buscando, por ej. remoto/hibrido/oficina
        location # Para indicar al candidato si el lugar queda cerca o lejos de donde vive. Se considera lejos si el lugar de trabajo es fuera de su departamento.
      }

      output: {
        skills: {
          name: string;
          type: string;
          inCv: boolean;
          isRequiredInPublication: boolean;
        }[]

        # Estas palabras clave deben ser buscadas tanto en el cvHtml y publicationHtml. Y en base donde se encuentren se llenen sus respectivos flags. De esta forma ello ayudara a crear una tabla que permita saber en que palabras clave difieren y en que palabras clave coinciden
        keywords: {
          value: string;
          inCv: boolean;
          inPublication: boolean;
        }[]

        # Estas recomendaciones son para que el cv del candidato sea mas compatible y mas atractivo para los reclutadores.
        recommendations: {
          description: string;
          title: string;
        }[]

        # Buscaras si los estudios del candidato coinciden con los estudios requeridos del aviso
        education: {
          name: string; # nombre de estudio de cv que coincide con el estudio requerido por el aviso.
          description: string; # genera una descripción de las habilidades que podría brindar este estudio a la empresa y puesto de trabajo.
        }[]

        # En base a los estudios que le falta al candidato para que su curriculum sea mas atractivo, genera máximo 3 cursos que recomendarías al candidato para que su puntaje de coincidencia mejore.
        suggestionStudy: string[]

        # Estas notas son solo informativas, que alertan al candidato de datos que debería considerar antes de enviar su cv al aviso.
        notes: {
          type: NoteType;
          description: string;
        }[]
      }

      ademas voy a definir los schemas de userProfileSchema y jobSchema

      type UserProfileSchema = ${userProfileSchemaString}
      type JobSchema = ${jobSchemaString}

      en base a los schemas que te pase parse tanto el html del cv y el aviso.

      en base a la obtencion de los datos importantes y los htmls originales

      retorna el objeto de salida
    `
    // const result = await streamObject({
    //   model: openai('gpt-4-turbo'),
    //   schema: notificationSchema
    //   prompt:
    //     `Generate 3 notifications for a messages app in this context:` + context,
    // })
  
    // return result.toTextStreamResponse()
  }
}

const cvAnalyzerController = new CvAnalyzerController()

export default cvAnalyzerController