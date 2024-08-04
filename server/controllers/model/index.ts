import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

class ModelController {
  getModel(keytype: string, apiKey: string) {
    switch (keytype) {
      case "open-ai":
        return this.createOpenAIModel(apiKey);
      case "gemini":
        return this.createGeminiModel(apiKey);
      default:
        throw new Error("Invalid key type");
    }
  }

  private createOpenAIModel(apiKey: string) {
    const openai = createOpenAI({ apiKey });
    const model = openai("gpt-4o");

    return model;
  }

  private createGeminiModel(apiKey: string) {
    const google = createGoogleGenerativeAI({ apiKey });

    const model = google("models/gemini-1.5-pro-latest");

    return model;
  }
}

const modelController = new ModelController();

export default modelController;
