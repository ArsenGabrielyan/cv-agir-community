"use client"
import Features from "@/components/landing-page/sections/features";
import AccordionFAQ from "@/components/landing-page/sections/faq-accordion";
import { useCurrentUser } from "@/hooks/use-current-user";
import HowItWorks from "./sections/how-it-works";
import LandingHero from "./sections/landing-hero";

export default function MainPageContent(){
     const user = useCurrentUser();
     return (
          <>
               <LandingHero user={user}/>
               <HowItWorks/> 
               <Features/>
               <AccordionFAQ/>
          </>
     )
}