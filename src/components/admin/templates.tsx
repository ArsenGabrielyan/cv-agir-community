"use client"
import { useTranslations } from "next-intl"
import SidebarContentWrapper from "../sidebar-content"
import dynamic from "next/dynamic"
import { TEMPLATE_COLS } from "../../data-tables/columns/templates"
import { TemplateServerData } from "@/lib/types/resume"
import { Button } from "../ui/button"
import { ChevronLeft, Edit, Trash2 } from "lucide-react"
import { Link, useRouter } from "@/i18n/routing"
import { formatDate } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { CircleFlagLanguage } from "react-circle-flags"
import TemplateFormModal from "./modal/templates"
import TemplatesTableLoader from "../loaders/table/templates"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { useTransition } from "react"
import { deleteTemplate } from "@/actions/admin/templates"
import { toast } from "sonner"

const TemplatesTable = dynamic(()=>import("../../data-tables/tables/templates"),{
     loading: TemplatesTableLoader
})

interface TemplatesAdminContentProps{
     data: TemplateServerData[],
     categories: {name: string, id: string}[]
}
export default function TemplatesAdminContent({data, categories}: TemplatesAdminContentProps){
     const t = useTranslations("admin")
     return (
          <SidebarContentWrapper title={t("templates.title")}>
               <TemplatesTable
                    columns={TEMPLATE_COLS(categories)}
                    data={data}
                    categories={categories}
               />
          </SidebarContentWrapper>
     )
}

interface TemplateReadSectionProps{
     data: TemplateServerData
     categories: {name: string, id: string}[]
}
export function TemplateReadSection({data, categories}: TemplateReadSectionProps) {
     const langTxt = useTranslations("langs")
     const headingTxt = useTranslations("table.heading")
     const t = useTranslations("admin")
     const router = useRouter()
     const errMsg = useTranslations("error-messages")
     const [isPending, startTransition] = useTransition()
     const btnTxt = useTranslations("buttons")
     const onAccept = () => {
          startTransition(async()=>{
               try {
                    if(!data.id) return
                    const result = await deleteTemplate(data.id)
                    if(result.error) toast.error(result.error);
                    if(result.success) {
                         router.replace("/admin/templates")
                    }
               } catch (err) {
                    toast.error(errMsg("unknownError"))
                    console.error(err)
               }
          })
     }
     return (
          <SidebarContentWrapper title={data.name ?? t("templates.default-title")}>
               <div className="space-y-4 mb-4">
                    <p className="text-sm md:text-base text-muted-foreground">{data.description}</p>
                    <div className="flex items-center gap-2.5">
                         <Button variant="outline" asChild>
                              <Link href="/admin/templates">
                                   <ChevronLeft/>
                                   {btnTxt("go-back")}
                              </Link>
                         </Button>
                         <TemplateFormModal
                              data={data}
                              id={data.id}
                              categories={categories}
                              triggerBtn={(
                                   <Button variant="outline">
                                        <Edit/>
                                        {btnTxt("edit")}
                                   </Button>
                              )}
                         />
                         <AlertDialog>
                              <AlertDialogTrigger asChild>
                                   <Button variant="destructive">
                                        <Trash2/>
                                        {btnTxt("delete")}
                                   </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                   <AlertDialogHeader>
                                        <AlertDialogTitle>{t("dialog.template.single")}</AlertDialogTitle>
                                        <AlertDialogDescription>{t("dialog.desc")}</AlertDialogDescription>
                                   </AlertDialogHeader>
                                   <AlertDialogFooter>
                                        <AlertDialogAction
                                             variant="destructive"
                                             onClick={onAccept}
                                             disabled={isPending}
                                        >
                                             <Trash2/>
                                             {btnTxt("delete")}
                                        </AlertDialogAction>
                                        <AlertDialogCancel>
                                             {btnTxt("close")}
                                        </AlertDialogCancel>
                                   </AlertDialogFooter>
                              </AlertDialogContent>
                         </AlertDialog>
                    </div>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                         <div className="flex-1">
                              <h2 className="text-lg font-semibold">{headingTxt("templates.category")}</h2>
                              <p className="text-sm md:text-base text-muted-foreground">{data.category.name}</p>
                         </div>
                         <div className="flex-1">
                              <h2 className="text-lg font-semibold">{headingTxt("templates.locale")}</h2>
                              <div className="flex items-center gap-2">
                                   <CircleFlagLanguage languageCode={data.locale ?? "xx"} width={18} height={18}/>
                                   {langTxt(data.locale ?? "unknown")}
                              </div>
                         </div>
                         <div className="flex-1">
                              <h2 className="text-lg font-semibold">{headingTxt("templates.imageName")}</h2>
                              <p className="text-sm md:text-base text-muted-foreground">{data.imageName}</p>
                         </div>
                         <div className="flex-1">
                              <h2 className="text-lg font-semibold">{headingTxt("createdAt")}</h2>
                              <p className="text-sm md:text-base text-muted-foreground">{formatDate(data.createdAt,"yyyy-MM-dd, HH:mm:ss")}</p>
                         </div>
                         {data.createdAt.getTime()!==data.updatedAt.getTime() && (
                              <div className="flex-1">
                                   <h2 className="text-lg font-semibold">{headingTxt("updatedAt")}</h2>
                                   <p className="text-sm md:text-base text-muted-foreground">{formatDate(data.createdAt,"yyyy-MM-dd, HH:mm:ss")}</p>
                              </div>
                         )}
                    </div>
                    <Tabs defaultValue="html" className="w-full">
                         <TabsList className="w-full">
                              <TabsTrigger value="html">{headingTxt("templates.htmlTemplate")}</TabsTrigger>
                              <TabsTrigger value="css">{headingTxt("templates.cssStyle")}</TabsTrigger>
                         </TabsList>
                         <TabsContent value="html">
                              <div className="w-full rounded-md overflow-hidden shadow bg-accent text-accent-foreground p-4">
                                   <pre className="wrap-break-word whitespace-pre-wrap">
                                        {data.htmlTemplate}
                                   </pre>
                              </div>
                         </TabsContent>
                         <TabsContent value="css">
                              <div className="w-full rounded-md overflow-hidden shadow bg-accent text-accent-foreground p-4">
                                   <pre className="wrap-break-word whitespace-pre-wrap">
                                        {data.cssStyle}
                                   </pre>
                              </div>
                         </TabsContent>
                    </Tabs>
               </div>
          </SidebarContentWrapper>
     )
}