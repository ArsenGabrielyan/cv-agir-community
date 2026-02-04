"use client"
import { CVPageSettings, } from "@db"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Mail, MapPin, Phone, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { Badge } from "@/components/ui/badge"
import { getLanguageLevel } from "@/lib/helpers"
import {format} from "date-fns"
import dynamic from "next/dynamic"
import { ResumeServerData } from "@/lib/types"
import { useTranslations } from "next-intl"

interface ResumeInfoProps{
     data: ResumeServerData,
     settings: Partial<CVPageSettings>
}
const Markdown = dynamic(()=>import("markdown-to-jsx"),{
     ssr: false
})
export default function ResumeInfo({data, settings}: ResumeInfoProps){
     const {fname, lname, jobTitle, profileImg, summary, hobbies, experience, education, courses, references, skills, languages} = data;
     const address = (settings?.showAddress ?? true) ? data.address : null;
     const phone = (settings?.showPhone ?? true) ? data.phone : null;
     const email = (settings?.showEmail ?? true) ? data.email : null;
     const links = (settings?.showLinks ?? true) ? data.links : []
     const isEmpty = Object.values({fname, lname, jobTitle, phone, address, profileImg, email, summary, hobbies, links, experience, education, courses, references, skills, languages}).every((val) => Array.isArray(val) ? !(val && val.length!==0) : !val);
     const t = useTranslations("resume-info")
     const langLevel = useTranslations("doc-preview.lang-levels")
     return !isEmpty ? (
          <div className="max-w-(--breakpoint-xl) w-full p-5 space-y-6">
               <div className="bg-card text-card-foreground border shadow p-4 rounded-xl flex flex-col items-center justify-center gap-3">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 w-full">
                         {(fname || lname || jobTitle) && (
                              <>
                                   <Avatar className="aspect-square size-20 md:size-32">
                                        <AvatarImage src={profileImg || undefined}/>
                                        <AvatarFallback className="text-4xl md:text-6xl">
                                             {fname?.split("")[0]}
                                             {lname?.split("")[0]}
                                        </AvatarFallback>
                                   </Avatar>
                                   <div className="text-center">
                                        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">{fname} {lname}</h1>
                                        <p className="text-lg">{jobTitle}</p>
                                   </div>
                              </>
                         )}
                         {(address || phone || email) && (
                              <ul className="flex flex-col items-start justify-start gap-3 w-full md:w-fit flex-wrap">
                                   {phone && (
                                        <li className="flex gap-3 items-center justify-center md:justify-start w-full text-sm md:text-base"><Phone className="size-4 md:size-6"/> {phone}</li>
                                   )}
                                   {address && (
                                        <li className="flex gap-3 items-center justify-center md:justify-start w-full text-sm md:text-base"><MapPin className="size-4 md:size-6"/> {address}</li>
                                   )}
                                   {email && (
                                        <li className="flex gap-3 items-center justify-center md:justify-start w-full text-sm md:text-base"><Mail className="size-4 md:size-6"/> {email}</li>
                                   )}
                              </ul>
                         )}
                    </div>
                    {(links && links.length!==0) &&(
                         <div className="flex justify-between items-center gap-3 flex-wrap">
                              {links.map(({name,url},i)=>(
                                   <Button key={i} variant="link" className="flex-1" asChild>
                                        <Link href={url || "#"}>{name}</Link>
                                   </Button>
                              ))}
                         </div>
                    )}
               </div>
               <div className="space-y-6 text-center md:text-left">
                    {summary && (
                         <section className="space-y-3">
                              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{t("sections.summary")}</h2>
                              <p>{summary}</p>
                         </section>
                    )}
                    {(experience && experience.length!==0) && (
                         <section className="space-y-3">
                              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{t("sections.work-experience")}</h2>
                              <div className="space-y-5">
                                   {experience.map((exp,i)=>(
                                        <div key={i} className="space-y-1">
                                             <div className="flex flex-col md:flex-row items-center justify-center md:justify-between font-semibold gap-3">
                                                  <span>{t("job-title",{
                                                       job: exp.job ?? "N/A",
                                                       company: exp.company ?? "N/A"
                                                  })}</span>
                                                  {exp.startDate && (
                                                       <span>
                                                            {format(exp.startDate,"MM/yyyy")} -{" "}
                                                            {exp.endDate ? format(exp.endDate,"MM/yyyy") : t("today")}
                                                       </span>
                                                  )}
                                             </div>
                                             {exp.jobInfo && (
                                                  <div className="prose dark:prose-invert">
                                                       <Markdown className="text-left">
                                                            {exp.jobInfo}
                                                       </Markdown>
                                                  </div>
                                             )}
                                        </div>
                                   ))}
                              </div>
                         </section>
                    )}
                    {(education && education.length!==0) && (
                         <section className="space-y-3">
                              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{t('sections.education')}</h2>
                              <div className="space-y-5">
                                   {education.map((edu,i)=>(
                                        <div key={i} className=" space-y-2 md:space-y-1">
                                             <div className="flex items-center justify-between font-semibold flex-col md:flex-row">
                                                  <span>{[edu.degree,edu.faculty].filter(Boolean).join(" • ")}</span>
                                                  {edu.startDate && (
                                                       <span>
                                                            {format(edu.startDate,"MM/yyyy")} -{" "}
                                                            {edu.endDate ? format(edu.endDate,"MM/yyyy") : t("today")}
                                                       </span>
                                                  )}
                                             </div>
                                             <p className="text-sm font-semibold">{edu.school}</p>
                                             <p className="text-sm font-semibold text-muted-foreground">{edu.city}</p>
                                        </div>
                                   ))}
                              </div>
                         </section>
                    )}
                    {(skills && skills.length!==0) && (
                         <section className="space-y-3">
                              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{t("sections.skills")}</h2>
                              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                   {skills.map((skill,i)=>(
                                        <Badge key={i}>{skill.name}</Badge>
                                   ))}
                              </div>
                         </section>
                    )}
                    {(languages && languages.length!==0) && (
                         <section className="space-y-3">
                              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{t("sections.langs")}</h2>
                              <ul className="flex justify-between items-center flex-wrap gap-3">
                                   {languages.map((lang,i)=>(
                                        <li key={i} className="flex-1"><span className="font-semibold">{lang.name}`</span>{" "+langLevel(getLanguageLevel(lang.percentage || 0))}</li>
                                   ))}
                              </ul>
                         </section>
                    )}
                    {hobbies && (
                         <section className="space-y-3">
                              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{t("sections.hobbies")}</h2>
                              <p>{hobbies}</p>
                         </section>
                    )}
                    {(courses && courses.length!==0) && (
                         <section className="space-y-3">
                              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{t("sections.courses")}</h2>
                              {courses.map((course,i)=>(
                                   <div key={i} className="space-y-2 md:space-y-1">
                                        <div className="flex items-center justify-between font-semibold flex-col md:flex-row">
                                             <span>{course.name}</span>
                                             {course.startDate && (
                                                  <span>
                                                       {format(course.startDate,"MM/yyyy")} -{" "}
                                                       {course.endDate ? format(course.endDate,"MM/yyyy") : t("today")}
                                                  </span>
                                             )}
                                        </div>
                                        <p className="text-sm font-semibold">{course.institution}</p>
                                   </div>
                              ))}
                         </section>
                    )}
                    {(references && references.length!==0) && (
                         <section className="space-y-3">
                              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{t("sections.refs")}</h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   {references.map((ref,i)=>(
                                        <div key={i} className="space-y-1">
                                             <p className="font-semibold">{ref.fullName}</p>
                                             <p className="text-sm font-semibold text-muted-foreground">{[ref.position,ref.company].filter(Boolean).join(" • ")}</p>
                                             <p className="text-sm font-semibold">{[ref.phone,ref.email].filter(Boolean).join(" • ")}</p>
                                        </div>
                                   ))}
                              </div>
                         </section>
                    )}
               </div>
          </div>
     ) : (
          <div className="px-3 py-9 text-center">
               <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground">{t("no-data")}</h1>
          </div>
     )
}