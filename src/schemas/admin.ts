import { languages } from "@/i18n/config"
import { TFunction } from "@/i18n/types"
import * as z from "zod"

export const getCategoryFormSchema = (t: TFunction<"validations.category-name">) => z.object({
     name: z.string({
          required_error: t("required")
     }).min(3,t("tooShort")).max(100,t("tooLong"))
})

export const getTemplateFormSchema = (t: TFunction<"validations.template">) => z.object({
     locale: z.enum([languages.map(val=>val.code)[0],...languages.map(val=>val.code).slice(1)],{
          required_error: t("locale")
     }),
     name: z.string({
          required_error: t("name.required")
     }).min(3,t("name.tooShort")).max(200,t("name.tooLong")),
     description: z.string({
          required_error: t("desc.required")
     }).min(5,t("desc.tooShort")).max(1000,t("desc.tooLong")),
     categoryId: z.string({
          required_error: t("category")
     }),
     imageName: z.string({
          required_error: t("imageName.required")
     }).min(3,t("imageName.tooShort")).max(100,t("imageName.tooLong")),
     htmlTemplate: z.string({
          required_error: t("html-code.required")
     }).min(10,t("html-code.tooShort")).max(1_000_000,t("html-code.tooLong")),
     cssStyle: z.string({
          required_error: t("css-code.required")
     }).min(10,t("css-code.tooShort")).max(1_000_000,t("css-code.tooShort")),
})