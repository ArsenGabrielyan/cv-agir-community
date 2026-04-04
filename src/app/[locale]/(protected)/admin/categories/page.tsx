import { getCategoriesList } from "@/actions/admin/categories";
import CategoriesContent from "@/components/admin/categories";
import { IAdminAPISearchParams } from "@/lib/types/admin";
import { ResumeTemplateCategory } from "@db";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("admin")
     return {
          title: t("categories.title")
     }
}

export default async function CategoriesPage({searchParams}: {
     searchParams: Promise<IAdminAPISearchParams<ResumeTemplateCategory>>
}){
     const categories = await getCategoriesList(await searchParams)
     return (
          <CategoriesContent
               data={categories}
          />
     )
}