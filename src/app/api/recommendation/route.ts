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
    const { apiKey, jobUrl, base64URI } = await req.json();

    // Validate before generate context
    validatorController.validateInput({
      apiKey,
      jobUrl,
      base64URI,
    });

    const context = getContext(apiKey);

    await validatorController.validateJobAndCvContent(
      { jobUrl, base64URI },
      context
    );

    return Response.json({ message: "ok" }, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 400 });
  }
}
