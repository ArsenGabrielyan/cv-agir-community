import { ResumeArrayFieldProps } from "@/lib/types"
import { ResumeDetailsType } from "@/schemas/types"
import DynamicFieldWrapper from "../../wrappers/field-wrapper";
import { FormField, FormItem, FormMessage, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import RandomPlaceholderInput from "@/components/form/rand-placeholder-input";

export default function EducationField({form,index,remove,id}: ResumeArrayFieldProps<ResumeDetailsType>){
     const t = useTranslations("editor.resume")
     return (
          <DynamicFieldWrapper
               title={t("education.item-title")}
               index={index}
               remove={remove}
               id={id}
          >
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                         control={form.control}
                         name={`education.${index}.school`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{t("education.school.label")}</FormLabel>
                                   <FormControl>
                                        <Input
                                             {...field}
                                             placeholder={t("education.school.placeholder")}
                                        />
                                   </FormControl>
                                   <FormMessage/>
                              </FormItem>
                         )}
                    />
                    <FormField
                         control={form.control}
                         name={`education.${index}.degree`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{t("fields.degree.label")}</FormLabel>
                                   <FormControl>
                                        <RandomPlaceholderInput
                                             {...field}
                                             placeholdersList={t("fields.degree.placeholder")}
                                        />
                                   </FormControl>
                                   <FormMessage/>
                              </FormItem>
                         )}
                    />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                         control={form.control}
                         name={`education.${index}.faculty`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{t("education.faculty")}</FormLabel>
                                   <FormControl>
                                        <Input {...field}/>
                                   </FormControl>
                                   <FormMessage/>
                              </FormItem>
                         )}
                    />
                    <FormField
                         control={form.control}
                         name={`education.${index}.city`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{t("fields.city-country.label")}</FormLabel>
                                   <FormControl>
                                        <Input
                                             {...field}
                                             placeholder={t("fields.city-country.placeholder")}
                                        />
                                   </FormControl>
                                   <FormMessage/>
                              </FormItem>
                         )}
                    />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                         control={form.control}
                         name={`education.${index}.startDate`}
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
                         name={`education.${index}.endDate`}
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
               <FormDescription>{t.rich("fields.dates.field-desc-edu",{
                    bold: chunks => <span className="font-semibold">{chunks}</span>
               })}</FormDescription>
          </DynamicFieldWrapper>
     )
}