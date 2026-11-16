import type { Metadata, Viewport } from "next";
import "./globals.css";
import PixelScripts from "@/components/PixelScripts";

export const metadata: Metadata = {
  title: "Épilation Laser – Centre Dermogermany, Aïn Sebaâ Casablanca",
  description:
    "Épilation laser définitive au Centre Dermogermany, Aïn Sebaâ, Casablanca. Réservez votre diagnostic gratuit dès maintenant.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Cairo:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <PixelScripts />
        {children}
      </body>
    </html>
  );
}
