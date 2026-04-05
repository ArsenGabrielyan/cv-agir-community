"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ModalWrapper from "..";
import { Input } from "@/components/ui/input";
import { Edit, Plus, RotateCcw, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { TemplateFormType } from "@/lib/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { TemplateFormSchema } from "@/schemas/admin";
import { useRef, useState, useTransition } from "react";
import LoadingButton from "@/components/buttons/loading-button";
import { toast } from "sonner";
import { createTemplate, editTemplate } from "@/actions/admin/templates";
import { usePathname } from "@/i18n/routing";
import { TemplateServerData } from "@/lib/types/resume";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { locales } from "@/i18n/config";
import { CircleFlagLanguage } from "react-circle-flags";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CodeTextArea } from "@/components/code-textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface TemplateFormModalProps{
     data?: TemplateServerData
     id?: string
     triggerBtn: React.JSX.Element,
     categories: {name: string, id: string}[]
}
export default function TemplateFormModal({data, id, triggerBtn, categories}: TemplateFormModalProps){
     const path = usePathname()
     const errMsg = useTranslations("error-messages")
     const langTxt = useTranslations("langs")
     const [isPending, startTransition] = useTransition()
     const [isOpen, setIsOpen] = useState(false)
     const form = useForm<TemplateFormType>({
          resolver: zodResolver(TemplateFormSchema),
          defaultValues: {
               locale: data?.locale || undefined,
               name: data?.name || undefined,
               description: data?.description || undefined,
               categoryId: data?.categoryId || undefined,
               imageName: data?.imageName || undefined,
               htmlTemplate: data?.htmlTemplate || undefined,
               cssStyle: data?.cssStyle || undefined
          }
     })
     const onSubmit = (values: TemplateFormType) => {
          if(isPending) return
          // TODO: Add a button disabled check if these values aren't equal
          startTransition(async()=>{
               try {
                    const result = !id ? await createTemplate(values,path) : await editTemplate(id,values,path)
                    if(result.error) toast.error(result.error);
                    if(result.success) {
                         toast.success(result.success);
                         setIsOpen(false);
                         form.reset()
                    }
               } catch (err) {
                    toast.error(errMsg("unknownError"))
                    console.error(err)
               }
          })
     }
     const inputHTML = useRef<HTMLInputElement | null>(null);
     const inputCSS = useRef<HTMLInputElement | null>(null);
     const openHtmlInput = () => inputHTML.current?.click();
     const openCssInput = () => inputCSS.current?.click();
     return (
          <ModalWrapper
               title={!id ? "Ստեղծել Շաբլոն" : "Խմբագրել Շաբլոնը"}
               isOpen={isOpen}
               setIsOpen={setIsOpen}
               triggerButton={triggerBtn}
          >
               <Separator/>
               <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                         <Tabs className="w-full gap-4">
                              <TabsList className="w-full">
                                   <TabsTrigger value="info">Տեղեկություն</TabsTrigger>
                                   <TabsTrigger value="html">HTML</TabsTrigger>
                                   <TabsTrigger value="css">CSS</TabsTrigger>
                              </TabsList>
                              <TabsContent value="info" className="space-y-4">
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                             control={form.control}
                                             name="locale"
                                             disabled={isPending}
                                             render={({field})=>(
                                                  <FormItem>
                                                       <FormLabel>Լեզու</FormLabel>
                                                       <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                                                            <FormControl>
                                                                 <SelectTrigger className="w-full">
                                                                      <SelectValue placeholder="Ընտրել շաբլոնի լեզուն"/>
                                                                 </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                 {locales.map(locale=>(
                                                                      <SelectItem key={locale} value={locale}>
                                                                           <CircleFlagLanguage languageCode={locale ?? "xx"} width={16} height={16}/>
                                                                           {langTxt(locale ?? "unknown")}
                                                                      </SelectItem>
                                                                 ))}
                                                            </SelectContent>
                                                       </Select>
                                                       <FormMessage/>
                                                  </FormItem>
                                             )}
                                        />
                                        <FormField
                                             control={form.control}
                                             name="name"
                                             disabled={isPending}
                                             render={({field})=>(
                                                  <FormItem>
                                                       <FormLabel>Շաբլոնի անունը</FormLabel>
                                                       <FormControl>
                                                            <Input
                                                                 {...field}
                                                                 disabled={isPending}
                                                                 placeholder="Իմ ամենահետաքրքիր շաբլոնը"
                                                            />
                                                       </FormControl>
                                                       <FormMessage/>
                                                  </FormItem>
                                             )}
                                        />
                                   </div>
                                   <FormField
                                        control={form.control}
                                        name="description"
                                        disabled={isPending}
                                        render={({field})=>(
                                             <FormItem>
                                                  <FormLabel>Նկարագրություն</FormLabel>
                                                  <FormControl>
                                                       <Textarea
                                                            {...field}
                                                            disabled={isPending}
                                                            placeholder="Տեղադրել Շաբլոնի մասին տեղեկություն"
                                                            rows={5}
                                                       />
                                                  </FormControl>
                                                  <FormMessage/>
                                             </FormItem>
                                        )}
                                   />
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                             control={form.control}
                                             name="categoryId"
                                             disabled={isPending}
                                             render={({field})=>(
                                                  <FormItem>
                                                       <FormLabel>Կատեգորիա</FormLabel>
                                                       {categories.length > 0 ? (
                                                            <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                                                                 <FormControl>
                                                                      <SelectTrigger className="w-full">
                                                                           <SelectValue placeholder="Ընտրել կատեգորիան"/>
                                                                      </SelectTrigger>
                                                                 </FormControl>
                                                                 <SelectContent>
                                                                      {categories.map(cat=>(
                                                                           <SelectItem key={cat.id} value={cat.id}>
                                                                                {cat.name}
                                                                           </SelectItem>
                                                                      ))}
                                                                 </SelectContent>
                                                            </Select>
                                                       ) : (
                                                            <Skeleton className="w-full h-9"/>
                                                       )}
                                                       <FormMessage/>
                                                  </FormItem>
                                             )}
                                        />
                                        <FormField
                                             control={form.control}
                                             name="imageName"
                                             disabled={isPending}
                                             render={({field})=>(
                                                  <FormItem>
                                                       <FormLabel>Նկարի անուն</FormLabel>
                                                       <FormControl>
                                                            <Input
                                                                 {...field}
                                                                 disabled={isPending}
                                                                 placeholder="img.webp"
                                                            />
                                                       </FormControl>
                                                       <FormMessage/>
                                                  </FormItem>
                                             )}
                                        />
                                   </div>
                              </TabsContent>
                              <TabsContent value="html" className="space-y-4">
                                   <FormField
                                        control={form.control}
                                        name="htmlTemplate"
                                        render={({field})=>(
                                             <FormItem>
                                                  <FormControl>
                                                       <CodeTextArea
                                                            {...field}
                                                            type="html"
                                                            label="HTML Կոդ"
                                                       />
                                                  </FormControl>
                                                  <FormMessage/>
                                             </FormItem>
                                        )}
                                   />
                                   <div className="flex items-center gap-2 flex-wrap">
                                        <input
                                             name="htmlTemplate"
                                             type="file"
                                             ref={inputHTML}
                                             onChange={async (e) => {
                                                  const file = e.target.files?.[0];
                                                  if (!file) return;
                                                  const text = await file.text();
                                                  form.setValue("htmlTemplate",text)
                                                  e.target.value = "";
                                             }}
                                             style={{ display: "none" }}
                                             accept=".html,text/html"
                                        />
                                        <Button className="flex-1" type="button" variant="outline" onClick={openHtmlInput}>
                                             <Upload/>
                                             Վերբեռնել
                                        </Button>
                                        <Button className="flex-1" type="button" variant="outline" onClick={()=>form.resetField("htmlTemplate")}>
                                             <RotateCcw/>
                                             Վերակայել
                                        </Button>
                                   </div>
                              </TabsContent>
                              <TabsContent value="css" className="space-y-4">
                                   <FormField
                                        control={form.control}
                                        name="cssStyle"
                                        render={({field})=>(
                                             <FormItem>
                                                  <FormControl>
                                                       <CodeTextArea
                                                            {...field}
                                                            type="css"
                                                            label="CSS Կոդ"
                                                       />
                                                  </FormControl>
                                                  <FormMessage/>
                                             </FormItem>
                                        )}
                                   />
                                   <div className="flex items-center gap-2 flex-wrap">
                                        <input
                                             name="cssStyle"
                                             type="file"
                                             ref={inputCSS}
                                             onChange={async (e) => {
                                                  const file = e.target.files?.[0];
                                                  if (!file) return;
                                                  const text = await file.text();
                                                  form.setValue("cssStyle",text)
                                                  e.target.value = "";
                                             }}
                                             style={{ display: "none" }}
                                             accept=".css,text/css"
                                        />
                                        <Button className="flex-1" type="button" variant="outline" onClick={openCssInput}>
                                             <Upload/>
                                             Վերբեռնել
                                        </Button>
                                        <Button className="flex-1" type="button" variant="outline" onClick={()=>form.resetField("cssStyle")}>
                                             <RotateCcw/>
                                             Վերակայել
                                        </Button>
                                   </div>
                              </TabsContent>
                         </Tabs>
                         <div className="flex items-center gap-2">
                              <LoadingButton loading={isPending} type="submit">
                                   {!id ? (
                                        <>
                                        <Plus/>
                                        Ստեղծել
                                        </>
                                   ) : (
                                        <>
                                        <Edit/>
                                        Խմբագրել
                                        </>
                                   )}
                              </LoadingButton>
                              <Button type="reset" variant="secondary" onClick={()=>{
                                   if(id) setIsOpen(false)
                                   form.reset();
                              }}>
                                   <RotateCcw/>
                                   Վերակայել
                              </Button>
                         </div>
                    </form>
               </Form>
          </ModalWrapper>
     )
}