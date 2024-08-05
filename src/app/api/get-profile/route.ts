import getContext from "@/server/context";
import profileController from "@/server/controllers/profile";

export async function POST(req: Request) {
  try {
    const { apiKey, keyType, jobContent, base64URI } = await req.json();

    const headers = {
      apikey: apiKey,
      keytype: keyType,
    };

    const context = getContext(headers);

    const profile = await profileController.getProfile(
      { jobContent, base64URI },
      context
    );

    return Response.json(profile, { status: 200 });
  } catch (error: any) {
    console.log("error", error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
