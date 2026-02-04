import { ErrorCard } from "@/components/auth/error-card";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("auth")
     return {
          title: t("misc-error")
     }
}

export default function AuthErrorPage(){
     return (
          <ErrorCard />
     )
}