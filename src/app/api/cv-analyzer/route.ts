import getContext from "@/server/context";
import cvAnalyzerController from "@/server/controllers/cv_analyzer";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { apiKey, jobUrl, base64URI, keyType } = await req.json();

    const headers = {
      apikey: apiKey,
      keytype: keyType,
    };
    const context = getContext(headers);

    // Validate before generate context
    const result = await cvAnalyzerController.analyze(
      {
        jobUrl,
        base64URI,
      },
      context
    );

    return result.toTextStreamResponse();
    // return result.toJsonResponse()
    // return Response.json({ data: extractJson(result.text) }, { status: 200 });
  } catch (error: any) {
    console.log("error", error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
