import { getCategoryById } from "@/actions/admin/categories";
import { getTemplateById } from "@/actions/admin/templates";
import { CategoryReadSection } from "@/components/admin/categories";
import { TemplateReadSection } from "@/components/admin/templates";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("admin")
     return {
          title: t("categories.title")
     }
}

export default async function CategoryPage({params}: {
     params: Promise<{id: string}>
}){
     const {id} = await params
     const category = await getCategoryById(id);
     if(!category) return notFound();
     return (
          <CategoryReadSection
               data={category}
          />
     )
}