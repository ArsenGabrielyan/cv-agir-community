"use server"
import { getNewPasswordSchema } from "@/schemas"
import { db } from "@/lib/db"
import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { getUserByEmail } from "@/data/user"
import bcrypt from "bcryptjs"
import { NewPasswordType } from "@/schemas/types"
import { checkLimiter, clearLimiter, incrementLimiter } from "@/lib/limiter"
import { logAction } from "@/data/logs"
import { getIpAddress } from "../ip"
import { getTranslations } from "next-intl/server"

export const newPassword = async(
     values: NewPasswordType,
     token: string | null
) => {
     const validationMsg = await getTranslations("validations");
     const currIp = await getIpAddress();
     const errMsg = await getTranslations("error-messages");
     if(!token){
          await logAction({
               action: "PASSWORD_CHANGE_ERROR",
               metadata: {
                    ip: currIp,
                    reason: errMsg("auth.noPassResetToken")
               }
          })
          return {error: errMsg("auth.noPassResetToken")}
     }

     const validatedFields = getNewPasswordSchema(validationMsg).safeParse(values);

     if(!validatedFields.success){
          await logAction({
               action: "VALIDATION_ERROR",
               metadata: {
                    fields: validatedFields.error.issues.map(issue => issue.path[0]),
               }
          })
          return {error: errMsg("validationError")}
     }
     const limiterKey = `new-password:${await getIpAddress()}`;
     if(checkLimiter(limiterKey,5)){
          await logAction({
               action: "RATE_LIMIT_EXCEEDED",
               metadata: {
                    ip: currIp,
                    route: limiterKey
               }
          })
          return {error: errMsg("rateLimitError")}
     }

     const {password} = validatedFields.data
     
     const existingToken = await getPasswordResetTokenByToken(token);
     if(!existingToken){
          incrementLimiter(limiterKey,60*60_000)
          await logAction({
               action: "PASSWORD_CHANGE_ERROR",
               metadata: {
                    ip: currIp,
                    reason: errMsg("auth.wrongPassResetToken")
               }
          })
          return {error: errMsg("auth.wrongPassResetToken")}
     }

     const hasExpired = new Date(existingToken.expires) < new Date();
     if(hasExpired){
          incrementLimiter(limiterKey,60*60_000)
          await logAction({
               action: "PASSWORD_CHANGE_ERROR",
               metadata: {
                    email: existingToken.email,
                    ip: currIp,
                    reason: errMsg("auth.expiredPassResetToken")
               }
          })
          return {error: errMsg("auth.expiredPassResetToken")}
     }

     const existingUser = await getUserByEmail(existingToken.email);
     if(!existingUser || !existingUser.password){
          incrementLimiter(limiterKey,60*60_000)
          await logAction({
               action: "PASSWORD_CHANGE_ERROR",
               metadata: {
                    email: existingToken.email,
                    ip: currIp,
                    reason: errMsg("auth.noUserFound")
               }
          })
          return {error: errMsg("auth.noUserFound")}
     }

     const isSamePassword = await bcrypt.compare(password,existingUser.password);
     if(isSamePassword){
          incrementLimiter(limiterKey,60*60_000)
          await logAction({
               userId: existingUser.id,
               action: "PASSWORD_CHANGE_ERROR",
               metadata: {
                    email: existingToken.email,
                    ip: currIp,
                    reason: errMsg("auth.wrongNewPassword")
               }
          })
          return {error: errMsg("auth.wrongNewPassword")}
     }

     clearLimiter(limiterKey)
     const hashedPassword = await bcrypt.hash(password,10);

     await db.user.update({
          where: {
               id: existingUser.id
          },
          data: {
               password: hashedPassword
          }
     })
     await db.passwordResetToken.delete({
          where: {
               id: existingToken.id
          }
     })
     const t = await getTranslations("audit-log");
     const successMsg = await getTranslations("success-messages")
     await logAction({
          userId: existingUser.id,
          action: "PASSWORD_CHANGED",
          metadata: {
               ip: currIp,
               email: existingUser.email || t("unknown-email")
          }
     })

     return {success: successMsg("password-updated")}
}