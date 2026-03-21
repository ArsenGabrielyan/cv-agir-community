import * as z from "zod"
import { optionalString, optionalEmailString, optionalDescString } from "./fields"
import { TFunction } from "@/i18n/types";

export const getResumeLinkSchema = (t: TFunction<'validations'>) => z.object({
     name: optionalString(t),
     url: z.optional(z.string().url(t("link.invalid")).startsWith("https://",t("link.insecure")).trim()).or(z.literal(""))
})

export const getWorkExperienceSchema = (t: TFunction<'validations'>) => z.object({
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

export const getResumeEducationSchema = (t: TFunction<'validations'>) => z.object({
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

export const getResumeCourseSchema = (t: TFunction<'validations'>) => z.object({
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

export const getResumeReferenceSchema = (t: TFunction<'validations'>) => z.object({
     fullName: optionalString(t),
     position: optionalString(t),
     company: optionalString(t),
     phone: optionalString(t),
     email: optionalEmailString(t)
})

export const getResumeSkillSchema = (t: TFunction<'validations'>) => z.object({
     name: optionalString(t),
     percentage: z.optional(z.number().int(t("num-shouldBe-int")))
})