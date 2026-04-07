import { LangCodeType } from "@/i18n/types";
import { db } from "@/lib/db"
import { resumeDataInclude, templateDataInclude } from "@/lib/types/resume";
import { cache } from "react";

export const getResumeCountByUserId = cache(async(userId: string) => {
     try{
          const resumeCount = await db.resume.count({
               where: {userId}
          })
          return resumeCount
     } catch{
          return 0
     }
})

export const getResumeById = cache(async(id: string) =>{
     try{
          const resume = await db.resume.findUnique({
               where: {id},
               include: resumeDataInclude
          });
          return resume
     } catch {
          return null
     }
})

export const getResumeTemplateById = cache(async(id: string) => {
     try{
          const template = await db.resumeTemplate.findUnique({
               where: {id},
               include: templateDataInclude
          });
          return template
     } catch {
          return null
     }
})

export const getCurrentResumeByUserId = cache(async(userId: string, resumeId: string) => {
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
})

export const getResumeTemplates = cache(async(locale: LangCodeType) => await db.resumeTemplate.findMany({
     where: {
          locale
     }
}));

export const getResumeTemplateCategoryById = cache(async(id: string) => {
     try{
          const category = await db.resumeTemplateCategory.findUnique({
               where: { id }
          })
          return category
     } catch {
          return null
     }
})

export const getAllCategories = cache(async() => {
     try {
          return await db.resumeTemplateCategory.findMany()
     } catch {
          return []
     }
})