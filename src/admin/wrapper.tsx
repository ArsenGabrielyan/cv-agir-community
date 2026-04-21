"use client"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Logo from "@/components/layout/logo";
import LanguageSwitcher from "@/components/lang-switcher";
import { AdminLink } from "@/components/layout/sidebar/sidebar-item";
import { ADMIN_LINKS } from "@/lib/constants/links";
import ThemeToggler from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useRouter } from '@/i18n/routing'
import { useTranslations } from "next-intl";

interface AdminWrapperProps{
     children: React.ReactNode
}
export default function AdminWrapper({children}: AdminWrapperProps){
     const router = useRouter()
     const btnTxt = useTranslations("buttons")
     const refreshData = () => router.refresh()
     return (
          <SidebarProvider>
               <Sidebar>
                    <SidebarHeader className="items-center pt-4">
                         <Logo href="/admin" width={200} height={64} isAdmin/>
                    </SidebarHeader>
                    <SidebarContent>
                         <SidebarGroup>
                              <SidebarGroupContent>
                                   <SidebarMenu>
                                        {ADMIN_LINKS.map((link)=>(
                                             <AdminLink key={link.id} data={link}/>
                                        ))}
                                   </SidebarMenu>
                              </SidebarGroupContent>
                         </SidebarGroup>
                    </SidebarContent>
               </Sidebar>
               <main className="px-4 py-2 w-full h-full">
                    <div className="flex justify-between items-center w-full gap-2 mt-1">
                         <SidebarTrigger/>
                         <div className="flex justify-center items-center gap-2.5 mt-2">
                              <ThemeToggler/>
                              <LanguageSwitcher/>
                              <Button variant="outline" size="icon" onClick={refreshData} title={btnTxt("refresh")}>
                                   <RefreshCw/>
                              </Button>
                         </div>
                    </div>
                    {children}
               </main>
          </SidebarProvider>
     )
}