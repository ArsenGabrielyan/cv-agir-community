"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ModalWrapper from ".";
import { Input } from "@/components/ui/input";
import { Edit, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { CategoryFormType } from "@/lib/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCategoryFormSchema } from "@/schemas/admin";
import { useState, useTransition } from "react";
import LoadingButton from "@/components/buttons/loading-button";
import { toast } from "sonner";
import { createCategory, editCategory } from "@/actions/admin/categories";
import { useRouter } from "@/i18n/routing";

interface CategoryFormModalProps{
     name?: string,
     id?: string
     triggerBtn: React.JSX.Element,
}
export default function CategoryFormModal({name, id, triggerBtn}: CategoryFormModalProps){
     const router = useRouter()
     const errMsg = useTranslations("error-messages")
     const btnTxt = useTranslations("buttons")
     const t = useTranslations("admin.dialog.category")
     const formTxt = useTranslations("form")
     const [isPending, startTransition] = useTransition()
     const [isOpen, setIsOpen] = useState(false)
     const validationMsg = useTranslations("validations.category-name")
     const form = useForm<CategoryFormType>({
          resolver: zodResolver(getCategoryFormSchema(validationMsg)),
          defaultValues: {
               name: name ?? ""
          }
     })
     const onSubmit = (values: CategoryFormType) => {
          if((!!id && name===form.watch("name")) || isPending) return
          startTransition(async()=>{
               try {
                    const result = !id ? await createCategory(values) : await editCategory(id,values)
                    if(result.error) toast.error(result.error);
                    if(result.success) {
                         toast.success(result.success);
                         setIsOpen(false)
                         router.refresh()
                    }
               } catch (err) {
                    toast.error(errMsg("unknownError"))
                    console.error(err)
               }
          })
     }
     return (
          <ModalWrapper
               title={!id ? t("create") : t("edit")}
               isOpen={isOpen}
               setIsOpen={setIsOpen}
               triggerButton={triggerBtn}
          >
               <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                         <FormField
                              control={form.control}
                              name="name"
                              disabled={isPending}
                              render={({field})=>(
                                   <FormItem>
                                        <FormLabel>{formTxt("category.name")}</FormLabel>
                                        <FormControl>
                                             <Input
                                                  {...field}
                                                  disabled={isPending}
                                             />
                                        </FormControl>
                                        <FormMessage/>
                                   </FormItem>
                              )}
                         />     
                         <LoadingButton loading={isPending} type="submit" disabled={!!id && name===form.watch("name")}>
                              {!id ? (
                                   <>
                                   <Plus/>
                                   {btnTxt("create")}
                                   </>
                              ) : (
                                   <>
                                   <Edit/>
                                   {btnTxt("edit")}
                                   </>
                              )}
                         </LoadingButton>
                    </form>
               </Form>
          </ModalWrapper>
     )
}