import { getCategoryById } from "@/actions/admin/categories";
import { CategoryReadSection } from "@/components/admin/categories";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { cache } from "react";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("admin")
     return {
          title: t("categories.title")
     }
}

const fetchCategory = cache(getCategoryById)

export default async function CategoryPage({params}: {
     params: Promise<{id: string}>
}){
     const {id} = await params
     const category = await fetchCategory(id);
     if(!category) return notFound();
     return (
          <CategoryReadSection
               data={category}
          />
     )
}