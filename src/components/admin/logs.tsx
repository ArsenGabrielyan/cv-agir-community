"use client"
import { useTranslations } from "next-intl"
import SidebarContentWrapper from "../sidebar-content"
import { AuditLogServerData } from "@/lib/types/admin"

interface AuditLogContentProps{
     data: AuditLogServerData[]
}
export default function AuditLogContent({data}: AuditLogContentProps){
     const t = useTranslations("admin")
     return (
          <SidebarContentWrapper title={t("audit-log.title")}>
               TODO: Make an Audit log page using a card and pagination<br/><br/>
               {JSON.stringify(data,undefined,4)}
          </SidebarContentWrapper>
     )
}