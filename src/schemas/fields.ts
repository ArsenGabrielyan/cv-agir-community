import { useTranslations } from "next-intl"
import * as z from "zod"

export function optionalArray<T>(
     t: ReturnType<typeof useTranslations<'validations'>>,
     arr: z.ZodType<T>,
     maxCount?: number,itemName?: string
){
     return (maxCount && itemName) ? z.optional(z.array(arr).max(maxCount,t("items.no-more-items",{
          maxCount: String(maxCount),
          itemName: itemName.toLowerCase()
     }))) : z.optional(z.array(arr))
}
export const zDescField = (t: ReturnType<typeof useTranslations<'validations'>>, name: "summary" | "hobbies" = "summary") => z.string().min(20,t(`${name}.20-chars`)).max(1000,t(`${name}.tooLong`))
export const emailField = (t: ReturnType<typeof useTranslations<'validations'>>) => z.string().email(t("email.invalid")).max(254, t("email.tooLong"))
export const passwordField = (t: ReturnType<typeof useTranslations<'validations'>>) => z.string().min(8,t("password.8-chars")).max(64, t("password.tooLong"))
export const jobTitleField = (t: ReturnType<typeof useTranslations<'validations'>>) => z.string().max(100,t("jobTitle-tooLong"))
export const descriptionField = (t: ReturnType<typeof useTranslations<'validations'>>) => zDescField(t);
export const nameField = (t: ReturnType<typeof useTranslations<'validations'>>) => z.string().min(2,t("fullName.tooShort")).max(100,t("fullName.tooLong"))
export const fileField = (t: ReturnType<typeof useTranslations<'validations'>>) => z.instanceof(File, { message: t("image.shouldBeImage") })
.refine((file) => !file || file.type.startsWith("image/"),t("image.inavlidFormat"))
.refine((file) => !file || file.size > 0, t("image.empty"))
.refine((file) => !file || file.size <= 4 * 1024 * 1024, t("image.under-4mb"))
.nullable().optional()
export const optionalString = (t: ReturnType<typeof useTranslations<'validations'>>) => z.optional(z.string().trim().max(1500,t("text-too-long"))).or(z.literal(""))
export const optionalEmailString = (t: ReturnType<typeof useTranslations<'validations'>>) => z.optional(emailField(t).trim().transform(email => email.toLowerCase())).or(z.literal(""))
export const optionalJobTitleString = (t: ReturnType<typeof useTranslations<'validations'>>) => z.optional(jobTitleField(t).trim()).or(z.literal(""))
export const optionalDescString = (t: ReturnType<typeof useTranslations<'validations'>>) => z.optional(zDescField(t).trim()).or(z.literal(""))