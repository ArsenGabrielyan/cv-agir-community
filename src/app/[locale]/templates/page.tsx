import { getResumeTemplates } from "@/data/resumes";
import PageLayout from "@/components/layout/page-layout";
import { Metadata } from "next";
import { LocalePageProps } from "../layout";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import TemplatesContent from "@/components/pages/templates";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("templates");
     return {
          title: t("metaTitle"),
          description: t("desc")
     }
}

export default async function TemplatesPage({params}: LocalePageProps){
     const {locale} = await params
     if (!hasLocale(routing.locales, locale)) {
          notFound();
     }
     const templates = await getResumeTemplates(locale);
     return (
          <PageLayout landingFooter>
               <TemplatesContent templates={templates} />
          </PageLayout>
     )
}