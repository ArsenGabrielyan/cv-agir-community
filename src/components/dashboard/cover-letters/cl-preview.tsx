import useDimensions from "@/hooks/use-dimensions";
import { cn } from "@/lib/utils";
import { CoverLetterFormType } from "@/schemas/types"
import { useRef } from "react";
import { BodySection, HeaderSection } from "./cl-sections";

interface CoverLetterPreviewProps{
     coverLetterData: CoverLetterFormType,
     className?: string,
     contentRef?: React.Ref<HTMLDivElement>
}
export default function CoverLetterPreview({
     coverLetterData,
     className,
     contentRef
}: CoverLetterPreviewProps){
     const containerRef = useRef<HTMLDivElement>(null);
     const {width} = useDimensions(containerRef)
     return (
          <div className={cn("bg-white text-black h-full w-full aspect-210/297",className)} ref={containerRef}>
               <div className={cn("space-y-6 p-6", !width && "invisible")} style={{zoom: (1/794) * width}} ref={contentRef} id="coverLetterPreviewContent">
                    <HeaderSection coverLetterData={coverLetterData}/>
                    <BodySection coverLetterData={coverLetterData}/>
               </div>
          </div>
     )
}