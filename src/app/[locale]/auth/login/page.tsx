import LoginForm from "@/components/auth/login-form";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("auth.login");
     return {
          title: t("title")
     }
}

export default function LoginPage(){
     return (
          <LoginForm/>
     )
}