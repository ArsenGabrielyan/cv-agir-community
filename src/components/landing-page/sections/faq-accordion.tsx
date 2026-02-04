import {
     Accordion,
     AccordionContent,
     AccordionItem,
     AccordionTrigger,
} from "@/components/ui/accordion"
import { useTranslations } from "next-intl";
import { Questions } from "@/lib/types/enums";

export default function AccordionFAQ(){
     const t = useTranslations("faq")
     return (
          <section className="flex justify-center items-center flex-col space-y-4 w-full px-3" id="faq">
               <h2 className="text-2xl sm:text-3xl md:text-4xl space-y-5 font-bold">{t("title")}</h2>
               <Accordion type="single" collapsible className="w-full max-w-7xl bg-background text-left p-2 pb-12">
                    {Object.values(Questions).map((question,i)=>(
                         <AccordionItem key={`q-${i+1}`} value={`question-${i+1}`}>
                              <AccordionTrigger>{t(`${question}.question`)}</AccordionTrigger>
                              <AccordionContent>{t(`${question}.answer`)}</AccordionContent>
                         </AccordionItem>
                    ))}
               </Accordion>
          </section>
     )
}