import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Optimize Resume",
  description:
    "Optimiza tu currículum vitae con la ayuda de inteligencia artificial. Obtén sugerencias personalizadas para destacar tus habilidades y experiencia.",
  keywords:
    "optimizar cv, currículum vitae, ia, inteligencia artificial, búsqueda de empleo, mejora profesional",
  metadataBase: new URL("https://optimize-resume.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
