import { Skeleton } from "../ui/skeleton";

interface LandingHeroLoaderProps{
     loaderType?: "main" | "other" | "template"
}
export default function LandingHeroLoader({loaderType="other"}: LandingHeroLoaderProps){
     return (
          <section className="flex justify-center items-center text-center flex-col space-y-6 py-16 px-4 w-full bg-background" id="hero">
               <div className="space-y-5 w-full max-w-6xl">
                    <Skeleton className="h-8 md:h-9 lg:h-12"/>
               </div>
               {loaderType==="main" ? (
                    <>
                         <Skeleton className="w-full max-w-6xl h-3 md:h-5"/>
                         <Skeleton className="w-[132px] h-9"/>
                         <Skeleton className="w-full max-w-6xl h-3 md:h-3.5"/>
                    </>
               ) : loaderType==="template" ? (
                    <Skeleton className="w-full max-w-6xl h-3 md:h-5"/>
               ) : null}
          </section>
     )
}