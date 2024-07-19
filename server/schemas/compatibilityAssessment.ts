import { z } from "zod";

const CompatibilityAssessmentSchema  = z.object({
  skills: z.array(z.object({
    name: z.string(),
    type: z.enum(['technical_skills', 'soft_skill', 'technological_skills']),
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
    type: z.enum(['low_salary', 'availability', 'location']), // reemplaza estos valores con los tipos reales de NoteType
    description: z.string()
  }))
});

export default CompatibilityAssessmentSchema 