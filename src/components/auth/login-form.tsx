"use client"
import { Link } from "@/i18n/routing";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form"
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod"
import { getLoginSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper";
import {
     Form,
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form/form-error";
import { FormSuccess } from "@/components/form/form-success";
import { login } from "@/actions/auth/login";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { LoginType } from "@/schemas/types";
import LoadingButton from "@/components/buttons/loading-button";
import {REGEXP_ONLY_DIGITS} from "input-otp"
import { PasswordInput } from "../form/password-input";
import { useTranslations } from "next-intl";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { MailIcon } from "lucide-react";

function getOAuthNotLinkedError(searchParams: ReadonlyURLSearchParams, message: string){
     const error = searchParams.get("error");
     if(error){
          return error.includes("OAuthAccountNotLinked") ? message : ""
     }
     return ""
}

export default function LoginForm(){
     const searchParams = useSearchParams();
     const callbackUrl = searchParams.get("callbackUrl");
     const validationMsg = useTranslations("validations");
     const errMsg = useTranslations("error-messages")
     const urlError = getOAuthNotLinkedError(searchParams,errMsg("auth.acc-not-linked"))
     const [showTwoFactor, setShowTwoFactor] = useState(false);
     const [error, setError] = useState<string | undefined>("");
     const [success, setSuccess] = useState<string | undefined>("");
     const [isPending, startTransition] = useTransition();
     const form = useForm<LoginType>({
          resolver: zodResolver(getLoginSchema(validationMsg)),
          defaultValues: {
               email: "",
               password: ""
          }
     });
     const handleSubmit = (values: LoginType) => {
          setError("");
          setSuccess("");
          startTransition(()=>{
               login(values,callbackUrl)
               .then(data=>{
                    if(data?.error){
                         setError(data?.error);
                    }
                    if(data?.success){
                         form.reset();
                         setSuccess(data?.success);
                    }
                    if(data?.twoFactor){
                         setShowTwoFactor(true);
                    }
               })
               .catch((error)=>{
                    console.error(error)
                    setError(errMsg("unknownError"))
               })
          })
     }
     const t = useTranslations("auth.login");
     const formTxt = useTranslations("form");
     const buttonTxt = useTranslations("auth.buttons")
     return (
          <CardWrapper
               headerLabel={t("form-title")}
               backButtonLabel={t("sign-up-link-txt")}
               backButtonHref="/auth/register"
               showSocial
          >
               <Form {...form}>
                    <form
                         onSubmit={form.handleSubmit(handleSubmit)}
                         className="space-y-6"
                    >
                         <div className="space-y-4">
                              {!showTwoFactor && (
                                   <>
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
                                                            <PasswordInput
                                                                 {...field}
                                                                 placeholder="********"
                                                                 disabled={isPending}
                                                            />
                                                       </FormControl>
                                                       <Button size="sm" variant="link" asChild className="px-0 font-normal">
                                                            <Link href="/auth/reset">{t("forgot-pass")}</Link>
                                                       </Button>
                                                       <FormMessage/>
                                                  </FormItem>
                                             )}
                                        />
                                   </>
                              )}
                              {showTwoFactor && (
                                   <FormField
                                        control={form.control}
                                        name="code"
                                        render={({field})=>(
                                             <FormItem>
                                                  <FormLabel>{t("2fa-code")}</FormLabel>
                                                  <FormControl>
                                                       <InputOTP
                                                            maxLength={6}
                                                            {...field}
                                                            disabled={isPending}
                                                            pattern={REGEXP_ONLY_DIGITS}
                                                       >
                                                            <InputOTPGroup className="max-w-md mx-auto">
                                                                 <InputOTPSlot index={0}/>
                                                                 <InputOTPSlot index={1}/>
                                                                 <InputOTPSlot index={2}/>
                                                                 <InputOTPSlot index={3}/>
                                                                 <InputOTPSlot index={4}/>
                                                                 <InputOTPSlot index={5}/>
                                                            </InputOTPGroup>
                                                       </InputOTP>
                                                  </FormControl>
                                                  <FormMessage/>
                                             </FormItem>
                                        )}
                                   />
                              )}
                         </div>
                         <FormError message={error || urlError}/>
                         <FormSuccess message={success}/>
                         <LoadingButton type="submit" className="w-full" loading={isPending}>{showTwoFactor ? buttonTxt("confirm") : buttonTxt("login")}</LoadingButton>
                    </form>
               </Form>
          </CardWrapper>
     )
}