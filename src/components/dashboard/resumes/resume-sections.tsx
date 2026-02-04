import { ResumeFormType } from "@/schemas/types"
import Image from "next/image"
import {format} from "date-fns"
import { Badge } from "@/components/ui/badge"
import { getBorderRadius, getLanguageLevel } from "@/lib/helpers"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import PreviewSectionWrapper from "../wrappers/section-wrapper"
import { absoluteUrl } from "@/lib/utils"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslations } from "next-intl"

interface ResumeSectionProps{
     photoSrc?: string | null,
     resumeData: ResumeFormType,
     resumeId?: string,
     disableLinks?: boolean
}
const Markdown = dynamic(()=>import("markdown-to-jsx"),{
     ssr: false
})
const QRCode = dynamic(()=>import("react-qr-code"),{
     ssr: false,
     loading: () => <Skeleton className="w-[100px] h-[100px] aspect-square object-cover max-w-[100px] max-h-[100px]"/>
})
export function HeaderSection({photoSrc, resumeData, resumeId}: ResumeSectionProps){
     const {fname, lname, jobTitle, address, phone, email, colorHex, borderStyle} = resumeData;
     const t = useTranslations("doc-preview")
     return (
          <div className="flex justify-between items-center gap-4">
               <div className="flex items-center gap-6">
                    {photoSrc && (
                         <Image
                              src={photoSrc}
                              alt={t("image-name")}
                              width={100}
                              height={100}
                              className="aspect-square object-cover"
                              style={{borderRadius: getBorderRadius(borderStyle || "square")}}
                         />
                    )}
                    <div className="space-y-2.5">
                         <div className="space-y-1">
                              <p className="text-3xl font-bold" style={{color: colorHex}}>{fname} {lname}</p>
                              <p className="font-medium" style={{color: colorHex}}>{jobTitle}</p>
                         </div>
                         <p className="text-xs text-muted-foreground">
                              {address}
                              {address && (phone || email) ? " • " : ""}
                              {[phone,email].filter(Boolean).join(" • ")}
                         </p>
                    </div>
               </div>
               {resumeId ? (
                    <QRCode
                         value={absoluteUrl(`/cv/${resumeId}`)}
                         width={100}
                         height={100}
                         className="aspect-square object-cover max-w-[100px] max-h-[100px]"
                    />
               ) : (
                    <Image
                         src="/qr-placeholder.png"
                         alt={t("image-name")}
                         width={100}
                         height={100}
                         className="aspect-square object-cover"
                    />
               )}
          </div>
     )
}

export function SummarySection({resumeData}: ResumeSectionProps){
     const {summary, colorHex} = resumeData
     const t = useTranslations("doc-preview.sections")
     return !summary ? null : (
          <PreviewSectionWrapper title={t("summary")} style={{colorHex}}>
               <p className="whitespace-pre-line text-sm">{summary}</p>
          </PreviewSectionWrapper>
     )
}

export function HobbiesSection({resumeData}: ResumeSectionProps){
     const {hobbies, colorHex} = resumeData
     const t = useTranslations("doc-preview.sections")
     return !hobbies ? null : (
          <PreviewSectionWrapper title={t("hobbies")} style={{colorHex}}>
               <p className="whitespace-pre-line text-sm">{hobbies}</p>
          </PreviewSectionWrapper>
     )
}

export function WorkExperienceSection({resumeData}: ResumeSectionProps){
     const {experience, colorHex} = resumeData
     const t = useTranslations("doc-preview")
     const expNotEmpty = experience?.filter(exp=>Object.values(exp).filter(Boolean).length > 0)
     return !expNotEmpty?.length ? null : (
          <PreviewSectionWrapper title={t("sections.work-experience")} style={{colorHex}}>
               {expNotEmpty.map((exp,i)=>(
                    <div key={i} className="break-inside-avoid space-y-1">
                         <div className="flex items-center justify-between text-sm font-semibold">
                              <span>{exp.job}</span>
                              {exp.startDate && (
                                   <span>
                                        {format(exp.startDate,"MM/yyyy")} -{" "}
                                        {exp.endDate ? format(exp.endDate,"MM/yyyy") : t("today")}
                                   </span>
                              )}
                         </div>
                         <p className="text-xs font-semibold">{[exp.company,exp.city].filter(Boolean).join(" • ")}</p>
                         {exp.jobInfo && (
                              <div className="text-xs prose">
                                   <Markdown>
                                        {exp.jobInfo}
                                   </Markdown>
                              </div>
                         )}
                    </div>
               ))}
          </PreviewSectionWrapper>
     )
}

export function EducationSection({resumeData}: ResumeSectionProps){
     const {education, colorHex} = resumeData
     const t = useTranslations("doc-preview")
     const eduNotEmpty = education?.filter(edu=>Object.values(edu).filter(Boolean).length > 0)
     return !eduNotEmpty?.length ? null : (
          <PreviewSectionWrapper title={t("sections.education")} style={{colorHex}}>
               {eduNotEmpty.map((edu,i)=>(
                    <div key={i} className="break-inside-avoid space-y-1">
                         <div className="flex items-center justify-between text-sm font-semibold">
                              <span>{[edu.degree,edu.faculty].filter(Boolean).join(" • ")}</span>
                              {edu.startDate && (
                                   <span>
                                        {format(edu.startDate,"MM/yyyy")} -{" "}
                                        {edu.endDate ? format(edu.endDate,"MM/yyyy") : t("today")}
                                   </span>
                              )}
                         </div>
                         <p className="text-xs font-semibold">{edu.school}</p>
                         <p className="text-xs font-semibold text-muted-foreground">{edu.city}</p>
                    </div>
               ))}
          </PreviewSectionWrapper>
     )
}

export function SkillsSection({resumeData}: ResumeSectionProps){
     const {skills, colorHex, borderStyle} = resumeData
     const t = useTranslations("doc-preview.sections")
     return !skills?.length ? null : (
          <PreviewSectionWrapper title={t("skills")} style={{colorHex}}>
               <div className="flex break-inside-avoid flex-wrap gap-2">
                    {skills.map((skill,i)=>{
                         return skill.name==="" ? null : (
                              <Badge
                                   key={i}
                                   className="rounded-md bg-black hover:bg-black text-white hover:text-white"
                                   style={{
                                        backgroundColor: colorHex,
                                        borderRadius: getBorderRadius(borderStyle || "square","badge")
                                   }}
                              >
                                   {skill.name}
                              </Badge>
                         )
                    })}
               </div>
          </PreviewSectionWrapper>
     )
}

export function LanguagesSection({resumeData}: ResumeSectionProps){
     const {languages, colorHex} = resumeData
     const t = useTranslations("doc-preview")
     return !languages?.length ? null : (
          <PreviewSectionWrapper title={t("sections.langs")} style={{colorHex}}>
               <div className="break-inside-avoid space-y-2">
                    {languages.map((lang,i)=>{
                         return lang.name==="" ? null : (
                              <p key={i} className="text-xs">{t.rich("lang-format",{
                                   bold: chunks => <span className="font-semibold">{chunks}</span>,
                                   langName: lang.name || "",
                                   langLevel: t(`lang-levels.${getLanguageLevel(lang.percentage || 0)}`)
                              })}</p>
                         )
                    })}
               </div>
          </PreviewSectionWrapper>
     )
}

export function LinksSection({resumeData,disableLinks=false}: ResumeSectionProps){
     const {links, colorHex} = resumeData
     const t = useTranslations("doc-preview.sections")
     return !links?.length ? null : (
          <PreviewSectionWrapper title={t("links")} style={{colorHex}}>
               <div className="break-inside-avoid flex flex-col items-start justify-center gap-1">
                    {links.map((link,i)=>{
                         return link.name==="" ? null : disableLinks ? (
                              <Button key={i} variant="link" style={{
                                   color: colorHex || "hsl(var(--primary))"
                              }} size="sm" className="select-none pointer-events-none">
                                   {link.name}
                              </Button>
                         ) :  (
                              <Button key={i} variant="link" style={{
                                   color: colorHex || "hsl(var(--primary))"
                              }} size="sm" asChild>
                                   <Link href={link.url||"#"}>{link.name}</Link>
                              </Button>
                         )
                    })}
               </div>
          </PreviewSectionWrapper>
     )
}

export function CoursesSection({resumeData}: ResumeSectionProps){
     const {courses, colorHex} = resumeData;
     const t = useTranslations("doc-preview")
     const courseNotEmpty = courses?.filter(course=>Object.values(course).filter(Boolean).length > 0)
     return !courseNotEmpty?.length ? null : (
          <PreviewSectionWrapper title={t("sections.courses")} style={{colorHex}}>
               {courseNotEmpty.map((course,i)=>(
                    <div key={i} className="break-inside-avoid space-y-1">
                         <div className="flex items-center justify-between text-sm font-semibold">
                              <span>{course.name}</span>
                              {course.startDate && (
                                   <span>
                                        {format(course.startDate,"MM/yyyy")} -{" "}
                                        {course.endDate ? format(course.endDate,"MM/yyyy") : t("today")}
                                   </span>
                              )}
                         </div>
                         <p className="text-xs font-semibold">{course.institution}</p>
                    </div>
               ))}
          </PreviewSectionWrapper>
     )
}

export function ReferencesSection({resumeData}: ResumeSectionProps){
     const {references, colorHex} = resumeData
     const t = useTranslations("doc-preview.sections")
     const refNotEmpty = references?.filter(ref=>Object.values(ref).filter(Boolean).length > 0);
     return !refNotEmpty?.length ? null : (
          <PreviewSectionWrapper title={t("refs")} style={{colorHex}}>
               <div className="break-inside-avoid grid grid-cols-2">
                    {refNotEmpty.map((ref,i)=>(
                         <div key={i} className="space-y-1">
                              <p className="font-semibold">{ref.fullName}</p>
                              <p className="text-xs font-semibold text-muted-foreground">{[ref.position,ref.company].filter(Boolean).join(" • ")}</p>
                              <p className="text-xs font-semibold">{[ref.phone,ref.email].filter(Boolean).join(" • ")}</p>
                         </div>
                    ))}
               </div>
          </PreviewSectionWrapper>
     )
}