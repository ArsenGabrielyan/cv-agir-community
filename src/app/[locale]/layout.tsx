import type { Metadata, Viewport } from "next";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import ThemeDataProvider from "@/context/theme-data-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/lib/env";
import ReCaptcha from "@/components/recaptcha-script";
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { absoluteUrl } from "@/lib/utils";
import { languages } from "@/i18n/config";

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export type LocalePageProps = Omit<Props,"children">

export const generateMetadata = async({params}: LocalePageProps): Promise<Metadata> => {
  const {locale} = await params;
  const t = await getTranslations("index");
  const landingTxt = await getTranslations("landing-hero");
  return {
    metadataBase: new URL(absoluteUrl()),
    title: {
      template: `%s | ${t("title")}`,
      absolute: `${t("title")} - ${landingTxt("desc1")}`
    },
    description: t("desc"),
    authors: {
      url: "https://github.com/ArsenGabrielyan",
      name: t("author")
    },
    applicationName: t("title"),
    alternates: {
      languages: Object.fromEntries(languages.map(l => [l.code, `/${l.code}`])),
      canonical: absoluteUrl(`/${locale}`)
    },
    icons: {
      icon: [
        { url: "/favicon.ico", type: "image/x-icon" },
        { url: "/app-icon.png", sizes: "192x192", type: "image/png"}
      ],
      apple: "/app-icon.png"
    },
  }
};

export const viewport: Viewport = {
  themeColor: "#002a4f"
}
 
export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const session = await auth();
  console.log(session)
  return (
    <SessionProvider session={session} basePath="/api/auth">
      <html lang={locale} suppressHydrationWarning>
        <head>
          <link rel="preload" href="/demos/demo-1.webm" as="video" type="video/webm" fetchPriority="high" />
          <link rel="preload" href="/demos/demo-1-thumb.webp" as="image" type="image/webp" fetchPriority="high" />
          <link rel="preload" href="/demos/demo-2.webm" as="video" type="video/webm" fetchPriority="high" />
          <link rel="preload" href="/demos/demo-2-thumb.webp" as="image" type="image/webp" fetchPriority="high" />
          <link rel="preload" href="/demos/demo-3.webm" as="video" type="video/webm" fetchPriority="high" />
          <link rel="preload" href="/demos/demo-3-thumb.webp" as="image" type="image/webp" fetchPriority="high" />
        </head>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeDataProvider>
              <NextIntlClientProvider>
                <Toaster/>
                {children}
                <ReCaptcha siteKey={env.NEXT_PUBLIC_RECAPTCHA_SITE}/>
              </NextIntlClientProvider>
            </ThemeDataProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
