"use client"
import { ResumeServerData } from "@/lib/types/resume"
import { CreateResumeButton } from "../create-buttons"
import ResumeCard from "../resumes/resume-card"
import { TFunction } from "@/i18n/types"

interface ResumeTabProps{
     resumes: ResumeServerData[],
     t: TFunction<"dashboard">
}
export default function ResumeTab({resumes,t}: ResumeTabProps){
     return (
          <>
               <div className="flex justify-between items-center gap-2 my-4 flex-wrap">
                    <h2 className="text-xl flex-1 sm:flex-none md:text-2xl lg:text-3xl font-semibold mb-3">{t("resumes.title")}</h2>
                    <CreateResumeButton className="flex-1 sm:flex-none"/>
               </div>
               <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-3">
                    {resumes.map(resume=>(
                         <ResumeCard
                              key={resume.id}
                              data={resume}
                         />
                    ))}
               </div>
          </>
     )
}