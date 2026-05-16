import { cache } from "react"
import getCountAndDifference from "./dashboard/counter"
import { getMonthlyActivity } from "./dashboard/monthly-activity"
import { getRecentUsers } from "./user"
import { getRecentCoverLetters } from "./cover-letters"
import { getRecentResumes } from "./resumes"
import { getRecentTemplates } from "./templates"

export const getAdminData = cache(async()=>{
     try {
          return await Promise.all([
               getCountAndDifference("resume"),
               getCountAndDifference("coverLetter"),
               getCountAndDifference("template"),
               getCountAndDifference("user"),
               getCountAndDifference("category"),
               getMonthlyActivity(),
               getRecentUsers(),
               getRecentCoverLetters(),
               getRecentResumes(),
               getRecentTemplates()
          ])
     } catch {
          return []
     }
})