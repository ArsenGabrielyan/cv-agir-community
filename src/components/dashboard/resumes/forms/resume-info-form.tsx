import { ResumeInfoType } from "@/schemas/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import {getResumeInfoSchema} from "@/schemas"
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
import { useEffect, useMemo, useRef } from "react"
import { ResumeFormProps } from "@/lib/types"
import { Button } from "@/components/ui/button"
import GenerateSummaryButton from "../ai-buttons/generate-summary"
import debounce from "lodash.debounce"
import { useTranslations } from "next-intl"
import { ButtonGroup } from "@/components/ui/button-group"
import { ImageIcon, MailIcon, MapPinIcon, PhoneIcon, TrashIcon } from "lucide-react"
import RandomPlaceholderInput from "@/components/form/rand-placeholder-input"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"

export default function ResumeInfoForm({resumeData, setResumeData,userData}: ResumeFormProps){
     const validationMsg = useTranslations("validations");
     const form = useForm<ResumeInfoType>({
          resolver: zodResolver(getResumeInfoSchema(validationMsg)),
          defaultValues: {
               title: resumeData.title || "",
               description: resumeData.description || "",
               fname: resumeData.fname || (userData.name ? userData.name.split(" ")[0] : "") || "",
               lname: resumeData.lname || (userData.name ? userData.name.split(" ")[1] : "") || "",
               jobTitle: resumeData.jobTitle || userData.jobTitle || "",
               phone: resumeData.phone || userData?.phone || "",
               address: resumeData.address || userData.address || "",
               email: resumeData.email || userData.email || "",
               summary: resumeData.summary || userData.summary || "",
               hobbies: resumeData.hobbies || userData.hobbies || "",
               profileImg: resumeData.profileImg instanceof File ? resumeData.profileImg : undefined,
          }
     })
     const debouncedUpdate = useMemo(()=>debounce(async(values: ResumeInfoType)=>{
          if(await form.trigger()){
               setResumeData(prev=>{
                    const {profileImg: newImg, ...rest} = values
                    return ({
                         ...prev,
                         ...rest,
                         profileImg: !newImg ? prev.profileImg : newImg, 
                    })
               })
          }
     },200),[form,setResumeData])
     const allValues = useWatch({control: form.control})
     useEffect(()=>{
          debouncedUpdate(allValues)
          return () => {
               debouncedUpdate.cancel();
          }
     },[allValues, debouncedUpdate]);
     const t = useTranslations("editor.resume.resume-info");
     const formTxt = useTranslations("form");
     const buttonTxt = useTranslations("buttons");
     const personalInfoTxt = useTranslations("editor.personal-info")
     const professionField = useTranslations("editor.profession")

     const imgInputRef = useRef<HTMLInputElement>(null);
     const isDisabled = !resumeData.jobTitle && !resumeData.experience?.length && !resumeData.education?.length || !resumeData.skills?.length || !resumeData.languages?.length
     return (
          <Form {...form}>
               <form className="space-y-4">
                    <EditorFormCardWrapper title={t("title")} description={t("desc")}>
                         <FormField
                              control={form.control}
                              name="title"
                              render={({field})=>(
                                   <FormItem>
                                        <FormLabel>{t("name-field.label")}</FormLabel>
                                        <FormControl>
                                             <Input
                                                  {...field}
                                                  placeholder={t("name-field.placeholder")}
                                                  autoFocus
                                             />
                                        </FormControl>
                                        <FormMessage/>
                                   </FormItem>
                              )}
                         />
                         <FormField
                              control={form.control}
                              name="description"
                              render={({field})=>(
                                   <FormItem>
                                        <FormLabel>{t("desc-field.label")}</FormLabel>
                                        <FormControl>
                                             <Textarea
                                                  {...field}
                                                  placeholder={t("desc-field.placeholder")}
                                             />
                                        </FormControl>
                                        <FormDescription>{t("desc-field.field-desc")}</FormDescription>
                                        <FormMessage/>
                                   </FormItem>
                              )}
                         />
                    </EditorFormCardWrapper>
                    <EditorFormCardWrapper title={personalInfoTxt("title")} description={personalInfoTxt("desc")}>
                         <FormField
                              control={form.control}
                              name="profileImg"
                              // eslint-disable-next-line @typescript-eslint/no-unused-vars
                              render={({field: {value,...fieldValues}})=>(
                                   <FormItem>
                                        <FormLabel>{personalInfoTxt("image")}</FormLabel>
                                        <FormControl>
                                             <ButtonGroup className="w-full">
                                                  <InputGroup>
                                                       <InputGroupInput
                                                            {...fieldValues}
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={e=>{
                                                                 const file = e.target.files?.[0];
                                                                 fieldValues.onChange(file)
                                                            }}
                                                            ref={imgInputRef}
                                                       />
                                                       <InputGroupAddon>
                                                            <ImageIcon/>
                                                       </InputGroupAddon>
                                                  </InputGroup>
                                                  <Button
                                                       type="button"
                                                       variant={!resumeData.profileImg ? "secondary" : "destructive"}
                                                       onClick={()=>{
                                                            fieldValues.onChange(null)
                                                            setResumeData(prev=>({
                                                                 ...prev,
                                                                 profileImg: null
                                                            }))
                                                            if(imgInputRef.current) {
                                                                 imgInputRef.current.value = ""
                                                            }
                                                       }}
                                                       disabled={!resumeData.profileImg}
                                                  >
                                                       <TrashIcon/>
                                                       {buttonTxt("remove")}
                                                  </Button>
                                             </ButtonGroup>
                                        </FormControl>
                                        <FormMessage/>
                                   </FormItem>
                              )}
                         />
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                   control={form.control}
                                   name="fname"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{personalInfoTxt("fname.label")}</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       {...field}
                                                       placeholder={personalInfoTxt("fname.placeholder")}
                                                  />
                                             </FormControl>
                                             <FormMessage/>
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="lname"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{personalInfoTxt("lname.label")}</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       {...field}
                                                       placeholder={personalInfoTxt("lname.placeholder")}
                                                  />
                                             </FormControl>
                                             <FormMessage/>
                                        </FormItem>
                                   )}
                              />
                         </div>
                         <FormField
                              control={form.control}
                              name="jobTitle"
                              render={({field})=>(
                                   <FormItem>
                                        <FormLabel>{professionField("label")}</FormLabel>
                                        <FormControl>
                                             <RandomPlaceholderInput
                                                  {...field}
                                                  placeholdersList={professionField("placeholder")}
                                             />
                                        </FormControl>
                                        <FormMessage/>
                                   </FormItem>
                              )}
                         />
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                   control={form.control}
                                   name="phone"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{formTxt("phone.label")}</FormLabel>
                                             <FormControl>
                                                  <InputGroup>
                                                       <InputGroupInput
                                                            {...field}
                                                            placeholder={formTxt("phone.placeholder")}
                                                       />
                                                       <InputGroupAddon>
                                                            <PhoneIcon/>
                                                       </InputGroupAddon>
                                                  </InputGroup>
                                             </FormControl>
                                             <FormMessage/>
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="address"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{personalInfoTxt("address.label")}</FormLabel>
                                             <FormControl>
                                                  <InputGroup>
                                                       <InputGroupInput
                                                            {...field}
                                                            placeholder={personalInfoTxt("address.placeholder")}
                                                       />
                                                       <InputGroupAddon>
                                                            <MapPinIcon/>
                                                       </InputGroupAddon>
                                                  </InputGroup>
                                             </FormControl>
                                             <FormMessage/>
                                        </FormItem>
                                   )}
                              />
                         </div>
                         <FormField
                              control={form.control}
                              name="email"
                              render={({field})=>(
                                   <FormItem>
                                        <FormLabel>{formTxt("email.label")}</FormLabel>
                                        <FormControl>
                                             <InputGroup>
                                                  <InputGroupInput
                                                       {...field}
                                                       placeholder={formTxt("email.placeholder")}
                                                       type="email"
                                                  />
                                                  <InputGroupAddon>
                                                       <MailIcon/>
                                                  </InputGroupAddon>
                                             </InputGroup>
                                        </FormControl>
                                        <FormMessage/>
                                   </FormItem>
                              )}
                         />
                         <FormField
                              control={form.control}
                              name="summary"
                              render={({field})=>(
                                   <FormItem>
                                        <FormLabel>{personalInfoTxt("summary.label")}</FormLabel>
                                        <FormControl>
                                             <Textarea
                                                  {...field}
                                                  placeholder={personalInfoTxt("summary.placeholder")}
                                             />
                                        </FormControl>
                                        <FormMessage/>
                                        <GenerateSummaryButton
                                             resumeData={resumeData}
                                             onSummaryGenerated={summary=>field.onChange(summary)}
                                             disabled={isDisabled}
                                        />
                                   </FormItem>
                              )}
                         />
                         <FormField
                              control={form.control}
                              name="hobbies"
                              render={({field})=>(
                                   <FormItem>
                                        <FormLabel>{personalInfoTxt("hobbies.label")}</FormLabel>
                                        <FormControl>
                                             <Textarea
                                                  {...field}
                                                  placeholder={personalInfoTxt("hobbies.placeholder")}
                                             />
                                        </FormControl>
                                        <FormDescription>{personalInfoTxt("hobbies.field-desc")}</FormDescription>
                                        <FormMessage/>
                                   </FormItem>
                              )}
                         />
                    </EditorFormCardWrapper>
               </form>
          </Form>         
     )
}