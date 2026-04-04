"use client"
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/buttons/loading-button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteCategory } from "@/actions/admin/categories";
import { usePathname, useRouter } from "@/i18n/routing";

interface CategoryDeleteModalProps{
     id: string,
     triggerBtn: React.JSX.Element,
     redirectPath?: string,
}
export default function CategoryDeleteModal({id, triggerBtn, redirectPath}: CategoryDeleteModalProps){
     const path = usePathname()
     const errMsg = useTranslations("error-messages")
     const router = useRouter()
     const [isOpen, setIsOpen] = useState(false)
     const [isPending, startTransition] = useTransition()
     const buttonTxt = useTranslations("buttons")
     const onAccept = () => {
          startTransition(async()=>{
               try {
                    const result = await deleteCategory(id, path)
                    if(result.error) toast.error(result.error);
                    if(result.success) {
                         if(redirectPath) router.replace(redirectPath)
                         setIsOpen(false)
                    }
               } catch (err) {
                    toast.error(errMsg("unknownError"))
                    console.error(err)
               }
          })
     }
     return (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
               <DialogTrigger asChild>
                    {triggerBtn}
               </DialogTrigger>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle className="leading-6">Համոզվա՞ծ եք, որ ուզում եք ջնջել կատեգորիան։</DialogTitle>
                         <DialogDescription>Այս գործողությունը հնարավոր չէ հետարկել:</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                         <LoadingButton
                              variant="destructive"
                              onClick={onAccept}
                              loading={isPending}
                         >
                              <Trash2/>
                              Ջնջել
                         </LoadingButton>
                         <Button variant="secondary" onClick={()=>setIsOpen(false)}>
                              {buttonTxt("close")}
                         </Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}