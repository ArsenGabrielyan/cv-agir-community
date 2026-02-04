import { ResumeArrayFieldProps } from "@/lib/types"
import { ResumeDetailsType } from "@/schemas/types"
import DynamicFieldWrapper from "../../wrappers/field-wrapper"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import GenerateWorkExpButton from "../ai-buttons/generate-work-experience"
import RandomPlaceholderInput from "@/components/form/rand-placeholder-input"
import { useTranslations } from "next-intl"

export default function WorkExperienceField({form,index,remove,id}: ResumeArrayFieldProps<ResumeDetailsType>){
     const t = useTranslations("editor.resume");
     const professionField = useTranslations("editor.profession");
     const corpField = useTranslations("editor.corp");
     return (
          <DynamicFieldWrapper
               title={t("work-exp.title")}
               index={index}
               remove={remove}
               id={id}
          >
               <div className="flex justify-center items-center">
                    <GenerateWorkExpButton
                         onWorkExpGenerated={exp=>form.setValue(`experience.${index}`,exp)}
                    />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                         control={form.control}
                         name={`experience.${index}.job`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{professionField("label")}</FormLabel>
                                   <FormControl>
                                        <RandomPlaceholderInput
                                             {...field}
                                             value={typeof field.value === 'string' ? field.value : ''}
                                             placeholdersList={professionField("placeholder")}
                                        />
                                   </FormControl>
                                   <FormMessage/>
                              </FormItem>
                         )}
                    />
                    <FormField
                         control={form.control}
                         name={`experience.${index}.company`}
                         render={({field})=>(
                              <FormItem>
                                   <FormLabel>{corpField("label")}</FormLabel>
                                   <FormControl>
                                        <Input
                                             {...field}
                                             value={typeof field.value === 'string' ? field.value : ''}
                                             placeholder={corpField("placeholder")}
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
                         name={`experience.${index}.startDate`}
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
                         name={`experience.${index}.endDate`}
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
               <FormDescription>{t.rich("fields.dates.field-desc-exp",{
                    bold: chunks => <span className="font-semibold">{chunks}</span>
               })}</FormDescription>
               <FormField
                    control={form.control}
                    name={`experience.${index}.city`}
                    render={({field})=>(
                         <FormItem>
                              <FormLabel>{t("fields.city-country.label")}</FormLabel>
                              <FormControl>
                                   <Input
                                        {...field}
                                        value={typeof field.value === 'string' ? field.value : ''}
                                        placeholder={t("fields.city-country.placeholder")}
                                   />
                              </FormControl>
                              <FormMessage/>
                         </FormItem>
                    )}
               />
               <FormField
                    control={form.control}
                    name={`experience.${index}.jobInfo`}
                    render={({field})=>(
                         <FormItem>
                              <FormLabel>{t("work-exp.job-desc.label")}</FormLabel>
                              <FormControl>
                                   <Textarea
                                        {...field}
                                        cols={5}
                                        value={typeof field.value === 'string' ? field.value : ''}
                                        placeholder={t("work-exp.job-desc.placeholder")}
                                   />
                              </FormControl>
                              <FormDescription>{t("work-exp.job-desc.field-desc")}</FormDescription>
                              <FormMessage/>
                         </FormItem>
                    )}
               />
          </DynamicFieldWrapper>
     )
}