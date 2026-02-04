"use client"
import { ResumeTemplate } from "@db"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSearchParams } from "next/navigation"
import { steps } from "./steps"
import Breadcrumbs from "./breadcrumbs"
import FormFooter from "./form-footer"
import { useCallback, useEffect, useRef, useState } from "react"
import { ResumeFormType } from "@/schemas/types"
import ResumePreviewSection from "./resume-preview-section"
import { cn } from "@/lib/utils"
import useUnsavedChangesWarning from "@/hooks/use-unsaved-changes"
import { useResumeAutoSave } from "@/hooks/use-auto-save"
import { mapToResumeValues } from "@/lib/helpers/maps"
import { absoluteUrl } from "@/lib/utils";
import QRCode from "qrcode";
import usePrint from "@/hooks/use-print"
import { ExtendedUser } from "@/global"
import { useRouter } from "@/i18n/routing"
import { ResumeServerData } from "@/lib/types"
import { Spinner } from "@/components/ui/spinner"
import { useTranslations } from "next-intl"

interface ResumeEditorProps {
     resumeToEdit: ResumeServerData | null;
     template: ResumeTemplate | null;
     resumeId?: string,
     userData: ExtendedUser
}
export default function ResumeEditor({resumeToEdit,template,resumeId,userData}: ResumeEditorProps){
     const searchParams = useSearchParams();
     const router = useRouter();
     const [resumeData, setResumeData] = useState<ResumeFormType>(resumeToEdit ? mapToResumeValues(resumeToEdit) : {});
     const [showSmResumePreview, setShowSmResumePreview] = useState(false);
     const {isSaving, hasUnsavedChanges} = useResumeAutoSave(resumeData,template?.id)
     const [qrImg, setQrImg] = useState("/qr-placeholder.png");
     const currStep = searchParams.get("step") || steps[0].key;
     const contentRef = useRef<HTMLDivElement>(null);
     const titles = useTranslations("dashboard.resumes")
     const printResume = usePrint({
          contentRef,
          documentTitle: resumeToEdit ? resumeToEdit.title : titles("default-title")
     })
     const setStep = useCallback((key: string) => {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("step",key);
          router.push(`?${newSearchParams.toString()}`, { scroll: false })
     },[searchParams,router])

     const FormComponent = steps.find(
          step=>step.key===currStep
     )?.component

     useUnsavedChangesWarning(hasUnsavedChanges);

     useEffect(()=>{
          if(template){
               setResumeData(prev=>({...prev,templateId: template.id}))
          }
     },[template])

     useEffect(()=>{
          if(resumeId){
               const initQR = async() => {
                    const img = resumeId ? await QRCode.toDataURL(absoluteUrl(`/cv/${resumeId}`)) : "/qr-placeholder.png";
                    setQrImg(img)
               }
               initQR();
          } else {
               setQrImg("/qr-placeholder.png")
          }
     },[resumeId])
     const t = useTranslations("editor")
     return (
          <div className="flex grow flex-col">
               <header className="border-b px-3 py-5 flex flex-col items-center justify-center gap-y-4">
                    <div className="space-y-2 text-center">
                         <h1 className="text-lg md:text-xl lg:text-2xl font-semibold flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-2">
                              {t("resume.title")}
                              {isSaving && (
                                   <span className="text-base font-normal flex items-center gap-2 text-muted-foreground">
                                        <Spinner/>{t("saving")}
                                   </span>
                              )}
                         </h1>
                         <p className="text-sm text-muted-foreground">{t("resume.desc")}</p>
                    </div>
               </header>
               <main className="relative grow">
                    <div className="absolute bottom-0 top-0 w-full flex">
                         <ScrollArea className={cn("w-full md:w-1/2 p-4 md:block",showSmResumePreview && "hidden")}>
                              <div className="space-y-6">
                                   <Breadcrumbs steps={steps} type="resume" currStep={currStep} setCurrStep={setStep}/>
                                   {FormComponent && (
                                        <FormComponent
                                             resumeData={resumeData}
                                             setResumeData={setResumeData}
                                             userData={userData}
                                        />
                                   )}
                              </div>
                         </ScrollArea>
                         <div className="grow md:border-r"/>
                         <ResumePreviewSection
                              resumeData={resumeData}
                              setResumeData={setResumeData}
                              template={template}
                              qrImg={qrImg}
                              className={cn(showSmResumePreview && "flex")}
                              resumeId={resumeId}
                              contentRef={contentRef}
                         />
                    </div>
               </main>
               <FormFooter
                    steps={steps}
                    onPrint={printResume}
                    currStep={currStep}
                    setCurrStep={setStep}
                    setShowSmPreview={setShowSmResumePreview}
                    showSmPreview={showSmResumePreview}
               />
          </div>
     )
}