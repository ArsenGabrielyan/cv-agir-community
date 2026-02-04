import * as z from "zod"
import { getContactSchema, getCoverLetterFormSchema,  getLoginSchema, getNewPasswordSchema, getRegisterSchema, getResetSchema, getResumeDetailsSchema, getResumeFormSchema, getResumeInfoSchema, getResumeOptionalDetailsSchema, getDocStyleSchema, getCoverLetterInfoSchema, getCoverLetterDetailsSchema, getSettingsSchema } from "."
import { getGenerateDescriptionSchema, getGenerateLetterBodySchema, getGenerateSummarySchema } from "./ai"

// Contact Page and Auth
export type SettingsType = z.infer<
     Awaited<ReturnType<typeof getSettingsSchema>>
>
export type ContactFormType = z.infer<
     Awaited<ReturnType<typeof getContactSchema>>
>
export type LoginType = z.infer<
     Awaited<ReturnType<typeof getLoginSchema>>
>
export type NewPasswordType = z.infer<
     Awaited<ReturnType<typeof getNewPasswordSchema>>
>
export type RegisterFormType = z.infer<
     Awaited<ReturnType<typeof getRegisterSchema>>
>
export type ResetPassType = z.infer<
     Awaited<ReturnType<typeof getResetSchema>>
>

// Resume Form
export type ResumeFormType = Omit<z.infer<
     Awaited<ReturnType<typeof getResumeFormSchema>>
>,"profileImg"> & {
     id?: string,
     templateId?: string,
     profileImg?: File | string | null,
     qrImg?: string
}
export type ResumeInfoType = z.infer<
     Awaited<ReturnType<typeof getResumeInfoSchema>>
>
export type ResumeDetailsType = z.infer<
     Awaited<ReturnType<typeof getResumeDetailsSchema>>
>
export type ResumeOptionalDetailsType = z.infer<
     Awaited<ReturnType<typeof getResumeOptionalDetailsSchema>>
>
export type DocStyleType = z.infer<
     Awaited<ReturnType<typeof getDocStyleSchema>>
>
export type WorkExperienceType = NonNullable<ResumeDetailsType["experience"]>[number]

// Cover Letter Form
export type CoverLetterInfoType = z.infer<
     Awaited<ReturnType<typeof getCoverLetterInfoSchema>>
>
export type CoverLetterDetailsType = z.infer<
     Awaited<ReturnType<typeof getCoverLetterDetailsSchema>>
>
export type CoverLetterFormType = Omit<z.infer<
     Awaited<ReturnType<typeof getCoverLetterFormSchema>>
>,"profileImg"> & {
     id?: string,
     profileImg?: File | string | null,
}

// Gemini AI Inputs To Generate From AI
export type GenerateSummaryInput = z.infer<
     Awaited<ReturnType<typeof getGenerateSummarySchema>>
>
export type GenerateDescriptionInput = z.infer<
     Awaited<ReturnType<typeof getGenerateDescriptionSchema>>
>
export type GenerateLetterBodyInput = z.infer<
     Awaited<ReturnType<typeof getGenerateLetterBodySchema>>
>