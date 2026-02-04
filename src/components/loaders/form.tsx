import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface FormLoaderWrapperProps{
     children: React.ReactNode
}
const FormLoaderWrapper = ({children}: FormLoaderWrapperProps) => (
     <Card className="shadow-none border-primary/10 animate-pulse bg-background text-foreground">
          <CardHeader>
               <Skeleton className="w-full h-6"/>
               <Skeleton className="w-full h-4"/>
          </CardHeader>
          <CardContent className="space-y-4">
               {children}
          </CardContent>
     </Card>
)

export const ResumeInfoFormLoader = () => (
     <>
          <FormLoaderWrapper>
               <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4"/>
                    <Skeleton className="w-full h-9"/>
               </div>
               <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4"/>
                    <Skeleton className="w-full h-16"/>
               </div>
          </FormLoaderWrapper>
          <FormLoaderWrapper>
               <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4"/>
                    <div className="flex items-center gap-2">
                         <Skeleton className="w-full h-9"/>
                         <Skeleton className="w-32 h-9"/>
                    </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-2">
                         <Skeleton className="w-3/4 h-4"/>
                         <Skeleton className="w-full h-9"/>
                    </div>
                    <div className="space-y-2">
                         <Skeleton className="w-3/4 h-4"/>
                         <Skeleton className="w-full h-9"/>
                    </div>
               </div>
               <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4"/>
                    <Skeleton className="w-full h-9"/>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-2">
                         <Skeleton className="w-3/4 h-4"/>
                         <Skeleton className="w-full h-9"/>
                    </div>
                    <div className="space-y-2">
                         <Skeleton className="w-3/4 h-4"/>
                         <Skeleton className="w-full h-9"/>
                    </div>
               </div>
               <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4"/>
                    <Skeleton className="w-full h-9"/>
               </div>
               <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4"/>
                    <Skeleton className="w-full h-16"/>
                    <Skeleton className="w-1/2 h-9"/>
               </div>
               <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4"/>
                    <Skeleton className="w-full h-16"/>
               </div>
          </FormLoaderWrapper>
     </>
)

export const ResumeDetailsFormLoader = () => (
     <>
          <FormLoaderWrapper>
               <Skeleton className="w-full h-[570px]"/>
               <Skeleton className="w-full h-[570px]"/>
               <Skeleton className="w-44 h-9"/>
          </FormLoaderWrapper>
          <FormLoaderWrapper>
               <Skeleton className="w-full h-96"/>
               <Skeleton className="w-full h-96"/>
               <Skeleton className="w-44 h-9"/>
          </FormLoaderWrapper>
          <FormLoaderWrapper>
               <Skeleton className="w-full h-44"/>
               <Skeleton className="w-full h-44"/>
               <Skeleton className="w-44 h-9"/>
          </FormLoaderWrapper>
          <FormLoaderWrapper>
               <Skeleton className="w-full h-44"/>
               <Skeleton className="w-full h-44"/>
               <Skeleton className="w-44 h-9"/>
          </FormLoaderWrapper>
     </>
)

export const ResumeOptionalDetailsFormLoader = () => (
     <>
          <FormLoaderWrapper>
               <Skeleton className="w-full h-44"/>
               <Skeleton className="w-full h-44"/>
               <Skeleton className="w-44 h-9"/>
          </FormLoaderWrapper>
          <FormLoaderWrapper>
               <Skeleton className="w-full h-64"/>
               <Skeleton className="w-full h-64"/>
               <Skeleton className="w-44 h-9"/>
          </FormLoaderWrapper>
          <FormLoaderWrapper>
               <Skeleton className="w-full h-[350px]"/>
               <Skeleton className="w-full h-[350px]"/>
               <Skeleton className="w-44 h-9"/>
          </FormLoaderWrapper>
     </>
)

export const CoverLetterInfoFormLoader = () => (
     <>
          <FormLoaderWrapper>
               <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4"/>
                    <Skeleton className="w-full h-9"/>
               </div>
               <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4"/>
                    <Skeleton className="w-full h-16"/>
               </div>
          </FormLoaderWrapper>
          <FormLoaderWrapper>
               <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4"/>
                    <div className="flex items-center gap-2">
                         <Skeleton className="w-full h-9"/>
                         <Skeleton className="w-32 h-9"/>
                    </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-2">
                         <Skeleton className="w-3/4 h-4"/>
                         <Skeleton className="w-full h-9"/>
                    </div>
                    <div className="space-y-2">
                         <Skeleton className="w-3/4 h-4"/>
                         <Skeleton className="w-full h-9"/>
                    </div>
               </div>
               <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4"/>
                    <Skeleton className="w-full h-9"/>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="space-y-2">
                         <Skeleton className="w-3/4 h-4"/>
                         <Skeleton className="w-full h-9"/>
                    </div>
                    <div className="space-y-2">
                         <Skeleton className="w-3/4 h-4"/>
                         <Skeleton className="w-full h-9"/>
                    </div>
               </div>
               <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4"/>
                    <Skeleton className="w-full h-9"/>
               </div>
          </FormLoaderWrapper>
     </>
)

export const CoverLetterDetailsFormLoader = () => (
     <FormLoaderWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
               <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4"/>
                    <Skeleton className="w-full h-9"/>
               </div>
               <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4"/>
                    <Skeleton className="w-full h-9"/>
               </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
               <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4"/>
                    <Skeleton className="w-full h-9"/>
               </div>
               <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4"/>
                    <Skeleton className="w-full h-9"/>
               </div>
          </div>
          <div className="space-y-2">
               <Skeleton className="w-3/4 h-4"/>
               <Skeleton className="w-full h-16"/>
               <Skeleton className="w-1/2 h-9"/>
          </div>
     </FormLoaderWrapper>
)