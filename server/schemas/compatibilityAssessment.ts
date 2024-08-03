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
  educations: z.array(z.object({
    institution: z.string(),
    degree: z.string(),
    fieldOfStudy: z.string().optional(),
    startDate: z.string(),
    description: z.string(),
    endDate: z.string().optional(),
    currentStatus: z.enum(['GRADUATED', 'IN_PROGRESS', 'DROPPED_OUT']).optional()
  })),
  workExperiences: z.array(z.object({
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    description: z.string(),
    endDate: z.string().optional(),
    currentlyWorking: z.boolean(),
    responsibilities: z.array(z.string())
  })),
  suggestionStudy: z.array(z.string()),
  notes: z.array(z.object({
    type: z.enum(['LOW_SALARY', 'AVAILABILITY', 'LOCATION']), // reemplaza estos valores con los tipos reales de NoteType
    description: z.string()
  })),
  logs: z.array(z.string())
});

export default compatibilityAssessmentSchema