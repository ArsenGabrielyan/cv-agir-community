import { Skeleton } from "@/components/ui/skeleton"
import DocPreviewLoader from "./doc-preview"

const DocCard = () => (
     <div className="relative rounded-lg border-primary/10 border animate-pulse">
          <div className="space-y-2">
               <div className="relative inline-block w-full">
                    <DocPreviewLoader/>
               </div>
               <div className="p-4 space-y-2">
                    <Skeleton className="w-full h-4"/>
                    <Skeleton className="w-full h-[14px]"/>
                    <Skeleton className="w-full h-3"/>
               </div>
          </div>
     </div>
)
export default function DocPageLoader(){
     return (
          <>
               <div className="flex flex-col xs:flex-row sm:justify-between items-center gap-2 my-4">
                    <Skeleton className="h-5 md:h-6 lg:h-7 w-full sm:w-1/2 rounded"/>
                    <Skeleton className="h-9 w-full sm:w-52 rounded"/>
               </div>
               <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-3">
                    <DocCard/>
                    <DocCard/>
                    <DocCard/>
                    <DocCard/>
                    <DocCard/>
                    <DocCard/>
                    <DocCard/>
                    <DocCard/>
                    <DocCard/>
                    <DocCard/>
               </div>
          </>
     )
}