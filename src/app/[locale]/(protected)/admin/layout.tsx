import { getIsAdmin } from "@/lib/auth";
import { Metadata } from "next";
import { LocalePageProps } from "@/app/[locale]/layout";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { redirect, routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import AdminWrapper from "@/admin/wrapper";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("admin")
     return {
          title: {
               absolute: t("title"),
               template: `%s | ${t("title-prefix")}`
          }
     }
}

export default async function RootLayout({children, params}: LocalePageProps & Readonly<{children: React.ReactNode}>){
     const {locale} = await params
     if (!hasLocale(routing.locales, locale)) notFound();
     const isAdmin = await getIsAdmin();
     if(!isAdmin)  redirect({
          href: "/",
          locale
     });
     return (
          <AdminWrapper>
               {children}
          </AdminWrapper>
     )
}