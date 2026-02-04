import { ResumeArrayFieldProps } from "@/lib/types"
import { ResumeDetailsType } from "@/schemas/types"
import DynamicFieldWrapper from "../../wrappers/field-wrapper"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useTranslations } from "next-intl"

export default function LanguageField({form,index,remove,id}: ResumeArrayFieldProps<ResumeDetailsType>){
     const t = useTranslations("editor.resume.skill-fields")
     return (
          <DynamicFieldWrapper
               title={t("lang.label")}
               index={index}
               remove={remove}
               id={id}
          >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                         control={form.control}
                         name={`languages.${index}.name`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{t("lang.label")}</FormLabel>
                                   <FormControl>
                                        <Input
                                             {...field}
                                             placeholder={t("lang.placeholder")}
                                        />
                                   </FormControl>
                                   <FormMessage/>
                              </FormItem>
                         )}
                    />
                    <FormField
                         control={form.control}
                         name={`languages.${index}.percentage`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{t("level")}</FormLabel>
                                   <FormControl>
                                        <Slider
                                             min={0}
                                             max={100}
                                             step={1}
                                             defaultValue={[field.value || 0]}
                                             onValueChange={vals=>field.onChange(vals[0])}
                                             className="h-9"
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