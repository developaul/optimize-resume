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

export default function HomePage() {
  const router = useRouter();

  const [, setApiKey] = useLocalStorage<Maybe<string>>("api_key", null);
  const [, setJobUrl] = useLocalStorage<Maybe<string>>("jobUrl", null);
  const [, setBase64URI] = useLocalStorage<Maybe<string>>("base64URI", null);

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    const base64URI = await fileToBase64(data.cvFile[0]);

    setApiKey(data.apikey);
    setJobUrl(data.jobUrl);
    setBase64URI(base64URI);

    router.push("/results");
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
