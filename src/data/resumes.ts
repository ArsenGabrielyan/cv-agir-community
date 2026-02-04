import { LangCodeType } from "@/i18n/types";
import { db } from "@/lib/db"
import { resumeDataInclude } from "@/lib/types";

export async function getResumeCountByUserId(userId: string){
     try{
          const resumeCount = await db.resume.count({
               where: {userId}
          })
          return resumeCount
     } catch{
          return 0
     }
}

export async function getResumeById(id: string){
     try{
          const resume = await db.resume.findUnique({
               where: {id},
               include: resumeDataInclude
          });
          return resume
     } catch {
          return null
     }
}

export async function getResumeTemplateById(id: string){
     try{
          const template = await db.resumeTemplate.findUnique({
               where: {id}
          });
          return template
     } catch {
          return null
     }
}

export async function getCurrentResumeByUserId(userId: string, resumeId: string){
     try{
          const currResume = await db.resume.findUnique({
               where: {
                    id: resumeId,
                    userId
               },
               include: resumeDataInclude
          });
          return currResume
     } catch {
          return null
     }
}

export const getResumeTemplates = async (locale: LangCodeType) => await db.resumeTemplate.findMany({
     where: {
          locale
     }
});

export const getResumeTemplateCategoryById = async(id: string) => {
     try{
          const category = await db.resumeTemplateCategory.findUnique({
               where: { id }
          })
          return category
     } catch {
          return null
     }
}