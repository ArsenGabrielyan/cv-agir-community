"use client"
import { useState, useTransition } from "react";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { getContactSchema } from "@/schemas";
import {
     Form,
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form/form-error";
import { submitContactForm } from "@/actions/contact-form";
import { Textarea } from "@/components/ui/textarea";
import { FormSuccess } from "./form-success";
import { ContactFormType } from "@/schemas/types";
import LoadingButton from "@/components/buttons/loading-button";
import { getCaptchaToken } from "@/lib/captcha";
import { useTranslations } from "next-intl";
import { MailIcon, PhoneIcon } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "../ui/input-group";

export default function ContactForm(){
     const [isPending, startTransition] = useTransition();
     const [error, setError] = useState<string | undefined>("");
     const [success, setSuccess] = useState<string | undefined>("");
     const validationMsg = useTranslations("validations");
     const errMsg = useTranslations("error-messages");
     const buttonTxt = useTranslations("buttons")
     const form = useForm<ContactFormType>({
          resolver: zodResolver(getContactSchema(validationMsg)),
          defaultValues: {
               name: "",
               email: "",
               phone: "",
               subject: "",
               message: ""
          }
     });
     const handleSubmit = (values: ContactFormType) => {
          setError("");
          setSuccess("");
          startTransition(async()=>{
               try{
                    const token = await getCaptchaToken(errMsg);
                    const data = await submitContactForm(token,values)
                    setError(data.error);
                    setSuccess(data.success);
               } catch (error) {
                    console.error(error)
                    setError(errMsg("unknownError"))
               }
          })
     }
     const t = useTranslations("form");
     return (
          <Form {...form}>
               <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="space-y-4">
                         <FormField
                              control={form.control}
                              name="name"
                              render={({field})=>(
                                   <FormItem>
                                        <FormLabel>{t("name.label")}</FormLabel>
                                        <FormControl>
                                             <Input
                                                  {...field}
                                                  disabled={isPending}
                                                  placeholder={t("name.placeholder")}
                                             />
                                        </FormControl>
                                        <FormMessage/>
                                   </FormItem>
                              )}
                         />
                         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              <FormField
                                   control={form.control}
                                   name="email"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{t("email.label")}</FormLabel>
                                             <FormControl>
                                                  <InputGroup>
                                                       <InputGroupInput
                                                            {...field}
                                                            placeholder={t("email.placeholder")}
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
                                   name="phone"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{t("phone.label")}</FormLabel>
                                             <FormControl>
                                                  <InputGroup>
                                                       <InputGroupInput
                                                            {...field}
                                                            placeholder={t("phone.placeholder")}
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
                         </div>
                         <FormField
                              control={form.control}
                              name="subject"
                              render={({field})=>(
                                   <FormItem>
                                        <FormLabel>{t("subject.label")}</FormLabel>
                                        <FormControl>
                                             <Input
                                                  {...field}
                                                  disabled={isPending}
                                                  placeholder={t("subject.placeholder")}
                                             />
                                        </FormControl>
                                        <FormMessage/>
                                   </FormItem>
                              )}
                         />
                         <FormField
                              control={form.control}
                              name="message"
                              render={({field})=>(
                                   <FormItem>
                                        <FormLabel>{t("message.label")}</FormLabel>
                                        <FormControl>
                                             <Textarea
                                                  {...field}
                                                  disabled={isPending}
                                                  placeholder={t("message.placeholder")}
                                                  rows={5}
                                             />
                                        </FormControl>
                                        <FormMessage/>
                                   </FormItem>
                              )}
                         />
                         <FormError message={error}/>
                         <FormSuccess message={success}/>
                         <LoadingButton type="submit" loading={isPending}>{buttonTxt("send-msg")}</LoadingButton>
                    </div>
               </form>
          </Form>
     )
}