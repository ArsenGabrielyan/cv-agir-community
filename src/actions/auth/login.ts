"use server"
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorEmail } from "@/lib/mail";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getLoginSchema } from "@/schemas"
import { AuthError } from "next-auth";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { logAction } from "@/data/logs";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { LoginType } from "@/schemas/types";
import { checkLimiter } from "@/lib/limiter";
import { getIpAddress } from "../ip";
import { getTranslations } from "next-intl/server";

const getAuthErrorMessages = (t: Awaited<ReturnType<typeof getTranslations<"error-messages">>>): Record<AuthError["name"], string> => ({
     CredentialsSignin: t("auth.credentials"),
     AccessDenied: t("auth.denied-access"),
     Configuration: t("auth.config"),
     Verification: t("auth.verification"),
     OAuthSignin: t("auth.oauth-login"),
     OAuthCallback: t("auth.oauth-callback"),
     OAuthCreateAccount: t("auth.oath-registration"),
     EmailCreateAccount: t("auth.email-registration"),
     Callback: t("auth.callback"),
     OAuthAccountNotLinked: t("auth.acc-not-linked"),
     SessionRequired: t("auth.session-required"),
});

export const login = async (
     values: LoginType,
     callbackUrl?: string | null
) => {
     const currIp = await getIpAddress();
     const validationMsg = await getTranslations("validations");
     const validatedFields = getLoginSchema(validationMsg).safeParse(values);
     
     const errMsg = await getTranslations("error-messages");
     if(!validatedFields.success){
          await logAction({
               action: "VALIDATION_ERROR",
               metadata: {
                    fields: validatedFields.error.issues.map(issue => issue.path[0]),
               }
          })
          return {error: errMsg("validationError")}
     }

     const {email,password, code} = validatedFields.data;
     const limiterKey = `login:${email}`;

     if(checkLimiter(limiterKey,5)) {
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
     const isSamePass = await bcrypt.compare(password,existingUser?.password || "");

     if(!existingUser || !existingUser.email || !existingUser.password || !existingUser.name){
          await logAction({
               action: "LOGIN_ERROR",
               metadata: {
                    email,
                    ip: currIp,
                    reason: errMsg("auth.noUserFound")
               }
          })
          return {error: errMsg("auth.noUserFound")}
     }

     const successMsg = await getTranslations("success-messages")
     if(!existingUser.emailVerified) {
          const verificationToken = await generateVerificationToken(email);
          await sendVerificationEmail(
               existingUser.name,
               verificationToken.email,
               verificationToken.token
          )
          await logAction({
               userId: existingUser.id,
               action: "VERIFICATION_REQUEST",
               metadata: { email }
          })
          return {success: successMsg("verify-email")}
     }

     if(existingUser.isTwoFactorEnabled && existingUser.email && isSamePass){
          if(code){
               const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
               if(!twoFactorToken || twoFactorToken.token!==code){
                    await logAction({
                         userId: existingUser.id,
                         action: "FAILED_2FA_ATTEMPT",
                         metadata: {
                              email,
                              ip: currIp,
                              reason: errMsg("auth.wrong2FAcode")
                         }
                    })
                    return {error: errMsg("auth.wrong2FAcode")}
               }

               const hasExpired = new Date(twoFactorToken.expires) < new Date();
               if(hasExpired){
                    await logAction({
                         userId: existingUser.id,
                         action: "FAILED_2FA_ATTEMPT",
                         metadata: {
                              email,
                              ip: currIp,
                              reason: errMsg("auth.expired2FAcode")
                         }
                    })
                    return {error: errMsg("auth.expired2FAcode")}
               }

               await db.twoFactorToken.delete({
                    where: {
                         id: twoFactorToken.id
                    }
               })

               const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
               if(existingConfirmation){
                    await db.twoFactorConfirmation.delete({
                         where: {
                              id: existingConfirmation.id
                         }
                    })
               }

               await db.twoFactorConfirmation.create({
                    data: {
                         userId: existingUser.id
                    }
               })
               await logAction({
                    userId: existingUser.id,
                    action: "TWO_FACTOR_VERIFIED",
                    metadata: {
                         ip: currIp,
                         email: existingUser.email
                    }
               })
          } else {
               const twoFactorToken = await generateTwoFactorToken(existingUser.email);
               await sendTwoFactorEmail(
                    existingUser.name,
                    twoFactorToken.email,
                    twoFactorToken.token
               )
               return {twoFactor: true}
          }
     }

     try{
          await signIn("credentials",{
               email,
               password,
               redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
          })
     } catch(error: unknown){
          if (error instanceof AuthError){
               await logAction({
                    userId: existingUser.id,
                    action: "LOGIN_ERROR",
                    metadata: {
                         email,
                         ip: currIp,
                         reason: getAuthErrorMessages(errMsg)[error.name] || errMsg("unknownError")
                    }
               })
               return {error: getAuthErrorMessages(errMsg)[error.name] || errMsg("unknownError")}
          }
          throw error
     }
}