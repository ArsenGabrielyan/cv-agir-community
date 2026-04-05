"use client"
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/buttons/loading-button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteTemplate, deleteTemplates } from "@/actions/admin/templates";
import { usePathname, useRouter } from "@/i18n/routing";

interface TemplateDeleteModalProps{
     id?: string,
     ids?: string[]
     triggerBtn: React.JSX.Element,
     redirectPath?: string,
     type?: "bulk" | "separate",
     onReset?: () => void
}
export default function TemplateDeleteModal({id, ids, triggerBtn, redirectPath, type="separate", onReset}: TemplateDeleteModalProps){
     const path = usePathname()
     const errMsg = useTranslations("error-messages")
     const router = useRouter()
     const t = useTranslations("admin.dialog")
     const [isOpen, setIsOpen] = useState(false)
     const [isPending, startTransition] = useTransition()
     const buttonTxt = useTranslations("buttons")
     const onAccept = () => {
          startTransition(async()=>{
               try {
                    if(!id && !ids) return
                    const result = type==="separate" ? await deleteTemplate(id ?? "", path) : type==="bulk" ? await deleteTemplates(ids ?? [], path) : {error: errMsg("unknownError")}
                    if(result.error) toast.error(result.error);
                    if(result.success) {
                         if(redirectPath) router.replace(redirectPath)
                         setIsOpen(false)
                         if(onReset) onReset()
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
                         <DialogTitle className="leading-6">{t(`template.${type==="bulk" ? "plural" : "single"}`)}</DialogTitle>
                         <DialogDescription>{t("desc")}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                         <LoadingButton
                              variant="destructive"
                              onClick={onAccept}
                              loading={isPending}
                         >
                              <Trash2/>
                              {buttonTxt("delete")}
                         </LoadingButton>
                         <Button variant="secondary" onClick={()=>setIsOpen(false)}>
                              {buttonTxt("close")}
                         </Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}