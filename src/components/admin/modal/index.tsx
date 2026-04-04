import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog"
import React from "react";

interface ModalWrapperProps{
     children: React.ReactNode,
     title: string,
     description?: string,
     triggerButton: React.JSX.Element,
     isOpen?: boolean,
     setIsOpen?: (open: boolean) => void
}
export default function ModalWrapper({
     children,
     title,
     description,
     triggerButton,
     isOpen, setIsOpen
}: ModalWrapperProps){
     return (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
               <DialogTrigger asChild>
                    {triggerButton}
               </DialogTrigger>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>{title}</DialogTitle>
                         {description && (
                              <DialogDescription>{description}</DialogDescription>
                         )}
                    </DialogHeader>
                    {children}
               </DialogContent>
          </Dialog>
     )
}