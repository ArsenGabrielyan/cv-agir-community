import { ResumeArrayFieldProps } from "@/lib/types"
import { ResumeOptionalDetailsType } from "@/schemas/types"
import DynamicFieldWrapper from "../../wrappers/field-wrapper"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"

export default function ReferenceField({form,index,remove,id}: ResumeArrayFieldProps<ResumeOptionalDetailsType>){
     const formTxt = useTranslations("form");
     const t = useTranslations("editor.resume");
     const corpField = useTranslations("editor.corp");
     return (
          <DynamicFieldWrapper
               title={t("refs.item-title")}
               index={index}
               remove={remove}
               id={id}
          >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                         control={form.control}
                         name={`references.${index}.fullName`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{formTxt("name.label")}</FormLabel>
                                   <FormControl>
                                        <Input
                                             {...field}
                                             placeholder={formTxt("name.placeholder")}
                                        />
                                   </FormControl>
                                   <FormMessage/>
                              </FormItem>
                         )}
                    />
                    <FormField
                         control={form.control}
                         name={`references.${index}.position`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{t("refs.position.label")}</FormLabel>
                                   <FormControl>
                                        <Input
                                             {...field}
                                             placeholder={t("refs.position.placeholder")}
                                        />
                                   </FormControl>
                                   <FormMessage/>
                              </FormItem>
                         )}
                    />
               </div>
               <FormField
                    control={form.control}
                    name={`references.${index}.company`}
                    render={({field})=>(
                         <FormItem>
                              <FormLabel>{corpField("label")}</FormLabel>
                              <FormControl>
                                   <Input
                                        {...field}
                                        placeholder={corpField("placeholder")}
                                   />
                              </FormControl>
                              <FormMessage/>
                         </FormItem>
                    )}
               />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                         control={form.control}
                         name={`references.${index}.phone`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{formTxt("phone.label")}</FormLabel>
                                   <FormControl>
                                        <Input
                                             {...field}
                                             placeholder={formTxt("phone.placeholder")}
                                        />
                                   </FormControl>
                                   <FormMessage/>
                              </FormItem>
                         )}
                    />
                    <FormField
                         control={form.control}
                         name={`references.${index}.email`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{formTxt("email.label")}</FormLabel>
                                   <FormControl>
                                        <Input
                                             {...field}
                                             placeholder="headmaster@example.com"
                                        />
                                   </FormControl>
                                   <FormMessage/>
                              </FormItem>
                         )}
                    />
               </div>
          </DynamicFieldWrapper>
     )
}