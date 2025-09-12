import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/shared/Header";
import { Toaster } from "@/components/ui/sonner";
import { MathJaxContext } from "better-react-mathjax";
import Footer from "@/components/shared/Footer";
import NoticeModal from "@/components/shared/NoticeModal";
import { getAllFrontMatter } from "@/lib/markdown";
const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KUMSC",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const notices = getAllFrontMatter("notices")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((notice) => ({
      ...notice,
      type: "notice" as const,
    }));

  const events = getAllFrontMatter("events").map((event) => ({
    ...event,
    type: "event" as const,
  }));

  const searchData = { events, notices };
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MathJaxContext config={config}>
          <Header searchData={searchData} />
          <main className="pt-16">{children}</main>
        </MathJaxContext>
        <Footer />
        <Toaster richColors />
        <NoticeModal notices={notices} />
      </body>
    </html>
  );
}
