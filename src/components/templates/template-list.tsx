"use client"
import { ResumeTemplate } from "@db";
import TemplateCard from "./template-card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface TemplateListProps{
     templates: ResumeTemplate[],
     t: ReturnType<typeof useTranslations<'templates'>>
}
export default function TemplateList({templates, t}: TemplateListProps){
     const [count, setCount] = useState(8);
     const handleLoadMore = () => {
          setCount(prev=>prev*2)
     }
     return (
          <section className="py-16 px-6 sm:px-12 md:px-24 lg:px-40 flex justify-center items-center flex-col gap-y-4">
               <div className="flex justify-center items-center flex-wrap gap-3">
                    {templates.slice(0,count).map(template=>(
                         <TemplateCard key={template.id} data={template} t={t}/>
                    ))}
               </div>
               {templates.length>count && <Button className="text-center" onClick={handleLoadMore}>{t("showMore")}</Button>}
          </section>
     )
}