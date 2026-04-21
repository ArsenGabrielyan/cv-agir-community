"use client"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import TemplateFormModal from "./modal";
import { TemplateServerData } from "@/lib/types/server";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { useTransition } from "react";
import { deleteTemplate } from "@/actions/admin/templates";
import { toast } from "sonner";
import { CrudFN } from "@/lib/types";

interface ActionsCellProps{
     item: TemplateServerData
     categories: {name: string, id: string}[],
     onUpdate: CrudFN<TemplateServerData,"create">
}
export default function ActionsCell({item, categories, onUpdate}: ActionsCellProps){
     const actionTxt = useTranslations("table.actions")
     const t = useTranslations("admin.dialog")
     const btnTxt = useTranslations("buttons")
     const errMsg = useTranslations("error-messages")
     const successMsg = useTranslations("success-messages.template")
     const [isPending, startTransition] = useTransition()
     const onDelete = () => {
          startTransition(async()=>{
               try {
                    if(!item.id) return
                    const result = await deleteTemplate(item.id)
                    if(result.error) toast.error(result.error);
                    if(result.success) toast.success(successMsg("delete"))
                    if(result.data) onUpdate(result.data,"delete")
               } catch (err) {
                    toast.error(errMsg("unknownError"))
                    console.error(err)
               }
          })
     }
     return (
          <AlertDialog>
               <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">{actionTxt("menu")}</span>
                              <MoreHorizontal className="h-4 w-4" />
                         </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                         <DropdownMenuLabel>{actionTxt("title")}</DropdownMenuLabel>
                         <DropdownMenuSeparator />
                         <TemplateFormModal
                              onUpdate={(data,type)=>{
                                   if(type==="update") onUpdate(data,type)
                              }}
                              data={item}
                              categories={categories}
                              id={item.id}
                              triggerBtn={(
                                   <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <Edit/>
                                        {btnTxt("edit")}
                                   </DropdownMenuItem>
                              )}
                         />
                         <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()} variant="destructive">
                                   <Trash2/>
                                   {btnTxt("delete")}
                              </DropdownMenuItem>
                         </AlertDialogTrigger>
                    </DropdownMenuContent>
               </DropdownMenu>
               <AlertDialogContent>
                    <AlertDialogHeader>
                         <AlertDialogTitle>{t(`template.single`)}</AlertDialogTitle>
                         <AlertDialogDescription>{t("desc")}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                         <AlertDialogAction
                              variant="destructive"
                              onClick={onDelete}
                              disabled={isPending}
                         >
                              <Trash2/>
                              {btnTxt("delete")}
                         </AlertDialogAction>
                         <AlertDialogCancel>
                              {btnTxt("close")}
                         </AlertDialogCancel>
                    </AlertDialogFooter>
               </AlertDialogContent>
          </AlertDialog>
     )
}