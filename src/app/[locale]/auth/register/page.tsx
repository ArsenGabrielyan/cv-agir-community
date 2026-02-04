import RegisterForm from "@/components/auth/register-form";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("auth.register");
     return {
          title: t("title")
     }
}

export default function RegisterPage(){
     return (
          <RegisterForm/>
     )
}