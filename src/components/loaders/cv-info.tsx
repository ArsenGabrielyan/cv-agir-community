"use client"
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function CVInfoLoader(){
     const isMobile = useIsMobile();
     return (
          <div className="max-w-(--breakpoint-xl) w-full p-5 space-y-6">
               <Skeleton className={cn("w-full",!isMobile ? "h-52" : "h-80")}/>
               <div className="space-y-6 text-center md:text-left">
                    <section className="space-y-3">
                         <Skeleton className="w-1/2 h-8"/>
                         <Skeleton className="w-full h-4"/>
                         <Skeleton className="w-full h-4"/>
                         <Skeleton className="w-full h-4"/>
                    </section>
                    <section className="space-y-3">
                         <Skeleton className="w-1/2 h-8"/>
                         <div className="space-y-5">
                              {new Array(2).fill("").map((_,i)=>(
                                   <div key={i} className="space-y-3">
                                        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between font-semibold gap-3">
                                             <Skeleton className="w-1/4 h-4"/>
                                             <Skeleton className="w-1/4 h-4"/>
                                        </div>
                                        <Skeleton className="w-full h-4"/>
                                        <Skeleton className="w-full h-4"/>
                                        <Skeleton className="w-full h-4"/>
                                   </div>
                              ))}
                         </div>
                    </section>
                    <section className="space-y-3">
                         <Skeleton className="w-1/2 h-8"/>
                         <div className="space-y-5">
                              {new Array(2).fill("").map((_,i)=>(
                                   <div key={i} className="space-y-3">
                                        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between font-semibold gap-3">
                                             <Skeleton className="w-1/4 h-4"/>
                                             <Skeleton className="w-1/4 h-4"/>
                                        </div>
                                        <Skeleton className="w-1/2 h-4"/>
                                   </div>
                              ))}
                         </div>
                    </section>
                    <section className="space-y-3">
                         <Skeleton className="w-1/2 h-8"/>
                         <div className="flex flex-wrap justify-center md:justify-start gap-2">
                              <Skeleton className="flex-1 h-5"/>
                              <Skeleton className="flex-1 h-5"/>
                              <Skeleton className="flex-1 h-5"/>
                              <Skeleton className="flex-1 h-5"/>
                              <Skeleton className="flex-1 h-5"/>
                              <Skeleton className="flex-1 h-5"/>
                              <Skeleton className="flex-1 h-5"/>
                              <Skeleton className="flex-1 h-5"/>
                              <Skeleton className="flex-1 h-5"/>
                              <Skeleton className="flex-1 h-5"/>
                         </div>
                    </section>
                    <section className="space-y-3">
                         <Skeleton className="w-1/2 h-8"/>
                         <div className="flex flex-wrap justify-center md:justify-start gap-2">
                              <Skeleton className="flex-1 h-5"/>
                              <Skeleton className="flex-1 h-5"/>
                              <Skeleton className="flex-1 h-5"/>
                              <Skeleton className="flex-1 h-5"/>
                              <Skeleton className="flex-1 h-5"/>
                         </div>
                    </section>
                    <section className="space-y-3">
                         <Skeleton className="w-1/2 h-8"/>
                         <Skeleton className="w-full h-4"/>
                         <Skeleton className="w-full h-4"/>
                         <Skeleton className="w-full h-4"/>
                    </section>
                    <section className="space-y-3">
                         <Skeleton className="w-1/2 h-8"/>
                         <div className="space-y-5">
                              {new Array(2).fill("").map((_,i)=>(
                                   <div key={i} className="space-y-3">
                                        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between font-semibold gap-3">
                                             <Skeleton className="w-1/4 h-4"/>
                                             <Skeleton className="w-1/4 h-4"/>
                                        </div>
                                        <Skeleton className="w-1/2 h-4"/>
                                   </div>
                              ))}
                         </div>
                    </section>
                    <section className="space-y-3">
                         <Skeleton className="w-1/2 h-8"/>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {new Array(2).fill("").map((_,i)=>(
                                   <div key={i} className="space-y-3">
                                        <Skeleton className="w-full h-4"/>
                                        <Skeleton className="w-full h-4"/>
                                        <Skeleton className="w-full h-4"/>
                                   </div>
                              ))}
                         </div>
                    </section>
               </div>
          </div>
     )
}