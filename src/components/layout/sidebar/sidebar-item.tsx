"use client"
import { IAdminLink, ISidebarLink } from "@/lib/types/links";
import { Link, usePathname } from "@/i18n/routing";
import {
     SidebarMenuItem,
     SidebarMenuButton,
     SidebarMenuSub,
     SidebarMenuSubItem,
     SidebarMenuSubButton
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface SidebarItemProps{
     data: ISidebarLink,
}
export default function SidebarItem({data}: SidebarItemProps){
     const {name,href,Icon, dropdown} = data
     const currentRoute = usePathname();
     const sidebarLink = useTranslations("dashboard.links");
     const navLink = useTranslations("nav-links")
     return (dropdown && dropdown.length > 0) ? (
          <Collapsible className="group/collapsible">
               <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                         <SidebarMenuButton>
                              <Icon/>
                              {sidebarLink(name)}
                              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"/>
                         </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                         <SidebarMenuSub>
                              {dropdown.map(({id,name,href})=>(
                                   <SidebarMenuSubItem key={id}>
                                        <SidebarMenuSubButton asChild>
                                             <Link href={href}>{navLink(name)}</Link>
                                        </SidebarMenuSubButton>
                                   </SidebarMenuSubItem>
                              ))} 
                         </SidebarMenuSub>
                    </CollapsibleContent>
               </SidebarMenuItem>
          </Collapsible>
     ) : (
          <SidebarMenuItem>
               {href ? (
                    <SidebarMenuButton asChild>
                         <Link href={href} className={cn(currentRoute===href && "text-primary font-semibold")}>
                              <Icon/>
                              {sidebarLink(name)}
                         </Link>
                    </SidebarMenuButton>
               ) : (
                    <SidebarMenuButton>
                         <Icon/>
                         {sidebarLink(name)}
                    </SidebarMenuButton>
               )}
          </SidebarMenuItem>
     )
}
interface AdminLinkProps{
     data: IAdminLink,
}
export function AdminLink({data}: AdminLinkProps){
     const {name,href,Icon} = data
     const currentRoute = usePathname();
     const t = useTranslations("admin.links");
     return (
          <SidebarMenuItem>
               {href ? (
                    <SidebarMenuButton asChild>
                         <Link href={href} className={cn(currentRoute===href && "text-primary font-semibold")}>
                              <Icon/>
                              {t(name)}
                         </Link>
                    </SidebarMenuButton>
               ) : (
                    <SidebarMenuButton>
                         <Icon/>
                         {t(name)}
                    </SidebarMenuButton>
               )}
          </SidebarMenuItem>
     )
}