"use client";

import Layout from "@/components/Layout";
import ActionSection from "./components/ActionSection";
import Hero from "./components/Hero";
import About from "./components/About";

export default function Chat() {
  return (
    <>
      <Layout title="Resume.AI">
        <ActionSection />
        <Hero />
        <About />
      </Layout>
    </>
  );
}
