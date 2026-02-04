import { db } from "@/lib/db";

export const getCurrentCoverLetterByUserId = async(userId: string, id: string) => {
     try{
          const coverLetter = await db.coverLetter.findUnique({
               where: { id, userId }
          });
          return coverLetter;
     } catch {
          return null
     }
}

export const getCoverLetterById = async(id: string) => {
     try{
          const coverLetter = await db.coverLetter.findUnique({
               where: { id }
          });
          return coverLetter;
     } catch {
          return null
     }
}