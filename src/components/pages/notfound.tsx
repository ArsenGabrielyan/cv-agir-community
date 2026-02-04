"use client"
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function NotFoundContent(){
     const t = useTranslations("not-found");
     return (
          <>
               <section className="flex justify-center items-center text-center flex-col space-y-6 pt-4 sm:pt-40 w-full bg-[url(/bg.svg)]">
                    <div className="font-bold flex flex-col-reverse items-center justify-center">
                         <h1 className="text-3xl lg:text-4xl xl:text-5xl space-y-5">{t("title")}</h1>
                         <h2 className="text-7xl sm:text-8xl md:text-9xl space-y-5 text-primary">404</h2>
                    </div>
                    <p className="text-sm md:text-xl font-light text-muted-foreground">{t("desc")}</p>
                    <Link href="/" className={buttonVariants({variant: "default"})}>{t("goBack")}</Link>
                    <div className="w-full h-40"></div>
               </section>
          </>
     )
}