import { ScrollArea } from "@/components/ui/scroll-area";
import { ResumeFormType } from "@/schemas/types";
import { ResumeTemplate } from "@db";
import BorderStyleButton from "./style-buttons/border-style-button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import DocPreviewLoader from "@/components/loaders/doc-preview";
import ColorPickerLoader from "@/components/loaders/color-picker-loader";

const ResumePreview = dynamic(()=>import("@/components/dashboard/resumes/resume-preview"),{
     loading: () => <DocPreviewLoader/>
})
const ColorPicker = dynamic(()=>import("./style-buttons/color-picker"),{
     ssr: false,
     loading: () => <ColorPickerLoader/>
})
interface ResumePreviewSectionProps{
     resumeData: ResumeFormType,
     setResumeData: React.Dispatch<React.SetStateAction<ResumeFormType>>,
     qrImg?: string,
     template: ResumeTemplate | null,
     className?: string,
     resumeId?: string,
     contentRef?: React.Ref<HTMLDivElement>
}
export default function ResumePreviewSection({
     resumeData,
     setResumeData,
     qrImg,
     template,
     className,
     resumeId,
     contentRef
}: ResumePreviewSectionProps){
     return (
          <div className={cn("group relative hidden w-full md:w-1/2 md:flex",className)}>
               {!template && (
                    <div className="opacity-50 xl:opacity-100 group-hover:opacity-100 transition-opacity absolute left-1 top-1 flex flex-col gap-3 flex-none lg:left-3 lg:top-3 z-10">
                         <ColorPicker
                              color={resumeData.colorHex}
                              onChange={(color)=>setResumeData(prev=>({...prev,colorHex: color.hex}))}
                         />
                         <BorderStyleButton
                              borderStyle={resumeData.borderStyle}
                              onChange={(borderStyle)=>setResumeData(prev=>({...prev,borderStyle}))}
                         />
                    </div>
               )}
               <ScrollArea className="flex w-full justify-center items-center bg-secondary p-4">
                    <div className="flex w-full justify-center items-center">
                         <ResumePreview
                              resumeData={resumeData}
                              className="max-w-2xl shadow"
                              qrImg={qrImg}
                              template={template}
                              resumeId={resumeId}
                              contentRef={contentRef}
                         />
                    </div>
               </ScrollArea>
          </div>
     )
}