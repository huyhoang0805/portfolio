import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "./components/MotionProvider";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "vietnamese"],
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nguyễn Huy Hoàng — Software Engineer",
  description:
    "Software Engineer with nearly 3 years of experience building production-grade web apps with React, Next.js, and TypeScript. Sole frontend owner of AhaFood.ai (Ahamove), builder of AI Agent integration for the Franchise Portal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
        suppressHydrationWarning
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
