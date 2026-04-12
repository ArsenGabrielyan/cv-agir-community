"use client"
import { useTranslations } from "next-intl"
import SidebarContentWrapper from "../sidebar-content"
import { ResumeTemplateCategory } from "@db"
import CategoryFormModal from "./modal/categories"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { Download, FilterX, List, Plus, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { exportCSV } from "@/lib/helpers"
import ActionsCell from "@/data-tables/cells/category-actions"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "../ui/empty"

interface CategoriesContentProps{
     data: ResumeTemplateCategory[]
}
export default function CategoriesContent({data}: CategoriesContentProps){
     const t = useTranslations("admin")
     const tableTxt = useTranslations("table")
     const btnTxt = useTranslations("buttons")
     const [search, setSearch] = useState("")
     const exportCsv = () => {
          const headers = ["id","name","createdAt","updatedAt"]
          exportCSV({
               headers,
               data,
               fileName: "categories.csv"
          })
     }
     return (
          <SidebarContentWrapper title={t("categories.title")}>
               <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4 w-full">
                         <InputGroup className="max-w-lg">
                              <InputGroupInput
                                   placeholder={tableTxt("filter.categories")}
                                   value={search}
                                   onChange={(event) => setSearch(event.target.value) }
                              />
                              <InputGroupAddon>
                                   <SearchIcon/>
                              </InputGroupAddon>
                         </InputGroup>
                         <div className="flex items-center gap-2">
                              {search.length>0 && (
                                   <Button variant="destructive" onClick={()=>setSearch("")}>
                                        <FilterX/>
                                        {btnTxt("clear-filters")}
                                   </Button>
                              )}
                              <CategoryFormModal triggerBtn={(
                                   <Button variant="outline" type="button">
                                        <Plus/>
                                        {btnTxt("create")}
                                   </Button>
                              )}/>
                              <Button variant="outline" onClick={()=>exportCsv()}>
                                   <Download/>
                                   {btnTxt("export")}
                              </Button>
                         </div>
                    </div>
                    {data.length<=0 ? (
                         <Empty>
                              <EmptyHeader>
                                   <EmptyMedia variant="icon">
                                        <List/>
                                   </EmptyMedia>
                                   <EmptyTitle>{t("empty-category.title")}</EmptyTitle>
                                   <EmptyDescription>{t("empty-category.desc")}</EmptyDescription>
                              </EmptyHeader>
                         </Empty>
                    ) : data.filter(val=>val.name.toLowerCase().includes(search.toLowerCase())).map(category=>(
                         <div key={category.id} className="p-4 border shadow-md bg-card text-card-foreground rounded-md flex justify-between items-center gap-2">
                              <h2 className="text-base sm:text-lg md:text-xl font-semibold">{category.name}</h2>
                              <ActionsCell
                                   item={category}
                              />
                         </div>
                    ))}
               </div>
          </SidebarContentWrapper>
     )
}