"use client"
import ContactForm from "@/components/form/contact-form";
import LandingHeroLoader from "@/components/loaders/landing-hero-loader";
import { Button } from "@/components/ui/button";
import {Mail, CircleHelp} from "lucide-react"
import dynamic from "next/dynamic";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const ContactHero = dynamic(()=>import("@/components/section-hero"),{
     loading: () => <LandingHeroLoader/>
})

export default function ContactContent(){
     const t = useTranslations("contact")
     return (
          <>
               <ContactHero title={t("title")}/>
               <section className="py-16 px-6 sm:px-12 md:px-24 lg:px-40">
                    <ContactForm/>
                    <ul className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6 max-w-[1750px] mt-6">
                         <li className="p-4 space-y-2">
                              <div className="w-14 h-14 aspect-square bg-muted p-[10px] rounded-xl mb-[10px]"><Mail className="w-full h-full aspect-square text-muted-foreground"/></div>
                              <h2 className="text-2xl font-semibold">{t("email-title")}</h2>
                              <p className="text-muted-foreground">{t("desc")}</p>
                              <p className="text-primary font-semibold text-xl">arsen-g@example.com</p>
                         </li>
                         <li className="p-4 space-y-2">
                              <div className="w-14 h-14 aspect-square bg-muted p-[10px] rounded-xl mb-[10px]"><CircleHelp className="w-full h-full aspect-square text-muted-foreground"/></div>
                              <h2 className="text-2xl font-semibold">{t("support-title")}</h2>
                              <p className="text-muted-foreground">{t("desc")}</p>
                              <Button size="lg" asChild>
                                   <Link href="/contact">{t("title")}</Link>
                              </Button>
                         </li>
                    </ul>
               </section>
          </>
     )
}