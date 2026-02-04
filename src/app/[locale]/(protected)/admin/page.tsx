import AdminPageWrapper from "@/components/admin-components/admin-wrapper";
import { getIsAdmin } from "@/lib/auth";
import { Metadata } from "next";
import { LocalePageProps } from "@/app/[locale]/layout";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { redirect, routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("admin")
     return {
          title: t("title")
     }
}

export default async function AdminPage({params}: LocalePageProps){
     const {locale} = await params
     if (!hasLocale(routing.locales, locale)) {
          notFound();
     }
     const isAdmin = await getIsAdmin();
     if(!isAdmin){
          redirect({
               href: "/",
               locale
          });
     }
     return (
          <AdminPageWrapper locale={locale}/>
     )
}