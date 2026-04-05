import { getTemplateList } from "@/actions/admin/templates";
import TemplatesAdminContent from "@/components/admin/templates";
import { getAllCategories } from "@/data/resumes";
import { IAdminAPISearchParams } from "@/lib/types/admin";
import { TemplateServerData } from "@/lib/types/resume";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cache } from "react";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("admin")
     return {
          title: t("templates.title")
     }
}

const fetchTemplates = cache(getTemplateList);
const fetchCategories = cache(getAllCategories)

export default async function TemplatesPage({searchParams}: {
     searchParams: Promise<IAdminAPISearchParams<TemplateServerData>>
}){
     const [templates, allCategories] = await Promise.all([
          fetchTemplates(await searchParams),
          fetchCategories()
     ])
     const categories = allCategories.reduce<{name: string, id: string}[]>((acc, current) => {
          const x = acc.find(item => item.id === current.id);
          return !x ? acc.concat([current]) : acc
     }, [])
     return (
          <TemplatesAdminContent
               data={templates}
               categories={categories}
          />
     )
}