import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async() => {
     const t = await getTranslations("auth");
     return {
          title: t("verify-email-title")
     }
}

export default function NewVerificationPage(){
     return (
          <NewVerificationForm />
     )
}