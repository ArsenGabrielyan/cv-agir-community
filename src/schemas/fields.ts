import { TFunction } from "@/i18n/types"
import * as z from "zod"

export function optionalArray<T>(
     t: TFunction<'validations'>,
     arr: z.ZodType<T>,
     maxCount?: number,itemName?: string
){
     return (maxCount && itemName) ? z.optional(z.array(arr).max(maxCount,t("items.no-more-items",{
          maxCount: String(maxCount),
          itemName: itemName.toLowerCase()
     }))) : z.optional(z.array(arr))
}
export const zDescField = (t: TFunction<'validations'>, name: "summary" | "hobbies" = "summary") => z.string().min(20,t(`${name}.20-chars`)).max(1000,t(`${name}.tooLong`))
export const emailField = (t: TFunction<'validations'>) => z.string().email(t("email.invalid")).max(254, t("email.tooLong"))
export const passwordField = (t: TFunction<'validations'>) => z.string().min(8,t("password.8-chars")).max(64, t("password.tooLong"))
export const jobTitleField = (t: TFunction<'validations'>) => z.string().max(100,t("jobTitle-tooLong"))
export const descriptionField = (t: TFunction<'validations'>) => zDescField(t);
export const nameField = (t: TFunction<'validations'>) => z.string().min(2,t("fullName.tooShort")).max(100,t("fullName.tooLong"))
export const fileField = (t: TFunction<'validations'>) => z.instanceof(File, { message: t("image.shouldBeImage") })
.refine((file) => !file || file.type.startsWith("image/"),t("image.inavlidFormat"))
.refine((file) => !file || file.size > 0, t("image.empty"))
.refine((file) => !file || file.size <= 4 * 1024 * 1024, t("image.under-4mb"))
.nullable().optional()
export const optionalString = (t: TFunction<'validations'>) => z.optional(z.string().trim().max(1500,t("text-too-long"))).or(z.literal(""))
export const optionalEmailString = (t: TFunction<'validations'>) => z.optional(emailField(t).trim().transform(email => email.toLowerCase())).or(z.literal(""))
export const optionalJobTitleString = (t: TFunction<'validations'>) => z.optional(jobTitleField(t).trim()).or(z.literal(""))
export const optionalDescString = (t: TFunction<'validations'>) => z.optional(zDescField(t).trim()).or(z.literal(""))