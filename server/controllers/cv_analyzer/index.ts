import { IContext } from "@/server/types";
import fileController from '../files'
import scrapperController from '../scrapper'
import UserProfileSchema from "@/server/schemas/userProfles";
import JobPostingSchema from "@/server/schemas/job";
import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import { streamObject, generateObject } from "ai";
import CompatibilityAssessmentSchema from "@/server/schemas/compatibilityAssessment";
import { ZodArray, ZodBoolean, ZodEnum, ZodObject, ZodSchema, ZodString } from "zod";

interface AnalyzeArgs {
  base64URI: string;
  jobUrl: string;
}

const model = {
  GOOGLE_GENERATIVE_AI: google('models/gemini-1.5-flash-latest'),
  OPENAI: openai("gpt-4o"),
}[process.env.IA!]

console.log('process.env.IA', process.env.IA)

function describeZodSchema(schema: ZodSchema<any>, indent = 0): string {
  if (schema instanceof ZodObject) {
    const properties = schema.shape;
    return Object.entries(properties).map(([key, value]) => {
      return `${' '.repeat(indent)}- **${key}**: ${describeZodSchema(value as any, indent + 2)}`;
    }).join('\n');
  } else if (schema instanceof ZodArray) {
    return `un array de:\n${describeZodSchema(schema._def.type, indent + 2)}`;
  } else if (schema instanceof ZodString) {
    return 'una cadena de texto';
  } else if (schema instanceof ZodBoolean) {
    return 'un valor booleano';
  } else if (schema instanceof ZodEnum) {
    return `un enum con valores: ${schema._def.values.join(', ')}`;
  } else {
    return 'un tipo desconocido';
  }
}

class CvAnalyzerController {
  async analyze ({ base64URI, jobUrl }: AnalyzeArgs, context: IContext) {
    const cvHtml = await fileController.getTextByBase64File(base64URI)

    const publicationHtml = await scrapperController.getTextByUrl(jobUrl, context)

    const userProfileSchemaString = describeZodSchema(UserProfileSchema)
    const jobSchemaString = describeZodSchema(JobPostingSchema)
    const compatibilityAssessmentSchemaString = describeZodSchema(CompatibilityAssessmentSchema)


    // Eres un experto en ingeniería de prompts para ia. Te dare instrucciones en forma de código con comentarios y quiero que lo interpretes y lo transformes en un prompt.
    const prompt = `
Eres un bot experto en las siguientes areas:
  - Programador Senior
  - Reclutador digital senior

Como bot quiero que analices mi datos de entrada y generes mi dato de salida
    - input: 
      - cvHtml
      - publicationHtml
    - output:
      - compatibilidad entre cvHtml y publicationHtml y recomendaciones para mejorar el cvHtml

Para detallarte mejor como quiero que generes mi objeto de salida cree el siguiente pseudocodigo.
Analizalo y ejecutalo.

INICIO PSEUDOCODIGO:

## Definimos:

# INICIO DEF SCHEMA 'CvSchema'## 
z.object({
  personalInfo: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    address: z.string().optional(),
    linkedinUrl: z.string().url().optional(),
    linkedinUrl: z.string().url().optional()
  }),
  education: z.array(z.object({
    institution: z.string(),
    degree: z.string(),
    fieldOfStudy: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    currentStatus: z.enum(['GRADUATED', 'IN_PROGRESS', 'DROPPED_OUT']).optional()
  })),
  workExperience: z.array(z.object({
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    currentlyWorking: z.boolean().default(false),
    responsibilities: z.array(z.string())
  })),
  skills: z.array(z.object({
    name: z.string(),
    level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'])
  })),
  certifications: z.array(z.object({
    name: z.string(),
    issuingOrganization: z.string(),
    issueDate: z.string(),
    expirationDate: z.string().optional()
  })).optional(),
  salaryExpectation: z.object({
    amount: z.number(),
    currency: z.string().default('USD')
  }),
  languages: z.array(z.object({
    name: z.string(),
    level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'NATIVE'])
  }))
});
# FIN DEF SCHEMA ##

# INICIO DEF SCHEMA 'JobSchema'## 
z.object({
  jobTitle: z.string(),
  company: z.object({
    name: z.string(),
    website: z.string().url().optional(),
    address: z.string().optional()
  }),
  description: z.string(),
  requirements: z.array(z.string()),
  location: z.object({
    city: z.string(),
    state: z.string().optional(),
    country: z.string()
  }),
  jobType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'TEMPORARY', 'INTERSHIP']),
  postedDate: z.string(), // YYYY-MM-DD
  closingDate: z.string().optional(), // YYYY-MM-DD
  benefits: z.array(z.string()).optional()
})
# FIN DEF SCHEMA ##

# INICIO DEF SCHEMA 'CompatibilityAssessmentSchema'## 
z.object({
  # lista de todas habilidades tanto las requeridas por el puesto como las que el candidato demuestra en el curriculum
  skills: z.array(z.object({
    name: z.string(),
    type: z.enum(['technical_skills', 'soft_skill', 'technological_skills']),
    inCv: z.boolean(),
    isRequiredInPublication: z.boolean()
  })),

  # lista de todas palabras clave que podrian describir mejor el puesto como las palabras clave que podrian describir el curriculum. La idea es encontrar cuantas coincidencias hay entre estos 2 archivos.
  keywords: z.array(z.object({
    value: z.string(),
    inCv: z.boolean(),
    inPublication: z.boolean()
  })),

  # lista de recomendaciones que podria darsele al candidato para escribir un mejor curriculum, por ejemplo que solo ponga cosas relevantes y le interesen al reclutador o sistemas de reclutamiento
  recommendations: z.array(z.object({
    description: z.string(),
    title: z.string()
  })),

  # lista de estudios del candidato le podrian respaldar para que calce con el puesto de trabajo
  education: z.array(z.object({
    name: z.string(),
    description: z.string()
  })),

  # en caso la lista de estudio este vacia, que temas de estudio se le recomienda al candidato para que en una proxima ocasion se le considere la mejor opcion
  suggestionStudy: z.array(z.string()),

  # Lista de notas que el candidato deberia estar alerta antes de mandar su curriculum al aviso. Por ejemplo que considere la ubicacion, para que no trabaje en un lugar lejos, que considere si el salario es muy bajo respecto lo que espera o si el trabajo es remoto.
  notes: z.array(z.object({
    type: z.enum(['low_salary', 'availability', 'location']), // reemplaza estos valores con los tipos reales de NoteType
    description: z.string()
  }))
})
# FIN DEF SCHEMA ##

/* 
  @description: En base a un schema, buscaras en el html y extraeras la informacion indicada en el schema.
*/
func extractInfo(html, schema);

type ResolveCompatibilityAssessmentArgs{
  cv: {
    parsed: CvSchema;
    html: string;
  }
  job: {
    parsed: JobSchema;
    html: string;
  }
}
/* 
  @description: En base a un schema, buscaras en el html y extraeras la informacion indicada en el schema.
*/
func resolveCompatibilityAssessment(obj: ResolveCompatibilityAssessmentArgs, schema);

## Operamos

const cvParsed = extractInfo(cvHtml, CvSchema)
const jobParsed = extractInfo(publicationHtml, JobSchema)

return resolveCompatibilityAssessment({
  cv: {
    parsed: cvParsed;
    html: cvHtml;
  },
  job: {
    parsed: jobParsed;
    html: publicationHtml;
  }
}, CompatibilityAssessmentSchema)

FIN PSEUDOCODIGO

y las variables que te estoy pasando son:

# DEFINICION DE 'cvHtml'
${cvHtml}
# FIN DEFINICION

# DEFINICION DE 'publicationHtml'
${publicationHtml}
# FIN DEFINICION

No me des detalles, solo ejecuta el pseudocodigo y retorna el output solicitado
    `

    console.log('prompt', prompt)

    const result = await generateObject({
      model: model!,
      schema: CompatibilityAssessmentSchema,
      prompt
    })
  
    return result
  }
}

const cvAnalyzerController = new CvAnalyzerController()

export default cvAnalyzerController