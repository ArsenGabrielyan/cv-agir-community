"use server";
import bcrypt from "bcryptjs"
import { getUserByEmail, getUserById, updateUser } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { SettingsType } from "@/schemas/types";
import { checkLimiter, incrementLimiter } from "@/lib/limiter";
import { logAction } from "@/data/logs";
import { getIpAddress } from "./ip"
import { getTranslations } from "next-intl/server";

export const applySettings = async(values: SettingsType): Promise<{
     error?: string,
     success?: string
}> => {
     const user = await currentUser();
     const ip = await getIpAddress();
     const errMsg = await getTranslations("error-messages");
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: { ip }
          })
          return {error: errMsg("auth.unauthorized")}
     }
     const dbUser = await getUserById(user.id);
     if(!dbUser){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: { ip }
          })
          return {error: errMsg("auth.unauthorized")}
     }

     if(user.isOauth){
          values.email = undefined;
          values.password = undefined;
          values.newPassword = undefined;
          values.isTwoFactorEnabled = undefined;
     }

     const limiterKey = `settings:${user.id || await getIpAddress()}`;
     if(checkLimiter(limiterKey,5)){
          await logAction({
               userId: user.id,
               action: "RATE_LIMIT_EXCEEDED",
               metadata: {
                    ip,
                    route: limiterKey
               }
          })
          return {error: errMsg("rateLimitError")}
     }
     const successMsg = await getTranslations("success-messages")
     if(values.email && values.email!==user.email){
          const existingUser = await getUserByEmail(values.email);
          if(existingUser && existingUser.id!==user.id){
               incrementLimiter(limiterKey,60_000)
               await logAction({
                    userId: user.id,
                    action: "ACTION_ERROR",
                    metadata: {
                         ip,
                         reason: errMsg("auth.takenEmail")
                    }
               })
               return {error: errMsg("auth.takenEmail")}
          }
          const verificationToken = await generateVerificationToken(values.email);

          await sendVerificationEmail(
               values.name ? values.name : user.name || "",
               verificationToken.email,
               verificationToken.token
          )
          await logAction({
               userId: user.id,
               action: "EMAIL_CHANGE_REQUEST",
               metadata: {
                    ip,
                    newEmail: verificationToken.email
               }
          })
          return await updateUser(user.id,{
               ...values,
               email: verificationToken.email
          },limiterKey,successMsg("email-settings"));
     }

     if(values.password && values.newPassword && dbUser.password){
          const passwordsMatch = await bcrypt.compare(
               values.password,
               dbUser.password
          )
          if(!passwordsMatch){
               incrementLimiter(limiterKey,60_000)
               await logAction({
                    userId: user.id,
                    action: "ACTION_ERROR",
                    metadata: {
                         ip,
                         reason: errMsg("auth.wrongPassword")
                    }
               })
               return {error: errMsg("auth.wrongPassword")}
          }
          const hashedPassword = await bcrypt.hash(values.newPassword,10);

          values.password = hashedPassword;
          values.newPassword = undefined
     }
     if(user.isTwoFactorEnabled!==values.isTwoFactorEnabled){
          await logAction({
               userId: user.id,
               action: 'TWO_FACTOR_UPDATED',
               metadata: {
                    ip,
                    enabled: values.isTwoFactorEnabled || user.isTwoFactorEnabled
               }
          })
     }
     const userFields: (keyof SettingsType)[] = ["name","email","jobTitle","phone","address","summary","hobbies","password","newPassword","isTwoFactorEnabled"];
     const settingsFields: (keyof SettingsType)[] = ["showEmail","showAddress","showPhone","showLinks"];
     const changedFields: (keyof SettingsType)[] = [];

     for (const key of userFields) {
          if (key === "password" || key === "newPassword") continue;
          if (JSON.stringify(values[key]) !== JSON.stringify(dbUser[key as keyof typeof dbUser])) {
               changedFields.push(key);
          }
     }

     for (const key of settingsFields) {
          if (
               JSON.stringify(values[key]) !==
               JSON.stringify(dbUser.cvPageSettings?.[key as keyof typeof dbUser.cvPageSettings])
          ) {
               changedFields.push(key);
          }
     }
     await logAction({
          userId: user.id,
          action: "ACCOUNT_UPDATED",
          metadata: {
               ip,
               changedFields,
          }
     })
     return await updateUser(user.id,values,limiterKey,successMsg("updated-settings"));
}