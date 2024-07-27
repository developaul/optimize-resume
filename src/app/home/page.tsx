"use client";

import Layout from "@/components/Layout";
import { useChat } from "ai/react";
import ActionSection from "./components/ActionSection";
import Hero from "./components/Hero";
import About from "./components/About";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <>
      <Layout title="Resume.AI">
        <ActionSection />
      </Layout>
      <Hero />
      <About />
    </>
  );
}
