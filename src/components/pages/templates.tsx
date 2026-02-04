"use client"
import TemplateList from "@/components/templates/template-list";
import dynamic from "next/dynamic";
import LandingHeroLoader from "@/components/loaders/landing-hero-loader";
import { ResumeTemplate } from "@db";
import { useTranslations } from "next-intl";

const TemplateHero = dynamic(()=>import("@/components/section-hero"),{
     loading: () => <LandingHeroLoader loaderType="template"/>
})

interface TemplatesContentProps{
     templates: ResumeTemplate[],
}
export default function TemplatesContent({templates}: TemplatesContentProps){
     const t = useTranslations("templates");
     return (
          <>
               <TemplateHero title={t("title")}>
                    <p className="text-sm md:text-xl font-light text-muted-foreground">{t("desc")}</p>
               </TemplateHero>
               <TemplateList templates={templates} t={t}/>
          </>
     )
}