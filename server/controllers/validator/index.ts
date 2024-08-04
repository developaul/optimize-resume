import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

import { IContext } from "@/server/types";
import scrapperController from "../scrapper";
import fileController from "../files";

interface RecommendationInput {
  apiKey: string;
  jobUrl: string;
  base64URI: string;
}

const recommendationSchema = z.object({
  apiKey: z.string().min(1, { message: "API key is required" }),
  jobUrl: z.string().optional(),
  jobContent: z.string().optional(),
  // Base 64 encoded file
  base64URI: z.string().min(1, { message: "Document is required" }),
});

class ValidatorController {
  validateInput(input: RecommendationInput) {
    const { success, error } = recommendationSchema.safeParse(input);

    if (!success) throw new Error(error.message);
  }

  async validateJobAndCvContent(
    { jobUrl, base64URI }: Pick<RecommendationInput, "jobUrl" | "base64URI">,
    context: IContext
  ) {
    try {
      const [jobContent, cvContent] = await Promise.all([
        scrapperController.getTextByUrl(jobUrl, context),
        fileController.convertBase64PdfToText(base64URI),
      ]);

      const { model } = context;

      const { object } = await generateObject({
        model,
        schema: z.object({
          job: z.object({
            isValid: z.boolean(),
            error: z.string().optional(),
          }),
          cv: z.object({
            isValid: z.boolean(),
            error: z.string().optional(),
          }),
        }),
        prompt: `Validate if the essential content extracted from the job URL and CV document is appropriate for a job description and a CV, respectively, ignore the structure of the content and just check if it is a job and a CV.\n\nJob Content:\n${jobContent}\n\nCV Content:\n${cvContent}`,
      });

      console.log("🚀 ~ ValidatorController ~ object:", object);
      const { job, cv } = object;

      if (!job.isValid) throw new Error("Invalid job content");

      if (!cv.isValid) throw new Error("Invalid CV content");
    } catch (error) {
      throw error;
    }
  }
}

const validatorController = new ValidatorController();

export default validatorController;
