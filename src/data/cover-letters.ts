import { db } from "@/lib/db";
import { cache } from "react";

export const getCurrentCoverLetterByUserId = cache(async(userId: string, id: string) => {
     try{
          const coverLetter = await db.coverLetter.findUnique({
               where: { id, userId }
          });
          return coverLetter;
     } catch {
          return null
     }
})

export const getCoverLetterById = cache(async(id: string) => {
     try{
          const coverLetter = await db.coverLetter.findUnique({
               where: { id }
          });
          return coverLetter;
     } catch {
          return null
     }
})