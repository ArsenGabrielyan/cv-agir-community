"use client"
import { useTranslations } from "next-intl"
import SidebarContentWrapper from "../../sidebar-content"
import { AuditLogServerData, QuickFilterType } from "@/lib/types/admin"
import { PaginationWithLinks } from "@/components/pagination-with-links"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { FilterX, SearchIcon } from "lucide-react"
import { useMemo, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { AUDIT_QUICK_FILTERS } from "@/lib/constants"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AuditAction } from "@db"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import AuditLogContentLoader from "@/components/loaders/audit-log-loader"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { isWithinDateRange } from "@/lib/helpers"

const AuditLogsList = dynamic(()=>import("./audit-logs"),{
     loading: AuditLogContentLoader
})

interface AuditLogContentProps{
     data: AuditLogServerData[],
     page: number,
     pageSize: number,
     query: string
}
export default function AuditLogContent({data, page, pageSize, query}: AuditLogContentProps){
     const t = useTranslations("admin")
     const auditTxt = useTranslations("audit-log")
     const [search, setSearch] = useState(query)
     const [categories, setCategories] = useState("")
     const [dates, setDates] = useState({
          from: "", to: ""
     })
     const updateDates = (overrides: Partial<typeof dates>) => setDates(prev=>({
          ...prev,
          ...overrides
     }))
     const auditLogs = useMemo(() => {
          const categoryFilters = categories ? categories.split(",") : [];
          return data
               .filter((val) => isWithinDateRange(val.createdAt,dates.from,dates.to))
               .filter(item => categoryFilters.length === 0 ? true : categoryFilters.includes(item.action) )
               .filter(item =>item.action.toLowerCase().includes(search.toLowerCase()));
     }, [data, search, categories, dates]);
     
     const filters = Object.entries(AUDIT_QUICK_FILTERS) as [QuickFilterType,AuditAction[]][]
     const isEmpty = useMemo(()=>categories.trim()==="" && search.trim()==="",[search, categories])
     return (
          <SidebarContentWrapper title={t("audit-log.title")}>
               <div className="space-y-4 mb-4 w-full">
                    <div className="flex items-center justify-between gap-4 w-full">
                         <InputGroup className="max-w-lg">
                              <InputGroupInput
                                   placeholder="Որոնել իրադարձություն"
                                   value={search}
                                   onChange={e=>setSearch(e.target.value)}
                              />
                              <InputGroupAddon>
                                   <SearchIcon/>
                              </InputGroupAddon>
                         </InputGroup>
                         <div className="flex items-center gap-4">
                              {!isEmpty && (
                                   <Button variant="destructive" onClick={() => {
                                        setSearch("");
                                        setCategories("");
                                        setDates({ from: "", to: "" });
                                   }}>
                                        <FilterX/>
                                        Մաքրել Ֆիլտրը
                                   </Button>
                              )}
                              <div className="space-y-2">
                                   <Label>Ֆիլտրել ըստ տեսակի</Label>
                                   <Select value={categories} onValueChange={setCategories}>
                                        <SelectTrigger>
                                             <SelectValue placeholder="Տեասկ"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                             {filters.map(([k,filters])=>(
                                                  <SelectItem key={k} value={filters.join(",")}>
                                                       {auditTxt(`categories.${k}`)}
                                                  </SelectItem>
                                             ))}
                                        </SelectContent>
                                   </Select>   
                              </div>
                              <div className="space-y-2">
                                   <Label>{auditTxt("date.from")}</Label>
                                   <Input
                                        type="date"
                                        value={dates.from}
                                        onChange={e=>updateDates({from: e.target.value})}
                                   />
                              </div>
                              <div className="space-y-2">
                                   <Label>{auditTxt("date.to")}</Label>
                                   <Input
                                        type="date"
                                        value={dates.to}
                                        onChange={e=>updateDates({to: e.target.value})}
                                   />
                              </div>
                         </div>
                    </div>
                    <AuditLogsList
                         auditLogs={auditLogs}
                         page={page}
                         pageSize={pageSize}
                    />
                    <PaginationWithLinks
                         pageSize={pageSize}
                         page={page}
                         totalCount={auditLogs.length}
                         navigationMode="router"
                         pageSizeSelectOptions={{
                              pageSizeOptions: [10,20,50,100,200,500,1000]
                         }}
                    />
               </div>
          </SidebarContentWrapper>
     )
}