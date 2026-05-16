import { db } from "@/lib/db"
import { cache } from "react";

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