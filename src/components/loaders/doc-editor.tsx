import { Skeleton } from "@/components/ui/skeleton";
import DocPreviewLoader from "./doc-preview";

export default function DocEditorLoader(){
     return (
          <div className="flex grow flex-col">
               <header className="px-3 py-5 flex flex-col items-center justify-center gap-y-4">
                    <div className="w-full max-w-3xl space-y-2">
                         <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-3">
                              <Skeleton className="w-1/2 h-5 lg:h-6"/>
                              <Skeleton className="w-1/2 h-5 lg:h-6"/>
                         </div>
                         <Skeleton className="w-full h-4"/>
                    </div>
               </header>
               <main className="relative grow">
                    <div className="absolute bottom-0 top-0 w-full flex">
                         <div className="overflow-hidden w-full md:w-1/2 p-4 md:block">
                              <div className="space-y-6">
                                   <Skeleton className="w-full h-4"/>
                                   <Skeleton className="w-full h-60"/>
                                   <Skeleton className="w-full h-60"/>
                                   <Skeleton className="w-full h-60"/>
                              </div>
                         </div>
                         <div className="grow"/>
                         <div className="hidden w-full md:w-1/2 md:flex">
                              <div className="overflow-hidden flex w-full justify-center items-center p-4">
                                   <div className="flex w-full justify-center items-center">
                                        <DocPreviewLoader className="max-w-2xl"/>
                                   </div>
                              </div>
                         </div>
                    </div>
               </main>
               <footer className="w-full px-3 py-5">
                    <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3 items-center">
                         <div className="flex items-center gap-4">
                              <Skeleton className="w-32 h-9"/>
                              <Skeleton className="w-32 h-9"/>
                         </div>
                         <Skeleton className="w-32 h-9"/>
                    </div>
               </footer>
          </div>
     )
}