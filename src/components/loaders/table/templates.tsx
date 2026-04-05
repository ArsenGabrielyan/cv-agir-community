"use client"
import { Skeleton } from "@/components/ui/skeleton";
import TableLoader from ".";

export default function TemplatesTableLoader(){
     return (
          <div className="space-y-2">
               <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-2">
                         <Skeleton className="w-[200px] h-9"/>
                         <Skeleton className="w-[100px] h-9"/>
                    </div>
                    <div className="flex items-center gap-2">
                         <Skeleton className="w-[80px] h-9"/>
                         <Skeleton className="w-[80px] h-9"/>
                         <Skeleton className="w-[80px] h-9"/>
                    </div>
               </div>
               <TableLoader
                    rows={10}
                    cols={7}
               />
          </div>
     )
}