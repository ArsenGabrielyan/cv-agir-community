"use client"
import { ExtendedUser } from "@/global";
import React from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import LandingHeroLoader from "@/components/loaders/landing-hero-loader";

interface LandingHeroProps{
     user?: ExtendedUser
}

const LandingHeroContent = dynamic(()=>import("@/components/section-hero"),{
     ssr: false,
     loading: () => <LandingHeroLoader loaderType="main"/>
})

export default function LandingHero({user}: LandingHeroProps){
     const t = useTranslations("landing-hero");
     return (
          <LandingHeroContent title={t("desc1")}>
               <p className="text-sm md:text-xl font-light text-muted-foreground">{t("desc2")}</p>
               <Button asChild>
                    <Link href={!user ? "/auth/register" : "/dashboard"}>{t("startFree")}</Link>
               </Button>
               <p className="text-xs md:text-sm font-normal text-muted-foreground">{t("noCreditCard")}</p>
          </LandingHeroContent>
     )
}