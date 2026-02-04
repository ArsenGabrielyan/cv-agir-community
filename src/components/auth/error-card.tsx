"use client"
import { useTranslations } from "next-intl";
import { CardWrapper } from "./card-wrapper";
import { TriangleAlert } from "lucide-react";

export const ErrorCard = () => {
     const t = useTranslations("auth")
     return (
          <CardWrapper
               headerLabel={t("misc-error")}
               backButtonHref="/auth/login"
               backButtonLabel={t("buttons.returnToLogin")}
          >
               <div className="w-full flex justify-center items-center">
                    <TriangleAlert className="text-destructive"/>
               </div>
          </CardWrapper>
     )
}