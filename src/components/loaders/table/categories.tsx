"use client"
import { Skeleton } from "@/components/ui/skeleton";
import TableLoader from ".";

export default function CategoriesTableLoader(){
     return (
          <div className="space-y-2">
               <div className="flex items-center justify-between gap-4 w-full">
                    <Skeleton className="w-[500px] h-9"/>
                    <div className="flex items-center gap-2">
                         <Skeleton className="w-[80px] h-9"/>
                         <Skeleton className="w-[80px] h-9"/>
                         <Skeleton className="w-[80px] h-9"/>
                    </div>
               </div>
               <TableLoader
                    rows={10}
                    cols={3}
               />
          </div>
     )
}