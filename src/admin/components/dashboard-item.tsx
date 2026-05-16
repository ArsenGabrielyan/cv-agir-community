"use client"
import { TrendingUp, Minus, TrendingDown } from "lucide-react";
import { LucideIconType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DashboardCounterProps{
     name: string,
     count: number,
     difference: number,
     Icon: LucideIconType,
     className?: string
}
export function DashboardCounter({name, count, difference, Icon, className}: DashboardCounterProps){
     return (
          <div className={cn("p-5 border shadow-sm bg-card text-card-foreground rounded-md space-y-1.5 w-full",className)}>
               <div className="flex items-center justify-between gap-2">
                    <div className="text-left space-y-1.5">
                         <h2>{name}</h2>
                         <p className="text-2xl md:text-3xl lg:text-4xl font-semibold">{count}</p>
                         <div className="flex gap-1.5 items-center">
                              <div className={cn(
                                   "flex gap-1.5 items-center",
                                   difference<0 && "text-destructive",
                                   difference===0 && "text-muted-foreground",
                                   difference>0 && "text-emerald-600 dark:text-emerald-400"
                              )}>
                                   {difference<0 ? (
                                        <TrendingDown className="size-5"/>
                                   ) : difference===0 ? (
                                        <Minus className="size-5"/>
                                   ) : (
                                        <TrendingUp className="size-5"/>
                                   )}
                                   {difference>0 ? `+${difference}` : difference}%
                              </div>
                              նախորդ ամսվա համեմատ
                         </div>
                    </div>
                    <div className="bg-primary text-primary-foreground p-3 rounded-md flex justify-center items-center aspect-square">
                         <Icon className="size-8"/>
                    </div>
               </div>
          </div>
     )
}