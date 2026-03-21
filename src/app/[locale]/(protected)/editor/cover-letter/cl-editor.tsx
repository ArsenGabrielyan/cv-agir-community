"use client"
import FormFooter from "../form-footer"
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import CoverLetterPreviewSection from "./cl-preview-section";
import { useCallback, useRef, useState } from "react";
import { CoverLetterFormType } from "@/lib/types/schemas";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "../breadcrumbs";
import { useCoverLetterAutoSave } from "@/hooks/use-auto-save";
import useUnsavedChangesWarning from "@/hooks/use-unsaved-changes";
import { CoverLetter } from "@db";
import { mapToLetterValues } from "@/lib/helpers/maps";
import { ExtendedUser } from "@/global";
import usePrint from "@/hooks/use-print";
import { useRouter } from "@/i18n/routing";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";

interface CoverLetterEditorProps {
     letterToEdit: CoverLetter | null;
     userData: ExtendedUser
}
export default function CoverLetterEditor({letterToEdit,userData}: CoverLetterEditorProps){
     const searchParams = useSearchParams();
     const router = useRouter();
     const [coverLetterData, setCoverLetterData] = useState<CoverLetterFormType>(letterToEdit ? mapToLetterValues(letterToEdit) : {});
     const [showSmLetterPreview, setShowSmLetterPreview] = useState(false);
     const {isSaving, hasUnsavedChanges} = useCoverLetterAutoSave(coverLetterData)
     const contentRef = useRef<HTMLDivElement>(null);
     const currStep = searchParams.get("step") || steps[0].key;
     const titles = useTranslations("dashboard.cover-letters")
     const printCoverLetter = usePrint({
          contentRef,
          documentTitle: titles("default-title"),
     })
     const setStep = useCallback((key: string) => {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("step",key);
          router.push(`?${newSearchParams.toString()}`)
     },[searchParams,router])
     const FormComponent = steps.find(
          step=>step.key===currStep
     )?.component
     useUnsavedChangesWarning(hasUnsavedChanges);
     const t = useTranslations("editor")
     return (
          <div className="flex grow flex-col">
               <header className="border-b px-3 py-5 flex flex-col items-center justify-center gap-y-4">
                    <div className="space-y-2 text-center">
                         <h1 className="text-lg md:text-xl lg:text-2xl font-semibold flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-2">
                              {t("cover-letter.title")}
                              {isSaving && (
                                   <span className="text-base font-normal flex items-center gap-2 text-muted-foreground">
                                        <Spinner/>{t("saving")}
                                   </span>
                              )}
                         </h1>
                         <p className="text-sm text-muted-foreground">{t("cover-letter.desc")}</p>
                    </div>
               </header>
               <main className="relative grow">
                    <div className="absolute bottom-0 top-0 w-full flex">
                         <ScrollArea className={cn("w-full md:w-1/2 p-4 md:block",showSmLetterPreview && "hidden")}>
                              <div className="space-y-6">
                                   <Breadcrumbs steps={steps} type="cover-letter" currStep={currStep} setCurrStep={setStep}/>
                                   {FormComponent && (
                                        <FormComponent
                                             coverLetterData={coverLetterData}
                                             setCoverLetterData={setCoverLetterData}
                                             userData={userData}
                                        />
                                   )}
                              </div>
                         </ScrollArea>
                         <div className="grow md:border-r"/>
                         <CoverLetterPreviewSection
                              coverLetterData={coverLetterData}
                              setCoverLetterData={setCoverLetterData}
                              contentRef={contentRef}
                              className={cn(showSmLetterPreview && "flex")}
                         />
                    </div>
               </main>
               <FormFooter
                    steps={steps}
                    onPrint={printCoverLetter}
                    currStep={currStep}
                    setCurrStep={setStep}
                    setShowSmPreview={setShowSmLetterPreview}
                    showSmPreview={showSmLetterPreview}
               />
          </div>
     )
}