import type { Metadata } from "next";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import CookieBanner from "@/components/CookieBanner";
import ChatBar from "@/components/ChatBar";
import { MetaPageViewTracker } from "@/components/MetaPageViewTracker";
import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === "de";
  return {
    title: isDE
      ? "Audynia – Dein persönlicher Song in ca. 1 Stunde"
      : "Audynia – Your personal song in about 1 hour",
    description: isDE
      ? "Personalisierte Songs für jeden Anlass. Trailer kostenlos vorab – nur zahlen wenn er gefällt. Ab nur 29,99€."
      : "Personalized songs for every occasion. Free trailer first – only pay if you love it. From just €29.99.",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
        { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/icon-512.png", type: "image/png", sizes: "512x512" }],
      shortcut: "/favicon.ico",
    },
    manifest: "/site.webmanifest",
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full">
      <head>
        <link
          rel="preconnect"
          href="https://media.vowlyra.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://media.audynia.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
      </head>
      <body
        style={{
          minHeight: "100%",
          margin: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}>
            <MetaPageViewTracker />
          </Suspense>
          {children}
          <ChatBar />
          <CookieBanner />
        </NextIntlClientProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
