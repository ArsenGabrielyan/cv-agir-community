"use server"
import { getResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"
import { ResetPassType } from "@/schemas/types"
import { checkLimiter, clearLimiter, incrementLimiter } from "@/lib/limiter"
import { logAction } from "@/data/logs"
import { getIpAddress } from "../ip"
import { getTranslations } from "next-intl/server"

export const reset = async (values: ResetPassType) => {
     const currIp = await getIpAddress();
     const validationMsg = await getTranslations("validations");
     const validatedFields = getResetSchema(validationMsg).safeParse(values);
     const errMsg = await getTranslations("error-messages");
     if(!validatedFields.success){
          await logAction({
               action: "VALIDATION_ERROR",
               metadata: {
                    fields: validatedFields.error.issues.map(issue => issue.path[0]),
               }
          })
          return {error: errMsg("auth.invalidEmail")}
     }
     const {email} = validatedFields.data;
     const limiterKey = `reset:${email}`

     if(checkLimiter(limiterKey,3)){
          await logAction({
               action: "RATE_LIMIT_EXCEEDED",
               metadata: {
                    ip: currIp,
                    route: limiterKey
               }
          })
          return {error: errMsg("rateLimitError")}
     }

     const existingUser = await getUserByEmail(email);
     if(!existingUser || !existingUser.name){
          incrementLimiter(limiterKey, 60 * 60_000);
          await logAction({
               action: "PASSWORD_CHANGE_ERROR",
               metadata: {
                    ip: currIp,
                    email,
                    reason: errMsg("auth.noUserFound")
               }
          })
          return {error: errMsg("auth.noUserFound")}
     }

     clearLimiter(limiterKey)

     const passwordResetToken = await generatePasswordResetToken(email);
     await sendPasswordResetEmail(
          existingUser.name,
          passwordResetToken.email,
          passwordResetToken.token
     )
     const t = await getTranslations("audit-log");
     const successMsg = await getTranslations("success-messages")
     await logAction({
          userId: existingUser.id,
          action: "PASSWORD_CHANGE_REQUEST",
          metadata: {
               email: existingUser.email || t("unknown-email")
          }
     })
     return {success: successMsg("recovery-link-sent")}
}