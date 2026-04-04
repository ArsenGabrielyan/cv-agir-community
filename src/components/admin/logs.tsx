"use client"
import { useTranslations } from "next-intl"
import SidebarContentWrapper from "../sidebar-content"

export default function AuditLogContent(){
     const t = useTranslations("admin")
     return (
          <SidebarContentWrapper title={t("audit-log.title")}>
               TODO: Make an Audit log page
          </SidebarContentWrapper>
     )
}