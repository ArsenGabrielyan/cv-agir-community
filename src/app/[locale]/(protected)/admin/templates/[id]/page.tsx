import { getTemplateById } from "@/actions/admin/templates";
import { TemplateReadSection } from "@/components/admin/templates";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("admin")
     return {
          title: t("templates.title")
     }
}

export default async function TemplatePage({params}: {
     params: Promise<{id: string}>
}){
     const {id} = await params
     const template = await getTemplateById(id);
     if(!template) return notFound();
     return (
          <TemplateReadSection
               data={template}
          />
     )
}