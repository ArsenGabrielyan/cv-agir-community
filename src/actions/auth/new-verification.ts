"use server"
import { logAction } from "@/data/logs"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db"
import { getIpAddress } from "@/actions/ip"
import { getTranslations } from "next-intl/server"

export const newVerification = async (token: string) => {
     const currIp = await getIpAddress()
     const existingToken = await getVerificationTokenByToken(token);
     const errMsg = await getTranslations("error-messages");
     if(!existingToken){
          await logAction({
               action: "VERIFICATION_ERROR",
               metadata: {
                    ip: currIp,
                    reason: errMsg("auth.noVerificationToken")
               }
          })
          return {error: errMsg("auth.noVerificationToken")}
     }

     const hasExpired = new Date(existingToken.expires) < new Date();
     if(hasExpired){
          await logAction({
               action: "VERIFICATION_ERROR",
               metadata: {
                    ip: currIp,
                    email: existingToken.email,
                    reason: errMsg("auth.expiredVerificationToken")
               }
          })
          return {error: errMsg("auth.expiredVerificationToken")}
     }

     const existingUser = await getUserByEmail(existingToken.email);
     if(!existingUser){
          await logAction({
               action: "VERIFICATION_ERROR",
               metadata: {
                    ip: currIp,
                    email: existingToken.email,
                    reason: errMsg("auth.noUserFound")
               }
          })
          return {error: errMsg("auth.noUserFound")}
     }

     await db.user.update({
          where: {
               id: existingUser.id
          },
          data: {
               emailVerified: new Date(),
               email: existingToken.email
          }
     })
     await db.verificationToken.delete({
          where: {
               id: existingToken.id
          }
     })
     const t = await getTranslations("audit-log");
     const successMsg = await getTranslations("success-messages")
     await logAction({
          userId: existingUser.id,
          action: "EMAIL_VERIFIED",
          metadata: { email: existingUser.email || t("unknown-email") }
     })
     return {success: successMsg("email-verified")}
}