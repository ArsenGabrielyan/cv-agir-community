"use client"
import { compileHTML } from "@/actions/resume/template";
import useDimensions from "@/hooks/use-dimensions";
import { cn } from "@/lib/utils";
import { ResumeFormType } from "@/schemas/types";
import { ResumeTemplate } from "@db";
import { useEffect, useMemo, useRef, useState } from "react";
import DOMPurify from "isomorphic-dompurify"
import {CoursesSection, EducationSection, HeaderSection, HobbiesSection, LanguagesSection, LinksSection, ReferencesSection, SkillsSection, SummarySection, WorkExperienceSection} from "./resume-sections";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

interface ResumePreviewProps{
     template: ResumeTemplate | null
     resumeData: ResumeFormType,
     className?: string,
     qrImg?: string,
     resumeId?: string,
     contentRef?: React.Ref<HTMLDivElement>,
     disableLinks?: boolean
}
export default function ResumePreview({
     template,
     resumeData,
     className,
     qrImg,
     resumeId,
     contentRef,
     disableLinks=false
}: ResumePreviewProps){
     const containerRef = useRef<HTMLDivElement>(null);
     const {width} = useDimensions(containerRef);
     const [photoSrc, setPhotoSrc] = useState(resumeData.profileImg instanceof File ? "" : resumeData.profileImg)
     const [rawHTML, setRawHTML] = useState("");
     
     useEffect(() => {
          if (resumeData.profileImg instanceof File) {
               const objectUrl = URL.createObjectURL(resumeData.profileImg);
               setPhotoSrc(objectUrl);
               return () => URL.revokeObjectURL(objectUrl);
          }
          setPhotoSrc(resumeData.profileImg || "");
     }, [resumeData.profileImg]);

     const t = useTranslations("doc-preview")

     useEffect(()=>{
          const compile = async() => {
               if(!template || !template.htmlTemplate) return;
               const compiled = await compileHTML(template.htmlTemplate, {
                    ...resumeData,
                    qrImg,
                    id: resumeData.id || template.id,
                    profileImg: photoSrc,
                    experience: resumeData.experience?.map(val => ({
                         ...val,
                         startDate: !val.startDate ? "" : format(val.startDate, "MM/yyyy"),
                         endDate: !val.endDate ? t("today") : format(val.endDate, "MM/yyyy")
                    })),
                    education: resumeData.education?.map(val => ({
                         ...val,
                         startDate: !val.startDate ? "" : format(val.startDate, "MM/yyyy"),
                         endDate: !val.endDate ? t("today") : format(val.endDate, "MM/yyyy")
                    })),
                    courses: resumeData.courses?.map(val => ({
                         ...val,
                         startDate: !val.startDate ? "" : format(val.startDate, "MM/yyyy"),
                         endDate: !val.endDate ? t("today") : format(val.endDate, "MM/yyyy")
                    }))
               })
               setRawHTML(compiled)
          }
          if(template){
               compile()
          }
     },[template, resumeData, qrImg, photoSrc, t])

     const sanitizedHTML = useMemo(()=>DOMPurify.sanitize(rawHTML,{
          ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|blob):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
     }),[rawHTML])

     return (
          <div className={cn("bg-white text-black h-full w-full aspect-210/297",className)} ref={containerRef}>
               <div className={!template ? cn("space-y-6 p-6", !width && "invisible") : cn("h-full", !width && "invisible")} style={{zoom: (1/794) * width}} ref={contentRef} id="resumePreviewContent">
                    {!template ? (
                         <>
                              <HeaderSection resumeData={resumeData} photoSrc={photoSrc} resumeId={resumeId}/>
                              <div className="grid gap-5" style={{gridTemplateColumns: "2fr 1fr"}}>
                                   <div className="space-y-4">
                                        <SummarySection resumeData={resumeData}/>
                                        <WorkExperienceSection resumeData={resumeData}/>
                                        <EducationSection resumeData={resumeData}/>
                                        <CoursesSection resumeData={resumeData}/>
                                        <ReferencesSection resumeData={resumeData}/>
                                   </div>
                                   <div className="space-y-4">
                                        <SkillsSection resumeData={resumeData}/>
                                        <LanguagesSection resumeData={resumeData}/>
                                        <LinksSection resumeData={resumeData} disableLinks={disableLinks}/>
                                        <HobbiesSection resumeData={resumeData}/>
                                   </div>
                              </div>
                         </>
                    ) : (
                         <>
                              <style>{template.cssStyle?.replaceAll("cv-template",`cv-template-${resumeData.id || template.id}`)}</style>
                              <div id="resume-body" className="h-full break-inside-avoid" dangerouslySetInnerHTML={{__html: sanitizedHTML}}/>
                         </>
                    )}
               </div>
          </div>
     )
}