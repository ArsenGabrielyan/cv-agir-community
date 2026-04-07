import { db } from "@/lib/db"
import { cache } from "react"

export const getAdminCounts = cache(async()=>{
     try {
          return await Promise.all([
               db.resume.count(),
               db.coverLetter.count(),
               db.resumeTemplate.count(),
               db.resumeTemplateCategory.count(),
               db.user.count()
          ])
     } catch {
          return []
     }
})