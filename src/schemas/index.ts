import * as z from "zod"
import {
     emailField,
     passwordField,
     optionalArray,
     optionalString,
     optionalEmailString,
     optionalJobTitleString,
     optionalDescString,
     fileField,
     nameField,
     zDescField,
     jobTitleField
} from "./fields"
import {
     getResumeLinkSchema,
     getWorkExperienceSchema,
     getResumeEducationSchema,
     getResumeCourseSchema,
     getResumeReferenceSchema,
     getResumeSkillSchema,
} from "./resume"
import {BorderStyles} from "@db"
import { useTranslations } from "next-intl"

export const getResetSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     email: emailField(t).trim().transform(email => email.toLowerCase()),
})

export const getNewPasswordSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     password: passwordField(t).trim()
})

export const getLoginSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     email: emailField(t).trim().transform(email => email.toLowerCase()),
     password: z.string().min(1,t("password.required")).max(64, t("password.tooLong")).trim(),
     code: z.optional(z.string().max(6,t("2fa-code-tooLong")).trim())
})

export const getRegisterSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     name: nameField(t).trim(),
     email: emailField(t).trim().transform(email => email.toLowerCase()),
     password: passwordField(t).trim()
})

export const getContactSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     name: nameField(t).trim(),
     email: emailField(t).trim().transform(email => email.toLowerCase()),
     phone: z.string().regex(/^[0-9+() -]*$/,t("phone.invalidFormat")).min(8, t("phone.tooShort")).max(20, t("phone.tooLong")).trim(),
     subject: z.string().min(1,t("subject.required")).max(100,t("subject.tooLong")).trim(),
     message: z.string().min(5,t("message.required")).max(500,t("message.tooLong")).trim()
})

export const getResumeInfoSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     title: optionalString(t),
     description: optionalString(t),
     fname: optionalString(t),
     lname: optionalString(t),
     jobTitle: optionalJobTitleString(t),
     phone: optionalString(t),
     address: optionalString(t),
     email: optionalEmailString(t),
     summary: optionalDescString(t),
     hobbies: z.optional(zDescField(t,"hobbies").trim()).or(z.literal("")),
     profileImg: fileField(t),
})

export const getResumeDetailsSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     experience: optionalArray(t,getWorkExperienceSchema(t),50,t("items.work-exp")),
     education: optionalArray(t,getResumeEducationSchema(t),40,t("items.school")),
     skills: optionalArray(t,getResumeSkillSchema(t),30,t("items.skill")),
     languages: optionalArray(t,getResumeSkillSchema(t),35,t("items.lang")),
})

export const getResumeOptionalDetailsSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     links: optionalArray(t,getResumeLinkSchema(t),50,t("items.link")),
     courses: optionalArray(t,getResumeCourseSchema(t),40,t("items.course")),
     references: optionalArray(t,getResumeReferenceSchema(t),20,t("items.ref")),
})

export const getDocStyleSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     colorHex: optionalString(t),
     borderStyle: z.custom<BorderStyles>().optional()
})

export const getResumeFormSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     ...getResumeInfoSchema(t).shape,
     ...getResumeDetailsSchema(t).shape,
     ...getResumeOptionalDetailsSchema(t).shape,
     ...getDocStyleSchema(t).shape
})

export const getCoverLetterInfoSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     title: optionalString(t),
     description: optionalString(t),
     fname: optionalString(t),
     lname: optionalString(t),
     jobTitle: optionalJobTitleString(t),
     phone: optionalString(t),
     address: optionalString(t),
     email: optionalEmailString(t),
     profileImg: fileField(t)
})

export const getCoverLetterDetailsSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     recipientName: optionalString(t),
     recipientTitle: optionalString(t),
     companyName: optionalString(t),
     companyAddress: optionalString(t),
     letterContent: optionalString(t),
     letterDate: z.optional(z.date())
})

export const getCoverLetterFormSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     ...getCoverLetterInfoSchema(t).shape,
     ...getCoverLetterDetailsSchema(t).shape,
     ...getDocStyleSchema(t).shape
})

export const getSettingsSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     name: z.optional(z.string().trim()),
     email: z.optional(emailField(t).trim().transform(email => email.toLowerCase())),
     jobTitle: z.optional(jobTitleField(t).trim()),
     phone: z.optional(z.string().trim()),
     address: z.optional(z.string().trim()),
     summary: z.optional(z.string().trim()),
     hobbies: z.optional(z.string().trim()),
     password: z.optional(passwordField(t).trim()),
     newPassword: z.optional(passwordField(t).trim()),
     isTwoFactorEnabled: z.optional(z.boolean()),
     showEmail: z.optional(z.boolean()),
     showAddress: z.optional(z.boolean()),
     showPhone: z.optional(z.boolean()),
     showLinks: z.optional(z.boolean())
})
.refine(data=>{
     if(data.password && !data.newPassword){
          return false
     }
     return true;
},{
     message: t("password.empty-new-password"),
     path: ["newPassword"]
})
.refine(data=>{
     if(data.newPassword && !data.password){
          return false;
     }
     return true
},{
     message: t("password.empty-password"),
     path: ["password"]
})