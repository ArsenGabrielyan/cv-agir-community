import { LangCodeType } from "@/i18n/types";
import { db } from "@/lib/db"
import { templateDataSelect } from "@/lib/types/server";
import { cache } from "react";

export const getResumeTemplateById = cache(async(id: string) => {
     try{
          const template = await db.resumeTemplate.findUnique({
               where: {id},
               select: templateDataSelect
          });
          return template
     } catch {
          return null
     }
})

export const getResumeTemplates = cache(async(locale: LangCodeType) => await db.resumeTemplate.findMany({
     where: { locale },
     select: templateDataSelect
}));

export const getRecentTemplates = cache(async() => {
     try {
          return await db.resumeTemplate.findMany({
               take: 7,
               orderBy: {
                    createdAt: "desc",
               },
               select: {
                    id: true,
                    name: true,
                    createdAt: true,
               },
          })
     } catch {
          return []
     }
})