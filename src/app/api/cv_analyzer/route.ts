import getContext from "@/server/context";
import cvAnalyzerController from "@/server/controllers/cv_analyzer";

export async function POST(req: Request) {
  try {
    const { apiKey, jobUrl, base64URI } = await req.json();

    const context = getContext(apiKey);

    // Validate before generate context
    const result = await cvAnalyzerController.analyze({
      jobUrl,
      base64URI,
    }, context);

    // return result.toTextStreamResponse()
    return result.toJsonResponse()
  } catch (error: any) {
    console.log('error', error)
    return Response.json({ message: error.message }, { status: 500 });
  }
}
