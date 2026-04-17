"use client"
import { dateFNSLocales } from "@/i18n/config"
import { formatAuditLog } from "@/lib/helpers/audit-logs"
import { AuditLogServerData } from "@/lib/types/admin"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { CircleAlert, Clock } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

interface AuditLogCardProps{
     data: AuditLogServerData
}
export default function AuditLogCard({data}: AuditLogCardProps){
     const t = useTranslations("audit-log")
     const locale = useLocale()
     const record = formatAuditLog(data,t)
     console.info(record)
     return (
          <div className="pb-2 px-2 border-b last:border-b-0 space-y-2">
               <h2 className={cn("text-lg md:text-xl font-semibold inline-flex items-center justify-center w-fit gap-2",record.isError && "text-destructive")}>
                    {record.isError && <CircleAlert className="size-5"/>}
                    {record.primaryText}
               </h2>
               <p className="text-sm md:text-base text-muted-foreground">{record.secondaryText}</p>
               <div className="text-sm md:text-base flex items-center justify-center w-fit gap-2">
                    <Clock className="size-5"/>
                    {formatDistanceToNow(data.createdAt, { locale: dateFNSLocales[locale], addSuffix: true })}
               </div>
          </div>
     )
}