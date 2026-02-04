import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import { getLoginSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import bcrypt from "bcryptjs"
import { env } from "@/lib/env"
import { clearLimiter, incrementLimiter } from "./lib/limiter"
import { logAction } from "@/data/logs"
import { getIpAddress } from "./actions/ip"
import { getTranslations } from "next-intl/server"

export default { 
     providers: [
          Credentials({
               async authorize(credentials) {
                    const validationMsg = await getTranslations("validations");
                    const errMsg = await getTranslations("error-messages");
                    const validatedFields = getLoginSchema(validationMsg).safeParse(credentials)
                    const currIp = await getIpAddress()

                    if(validatedFields.success){
                         const {email, password} = validatedFields.data;
                         const limiterKey = `login:${email}`;
                         const user = await getUserByEmail(email);
                         if(!user || !user.password){
                              await logAction({
                                   action: "LOGIN_ERROR",
                                   metadata: {
                                        email,
                                        ip: currIp,
                                        reason: errMsg("auth.noUserFound")
                                   }
                              })
                              return null;
                         }
                         const passwordsMatch = await bcrypt.compare(password,user.password);
                         if(!passwordsMatch){
                              incrementLimiter(limiterKey,60_000)
                              return null
                         }
                         clearLimiter(limiterKey)
                         return user;
                    }

                    return null
               }
          }),
          Github({
               clientId: env.GITHUB_ID,
               clientSecret: env.GITHUB_SECRET
          }),
          Google({
               clientId: env.GOOGLE_ID,
               clientSecret: env.GOOGLE_SECRET,
          }),
          Facebook({
               clientId: env.FACEBOOK_ID,
               clientSecret: env.FACEBOOK_SECRET
          })
     ]
} satisfies NextAuthConfig