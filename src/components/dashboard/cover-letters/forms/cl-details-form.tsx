import { CoverLetterFormProps } from "@/lib/types";
import { CoverLetterDetailsType } from "@/schemas/types";
import { getCoverLetterDetailsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import {
     Form,
     FormField,
     FormItem,
     FormControl,
     FormLabel,
     FormMessage,
     FormDescription
} from "@/components/ui/form"
import EditorFormCardWrapper from "../../wrappers/card-wrapper"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useMemo } from "react"
import GenerateLetterBodyButton from "../ai-generate-body";
import debounce from "lodash.debounce";
import { useTranslations } from "next-intl";

export default function CoverLetterDetailsForm({coverLetterData, setCoverLetterData}: CoverLetterFormProps){
     const validationMsg = useTranslations("validations");
     const form = useForm<CoverLetterDetailsType>({
          resolver: zodResolver(getCoverLetterDetailsSchema(validationMsg)),
          defaultValues: {
               recipientName: coverLetterData.recipientName || "",
               recipientTitle: coverLetterData.recipientTitle || "",
               companyName: coverLetterData.companyName || "",
               companyAddress: coverLetterData.companyAddress || "",
               letterContent: coverLetterData.letterContent || "",
          }
     })
     const debouncedUpdate = useMemo(()=>debounce(async(values: CoverLetterDetailsType)=>{
          if(await form.trigger()){
               setCoverLetterData(prev=>({...prev, ...values}))
          }
     },200),[form, setCoverLetterData])
     const allValues = useWatch({control: form.control})
     useEffect(()=>{
          debouncedUpdate(allValues)
          return () => {
               debouncedUpdate.cancel();
          }
     },[allValues, debouncedUpdate])
     const t = useTranslations("editor.cover-letter.cl-details")
     const corpField = useTranslations("editor.corp")
     return (
          <Form {...form}>
               <form className="space-y-4">
                    <EditorFormCardWrapper title={t("title")} description={t("desc")}>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                   control={form.control}
                                   name="recipientName"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{t("name.label")}</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       {...field}
                                                       placeholder={t("name.placeholder")}
                                                       autoFocus
                                                  />
                                             </FormControl>
                                             <FormMessage/>
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="recipientTitle"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{t("position.label")}</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       {...field}
                                                       placeholder={t("position.placeholder")}
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
                                   name="companyName"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{t("corp-name")}</FormLabel>
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
                              <FormField
                                   control={form.control}
                                   name="companyAddress"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{t("corp-address.label")}</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       {...field}
                                                       placeholder={t("corp-address.placeholder")}
                                                  />
                                             </FormControl>
                                             <FormMessage/>
                                        </FormItem>
                                   )}
                              />
                         </div>
                         <FormField
                              control={form.control}
                              name="letterContent"
                              render={({field})=>(
                                   <FormItem>
                                        <FormLabel>{t("content.label")}</FormLabel>
                                        <FormControl>
                                             <Textarea
                                                  {...field}
                                                  placeholder={t("content.placeholder")}
                                             />
                                        </FormControl>
                                        <GenerateLetterBodyButton
                                             coverLetterData={coverLetterData}
                                             onBodyGenerated={letterContent=>field.onChange(letterContent)}
                                        />
                                        <FormDescription>{t("content.field-desc")}</FormDescription>
                                        <FormMessage/>
                                   </FormItem>
                              )}
                         />
                    </EditorFormCardWrapper>
               </form>
          </Form>
     )
}