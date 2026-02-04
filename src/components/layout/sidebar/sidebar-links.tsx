"use client"
import {
     SidebarGroup,
     SidebarGroupContent,
     SidebarGroupLabel,
     SidebarMenu
} from "@/components/ui/sidebar";
import { SIDEBAR_LINKS } from "@/lib/constants/links";
import SidebarItem from "./sidebar-item";
import { useTranslations } from "next-intl";

export default function SidebarLinks(){
     const errMsg = useTranslations("error-messages")
     const t = useTranslations("dashboard")
     return (
          <SidebarGroup>
               <SidebarGroupLabel>{t("menu")}</SidebarGroupLabel>
               <SidebarGroupContent>
                    <SidebarMenu>
                         {SIDEBAR_LINKS.map((link)=>(
                              <SidebarItem key={link.id} data={link}/>
                         ))}
                    </SidebarMenu>
               </SidebarGroupContent>
          </SidebarGroup>
     )
}