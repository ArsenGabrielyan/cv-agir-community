import PageLayout from "@/components/layout/page-layout";
import FAQPageContent from "@/components/pages/faq";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("faq");
     return {
          title: t("qna")
     }
}

export default function FAQPage(){
     return (
          <PageLayout landingFooter>
               <FAQPageContent/> 
          </PageLayout>
     )
}