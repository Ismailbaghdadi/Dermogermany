import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import PixelScripts from "@/components/PixelScripts";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Centre Dermogermany — إزالة الشعر بالليزر بعين السبع، الدار البيضاء",
  description:
    "اطلبي معلومات أو موعد لإزالة الشعر بالليزر بتقنية COCOON MEDICAL PrimeLase فسنتر Centre Dermogermany بعين السبع، الدار البيضاء.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <PixelScripts />
        {children}
      </body>
    </html>
  );
}
