import { ResumeArrayFieldProps } from "@/lib/types"
import { ResumeOptionalDetailsType } from "@/schemas/types"
import DynamicFieldWrapper from "../../wrappers/field-wrapper"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"

export default function ResumeCourseField({form,index,remove,id}: ResumeArrayFieldProps<ResumeOptionalDetailsType>){
     const t = useTranslations("editor.resume")
     return (
          <DynamicFieldWrapper
               title={t("courses.item-title")}
               index={index}
               remove={remove}
               id={id}
          >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                         control={form.control}
                         name={`courses.${index}.name`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{t("courses.name")}</FormLabel>
                                   <FormControl>
                                        <Input {...field}/>
                                   </FormControl>
                                   <FormMessage/>
                              </FormItem>
                         )}
                    />
                    <FormField
                         control={form.control}
                         name={`courses.${index}.institution`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{t("courses.institution")}</FormLabel>
                                   <FormControl>
                                        <Input {...field}/>
                                   </FormControl>
                                   <FormMessage/>
                              </FormItem>
                         )}
                    />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                         control={form.control}
                         name={`courses.${index}.startDate`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{t("fields.dates.start")}</FormLabel>
                                   <FormControl>
                                        <Input
                                             {...field}
                                             type="date"
                                             value={typeof field.value === 'string' ? field.value.slice(0, 10) : ''}
                                        />
                                   </FormControl>
                                   <FormMessage/>
                              </FormItem>
                         )}
                    />
                    <FormField
                         control={form.control}
                         name={`courses.${index}.endDate`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{t("fields.dates.end")}</FormLabel>
                                   <FormControl>
                                        <Input
                                             {...field}
                                             type="date"
                                             value={typeof field.value === 'string' ? field.value.slice(0, 10) : ''}
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