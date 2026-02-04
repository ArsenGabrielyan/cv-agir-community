"use server"
import { sendMessage } from "@/lib/mail";
import { getContactSchema } from "@/schemas"
import { ContactFormType } from "@/schemas/types";
import { checkLimiter, clearLimiter, incrementLimiter } from "@/lib/limiter";
import { verifyCaptchaToken } from "@/lib/captcha";
import { logAction } from "@/data/logs";
import { getIpAddress } from "./ip"
import { getTranslations } from "next-intl/server";

export const submitContactForm = async (token: string,values: ContactFormType) => {
     const ip = await getIpAddress();
     const errMsg = await getTranslations("error-messages");
     if(!token){
          await logAction({
               action: "CONTACT_FORM_SUBMISSION_ERROR",
               metadata: {
                    ip,
                    reason: errMsg("contactForm.noCaptchaToken")
               }
          })
          return {error: errMsg("contactForm.noCaptchaToken")}
     }
     const validationMsg = await getTranslations("validations");
     const validatedFields = getContactSchema(validationMsg).safeParse(values);

     if(!validatedFields.success){
          await logAction({
               action: "VALIDATION_ERROR",
               metadata: {
                    fields: validatedFields.error.issues.map(val=>val.path[0].toString()),
               }
          })
          return {error: errMsg("validationError")}
     }

     const {name,email,phone,subject,message} = validatedFields.data;
     const limiterKey = `contact:${ip}`;
     const verificationResult = await verifyCaptchaToken(token);

     if(!verificationResult || !verificationResult.success || verificationResult.score < 0.5) {
          incrementLimiter(limiterKey,60_000)
          await logAction({
               action: "INVALID_CAPTCHA",
               metadata: {
                    ip,
                    score: verificationResult?.score || 0,
                    reasons: verificationResult?.["error-codes"],
               }
          })
          return {error: errMsg("contactForm.failedCaptcha")}
     }

     if(checkLimiter(limiterKey,3)){
          await logAction({
               action: "RATE_LIMIT_EXCEEDED",
               metadata: {
                    ip,
                    route: limiterKey
               }
          })
          return {error: errMsg("rateLimitError")}
     }
     const successMsg = await getTranslations("success-messages")
     try{
          await sendMessage(name,email,phone,subject,message);
          await logAction({
               action: "CONTACT_FORM_SUBMITTED",
               metadata: {
                    ip,
                    messageLength: message.length
               }
          })
          clearLimiter(limiterKey)
          return {success: successMsg("contact")}
     } catch {
          await logAction({
               action: "CONTACT_FORM_SUBMISSION_ERROR",
               metadata: {
                    ip,
                    reason: errMsg("unknownError")
               }
          })
          incrementLimiter(limiterKey,60_000)
          return {error: errMsg("unknownError")}
     }
}