"use client"
import { useLocale, useTranslations } from "next-intl"
import SidebarContentWrapper from "../sidebar-content"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Link, redirect } from "@/i18n/routing"
import { Button } from "../ui/button"
import { ChevronLeft, FileText, FileUser, LayoutTemplate, List, Users } from "lucide-react"

interface AdminContentProps{
     cvCount: number,
     clCount: number,
     templateCount: number,
     categoryCount: number,
     usersCount: number
}
export default function AdminContent({cvCount, clCount, templateCount, categoryCount, usersCount}: AdminContentProps){
     const t = useTranslations("admin.main")
     const locale = useLocale()
     const user = useCurrentUser()
     if(!user) return redirect({ href: "/", locale })
     return (
          <SidebarContentWrapper title={t("title",{user: user?.name?.split(" ")[0] ?? "Admin"})}>
               <div className="space-y-4">
                    <p className="text-sm md:text-base text-muted-foreground">{t("desc")}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full">
                         <div className="p-4 border shadow rounded-md bg-card text-card-foreground flex justify-between items-center gap-2">
                              <div className="text-primary bg-secondary rounded-md size-20 p-3 flex justify-center items-center">
                                   <FileUser className="size-20"/>
                              </div>
                              <div className="space-y-2 text-right">
                                   <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">{cvCount}</p>
                                   <p className="text-lg md:text-xl font-semibold text-muted-foreground">{t("prefixes.resume")}</p>
                              </div>
                         </div>
                         <div className="p-4 border shadow rounded-md bg-card text-card-foreground flex justify-between items-center gap-2">
                              <div className="text-primary bg-secondary rounded-md size-20 p-3 flex justify-center items-center">
                                   <FileText className="size-20"/>
                              </div>
                              <div className="space-y-2 text-right">
                                   <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">{clCount}</p>
                                   <p className="text-lg md:text-xl font-semibold text-muted-foreground">{t("prefixes.cover-letter")}</p>
                              </div>
                         </div>
                         <div className="p-4 border shadow rounded-md bg-card text-card-foreground flex justify-between items-center gap-2">
                              <div className="text-primary bg-secondary rounded-md size-20 p-3 flex justify-center items-center">
                                   <LayoutTemplate className="size-20"/>
                              </div>
                              <div className="space-y-2 text-right">
                                   <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">{templateCount}</p>
                                   <p className="text-lg md:text-xl font-semibold text-muted-foreground">{t("prefixes.templates")}</p>
                              </div>
                         </div>
                         <div className="p-4 border shadow rounded-md bg-card text-card-foreground flex justify-between items-center gap-2">
                              <div className="text-primary bg-secondary rounded-md size-20 p-3 flex justify-center items-center">
                                   <List className="size-20"/>
                              </div>
                              <div className="space-y-2 text-right">
                                   <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">{categoryCount}</p>
                                   <p className="text-lg md:text-xl font-semibold text-muted-foreground">{t("prefixes.categories")}</p>
                              </div>
                         </div>
                         <div className="p-4 border shadow rounded-md bg-card text-card-foreground flex justify-between items-center gap-2">
                              <div className="text-primary bg-secondary rounded-md size-20 p-3 flex justify-center items-center">
                                   <Users className="size-20"/>
                              </div>
                              <div className="space-y-2 text-right">
                                   <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">{usersCount}</p>
                                   <p className="text-lg md:text-xl font-semibold text-muted-foreground">{t("prefixes.users")}</p>
                              </div>
                         </div>
                    </div>
                    <Button variant="outline" asChild>
                         <Link href="/">
                              <ChevronLeft/>
                              {t("back")}
                         </Link>
                    </Button>
               </div>
          </SidebarContentWrapper>
     )
}