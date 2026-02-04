import ResetForm from "@/components/auth/reset-form";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("auth");
     return {
          title: t("reset-pass-title")
     }
}

export default function ResetPage(){
     return (
          <ResetForm/>
     )
}