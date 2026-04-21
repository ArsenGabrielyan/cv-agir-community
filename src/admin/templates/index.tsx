"use client"
import { useTranslations } from "next-intl"
import SidebarContentWrapper from "@/components/sidebar-content"
import dynamic from "next/dynamic"
import { TEMPLATE_COLS } from "./cols"
import { TemplateServerData } from "@/lib/types/server"
import TemplatesTableLoader from "@/components/loaders/table/templates"
import useCRUD from "@/hooks/use-crud"

const TemplatesTable = dynamic(()=>import("./table"),{
     loading: TemplatesTableLoader
})

interface TemplatesAdminContentProps{
     data: TemplateServerData[],
     categories: {name: string, id: string}[]
}
export default function TemplatesAdminContent({data, categories}: TemplatesAdminContentProps){
     const t = useTranslations("admin")
     const {data: templates, create, update, remove, bulkDelete} = useCRUD(data)
     return (
          <SidebarContentWrapper title={t("templates.title")}>
               <TemplatesTable
                    columns={TEMPLATE_COLS(categories, update, remove)}
                    data={templates}
                    categories={categories}
                    create={create}
                    update={update}
                    bulkDelete={bulkDelete}
               />
          </SidebarContentWrapper>
     )
}