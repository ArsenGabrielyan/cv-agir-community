import { ScrollArea } from "@/components/ui/scroll-area";
import { CoverLetterFormType } from "@/schemas/types";
import ColorPicker from "../style-buttons/color-picker";
import BorderStyleButton from "../style-buttons/border-style-button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import DocPreviewLoader from "@/components/loaders/doc-preview";

interface CoverLetterPreviewSectionProps{
     coverLetterData: CoverLetterFormType,
     setCoverLetterData: React.Dispatch<React.SetStateAction<CoverLetterFormType>>,
     className?: string,
     contentRef?: React.Ref<HTMLDivElement>
}
const CoverLetterPreview = dynamic(()=>import("@/components/dashboard/cover-letters/cl-preview"),{
     loading: () => <DocPreviewLoader/>
})
export default function CoverLetterPreviewSection({
     coverLetterData,
     setCoverLetterData,
     className,
     contentRef
}: CoverLetterPreviewSectionProps){
     return (
          <div className={cn("group relative hidden w-full md:w-1/2 md:flex",className)}>
               <div className="opacity-50 xl:opacity-100 group-hover:opacity-100 transition-opacity absolute left-1 top-1 flex flex-col gap-3 flex-none lg:left-3 lg:top-3 z-10">
                    <ColorPicker
                         color={coverLetterData.colorHex}
                         onChange={(color)=>setCoverLetterData(prev=>({...prev,colorHex: color.hex}))}
                    />
                    <BorderStyleButton
                         borderStyle={coverLetterData.borderStyle}
                         onChange={(borderStyle)=>setCoverLetterData(prev=>({...prev,borderStyle}))}
                    />
               </div>
               <ScrollArea className="flex w-full justify-center items-center bg-secondary p-4">
                    <div className="flex w-full justify-center items-center">
                         <CoverLetterPreview
                              coverLetterData={coverLetterData}
                              className="max-w-2xl shadow"
                              contentRef={contentRef}
                         />
                    </div>
               </ScrollArea>
          </div>
     )
}