"use client"
import LandingHeroLoader from "@/components/loaders/landing-hero-loader";
import { CircleHelp } from "lucide-react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl"
import { Questions } from "@/lib/types/enums";

const FAQHero = dynamic(()=>import("@/components/section-hero"),{
     loading: () => <LandingHeroLoader/>
})

export default function FAQPageContent(){
     const t = useTranslations("faq")
     return (
          <>
               <FAQHero title={t("qna")}/>
               <section className="py-16 px-6 sm:px-12 md:px-24 lg:px-40 flex items-center justify-center">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mt-4">
                         {Object.values(Questions).map((question,i)=>(
                              <li key={`q-${i+1}`}>
                                   <h2 className="text-xl flex gap-x-2 font-semibold items-center"><CircleHelp className="text-primary w-6 h-6"/> {t(`${question}.question`)}</h2>
                                   <p>{t(`${question}.answer`)}</p>
                              </li>
                         ))}
                    </ul>
               </section>
          </>
     )
}