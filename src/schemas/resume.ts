import * as z from "zod"
import { optionalString, optionalEmailString, optionalDescString } from "./fields"
import { useTranslations } from "next-intl";

export const getResumeLinkSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     name: optionalString(t),
     url: z.optional(z.string().url(t("link.invalid")).startsWith("https://",t("link.insecure")).trim()).or(z.literal(""))
})

export const getWorkExperienceSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     job: optionalString(t),
     company: optionalString(t),
     startDate: optionalString(t),
     endDate: optionalString(t),
     city: optionalString(t),
     jobInfo: optionalDescString(t)
})
.refine(data=>{
     if(data.startDate && data.endDate){
          const start = new Date(data.startDate);
          const end = new Date(data.endDate)
          return end >= start
     }
     return true
},{
     message: t("end-after-start-date"),
     path: ["endDate"]
})

export const getResumeEducationSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     degree: optionalString(t),
     faculty: optionalString(t),
     startDate: optionalString(t),
     endDate: optionalString(t),
     school: optionalString(t),
     city: optionalString(t)
})
.refine(data=>{
     if(data.startDate && data.endDate){
          const start = new Date(data.startDate);
          const end = new Date(data.endDate)
          return end >= start
     }
     return true
},{
     message: t("end-after-start-date"),
     path: ["endDate"]
})

export const getResumeCourseSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     name: optionalString(t),
     institution: optionalString(t),
     startDate: optionalString(t),
     endDate: optionalString(t),
})
.refine(data=>{
     if(data.startDate && data.endDate){
          const start = new Date(data.startDate);
          const end = new Date(data.endDate)
          return end >= start
     }
     return true
},{
     message: t("end-after-start-date"),
     path: ["endDate"]
})

export const getResumeReferenceSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     fullName: optionalString(t),
     position: optionalString(t),
     company: optionalString(t),
     phone: optionalString(t),
     email: optionalEmailString(t)
})

export const getResumeSkillSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     name: optionalString(t),
     percentage: z.optional(z.number().int(t("num-shouldBe-int")))
})