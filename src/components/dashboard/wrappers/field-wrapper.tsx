import { GripHorizontal, Trash } from "lucide-react"
import React from "react"
import { Button } from "@/components/ui/button"
import {CSS} from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"
import { useSortable } from "@dnd-kit/sortable"
import { useTranslations } from "next-intl"

interface DynamicFieldWrapperProps{
     title: string,
     index: number,
     children?: React.ReactNode,
     remove: (index: number) => void,
     id: string
}
export default React.memo(function DynamicFieldWrapper({
     title,
     index,
     children,
     remove,
     id
}: DynamicFieldWrapperProps){
     const {
          attributes,
          listeners,
          setNodeRef,
          transform,
          transition,
          isDragging
     } = useSortable({id})
     const t = useTranslations("buttons")
     return (
          <div 
               className={cn("space-y-4 border rounded-xl bg-background p-3",isDragging && "shadow-xl z-50 cursor-grab relative")}
               ref={setNodeRef}
               style={{
                    transform: CSS.Transform.toString(transform),
                    transition
               }}
          >
               <div className="flex justify-between gap-2 items-center">
                    <span className="font-semibold">{title} #{index+1}</span>
                    <GripHorizontal
                         className="size-5 cursor-grab text-muted-foreground focus:outline-hidden"
                         {...attributes}
                         {...listeners}
                    />
               </div>
               {children}
               <Button variant="destructive" type="button" onClick={()=>remove(index)}>
                    <Trash/>
                    {t("remove")}
               </Button>
          </div>
     )
})