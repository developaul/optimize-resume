"use client";

import { experimental_useObject as useObject } from "ai/react";
import z from "zod";

export async function fileToBase64(file: File) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target === null) return reject(new Error("No target"));
      resolve(event.target.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

const Page = () => {
  const { object, submit } = useObject({
    api: "/api/recommendation",
    schema: z.object({
      content: z.any(),
    }),
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const file = formData.get("file") as File;
    const apiKey = formData.get("apiKey") as string;
    const jobUrl = formData.get("jobUrl") as string;

    const base64URI = await fileToBase64(file);

    submit({ apiKey, jobUrl, base64URI });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>This page is just for testing useObject</h1>

      <input type="text" name="apiKey" />

      <input type="file" name="file" accept="application/pdf" />

      <input type="text" name="jobUrl" />

      <button type="submit">Generate</button>

      {object?.content && <p>{object.content}</p>}
    </form>
  );
};

export default Page;
