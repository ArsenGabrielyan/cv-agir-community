"use client"
import { useTranslations } from "next-intl"
import SidebarContentWrapper from "@/components/sidebar-content"
import { ResumeTemplateCategory } from "@db"
import CategoryFormModal from "./modal"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { Download, FilterX, List, Plus, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { exportCSV } from "@/lib/helpers"
import ActionsCell from "@/admin/categories/actions"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import useCRUD from "@/hooks/use-crud"

interface CategoriesContentProps{
     data: ResumeTemplateCategory[]
}
export default function CategoriesContent({data}: CategoriesContentProps){
     const t = useTranslations("admin")
     const tableTxt = useTranslations("table")
     const btnTxt = useTranslations("buttons")
     const [search, setSearch] = useState("")
     const {data: categories, create, update, remove} = useCRUD(data)
     const exportCsv = () => {
          const headers = ["id","name","createdAt","updatedAt"]
          exportCSV({
               headers,
               data: categories,
               fileName: "categories"
          })
     }
     return (
          <SidebarContentWrapper title={t("categories.title")}>
               <div className="space-y-4">
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
                              <CategoryFormModal
                                   onUpdate={(data,type)=>type==="create" ? create(data) : update(data)}
                                   triggerBtn={(
                                        <Button variant="outline" type="button">
                                             <Plus/>
                                             {btnTxt("create")}
                                        </Button>
                                   )}
                              />
                              <Button variant="outline" onClick={()=>exportCsv()}>
                                   <Download/>
                                   {btnTxt("export")}
                              </Button>
                         </div>
                    </div>
                    {categories.length<=0 ? (
                         <Empty>
                              <EmptyHeader>
                                   <EmptyMedia variant="icon">
                                        <List/>
                                   </EmptyMedia>
                                   <EmptyTitle>{t("empty-category.title")}</EmptyTitle>
                                   <EmptyDescription>{t("empty-category.desc")}</EmptyDescription>
                              </EmptyHeader>
                         </Empty>
                    ) : (
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {categories.filter(val=>val.name.toLowerCase().includes(search.toLowerCase())).map(category=>(
                                   <div key={category.id} className="p-4 border shadow-md bg-card text-card-foreground rounded-md flex justify-between items-center gap-2">
                                        <h2 className="text-base sm:text-lg md:text-xl font-semibold">{category.name}</h2>
                                        <ActionsCell
                                             onUpdate={(data,type)=>type==="delete" ? remove(data.id) : update(data)}
                                             item={category}
                                        />
                                   </div>
                              ))}
                         </div>
                    )}
               </div>
          </SidebarContentWrapper>
     )
}