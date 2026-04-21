"use client"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { useTransition } from "react";
import { toast } from "sonner";
import { ResumeTemplateCategory } from "@db";
import { deleteCategory } from "@/actions/admin/categories";
import CategoryFormModal from "./modal";
import { CrudFN } from "@/lib/types";

interface ActionsCellProps{
     item: ResumeTemplateCategory,
     onUpdate: CrudFN<ResumeTemplateCategory,"create">
}
export default function ActionsCell({item, onUpdate}: ActionsCellProps){
     const actionTxt = useTranslations("table.actions")
     const t = useTranslations("admin.dialog")
     const btnTxt = useTranslations("buttons")
     const errMsg = useTranslations("error-messages")
     const successMsg = useTranslations("success-messages.category")
     const [isPending, startTransition] = useTransition()
     const onDelete = () => {
          if(isPending) return
          startTransition(async()=>{
               try {
                    const result = await deleteCategory(item.id)
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
                         <CategoryFormModal
                              onUpdate={(data,type)=>{
                                   if(type==="update") onUpdate(data,type)
                              }}
                              name={item.name}
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
                         <AlertDialogTitle>{t("category.title")}</AlertDialogTitle>
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