import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vowlyra – Dein persönlicher Song in ca. 6 Stunden",
  description:
    "Personalisierte Songs für jeden Anlass. Trailer kostenlos vorab – nur zahlen wenn er gefällt. Ab nur 29,99€.",
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/favicon.png', type: 'image/png' }],
    shortcut: '/favicon.png',
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
