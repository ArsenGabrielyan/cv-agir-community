import { getTemplateById } from "@/actions/admin/templates";
import { TemplateReadSection } from "@/admin/templates";
import { getAllCategories } from "@/data/resumes";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { cache } from "react";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("admin")
     return {
          title: t("templates.title")
     }
}

const fetchTemplate = cache(getTemplateById);
const fetchCategories = cache(getAllCategories)

export default async function TemplatePage({params}: {
     params: Promise<{id: string}>
}){
     const {id} = await params
     const [template, allCategories] = await Promise.all([
          fetchTemplate(id),
          fetchCategories()
     ]);
     if(!template) return notFound();
     const categories = allCategories.reduce<{name: string, id: string}[]>((acc, current) => {
          const x = acc.find(item => item.id === current.id);
          return !x ? acc.concat([current]) : acc
     }, [])
     return (
          <TemplateReadSection
               data={template}
               categories={categories}
          />
     )
}