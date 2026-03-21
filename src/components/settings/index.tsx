"use client"
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { getSettingsSchema } from "@/schemas";
import { applySettings } from "@/actions/settings";
import {
     Form,
     FormField,
     FormControl,
     FormItem,
     FormLabel,
     FormMessage,
     FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormSuccess } from "@/components/form/form-success";
import { FormError } from "@/components/form/form-error";
import { Switch } from "@/components/ui/switch";
import { SettingsType } from "@/lib/types/schemas";
import LoadingButton from "@/components/buttons/loading-button";
import SettingsCard from "./settings-card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ThemeSettings from "@/components/theme-toggler";
import { PasswordInput } from "@/components/form/password-input";
import { useTranslations } from "next-intl";
import RandomPlaceholderInput from "@/components/form/rand-placeholder-input";

export default function SettingsContent(){
     const mainTxt = useTranslations("settings")
     const user = useCurrentUser();
     const {update} = useSession();
     const [isPending, startTransition] = useTransition();
     const [error, setError] = useState<string|undefined>("")
     const [success, setSuccess] = useState<string|undefined>("")

     const defaultSettings: SettingsType = {
          name: user?.name || undefined,
          email: user?.email || undefined,
          isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
          jobTitle: user?.jobTitle || undefined,
          phone: user?.phone || undefined,
          address: user?.address || undefined,
          summary: user?.summary || undefined,
          hobbies: user?.hobbies || undefined,
          password: undefined,
          newPassword: undefined,
          showEmail: user?.cvPageSettings.showEmail || undefined,
          showPhone: user?.cvPageSettings.showPhone || undefined,
          showAddress: user?.cvPageSettings.showAddress || undefined,
          showLinks: user?.cvPageSettings.showLinks || undefined
     }

     const validationMsg = useTranslations("validations");
     const form = useForm<SettingsType>({
          resolver: zodResolver(getSettingsSchema(validationMsg)),
          defaultValues: defaultSettings
     })
     const errMsg = useTranslations("error-messages")

     const onSubmit = (values: SettingsType) => {
          setError("");
          setSuccess("");
          startTransition(()=>{
               applySettings(values)
               .then(data=>{
                    if(data.error){
                         setError(data.error)
                    }
                    if(data.success){
                         update();
                         setSuccess(data.success)
                    }
               })
               .catch(()=>setError(errMsg("unknownError")))
          })
     }

     const currData = form.watch();
     const isSameSettings = JSON.stringify(currData) === JSON.stringify(defaultSettings);
     const professionField = useTranslations("editor.profession");
     const formTxt = useTranslations("form");
     const t = useTranslations("settings.sections");
     const docFields = useTranslations("editor.personal-info");
     const buttonTxt = useTranslations("buttons")
     return (
          <>
               <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 border-b pb-3">{mainTxt("title")}</h1>
               <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                         <FormError message={error}/>
                         <FormSuccess message={success}/>
                         <SettingsCard title={t("acc-settings")}>
                              <FormField
                                   control={form.control}
                                   name="name"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{formTxt("name.label")}</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       {...field}
                                                       placeholder={formTxt("name.placeholder")}
                                                       disabled={isPending}
                                                  />
                                             </FormControl>
                                             <FormMessage/>
                                        </FormItem>
                                   )}
                              />
                              {!user?.isOauth && (
                                   <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field})=>(
                                             <FormItem>
                                                  <FormLabel>{formTxt("email.label")}</FormLabel>
                                                  <FormControl>
                                                       <Input
                                                            {...field}
                                                            type="email"
                                                            placeholder={formTxt("email.placeholder")}
                                                            disabled={isPending}
                                                       />
                                                  </FormControl>
                                                  <FormMessage/>
                                             </FormItem>
                                        )}
                                   />
                              )}
                         </SettingsCard>
                         <SettingsCard title={t("default-value.title")} description={t("default-value.desc")}>
                              <FormField
                                   control={form.control}
                                   name="jobTitle"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{professionField("label")}</FormLabel>
                                             <FormControl>
                                                  <RandomPlaceholderInput
                                                       {...field}
                                                       disabled={isPending}
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
                                                       <Input
                                                            {...field}
                                                            placeholder={formTxt("phone.placeholder")}
                                                            disabled={isPending}
                                                       />
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
                                                  <FormLabel>{docFields("address.label")}</FormLabel>
                                                  <FormControl>
                                                       <Input
                                                            {...field}
                                                            placeholder={docFields("address.placeholder")}
                                                            disabled={isPending}
                                                       />
                                                  </FormControl>
                                                  <FormMessage/>
                                             </FormItem>
                                        )}
                                   />
                              </div>
                              <FormField
                                   control={form.control}
                                   name="summary"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{docFields("summary.label")}</FormLabel>
                                             <FormControl>
                                                  <Textarea
                                                       {...field}
                                                       placeholder={docFields("summary.placeholder")}
                                                  />
                                             </FormControl>
                                             <FormMessage/>
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="hobbies"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{docFields("hobbies.label")}</FormLabel>
                                             <FormControl>
                                                  <Textarea
                                                       {...field}
                                                       placeholder={docFields("hobbies.placeholder")}
                                                  />
                                             </FormControl>
                                             <FormDescription>{docFields("hobbies.field-desc")}</FormDescription>
                                             <FormMessage/>
                                        </FormItem>
                                   )}
                              />
                         </SettingsCard>
                         <SettingsCard title={t("privacy.title")}>
                              <FormField
                                   control={form.control}
                                   name="showEmail"
                                   render={({field})=>(
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                             <div className="space-y-0.5">
                                                  <FormLabel>{t("privacy.show-email.title")}</FormLabel>
                                                  <FormDescription>{t("privacy.show-email.desc")}</FormDescription>
                                             </div>
                                             <FormControl>
                                                  <Switch
                                                       disabled={isPending}
                                                       checked={field.value}
                                                       onCheckedChange={field.onChange}
                                                  />
                                             </FormControl>
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="showAddress"
                                   render={({field})=>(
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                             <div className="space-y-0.5">
                                                  <FormLabel>{t("privacy.show-address.title")}</FormLabel>
                                                  <FormDescription>{t("privacy.show-address.desc")}</FormDescription>
                                             </div>
                                             <FormControl>
                                                  <Switch
                                                       disabled={isPending}
                                                       checked={field.value}
                                                       onCheckedChange={field.onChange}
                                                  />
                                             </FormControl>
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="showPhone"
                                   render={({field})=>(
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                             <div className="space-y-0.5">
                                                  <FormLabel>{t("privacy.show-phone.title")}</FormLabel>
                                                  <FormDescription>{t("privacy.show-phone.title")}</FormDescription>
                                             </div>
                                             <FormControl>
                                                  <Switch
                                                       disabled={isPending}
                                                       checked={field.value}
                                                       onCheckedChange={field.onChange}
                                                  />
                                             </FormControl>
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="showLinks"
                                   render={({field})=>(
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                             <div className="space-y-0.5">
                                                  <FormLabel>{t("privacy.show-links.title")}</FormLabel>
                                                  <FormDescription>{t("privacy.show-links.title")}</FormDescription>
                                             </div>
                                             <FormControl>
                                                  <Switch
                                                       disabled={isPending}
                                                       checked={field.value}
                                                       onCheckedChange={field.onChange}
                                                  />
                                             </FormControl>
                                        </FormItem>
                                   )}
                              />
                         </SettingsCard>
                         {!user?.isOauth && (
                              <SettingsCard title={t("auth.title")}>
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
                                                  <FormMessage/>
                                             </FormItem>
                                        )}
                                   />
                                   <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({field})=>(
                                             <FormItem>
                                                  <FormLabel>{t("auth.new-pass")}</FormLabel>
                                                  <FormControl>
                                                       <PasswordInput
                                                            {...field}
                                                            placeholder="********"
                                                            disabled={isPending}
                                                       />
                                                  </FormControl>
                                                  <FormMessage/>
                                             </FormItem>
                                        )}
                                   />
                                   <FormField
                                        control={form.control}
                                        name="isTwoFactorEnabled"
                                        render={({field})=>(
                                             <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                  <div className="space-y-0.5">
                                                       <FormLabel>{t("auth.2fa.title")}</FormLabel>
                                                       <FormDescription>{t("auth.2fa.desc")}</FormDescription>
                                                       <FormMessage/>
                                                  </div>
                                                  <FormControl>
                                                       <Switch
                                                            disabled={isPending}
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                       />
                                                  </FormControl>
                                             </FormItem>
                                        )}
                                   />
                              </SettingsCard>
                         )}
                         <SettingsCard title={t("appearance.title")}>
                              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                   <div className="space-y-0.5">
                                        <Label>{t("appearance.theme.title")}</Label>
                                        <p className="text-[0.8rem] text-muted-foreground">{t("appearance.theme.desc")}</p>
                                   </div>
                                   <ThemeSettings/>
                              </div>
                         </SettingsCard>
                         <LoadingButton type="submit" disabled={isSameSettings} loading={isPending}>{buttonTxt("save")}</LoadingButton>
                    </form>
               </Form>
          </>
     )
}