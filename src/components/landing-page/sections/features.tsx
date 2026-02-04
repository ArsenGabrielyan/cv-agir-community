import { FEATURES } from "@/lib/constants/landing-page";
import { useTranslations } from "next-intl";

export default function Features(){
     const t = useTranslations("features")
     return (
          <section className="flex justify-center items-center flex-col space-y-4 w-full px-3 pb-5" id="features">
               <h2 className="text-2xl sm:text-3xl md:text-4xl space-y-5 font-bold">{t("title")}</h2>
               <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-6 max-w-[1750px] my-8">
                    {FEATURES.map(({feature,Icon})=>(
                         <li key={feature} className="p-4 space-y-2">
                              <div className="w-16 h-16 aspect-square bg-primary p-[10px] rounded-xl mb-[10px]"><Icon className="w-full h-full aspect-square text-primary-foreground"/></div>
                              <h2 className="text-3xl font-semibold">{t(`${feature}.name`)}</h2>
                              <p className="">{t(`${feature}.description`)}</p>
                         </li>
                    ))}
               </ul>
          </section>
     )
}