import { Skeleton } from "../ui/skeleton";

export default function AdminLoader(){
     return (
          <div className="h-[100dvh]">
               <div className="border-b-2 border-accent w-full h-12 flex justify-between items-center px-2">
                    <Skeleton className="size-[21.3px] rounded-md"/>
                    <Skeleton className="hidden md:block w-[200px] h-[40px] rounded-md"/>
                    <div className="flex items-center gap-2">
                         <Skeleton className="size-[21.3px] rounded-md"/>
                         <Skeleton className="size-[21.3px] rounded-md"/>
                    </div>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-[60px_auto] w-full h-full">
                    <div className="hidden sm:flex flex-col items-center gap-2 pt-3">
                         <Skeleton className="size-8 rounded-md"/>
                         <Skeleton className="size-8 rounded-md"/>
                         <Skeleton className="size-8 rounded-md"/>
                         <Skeleton className="size-8 rounded-md"/>
                    </div>
                    <div className="flex justify-center items-center p-5 w-full">
                         <div className="flex flex-col items-center gap-6.5 border-2 border-accent w-full sm:w-[400px] p-4 rounded-md">
                              <Skeleton className="w-[200px] h-[65px] rounded-md"/>
                              <div className="w-full h-full flex flex-col items-center gap-2">
                                   <Skeleton className="w-full h-6"/>
                                   <Skeleton className="w-full h-6"/>
                                   <Skeleton className="w-full h-6"/>
                              </div>
                              <div className="w-full h-full flex flex-col items-center gap-2">
                                   <Skeleton className="w-full h-3.5"/>
                                   <Skeleton className="w-full h-3.5"/>
                                   <Skeleton className="w-full h-3.5"/>
                                   <Skeleton className="w-full h-3.5"/>
                                   <Skeleton className="w-full h-3.5"/>
                              </div>
                              <Skeleton className="w-[187px] h-9"/>
                         </div>
                    </div>
               </div>
          </div>
     )
}