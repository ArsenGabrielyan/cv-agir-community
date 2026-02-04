"use server"
import { getCurrentCoverLetterByUserId } from "@/data/cover-letters";
import { logAction } from "@/data/logs";
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db";
import { getIpAddress } from "@/actions/ip";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

export const deleteCoverLetter = async (id: string) => {
     const user = await currentUser();
     const currIp = await getIpAddress();
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
     const coverLetter = await getCurrentCoverLetterByUserId(user.id,id);
     if(!coverLetter){
          await logAction({
               userId: user.id,
               action: "ACTION_ERROR",
               metadata: {
                    ip: currIp,
                    reason: errMsg("content.noCoverLetter")
               }
          })
          throw new Error(errMsg("content.noCoverLetter"))
     }
     if(coverLetter.profileImg){
          try{
               await del(coverLetter.profileImg)
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
     await db.coverLetter.delete({where: { id }})
     await logAction({
          userId: user.id,
          action: "COVER_LETTER_DELETED",
          metadata: {
               ip: currIp,
               coverLetterId: id
          }
     })
     revalidatePath("/dashboard?show=cover-letter")
}