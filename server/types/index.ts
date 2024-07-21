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


export type UserProfile = z.infer<typeof UserProfileSchema>
export type Job = z.infer<typeof JobPostingSchema>
export type CompatibilityAssessment = z.infer<typeof CompatibilityAssessmentSchema>