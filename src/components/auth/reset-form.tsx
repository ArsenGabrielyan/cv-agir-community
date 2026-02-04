"use client"
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { getResetSchema } from "@/schemas";
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
import { reset } from "@/actions/auth/reset";
import { ResetPassType } from "@/schemas/types";
import LoadingButton from "@/components/buttons/loading-button";
import { useTranslations } from "next-intl";

export default function ResetForm(){
     const [isPending, startTransition] = useTransition();
     const [error, setError] = useState<string | undefined>("");
     const [success, setSuccess] = useState<string | undefined>("");
     const validationMsg = useTranslations("validations");
     const form = useForm<ResetPassType>({
          resolver: zodResolver(getResetSchema(validationMsg)),
          defaultValues: {
               email: ""
          }
     });
     const handleSubmit = (values: ResetPassType) => {
          setError("");
          setSuccess("");
          startTransition(()=>{
               reset(values)
               .then(data=>{
                    setError(data?.error);
                    setSuccess(data?.success);
               })
          })
     }
     const t = useTranslations("auth")
     const emailField = useTranslations("form.email")
     return (
          <CardWrapper
               headerLabel={t("login.forgot-pass")}
               backButtonLabel={t("buttons.returnToLogin")}
               backButtonHref="/auth/login"
          >
               <Form {...form}>
                    <form
                         onSubmit={form.handleSubmit(handleSubmit)}
                         className="space-y-6"
                    >
                         <div className="space-y-4">
                              <FormField
                                   control={form.control}
                                   name="email"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{emailField("label")}</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       {...field}
                                                       disabled={isPending}
                                                       placeholder={emailField("placeholder")}
                                                       type="email"
                                                  />
                                             </FormControl>
                                             <FormMessage/>
                                        </FormItem>
                                   )}
                              />
                         </div>
                         <FormError message={error}/>
                         <FormSuccess message={success}/>
                         <LoadingButton type="submit" className="w-full" loading={isPending}>{t("buttons.send-reset-link")}</LoadingButton>
                    </form>
               </Form>
          </CardWrapper>
     )
}