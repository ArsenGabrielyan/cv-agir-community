import PageLayout from "@/components/layout/page-layout";
import { UserInfo } from "@/components/user-info";
import { redirect, routing } from "@/i18n/routing";
import { currentUser } from "@/lib/auth"
import { Metadata } from "next";
import { LocalePageProps } from "@/app/[locale]/layout";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("my-profile");
     return {
          title: t("title")
     }
}

export default async function ProfilePage({params}: LocalePageProps){
     const {locale} = await params
     if (!hasLocale(routing.locales, locale)) {
          notFound();
     }
     const user = await currentUser();
     if(!user || !user.id){
          redirect({
               href: "/auth/login",
               locale
          });
          return;
     }
     return (
          <PageLayout sidebarMode>
               <UserInfo user={user}/>
          </PageLayout>
     )
}