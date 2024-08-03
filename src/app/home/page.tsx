"use client";

import Layout from "@/components/Layout";
import ActionSection, { FormSchema } from "./components/ActionSection";
import Hero from "./components/Hero";
import About from "./components/About";

import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

import { fileToBase64 } from "@/lib/utils";
import { Maybe } from "@/server/types";
import { z } from "zod";

export default function Home() {

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
      <Layout title="Resume.AI">
        <ActionSection onSubmit={handleSubmit}/>
        <Hero />
        <About />
      </Layout>
    </>
  );
}
