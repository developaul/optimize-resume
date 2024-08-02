import getContext from "@/server/context";
import { mockUserProfile } from "../../../../__mocks__/userProfile";
import getUserProfileController from "@/server/controllers/getUserProfile";

export async function POST(req: Request) {
  try {
    // const { apiKey, keyType } = await req.json();
    // const context = getContext({ apiKey, keyType } as any);

    // Validate before generate context
    // const result = await getUserProfileController.analyze();
    // console.log("🚀 ~ POST ~ result:", result)

    // return result.toTextStreamResponse();

    return Response.json(mockUserProfile, { status: 200 });

  } catch (error: any) {
    console.log("error", error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
