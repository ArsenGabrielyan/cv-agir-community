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
     const t = useTranslations("admin")
     const locale = useLocale()
     const user = useCurrentUser()
     if(!user) return redirect({ href: "/", locale })
     return (
          <SidebarContentWrapper title={`Բարի գալուստ մեր Ադմինիստրատորի վահանակ, ${user?.name?.split(" ")[0]}`}>
               <div className="space-y-4">
                    <p className="text-sm md:text-base text-muted-foreground">Այստեղ ադմինիստրատորները կարող են կառավարել կատեգորիաները և շաբլոնները, իսկ մոդերատորները կարող են վերահսկել այս վեբ հավելվածի բովանդակությունը՝ իրերը անվտանգ պահելու համար։</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full">
                         <div className="p-4 border shadow rounded-md bg-card text-card-foreground flex justify-between items-center gap-2">
                              <div className="text-primary bg-secondary rounded-md size-20 p-3 flex justify-center items-center">
                                   <FileUser className="size-20"/>
                              </div>
                              <div className="space-y-2 text-right">
                                   <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">{cvCount}</p>
                                   <p className="text-lg md:text-xl font-semibold text-muted-foreground">Ռեզյումեներ</p>
                              </div>
                         </div>
                         <div className="p-4 border shadow rounded-md bg-card text-card-foreground flex justify-between items-center gap-2">
                              <div className="text-primary bg-secondary rounded-md size-20 p-3 flex justify-center items-center">
                                   <FileText className="size-20"/>
                              </div>
                              <div className="space-y-2 text-right">
                                   <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">{clCount}</p>
                                   <p className="text-lg md:text-xl font-semibold text-muted-foreground">Ուղեկցող նամակներ</p>
                              </div>
                         </div>
                         <div className="p-4 border shadow rounded-md bg-card text-card-foreground flex justify-between items-center gap-2">
                              <div className="text-primary bg-secondary rounded-md size-20 p-3 flex justify-center items-center">
                                   <LayoutTemplate className="size-20"/>
                              </div>
                              <div className="space-y-2 text-right">
                                   <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">{templateCount}</p>
                                   <p className="text-lg md:text-xl font-semibold text-muted-foreground">Շաբլոններ</p>
                              </div>
                         </div>
                         <div className="p-4 border shadow rounded-md bg-card text-card-foreground flex justify-between items-center gap-2">
                              <div className="text-primary bg-secondary rounded-md size-20 p-3 flex justify-center items-center">
                                   <List className="size-20"/>
                              </div>
                              <div className="space-y-2 text-right">
                                   <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">{categoryCount}</p>
                                   <p className="text-lg md:text-xl font-semibold text-muted-foreground">Կատեգորիաներ</p>
                              </div>
                         </div>
                         <div className="p-4 border shadow rounded-md bg-card text-card-foreground flex justify-between items-center gap-2">
                              <div className="text-primary bg-secondary rounded-md size-20 p-3 flex justify-center items-center">
                                   <Users className="size-20"/>
                              </div>
                              <div className="space-y-2 text-right">
                                   <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">{usersCount}</p>
                                   <p className="text-lg md:text-xl font-semibold text-muted-foreground">Օգտատերներ</p>
                              </div>
                         </div>
                    </div>
                    <Button variant="outline" asChild>
                         <Link href="/">
                              <ChevronLeft/>
                              Վերադառանալ Հավելված
                         </Link>
                    </Button>
               </div>
          </SidebarContentWrapper>
     )
}