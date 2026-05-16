"use client"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

interface SidebarContentWrapperProps{
     title: string,
     children: React.ReactNode,
     includeBackButton?: boolean
}
export default function SidebarContentWrapper({title, children, includeBackButton=false}: SidebarContentWrapperProps){
     const t = useTranslations("admin.main")
     return (
          <>
          <div className="flex justify-between items-center gap-5 my-4 w-full">
               <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2">{title}</h1>
               {includeBackButton && (
                    <Button variant="outline" asChild>
                         <Link href="/">
                              <ChevronLeft/>
                              {t("back")}
                         </Link>
                    </Button>
               )}
          </div>
          {children}
          </>
     )
}