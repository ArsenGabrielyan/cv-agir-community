import PageLayout from "@/components/layout/page-layout";
import { Metadata } from "next";
import ContactContent from "@/components/pages/contact";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("contact");
     return {
          title: t("title"),
          description: t("desc")
     }
}

export default function ContactPage(){
     return (
          <PageLayout landingFooter>
               <ContactContent/>
          </PageLayout>
     )
}