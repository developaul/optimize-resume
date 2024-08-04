"use client";

import { z } from "zod";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";

import ActionSection, { FormSchema } from "@/components/home/ActionSection";
import Layout from "@/components/Layout";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";

import { fileToBase64 } from "@/lib/utils";
import { Maybe } from "@/server/types";
import useValidate from "@/components/home/hooks/use-validate";

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
    <>
      <Layout title="Optimize Resume">
        <ActionSection onSubmit={handleSubmit} />
        <Hero />
        <About />
      </Layout>
    </>
  );
}
