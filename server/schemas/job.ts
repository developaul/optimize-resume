import { z } from "zod";

const JobPostingSchema = z.object({
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
});

export default JobPostingSchema