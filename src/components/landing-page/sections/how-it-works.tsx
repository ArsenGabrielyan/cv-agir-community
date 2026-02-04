"use client"
import { useTranslations } from "next-intl";
import DemoVideoLoader from "../../loaders/video-loader";
import dynamic from "next/dynamic";
import { STEPS } from "@/lib/constants";

const DemoVideo = dynamic(()=>import("@/components/landing-page/demo-video"),{
     loading: () => <DemoVideoLoader/>,
     ssr: false
})

export default function HowItWorks(){
     const t = useTranslations("how-it-works");
     return (
          <section className="flex justify-center items-center flex-col space-y-4 w-full px-3" id="how-it-works">
               <h2 className="text-2xl sm:text-3xl md:text-4xl space-y-5 font-bold">{t("title")}</h2>
               <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl text-center">
                    {STEPS.map((step,i)=>(
                         <li key={`demo-${i+1}`} className="flex flex-col items-center justify-start space-y-4 mt-12 pb-24">
                              <DemoVideo
                                   src={`/demos/demo-${i+1}.webm`}
                                   srcFallback={`/demos/demo-${i+1}.mp4`}
                                   alt="select template"
                                   thumbnail={`/demos/demo-${i+1}-thumb.webp`}
                                   className="bg-card p-4 shadow-sm border rounded-xl"
                              />
                              <p>{i+1}. {t(step)}</p>
                         </li>
                    ))}
               </ul>
          </section>
     )
}