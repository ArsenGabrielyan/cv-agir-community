import { DocStyleType } from "@/schemas/types"

interface PreviewSectionWrapperProps{
     title?: string,
     children?: React.ReactNode,
     style?: DocStyleType
}
export default function PreviewSectionWrapper({title,children,style}: PreviewSectionWrapperProps){
     return (
          <>
               <hr className="border-2" style={{borderColor: style?.colorHex}}/>
               <div className="space-y-3 break-inside-avoid">
                    {title && <p className="text-lg font-semibold" style={{color: style?.colorHex}}>{title}</p>}
                    {children}
               </div>
          </>
     )
}