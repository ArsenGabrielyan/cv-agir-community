import { getTemplateList } from "@/actions/admin/templates";
import TemplatesAdminContent from "@/components/admin/templates";
import { IAdminAPISearchParams } from "@/lib/types/admin";
import { TemplateServerData } from "@/lib/types/resume";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("admin")
     return {
          title: t("templates.title")
     }
}

export default async function TemplatesPage({searchParams}: {
     searchParams: Promise<IAdminAPISearchParams<TemplateServerData>>
}){
     const templates = await getTemplateList(await searchParams)
     const categories = templates.map(val=>({
          name: val.category.name,
          id: val.categoryId
     }))
     return (
          <TemplatesAdminContent
               data={templates}
               categories={categories.reduce<{name: string, id: string}[]>((acc, current) => {
                    const x = acc.find(item => item.id === current.id);
                    return !x ? acc.concat([current]) : acc
               }, [])}
          />
     )
}