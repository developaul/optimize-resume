import { z } from "zod";

const compatibilityAssessmentSchema  = z.object({
  skills: z.array(z.object({
    name: z.string(),
    types: z.array(z.object({
      type: z.enum(['TECHNICAL_SKILLS', 'SOFT_SKILLS', 'MANAGEMENT_SKILLS', 'LEARNING_SKILLS', 'COMMUNICATION_SKILLS', 'CREATIVE_SKILLS', 'DIGITAL_SKILLS', 'ANALYTICAL_SKILLS', 'CUSTOMER_SERVICE_SKILLS', 'ADAPTABILITY_SKILLS']),
      weight: z.number()
    })),
    type: z.enum(['TECHNICAL_SKILLS', 'SOFT_SKILLS', 'MANAGEMENT_SKILLS', 'LEARNING_SKILLS', 'COMMUNICATION_SKILLS', 'CREATIVE_SKILLS', 'DIGITAL_SKILLS', 'ANALYTICAL_SKILLS', 'CUSTOMER_SERVICE_SKILLS', 'ADAPTABILITY_SKILLS']),
    inCv: z.boolean(),
    isRequiredInPublication: z.boolean()
  })),
  keywords: z.array(z.object({
    value: z.string(),
    inCv: z.boolean(),
    inPublication: z.boolean()
  })),
  recommendations: z.array(z.object({
    description: z.string(),
    title: z.string()
  })),
  education: z.array(z.object({
    name: z.string(),
    description: z.string()
  })),
  suggestionStudy: z.array(z.string()),
  notes: z.array(z.object({
    type: z.enum(['LOW_SALARY', 'AVAILABILITY', 'LOCATION']), // reemplaza estos valores con los tipos reales de NoteType
    description: z.string()
  })),
  logs: z.array(z.string())
});

export default compatibilityAssessmentSchema