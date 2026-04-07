import PageLayout from "@/components/layout/page-layout";
import { currentUser } from "@/lib/auth";
import { Metadata } from "next";
import DashboardContent from "@/components/pages/dashboard";
import { routing } from "@/i18n/routing";
import { LocalePageProps } from "@/app/[locale]/layout";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getDashboardByUserId } from "@/data/user";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("dashboard");
     return {
          title: t("title")
     }
}

export default async function DashboardPage({searchParams, params}: LocalePageProps & {
     searchParams: Promise<{show: string}>
}){
     const {locale} = await params
     if (!hasLocale(routing.locales, locale)) {
          notFound();
     }
     const user = await currentUser();
     const {show} = await searchParams;
     if(!user || !user.id){
          return null;
     }
     const [resumes, coverLetters] = await getDashboardByUserId(user.id)
     return (
          <PageLayout sidebarMode>
               <DashboardContent
                    coverLetters={coverLetters}
                    resumes={resumes}
                    initialValue={show}
               />
          </PageLayout>
     )
}