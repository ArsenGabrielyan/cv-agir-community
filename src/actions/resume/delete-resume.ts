"use server"
import { logAction } from "@/data/logs";
import { getCurrentResumeByUserId } from "@/data/resumes";
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db";
import { getIpAddress } from "@/actions/ip";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

export const deleteResume = async (id: string) => {
     const currIp = await getIpAddress()
     const user = await currentUser();
     const errMsg = await getTranslations("error-messages");
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: {
                    ip: currIp,
               }
          })
          throw new Error(errMsg("auth.unauthorized"))
     }
     const resume = await getCurrentResumeByUserId(user.id,id);
     if(!resume){
          await logAction({
               userId: user.id,
               action: "ACTION_ERROR",
               metadata: {
                    ip: currIp,
                    reason: errMsg("content.noResume")
               }
          })
          throw new Error(errMsg("content.noResume"))
     }
     if(resume.profileImg){
          try{
               await del(resume.profileImg)
          } catch (e){
               console.error(e);
               await logAction({
                    userId: user.id,
                    action: "ACTION_ERROR",
                    metadata: {
                         ip: currIp,
                         reason: errMsg("content.failedImageDelete")
                    }
               })
          }
     }
     await db.resume.delete({where: { id }})
     await logAction({
          userId: user.id,
          action: "RESUME_DELETED",
          metadata: {
               ip: currIp,
               resumeId: id
          }
     })
     revalidatePath("/dashboard?show=resume")
}