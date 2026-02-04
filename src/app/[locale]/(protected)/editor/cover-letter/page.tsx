import PageLayout from "@/components/layout/page-layout";
import { currentUser } from "@/lib/auth";
import { Metadata } from "next";
import { getCoverLetterById } from "@/data/cover-letters";
import dynamic from "next/dynamic";
import DocEditorLoader from "@/components/loaders/doc-editor";
import { LocalePageProps } from "@/app/[locale]/layout";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { redirect, routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("editor.cover-letter");
     return {
          title: t("title")
     }
}
const CoverLetterEditor = dynamic(()=>import("./cl-editor"),{
     loading: DocEditorLoader
})
export default async function CoverLetterEditorPage({searchParams, params}: LocalePageProps & {
     searchParams: Promise<{ coverLetterId?: string}>
}){
     const {locale} = await params
     if (!hasLocale(routing.locales, locale)) {
          notFound();
     }
     const {coverLetterId} = await searchParams
     const user = await currentUser();
     if(!user || !user.id){
          redirect({
               href: "/auth/login",
               locale
          });
          return;
     }
     const letter = coverLetterId ? await getCoverLetterById(coverLetterId) : null
     return (
          <PageLayout editorPage>
               <CoverLetterEditor letterToEdit={letter} userData={user}/>
          </PageLayout>
     )
}