import { IContext } from "@/server/types";
import fileController from "../files";
import scrapperController from "../scrapper";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { generateObject, generateText, streamObject } from "ai";
import CompatibilityAssessmentSchema from "@/server/schemas/compatibilityAssessment";
import UserProfileSchema from "@/server/schemas/userProfles";

// interface AnalyzeArgs {
//   base64URI: string;
//   jobUrl: string;
// }

const model = {
  GOOGLE_GENERATIVE_AI: google("models/gemini-1.5-pro-latest"),
  OPENAI: openai("gpt-4o"),
}[process.env.IA!];

class GetUserProfileController {
  async analyze() {
    // const cvHtml = await fileController.convertBase64PdfToText(base64URI)

    // const publicationHtml = await scrapperController.getTextByUrl(jobUrl, context)

    const prompt = ``;

    const result = await generateObject({
      model: google("models/gemini-1.5-pro-latest"),
      schema: UserProfileSchema,
      prompt,
    });

    return result;
  }
}

const getUserProfileController = new GetUserProfileController();

export default getUserProfileController;
