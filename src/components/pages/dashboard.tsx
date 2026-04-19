"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResumeServerData } from "@/lib/types/server"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import DocPageLoader from "../loaders/doc-page"
import { useRouter } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { CoverLetter } from "@db"
import SidebarContentWrapper from "../sidebar-content"

const ResumeTab = dynamic(()=>import("@/components/dashboard/tabs/resume"),{
     loading: DocPageLoader,
     ssr: false
})
const CoverLetterTab = dynamic(()=>import("@/components/dashboard/tabs/cover-letter"),{
     loading: DocPageLoader,
     ssr: false
})

interface DashboardContentProps{
     resumes: ResumeServerData[],
     coverLetters: CoverLetter[]
     initialValue?: string
}
export default function DashboardContent({resumes, initialValue="resume", coverLetters}: DashboardContentProps){
     const searchParams = useSearchParams();
     const show = searchParams.get("show") || initialValue;
     const router = useRouter();
     const onChangeTabs = (tab: string) => {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("show",tab)
          router.push(`?${newSearchParams.toString()}`)
     }
     const t = useTranslations("dashboard")
     return (
          <SidebarContentWrapper title={t("title")}>
               <Tabs defaultValue={show} onValueChange={onChangeTabs}>
                    <TabsList className="w-full">
                         <TabsTrigger value="resume" className="flex-1">{t("resumes.title")}</TabsTrigger>
                         <TabsTrigger value="cover-letter" className="flex-1">{t("cover-letters.title")}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="resume">
                         <ResumeTab resumes={resumes} t={t}/>
                    </TabsContent>
                    <TabsContent value="cover-letter">
                         <CoverLetterTab coverLetters={coverLetters} t={t}/>
                    </TabsContent>
               </Tabs>
          </SidebarContentWrapper>
     )
}