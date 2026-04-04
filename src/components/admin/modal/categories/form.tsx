"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ModalWrapper from "..";
import { Input } from "@/components/ui/input";
import { Edit, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { CategoryFormType } from "@/lib/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryFormSchema } from "@/schemas/admin";
import { useState, useTransition } from "react";
import LoadingButton from "@/components/buttons/loading-button";
import { toast } from "sonner";
import { createCategory, editCategory } from "@/actions/admin/categories";
import { usePathname } from "@/i18n/routing";

interface CategoryFormModalProps{
     name?: string,
     id?: string
     triggerBtn: React.JSX.Element,
}
export default function CategoryFormModal({name, id, triggerBtn}: CategoryFormModalProps){
     const path = usePathname()
     const errMsg = useTranslations("error-messages")
     const [isPending, startTransition] = useTransition()
     const [isOpen, setIsOpen] = useState(false)
     const form = useForm<CategoryFormType>({
          resolver: zodResolver(CategoryFormSchema),
          defaultValues: {
               name: name ?? ""
          }
     })
     const onSubmit = (values: CategoryFormType) => {
          if(!!id && name===form.watch("name")) return
          startTransition(async()=>{
               try {
                    const result = !id ? await createCategory(values,path) : await editCategory(id,values,path)
                    if(result.error) toast.error(result.error);
                    if(result.success) {
                         toast.success(result.success);
                         setIsOpen(false)
                    }
               } catch (err) {
                    toast.error(errMsg("unknownError"))
                    console.error(err)
               }
          })
     }
     return (
          <ModalWrapper
               title={!id ? "Ստեղծել Կատեգորիա" : "Խմբագրել Կատեգորիան"}
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
                                        <FormLabel>Կատեգորիայի անունը</FormLabel>
                                        <FormControl>
                                             <Input
                                                  {...field}
                                                  disabled={isPending}
                                                  placeholder="Տեղադրել կատեգորիայի անունը այստեղ"
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
                                   Ստեղծել
                                   </>
                              ) : (
                                   <>
                                   <Edit/>
                                   Խմբագրել
                                   </>
                              )}
                         </LoadingButton>
                    </form>
               </Form>
          </ModalWrapper>
     )
}