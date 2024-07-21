import { z } from "zod";

const UserProfileSchema = z.object({
  personalInfo: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    address: z.string().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional()
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

export default UserProfileSchema