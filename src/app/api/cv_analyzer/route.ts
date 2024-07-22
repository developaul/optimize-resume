import getContext from "@/server/context";
import cvAnalyzerController from "@/server/controllers/cv_analyzer";


function extractJson(text: string) {
  // Utilizamos una expresión regular para encontrar el bloque de JSON
  const jsonRegex = /```json\n([\s\S]*?)\n```/;
  const match = text.match(jsonRegex);

  if (match && match[1]) {
    try {
      // Intentamos parsear el JSON
      const jsonObject = JSON.parse(match[1]);
      return jsonObject;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  } else {
    console.error('No JSON block found in the text');
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { apiKey, jobUrl, base64URI, keyType } = await req.json();

    const headers = {
      apikey: apiKey,
      keytype: keyType
    }
    const context = getContext(headers);

    // Validate before generate context
    const result = await cvAnalyzerController.analyze({
      jobUrl,
      base64URI,
    }, context);

    return result.toTextStreamResponse()
    // return result.toJsonResponse()
    // return Response.json({ data: extractJson(result.text) }, { status: 200 });
  } catch (error: any) {
    console.log('error', error)
    return Response.json({ message: error.message }, { status: 500 });
  }
}
