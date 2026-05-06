import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Audynia – Dein persönlicher Song in ca. 1 Stunde",
  description:
    "Personalisierte Songs für jeden Anlass. Trailer kostenlos vorab – nur zahlen wenn er gefällt. Ab nur 29,99€.",
  icons: {
    shortcut: '/favicon.png',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full">
      <body style={{ minHeight: "100%", margin: 0, fontFamily: "system-ui, -apple-system, sans-serif" }}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
