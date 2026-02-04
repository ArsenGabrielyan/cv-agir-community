import { ICaptchaResult } from "@/lib/types"
import { env } from "./env"
import { useTranslations } from "next-intl"

export const getCaptchaToken = (errMsg: ReturnType<typeof useTranslations<"error-messages">>) =>
     new Promise<string>((resolve,reject)=>{
          if(typeof window === "undefined"){
               return reject(errMsg("contactForm.no-captcha-server"))
          }
          if(!window.grecaptcha || !window.grecaptcha.execute){
               return reject(errMsg("contactForm.no-captcha"))
          }
          window.grecaptcha.ready(()=>{
               try{
                    window.grecaptcha.execute(env.NEXT_PUBLIC_RECAPTCHA_SITE,{
                         action: "submit"
                    })
                    .then(resolve)
               } catch (error){
                    console.error(error);
                    reject(error)
               }
          })
     })

export async function verifyCaptchaToken(token: string){
     const url = new URL("https://www.google.com/recaptcha/api/siteverify");
     url.searchParams.append("secret",env.RECAPTCHA_SECRET);
     url.searchParams.append("response",token);
     const res = await fetch(url,{method: "POST"});
     if(!res.ok) return null;
     const captchaData: ICaptchaResult = await res.json();
     return captchaData
}