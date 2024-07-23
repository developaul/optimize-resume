import ReaderAPI from "../services/ReaderAPI";
import { z } from "zod";
import UserProfileSchema from "../schemas/userProfles";
import JobPostingSchema from "../schemas/job";
import CompatibilityAssessmentSchema from "../schemas/compatibilityAssessment";

export type IContext = {
  headers: {
    apikey: string;
    keytype: string;
  };
  dataSources: {
    readerApi: ReaderAPI;
  };
};

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type IPersonalInfo = z.infer<
  typeof UserProfileSchema.shape.personalInfo
>;
export type IWorkExperience = z.infer<
  typeof UserProfileSchema.shape.workExperience
>;
export type IEducation = z.infer<typeof UserProfileSchema.shape.education>;
export type ISkills = z.infer<typeof UserProfileSchema.shape.skills>;
export type ILanguages = z.infer<typeof UserProfileSchema.shape.languages>;
export type Job = z.infer<typeof JobPostingSchema>;
export type CompatibilityAssessment = z.infer<
  typeof CompatibilityAssessmentSchema
>;
