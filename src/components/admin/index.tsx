"use client"
import { useTranslations } from "next-intl"
import SidebarContentWrapper from "../sidebar-content"

export default function AdminContent(){
     const t = useTranslations("admin")
     return (
          <SidebarContentWrapper title={t("title")}>
               TODO: Make an Admin main page
          </SidebarContentWrapper>
     )
}