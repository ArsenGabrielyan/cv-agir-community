import {createEnv} from "@t3-oss/env-nextjs"
import * as z from "zod";

export const env = createEnv({
     server: {
          DATABASE_URL: z.string().min(1,"Database URL is required"),
          AUTH_SECRET: z.string().min(1,"Next Auth's secret key is required"),
          AUTH_URL: z.string().min(1,"Next Auth URL is required").url("Next Auth URL should be a valid URL"),
          BLOB_READ_WRITE_TOKEN: z.string().min(1,"App's storage token is required"),
          GITHUB_ID: z.string().min(1,"GitHub's client ID is required"),
          GITHUB_SECRET: z.string().min(1,"GitHub's client secret key is required"),
          GOOGLE_ID: z.string().min(1,"Google's client ID is required"),
          GOOGLE_SECRET: z.string().min(1,"Google's client secret key is required"),
          GEMINI_API_KEY: z.string().min(1,"Google Gemini's api key is required"),
          FACEBOOK_ID: z.string().min(1,"Facebook's client ID is required"),
          FACEBOOK_SECRET: z.string().min(1,"Facebook's client secret key is required"),
          RESEND_API_KEY: z.string().min(1,"Resend's api key is required"),
          DEV_EMAIL: z.string().min(1,"Please write the app dev's email address").email("Dev's email should be valid"),
          ONBOARDING_EMAIL: z.string().min(1,"Please add the Onboarding email used by Resend").email("Onboarding email should be valid"),
          AES_SECRET: z.string().min(1,"Encryption secret key is required"),
          RECAPTCHA_SECRET: z.string().min(1,"ReCaptcha's secret key is required")
     },
     client: {
          NEXT_PUBLIC_APP_URL: z.string().min(1,"Main app URL is required").url("Main app URL should be a valid URL"),
          NEXT_PUBLIC_RECAPTCHA_SITE: z.string().min(1,"ReCaptcha's site key is required"),
     },
     experimental__runtimeEnv: {
          NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
          NEXT_PUBLIC_RECAPTCHA_SITE: process.env.NEXT_PUBLIC_RECAPTCHA_SITE
     },
     emptyStringAsUndefined: true,
})