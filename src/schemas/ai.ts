import * as z from "zod";
import { optionalJobTitleString, optionalString } from "./fields";
import { getCoverLetterDetailsSchema, getResumeDetailsSchema } from ".";
import { useTranslations } from "next-intl";

export const getGenerateSummarySchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     jobTitle: optionalJobTitleString(t),
     ...getResumeDetailsSchema(t).shape
})

export const getGenerateDescriptionSchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     description: z.string().trim().min(20,t("ai.under-20")).max(400,t("ai.over-400")).trim()
})

export const getGenerateLetterBodySchema = (t: ReturnType<typeof useTranslations<'validations'>>) => z.object({
     jobTitle: optionalJobTitleString(t),
     fname: optionalString(t),
     lname: optionalString(t),
     ...getCoverLetterDetailsSchema(t).shape
})