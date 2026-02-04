"use client"
import { useState, useTransition } from "react";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { getRegisterSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper";
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
import { FormSuccess } from "@/components/form/form-success";
import { register } from "@/actions/auth/register";
import { PasswordStrengthInput } from "@/components/form/password-input";
import { RegisterFormType } from "@/schemas/types";
import LoadingButton from "@/components/buttons/loading-button";
import { useTranslations } from "next-intl";
import { MailIcon } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "../ui/input-group";

export default function RegisterForm(){
     const [isPending, startTransition] = useTransition();
     const [error, setError] = useState<string | undefined>("");
     const [success, setSuccess] = useState<string | undefined>("");
     const validationMsg = useTranslations("validations");
     const form = useForm<RegisterFormType>({
          resolver: zodResolver(getRegisterSchema(validationMsg)),
          defaultValues: {
               name: "",
               email: "",
               password: ""
          }
     });
     const handleSubmit = (values: RegisterFormType) => {
          setError("");
          setSuccess("");
          startTransition(()=>{
               register(values)
               .then(data=>{
                    setError(data.error);
                    setSuccess(data.success);
               })
          })
     }
     const t = useTranslations("auth.register");
     const formTxt = useTranslations("form");
     const buttonTxt = useTranslations("auth.buttons")
     return (
          <CardWrapper
               headerLabel={t("title")}
               backButtonLabel={t("login-link-txt")}
               backButtonHref="/auth/login"
               showSocial
          >
               <Form {...form}>
                    <form
                         onSubmit={form.handleSubmit(handleSubmit)}
                         className="space-y-6"
                    >
                         <div className="space-y-4">
                              <FormField
                                   control={form.control}
                                   name="name"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{formTxt("name.label")}</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       {...field}
                                                       disabled={isPending}
                                                       placeholder={formTxt("name.placeholder")}
                                                  />
                                             </FormControl>
                                             <FormMessage/>
                                        </FormItem>
                                   )}
                              />
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
                                                            disabled={isPending}
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
                                   name="password"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{formTxt("password-label")}</FormLabel>
                                             <FormControl>
                                                  <PasswordStrengthInput
                                                       {...field}
                                                       placeholder="********"
                                                       disabled={isPending}
                                                  />
                                             </FormControl>
                                             <FormMessage/>
                                        </FormItem>
                                   )}
                              />
                         </div>
                         <FormError message={error}/>
                         <FormSuccess message={success}/>
                         <LoadingButton type="submit" className="w-full" loading={isPending}>{buttonTxt("register")}</LoadingButton>
                    </form>
               </Form>
          </CardWrapper>
     )
}