"use client"
import { usePathname } from "@/i18n/routing";
import Script from "next/script";

interface ReCaptchaProps{
     siteKey: string
}
export default function ReCaptcha({siteKey}: ReCaptchaProps){
     const pathname = usePathname();
     return pathname==="/contact" ? (
          <Script
               src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
               strategy="afterInteractive"
               defer
          />
     ) : null
}