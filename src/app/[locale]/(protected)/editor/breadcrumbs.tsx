import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import React from "react";
import { useTranslations } from "next-intl";
import { IEditorStep } from "@/lib/types";

interface BreadcrumbsProps<Props>{
     type: "resume" | "cover-letter"
     currStep: string;
     setCurrStep: (step: string) => void;
     steps: IEditorStep<Props>[]
}
export default function Breadcrumbs<Props>({currStep,setCurrStep,type,steps}: BreadcrumbsProps<Props>){
     const t = useTranslations(`editor.${type}.steps`)
     return (
          <div className="flex justify-center items-center">
               <Breadcrumb>
                    <BreadcrumbList>
                         {steps.map(step=>(
                              <React.Fragment key={step.key}>
                                   <BreadcrumbItem>
                                        {step.key===currStep ? (
                                             <BreadcrumbPage>{t(step.key)}</BreadcrumbPage>
                                        ) : (
                                             <BreadcrumbLink asChild>
                                                  <button onClick={()=>setCurrStep(step.key)}>
                                                       {t(step.key)}
                                                  </button>
                                             </BreadcrumbLink>
                                        )}
                                   </BreadcrumbItem>
                                   <BreadcrumbSeparator className="last:hidden"/>
                              </React.Fragment>
                         ))} 
                    </BreadcrumbList>
               </Breadcrumb>
          </div>
     )
}