import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/hooks/useGameState";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IMPOSTER | The Party Game",
  description: "A pass-the-phone party game.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen flex flex-col overscroll-none selection:bg-indigo-500/30`}>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
