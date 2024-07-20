import validatorController from "@/server/controllers/validator";
import ReaderAPI from "@/server/services/ReaderAPI";
import { IContext } from "@/server/types";

// Inyeccion de dependencias
const getContext = (apiKey: string): IContext => {
  return {
    headers: {
      apiKey,
    },
    dataSources: {
      readerApi: new ReaderAPI(),
    },
  };
};

export async function POST(req: Request) {
  try {
    /** Need to receive base64URI because useObject manage application/json content */
    const { apiKey, jobUrl, base64URI } = await req.json();

    const context = getContext(apiKey);

    validatorController.validateInput({
      apiKey,
      jobUrl,
      base64URI,
    });

    await validatorController.validateJobAndCvContent(
      { jobUrl, base64URI },
      context
    );

    return Response.json({ message: "ok" }, { status: 200 });
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error);
    return Response.json({ message: error.message }, { status: 400 });
  }
}
