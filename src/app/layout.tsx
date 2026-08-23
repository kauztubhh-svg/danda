import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GameProvider } from "@/hooks/useGameState";

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
    <html lang="en">
      <body className="min-h-screen flex flex-col overscroll-none selection:bg-yellow-200">
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
