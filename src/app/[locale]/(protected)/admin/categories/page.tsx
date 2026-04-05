import { getCategoriesList } from "@/actions/admin/categories";
import CategoriesContent from "@/components/admin/categories";
import { IAdminAPISearchParams } from "@/lib/types/admin";
import { ResumeTemplateCategory } from "@db";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cache } from "react";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("admin")
     return {
          title: t("categories.title")
     }
}

const fetchCategories = cache(getCategoriesList)

export default async function CategoriesPage({searchParams}: {
     searchParams: Promise<IAdminAPISearchParams<ResumeTemplateCategory>>
}){
     const categories = await fetchCategories(await searchParams)
     return (
          <CategoriesContent
               data={categories}
          />
     )
}