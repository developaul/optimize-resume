"use client";

// import { useRouter } from "next/navigation";
// import { useLocalStorage } from "usehooks-ts";

// import { fileToBase64 } from "@/lib/utils";
// import { Maybe } from "@/server/types";
import Home from "./home/page";

export default function RootPage() {
  // const router = useRouter();

  // const [, setApiKey] = useLocalStorage<Maybe<string>>("api_key", null);
  // const [, setJobUrl] = useLocalStorage<Maybe<string>>("jobUrl", null);
  // const [, setBase64URI] = useLocalStorage<Maybe<string>>("base64URI", null);

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target as HTMLFormElement);

  //   const file = formData.get("file") as File;
  //   const apiKey = formData.get("apiKey") as string;
  //   const jobUrl = formData.get("jobUrl") as string;

  //   const base64URI = await fileToBase64(file);

  //   setApiKey(() => apiKey);
  //   setJobUrl(() => jobUrl);
  //   setBase64URI(() => base64URI);

  //   router.push("/results");
  // };

  return (
    <Home/>
    // <>
    //   <Layout title="Resume.AI">
    //     <ActionSection />
    //     <Hero />
    //     <About />
    //   </Layout>
    // </>
    // <form onSubmit={handleSubmit}>
    //   <h1>This page is just for testing useObject</h1>

    //   <input type="text" name="apiKey" placeholder="Escribe api_key" />

    //   <input type="file" name="file" accept="application/pdf" />

    //   <input type="text" name="jobUrl" placeholder="Escribe url de aviso"/>

    //   <button type="submit">Generate</button>
    // </form>
  );
}
