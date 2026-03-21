import PageLayout from "@/components/layout/page-layout";
import { resumeDataInclude } from "@/lib/types/resume";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { getResumeCountByUserId } from "@/data/resumes";
import DashboardContent from "@/components/pages/dashboard";
import { redirect, routing } from "@/i18n/routing";
import { LocalePageProps } from "@/app/[locale]/layout";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

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
     const [resumes, totalCount, coverLetters] = await Promise.all([
          db.resume.findMany({
               where: { userId: user.id },
               orderBy: { updatedAt: "desc" },
               include: resumeDataInclude
          }),
          getResumeCountByUserId(user.id),
          db.coverLetter.findMany({
               where: { userId: user.id },
               orderBy: { updatedAt: "desc" },
          })
     ])
     return (
          <PageLayout sidebarMode>
               <DashboardContent
                    coverLetters={coverLetters}
                    resumes={resumes}
                    totalCount={totalCount}
                    initialValue={show}
               />
          </PageLayout>
     )
}