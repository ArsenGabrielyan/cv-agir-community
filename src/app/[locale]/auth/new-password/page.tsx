import NewPasswordForm from "@/components/auth/new-password-form";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("auth");
     return {
          title: t("new-password-title")
     }
}

export default function NewPasswordPage(){
     return (
          <NewPasswordForm />
     )
}