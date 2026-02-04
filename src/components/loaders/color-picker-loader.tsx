import { Skeleton } from "../ui/skeleton";

export default function ColorPickerLoader(){
     return (
          <div className="w-[276px] h-[96px] bg-background border border-accent rounded-md shadow-sm pt-[15px] pr-[9px] pb-[9px] pl-[15px] flex gap-1.5 flex-wrap">
               <Skeleton className="size-[30px]"/>
               <Skeleton className="size-[30px]"/>
               <Skeleton className="size-[30px]"/>
               <Skeleton className="size-[30px]"/>
               <Skeleton className="size-[30px]"/>
               <Skeleton className="size-[30px]"/>
               <Skeleton className="size-[30px]"/>
               <Skeleton className="size-[30px]"/>
               <Skeleton className="size-[30px]"/>
               <Skeleton className="size-[30px]"/>
               <div className="h-[30px] flex">
                    <div className="w-[30px] h-full rounded-l-md bg-accent animate-pulse"/>
                    <div className="w-[108px] h-full border border-accent animate-pulse rounded-r-md text-muted-foreground pl-2"/>
               </div>
          </div>
     )
}