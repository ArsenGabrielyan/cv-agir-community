"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ModalWrapper from "..";
import { Input } from "@/components/ui/input";
import { Edit, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { TemplateFormType } from "@/lib/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { TemplateFormSchema } from "@/schemas/admin";
import { useState, useTransition } from "react";
import LoadingButton from "@/components/buttons/loading-button";
import { toast } from "sonner";
import { createTemplate, editTemplate } from "@/actions/admin/templates";
import { usePathname } from "@/i18n/routing";
import { TemplateServerData } from "@/lib/types/resume";

interface TemplateFormModalProps{
     data?: TemplateServerData
     id?: string
     triggerBtn: React.JSX.Element,
}
export default function TemplateFormModal({data, id, triggerBtn}: TemplateFormModalProps){
     const path = usePathname()
     const errMsg = useTranslations("error-messages")
     const [isPending, startTransition] = useTransition()
     const [isOpen, setIsOpen] = useState(false)
     const form = useForm<TemplateFormType>({
          resolver: zodResolver(TemplateFormSchema),
          defaultValues: {
               locale: data?.locale ?? "hy",
               name: data?.name ?? "",
               description: data?.description ?? "",
               categoryId: data?.categoryId ?? "",
               imageName: data?.imageName ?? "",
               htmlTemplate: data?.htmlTemplate ?? "",
               cssStyle: data?.cssStyle ?? ""
          }
     })
     const onSubmit = (values: TemplateFormType) => {
          // TODO: Add a disabled state
          startTransition(async()=>{
               try {
                    const result = !id ? await createTemplate(values,path) : await editTemplate(id,values,path)
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
               title={!id ? "Ստեղծել Շաբլոն" : "Խմբագրել Շաբլոնը"}
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
                                        <FormLabel>Շաբլոնի անունը</FormLabel>
                                        <FormControl>
                                             <Input
                                                  {...field}
                                                  disabled={isPending}
                                                  placeholder="Իմ ամենահետաքրքիր շաբլոնը"
                                             />
                                        </FormControl>
                                        <FormMessage/>
                                   </FormItem>
                              )}
                         />
                         <LoadingButton loading={isPending} type="submit">
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