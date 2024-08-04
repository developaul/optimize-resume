import getContext from "@/server/context";
import validatorController from "@/server/controllers/validator";

export async function POST(req: Request) {
  try {
    /** Need to receive base64URI because useObject manage application/json content */
    const { apiKey, jobContent, base64URI, keyType } = await req.json();

    const headers = {
      apikey: apiKey,
      keytype: keyType,
    };

    const context = getContext(headers);

    validatorController.validateInput({
      apiKey,
      jobContent,
      base64URI,
    });

    await validatorController.validateJobAndCvContent(
      { jobContent, base64URI },
      context
    );

    return Response.json({ message: "ok", success: true }, { status: 200 });
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error);
    return Response.json(
      { message: error.message, success: false },
      { status: 400 }
    );
  }
}
