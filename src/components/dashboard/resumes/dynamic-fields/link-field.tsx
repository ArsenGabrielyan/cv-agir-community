import { FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ResumeArrayFieldProps } from "@/lib/types"
import { ResumeOptionalDetailsType } from "@/schemas/types"
import DynamicFieldWrapper from "../../wrappers/field-wrapper"
import { useTranslations } from "next-intl"

export default function ResumeLinkField({form,index,remove,id}: ResumeArrayFieldProps<ResumeOptionalDetailsType>){
     const t = useTranslations("editor.resume.links")
     return (
          <DynamicFieldWrapper
               title={t("item-title")}
               index={index}
               remove={remove}
               id={id}
          >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                         control={form.control}
                         name={`links.${index}.name`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{t("link-name.label")}</FormLabel>
                                   <FormControl>
                                        <Input
                                             {...field}
                                             placeholder={t("link-name.placeholder")}
                                        />
                                   </FormControl>
                                   <FormMessage/>
                              </FormItem>
                         )}
                    />
                    <FormField
                         control={form.control}
                         name={`links.${index}.url`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{t("link-address")}</FormLabel>
                                   <FormControl>
                                        <Input
                                             {...field}
                                             placeholder="https://example.com"
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