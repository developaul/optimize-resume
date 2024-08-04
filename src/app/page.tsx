"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { toast } from "sonner";

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
  const [, setJobContent] = useLocalStorage<Maybe<string>>("jobContent", null);
  const [, setBase64URI] = useLocalStorage<Maybe<string>>("base64URI", null);

  const handleSubmit = async ({
    cvFile,
    jobContent,
    apiKey,
  }: z.infer<typeof FormSchema>) => {
    try {
      const base64URI = await fileToBase64(cvFile[0]);

      const { success, message } = await validate({
        apiKey,
        jobContent,
        base64URI,
        keyType: "open-ai",
      });

      if (!success) throw new Error(message);

      setApiKey(apiKey);
      setJobContent(jobContent);
      setBase64URI(base64URI);

      router.push("/results");
    } catch (error: any) {
      toast.error(error.message ?? "Something went wrong");
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
