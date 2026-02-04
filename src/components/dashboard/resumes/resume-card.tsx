"use client"
import { mapToResumeValues } from "@/lib/helpers/maps"
import { ResumeServerData } from "@/lib/types"
import { formatDate } from "date-fns"
import { Link } from "@/i18n/routing"
import QRCode from "qrcode"
import { absoluteUrl } from "@/lib/utils"
import {useState, useEffect, useTransition, useRef} from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Printer, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { deleteResume } from "@/actions/resume/delete-resume"
import DeleteConfirmationDialog from "../../delete-confirmation-dialog"
import dynamic from "next/dynamic"
import DocPreviewLoader from "@/components/loaders/doc-preview"
import usePrint from "@/hooks/use-print"
import { useLocale, useTranslations } from "next-intl"
import { dateFNSLocales } from "@/i18n/config"

interface ResumeCardProps{
     data: ResumeServerData
}
const ResumePreview = dynamic(()=>import("@/components/dashboard/resumes/resume-preview"),{
     loading: () => <DocPreviewLoader/>
})
export default function ResumeCard({data}: ResumeCardProps){
     const {updatedAt, createdAt, title, description, id, template} = data;
     const [qrImg, setQrImg] = useState("/qr-placeholder.png");
     const wasUpdated = updatedAt!==createdAt;
     const contentRef = useRef<HTMLDivElement>(null);
     const t = useTranslations("dashboard");
     const locale = useLocale()
     const handlePrintResume = usePrint({
          contentRef,
          documentTitle: title || t("resumes.default-title"),
     })
     useEffect(()=>{
          if(id){
               const generateQR = async () => {
                    const img = await QRCode.toDataURL(absoluteUrl(`/cv/${id}`));
                    setQrImg(img)
               }
               generateQR();
          } else {
               setQrImg("/qr-placeholder.png")
          }
     },[id])
     return (
          <div className="relative group rounded-lg bg-card text-card-foreground border shadow">
               <div className="space-y-2">
                    <Link
                         href={`/editor?resumeId=${id}`}
                         className="relative inline-block w-full"
                    >
                         <ResumePreview
                              resumeData={mapToResumeValues(data)}
                              template={template}
                              qrImg={qrImg}
                              contentRef={contentRef}
                              className="shadow-sm group-hover:shadow-lg transition-shadow"
                              resumeId={id}
                              disableLinks
                         />
                         <span className="inline-block absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-transparent" />
                    </Link>
                    <div className="p-4 space-y-1 text-center">
                         <p className="line-clamp-1 font-semibold">{title || t("resumes.default-title")}</p>
                         {description && (
                              <p className="line-clamp-2 text-sm">{description}</p>
                         )}
                         <p className="text-xs text-muted-foreground">
                              {wasUpdated ? t("date.updated") : t("date.created")}{" "}
                              {formatDate(updatedAt,"MMM d, yyyy, HH:mm",{
                                   locale: dateFNSLocales[locale]
                              })}
                         </p>
                    </div>
               </div>
               <MoreMenu resumeId={id} onPrintClick={handlePrintResume}/>
          </div>
     )
}

interface MoreMenuProps{
     resumeId: string;
     onPrintClick: () => void,
}
function MoreMenu({resumeId,onPrintClick}: MoreMenuProps){
     const [showDelConfirmation, setShowDelConfirmation] = useState(false);
     const buttonTxt = useTranslations("buttons");
     return (
          <>
          <DropdownMenu modal={false}>
               <DropdownMenuTrigger asChild>
                    <Button
                         variant="ghost"
                         size="icon"
                         className="absolute right-0.5 bottom-0.5 opacity-0 transition-opacity group-hover:opacity-100 z-10"
                         title={buttonTxt("actions-menu")}
                    >
                         <MoreVertical className="size-4"/>
                    </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                    <DropdownMenuItem
                         className="flex items-center gap-2"
                         onClick={()=> setShowDelConfirmation(true)}
                    >
                         <Trash2 className="size-4"/>
                         {buttonTxt("delete")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                         className="flex items-center gap-2"
                         onClick={onPrintClick}
                    >
                         <Printer className="size-4"/>
                         {buttonTxt("print")}
                    </DropdownMenuItem>
               </DropdownMenuContent>
          </DropdownMenu>
          <DeleteResumeDialog
               resumeId={resumeId}
               open={showDelConfirmation}
               onOpenChange={setShowDelConfirmation}
          />
          </>
     )
}

interface DeleteResumeDialogProps{
     resumeId: string,
     open: boolean,
     onOpenChange: (open: boolean) => void
}
function DeleteResumeDialog({resumeId,open,onOpenChange}: DeleteResumeDialogProps){
     const [isPending, startTransition] = useTransition();
     const errMsg = useTranslations("error-messages");
     const t = useTranslations("deletion-confirmation");
     const buttonTxt = useTranslations("buttons")

     const handleDelete = async() => {
          startTransition(async()=>{
               try{
                    await deleteResume(resumeId);
                    onOpenChange(false);
               } catch (error) {
                    console.error(error);
                    toast.error(errMsg("unknownError"))
               }
          })
     }

     return (
          <DeleteConfirmationDialog
               open={open}
               onOpenChange={onOpenChange}
               loading={isPending}
               onAccept={handleDelete}
               acceptButtonText={buttonTxt("delete")}
               dialogTitle={t("titles.resume")}
               t={t}
          />
     )
}