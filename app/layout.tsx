import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { HeaderProvider } from "@/lib/headerContext";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nassim Berrada | AI Researcher & ML Engineer",
  description:
    "AI researcher and engineer researching continual learning, symbolic reasoning, autonomous agents, and ML systems. Empirical case studies and research notes.",
  authors: [{ name: "Nassim Berrada" }],
  keywords: [
    "AI Researcher",
    "Machine Learning",
    "Continual Learning",
    "Symbolic Reasoning",
    "AI Agents",
    "LLM Router",
    "Ivy Framework",
    "Quantitative Finance",
    "Unfolding Labs",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${cormorantGaramond.variable} dark h-full antialiased`}
    >
      <body className="h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden">
        <HeaderProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </HeaderProvider>
      </body>
    </html>
  );
}
