import PageLayout from "@/components/layout/page-layout";
import AboutContent from "@/components/pages/about";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("about");
     return {
          title: t("title")
     }
}

export default function AboutPage(){
     return (
          <PageLayout landingFooter>
               <AboutContent/>
          </PageLayout>
     )
}