"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

import Layout from "@/components/Layout";
import Hero from "@/home/components/Hero";
import About from "@/home/components/About";
import ActionSection, { FormSchema } from "@/home/components/ActionSection";

import { Maybe } from "@/server/types";
import { fileToBase64 } from "@/lib/utils";
import { useValidate } from "@/home/hooks";

export default function HomePage() {
  const router = useRouter();

  const { validate } = useValidate();

  const [, setApiKey] = useLocalStorage<Maybe<string>>("api_key", null);
  const [, setJobUrl] = useLocalStorage<Maybe<string>>("jobUrl", null);
  const [, setBase64URI] = useLocalStorage<Maybe<string>>("base64URI", null);

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const base64URI = await fileToBase64(data.cvFile[0]);

      await validate({
        apiKey: data.apikey,
        jobUrl: data.jobUrl,
        base64URI,
        keyType: "open-ai",
      });

      setApiKey(data.apikey);
      setJobUrl(data.jobUrl);
      setBase64URI(base64URI);

      router.push("/results");
    } catch (error) {
      // TODO: Add sonner
      console.error(error);
    }
  };

  return (
    <Layout title="Optimize Resume">
      <h2 className="h2 mb-4 text-center">
        Tu CV listo para conquistar los ATS
      </h2>

      <ActionSection onSubmit={handleSubmit} />
      <Hero />
      <About />
    </Layout>
  );
}
