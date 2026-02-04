"use client"
import LandingHeroLoader from "@/components/loaders/landing-hero-loader";
import { Reasons } from "@/lib/types/enums";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const AboutHero = dynamic(()=>import("@/components/section-hero"),{
     loading: () => <LandingHeroLoader/>
})
export default function AboutContent(){
     const t = useTranslations("about");
     return (
          <>
               <AboutHero title={t("title")}/>
               <section className="py-16 px-6 sm:px-12 md:px-24 lg:px-40 text-center">
                    <h2 className="text-3xl font-bold mb-6">{t("desc.line1")}</h2>
                    <p className="text-lg leading-relaxed">{t.rich("desc.line2",{
                         bold: (chunks) => <span className="font-semibold">{chunks}</span>
                    })}</p>
               </section>
               <section className="bg-card py-16 px-6 sm:px-12 md:px-24 lg:px-40 text-center">
                    <h2 className="text-3xl font-bold mb-6">{t("why-choose-app.title")}</h2>
                    <ul className="space-y-4 text-lg text-card-foreground text-left max-w-3xl mx-auto">
                         {Object.values(Reasons).map(reason=>(
                              <li key={reason} className="flex gap-x-2">
                                   <CheckCircle className="text-primary"/>
                                   <p>{t.rich(`why-choose-app.${reason}`,{
                                        bold: (chunks) => <span className="font-semibold">{chunks}</span>
                                   })}</p>
                              </li>
                         ))}
                    </ul>
               </section>
               <section className="py-16 px-6 sm:px-12 md:px-24 lg:px-40 text-center">
                    <h2 className="text-3xl font-bold mb-6">{t("mission.title")}</h2>
                    <p className="text-lg leading-relaxed">{t.rich("mission.desc",{
                         bold: (chunks) => <span className="font-semibold">{chunks}</span>
                    })}</p>
               </section>
               <section className="bg-card py-16 px-6 sm:px-12 md:px-24 lg:px-40 text-center">
                    <h2 className="text-3xl font-bold mb-6">{t("contact.title")}</h2>
                    <p className="text-lg text-card-foreground leading-relaxed">{t.rich("contact.desc",{
                         bold: (chunks) => <span className="font-semibold">{chunks}</span>
                    })}</p>
               </section>
          </>
     )
}