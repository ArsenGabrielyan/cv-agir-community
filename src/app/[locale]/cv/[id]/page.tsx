import PageLayout from "@/components/layout/page-layout";
import { getResumeById } from "@/data/resumes";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CVInfoLoader from "@/components/loaders/cv-info";
import { cache } from "react";
import dynamic from "next/dynamic";
import { getUserById } from "@/data/user";
import { logAction } from "@/data/logs";
import { getIpAddress } from "@/actions/ip";
import { getTranslations } from "next-intl/server";

const getResumeData = cache(async(id: string) => {
     const resume = await getResumeById(id);
     if(!resume){
          notFound();
     }
     return resume
})

export const generateMetadata = async({params}: CVPageProps): Promise<Metadata> => {
     const {id} = await params;
     const resume = await getResumeData(id);
     const t = await getTranslations("resume-info")
     return {
          title: t("title",{
               fullName: `${resume.fname} ${resume.lname}`
          })
     }
}

const ResumeInfo = dynamic(()=>import("@/components/dashboard/resumes/resume-info"),{
     loading: CVInfoLoader
})

interface CVPageProps{
     params: Promise<{id: string}>
}
export default async function CVPage({params}: CVPageProps){
     const {id} = await params
     const resume = await getResumeData(id);
     const user = resume.userId ? await getUserById(resume.userId) : null
     if(!user || !user.id) notFound();
     await logAction({
          userId: user.id,
          action: "CV_PAGE_VIEWED",
          metadata: {
               resumeId: resume.id,
               viewerIp: await getIpAddress()
          }
     })
     return (
          <PageLayout landingFooter>
               <div className="flex justify-center items-center flex-col">
                    <ResumeInfo data={resume} settings={user.cvPageSettings || {
                         showEmail: true,
                         showAddress: true,
                         showPhone: true,
                         showLinks: true
                    }}/>
               </div>
          </PageLayout>
     )
}