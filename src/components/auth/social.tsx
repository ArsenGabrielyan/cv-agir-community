"use client";
import {FcGoogle} from "react-icons/fc"
import {FaGithub, FaFacebook} from "react-icons/fa"
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group";

export const Social = () => {
     const searchParams = useSearchParams();
     const callbackUrl = searchParams.get("callbackUrl")
     const onClick = (provider: "google" | "github" | "facebook") => {
          signIn(provider,{
               callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
          })
     }
     const t = useTranslations("auth")
     return (
          <ButtonGroup className="w-full">
               <Button size="lg" title={t("social-txt",{provider: "Google"})} className="flex-1" variant="outline" onClick={()=>onClick("google")}>
                    <FcGoogle className="h-5 w-5"/>
               </Button>
               <ButtonGroupSeparator/>
               <Button size="lg" title={t("social-txt",{provider: "Facebook"})} className="flex-1 text-[#3b5999]" variant="outline" onClick={()=>onClick("facebook")}>
                    <FaFacebook className="h-5 w-5"/>
               </Button>
               <ButtonGroupSeparator/>
               <Button size="lg" title={t("social-txt",{provider: "GitHub"})} className="flex-1" variant="outline" onClick={()=>onClick("github")}>
                    <FaGithub className="h-5 w-5"/>
               </Button>
          </ButtonGroup>
     )
}