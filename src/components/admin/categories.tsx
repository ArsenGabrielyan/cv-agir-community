"use client"
import { useTranslations } from "next-intl"
import SidebarContentWrapper from "../sidebar-content"
import TableLoader from "../loaders/table"
import { ResumeTemplateCategory } from "@db"
import dynamic from "next/dynamic"
import { CATEGORY_COLS } from "../data-tables/columns/categories"
import { Button } from "../ui/button"
import { ChevronLeft, Edit, Trash2 } from "lucide-react"
import { Link } from "@/i18n/routing"
import { formatDate } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { CircleFlagLanguage } from "react-circle-flags"

const CategoryTable = dynamic(()=>import("../data-tables/tables/categories"),{
     loading: () => <TableLoader
          rows={10}
          cols={3}
     />
})

interface CategoriesContentProps{
     data: ResumeTemplateCategory[]
}
export default function CategoriesContent({data}: CategoriesContentProps){
     const t = useTranslations("admin")
     return (
          <SidebarContentWrapper title={t("categories.title")}>
               <CategoryTable
                    columns={CATEGORY_COLS}
                    data={data}
               />
          </SidebarContentWrapper>
     )
}

interface CategoryReadSectionProps{
     data: ResumeTemplateCategory
}
export function CategoryReadSection({data}: CategoryReadSectionProps){
     const headingTxt = useTranslations("table.heading")
     const t = useTranslations("admin")
     const btnTxt = useTranslations("buttons")
     return (
          <SidebarContentWrapper title={t("categories.read-title")}>
               <div className="space-y-4 mb-4">
                    <div className="flex items-center gap-2.5">
                         <Button variant="outline" asChild>
                              <Link href="/admin/templates">
                                   <ChevronLeft/>
                                   {btnTxt("go-back")}
                              </Link>
                         </Button>
                         <Button variant="outline">
                              <Edit/>
                              {btnTxt("edit")}
                         </Button>
                         <Button variant="destructive">
                              <Trash2/>
                              {btnTxt("delete")}
                         </Button>
                    </div>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                         <div className="flex-1">
                              <h2 className="text-lg font-semibold">{headingTxt("categories.name")}</h2>
                              <p className="text-sm md:text-base text-muted-foreground">{data.name}</p>
                         </div>
                         <div className="flex-1">
                              <h2 className="text-lg font-semibold">{headingTxt("createdAt")}</h2>
                              <p className="text-sm md:text-base text-muted-foreground">{formatDate(data.createdAt,"yyyy-MM-dd, HH:mm:ss")}</p>
                         </div>
                         {data.createdAt.getTime()!==data.updatedAt.getTime() && (
                              <div className="flex-1">
                                   <h2 className="text-lg font-semibold">{headingTxt("updatedAt")}</h2>
                                   <p className="text-sm md:text-base text-muted-foreground">{formatDate(data.createdAt,"yyyy-MM-dd, HH:mm:ss")}</p>
                              </div>
                         )}
                    </div>
               </div>
          </SidebarContentWrapper>
     )
}