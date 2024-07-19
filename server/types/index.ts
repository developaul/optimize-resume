import ReaderAPI from "../services/ReaderAPI";
import { z } from "zod";
import UserProfileSchema from "../schemas/userProfles";
import JobPostingSchema from "../schemas/job";

export type IContext = {
  headers: {
    apiKey: string;
  };
  dataSources: {
    readerApi: ReaderAPI;
  };
};


export type UserProfile = z.infer<typeof UserProfileSchema>
export type Job = z.infer<typeof JobPostingSchema>
