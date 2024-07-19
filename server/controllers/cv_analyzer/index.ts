import { IContext } from "@/server/types";
import fileController from '../files'
import scrapperController from '../scrapper'
import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import { generateObject, generateText } from "ai";
import CompatibilityAssessmentSchema from "@/server/schemas/compatibilityAssessment";

interface AnalyzeArgs {
  base64URI: string;
  jobUrl: string;
}

const model = {
  GOOGLE_GENERATIVE_AI: google('models/gemini-1.5-flash-latest'),
  OPENAI: openai("gpt-4o"),
}[process.env.IA!]

class CvAnalyzerController {
  async analyze ({ base64URI, jobUrl }: AnalyzeArgs, context: IContext) {
    const cvHtml = await fileController.getTextByBase64File(base64URI)

    const publicationHtml = await scrapperController.getTextByUrl(jobUrl, context)

    // const userProfileSchemaString = describeZodSchema(UserProfileSchema)
    // const jobSchemaString = describeZodSchema(JobPostingSchema)
    // const compatibilityAssessmentSchemaString = describeZodSchema(CompatibilityAssessmentSchema)

    // Eres un experto en ingeniería de prompts para ia. Te dare instrucciones en forma de código con comentarios y quiero que lo interpretes y lo transformes en un prompt.
    const prompt = `
Eres especialista en reclutamiento y por eso te voy a pasar un currículum vitae (CV) estilo json y la descripción de una oferta de trabajo para que la evalúes y digas qué mejoras se le pueden hacer al CV para que pueda ser elegido. por esa oferta de trabajo. 
La respuesta debe ser concisa y explicar brevemente las mejoras a realizar.
Verificar que el plan de estudios tenga las habilidades solicitadas en la oferta, que el acerca tenga datos interesantes para el puesto y en este caso dar alguna recomendación.
Cv: \`${cvHtml}\`
Offer: \`${publicationHtml}\`

y el resultado lo vas a retornar en el siguiente formato como json, leer la descripcion de cada campo:

const CompatibilityAssessmentSchema  = z.object({
  /* @description: Lista de habilidades requeridas y si están presentes en el CV. */
  skills: z.array(z.object({
    name: z.string(),
    type: z.enum(['technical_skills', 'soft_skill', 'technological_skills']),
    inCv: z.boolean(),
    isRequiredInPublication: z.boolean()
  })),

  /* @description: Lista de palabras clave presentes en la oferta y en el CV. */
  keywords: z.array(z.object({
    value: z.string(),
    inCv: z.boolean(),
    inPublication: z.boolean()
  })),

  /* @description: Recomendaciones para mejorar el CV. */
  recommendations: z.array(z.object({
    description: z.string(),
    title: z.string()
  })),

  /* @description: Lista de estudios del candidato que respaldan el puesto. */
  education: z.array(z.object({
    name: z.string(),
    /* @description: Describe como este estudio respalda un requerimiento del puesto */
    description: z.string()
  })),

  /* @description: Sugerencias de estudio para el candidato. */
  suggestionStudy: z.array(z.string()),

  /* @description: Notas adicionales que el candidato debe tener en cuenta. */
  notes: z.array(z.object({
    type: z.enum(['low_salary', 'availability', 'location']), // reemplaza estos valores con los tipos reales de NoteType
    description: z.string()
  }))
})
    `
    console.log('prompt', prompt)

    const result = await generateText({
      model: model!,
      // schema: CompatibilityAssessmentSchema,
      prompt
    })

    console.log('result', JSON.stringify(result, null, 2))
  
    return result
  }
}

const cvAnalyzerController = new CvAnalyzerController()

export default cvAnalyzerController