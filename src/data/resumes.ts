import { db } from "@/lib/db"
import { resumeDataSelect } from "@/lib/types/server";
import { cache } from "react";

export const getResumeCountByUserId = cache(async(userId: string) => {
     try{
          const resumeCount = await db.resume.count({
               where: {userId}
          })
          return resumeCount
     } catch{
          return 0
     }
})

export const getResumeById = cache(async(id: string) =>{
     try{
          const resume = await db.resume.findUnique({
               where: {id},
               select: resumeDataSelect
          });
          return resume
     } catch {
          return null
     }
})

export const getCurrentResumeByUserId = cache(async(userId: string, resumeId: string) => {
     try{
          const currResume = await db.resume.findUnique({
               where: {
                    id: resumeId,
                    userId
               },
               select: resumeDataSelect
          });
          return currResume
     } catch {
          return null
     }
})

export const getRecentResumes = cache(async() => {
     try {
          return await db.resume.findMany({
               take: 7,
               orderBy: {
                    createdAt: "desc",
               },
               select: {
                    id: true,
                    title: true,
                    createdAt: true,
               },
          })
     } catch {
          return []
     }
})