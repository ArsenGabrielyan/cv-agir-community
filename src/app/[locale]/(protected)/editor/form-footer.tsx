import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, FileUser, PenLineIcon, Printer, XSquare } from "lucide-react"
import { Link } from "@/i18n/routing"
import useEditorSteps from "@/hooks/use-editor-steps"
import { EditorFormFooterProps } from "@/lib/types"
import { useTranslations } from "next-intl"
import { ButtonGroup } from "@/components/ui/button-group"

export default function FormFooter<Props>({
     currStep,
     setCurrStep,
     showSmPreview,
     setShowSmPreview,
     onPrint,
     steps
}: EditorFormFooterProps<Props>){
     const {prevStep, nextStep, lastStep} = useEditorSteps<Props>(steps,currStep);
     const t = useTranslations("buttons")
     return (
          <footer className="w-full border-t px-3 py-5">
               <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3 items-center">
                    <ButtonGroup>
                         <Button
                              variant="secondary"
                              onClick={prevStep ? () => setCurrStep(prevStep) : undefined}
                              disabled={!prevStep}
                         >
                              <ChevronLeft/>
                              {t("pagination.prev")}
                         </Button>
                         {!lastStep ? (
                              <Button
                                   onClick={nextStep ? () => setCurrStep(nextStep) : undefined}
                                   disabled={!nextStep}
                              >
                                   {t("pagination.next")}
                                   <ChevronRight/>
                              </Button>
                         ) : (
                              <Button
                                   onClick={onPrint}
                              >
                                   <Printer/>
                                   {t("print")}
                              </Button>
                         )}
                    </ButtonGroup>
                    <Button
                         variant="outline"
                         size="icon"
                         onClick={()=>setShowSmPreview(!showSmPreview)}
                         className="md:hidden"
                         title={showSmPreview ? t("edit") : t("preview")}
                    >
                         {showSmPreview ? <PenLineIcon/> : <FileUser/>}
                    </Button>
                    <Button asChild variant="secondary">
                         <Link href="/dashboard"><XSquare/> {t("close")}</Link>
                    </Button>
               </div>
          </footer>
     )
}