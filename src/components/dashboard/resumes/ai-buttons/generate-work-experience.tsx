import { generateWorkExperience } from "@/actions/ai";
import LoadingButton from "@/components/buttons/loading-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { getGenerateDescriptionSchema } from "@/schemas/ai";
import { GenerateDescriptionInput, WorkExperienceType } from "@/schemas/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface GenerateWorkExpButtonProps{
     onWorkExpGenerated: (exp: WorkExperienceType) => void
}
export default function GenerateWorkExpButton({onWorkExpGenerated}: GenerateWorkExpButtonProps){
     const [showInputDialog, setShowInputDialog] = useState(false);
     const t = useTranslations("buttons.ai")
     return (
          <>
               <Button variant="outline" type="button" onClick={()=>setShowInputDialog(true)}>
                    <Sparkles className="size-4"/>
                    {t("fill")}
               </Button>
               <InputDialog
                    open={showInputDialog}
                    onOpenChange={setShowInputDialog}
                    onWorkExpGenerated={exp=>{
                         onWorkExpGenerated(exp);
                         setShowInputDialog(false);
                    }}
               />
          </>
     )
}
interface InputDialogProps{
     open: boolean,
     onOpenChange: (open: boolean) => void
     onWorkExpGenerated: (exp: WorkExperienceType) => void
}
function InputDialog({open,onOpenChange,onWorkExpGenerated}: InputDialogProps){
     const validationMsg = useTranslations("validations");
     const form = useForm<GenerateDescriptionInput>({
          resolver: zodResolver(getGenerateDescriptionSchema(validationMsg)),
          defaultValues: {
               description: ""
          }
     });
     const errMsg = useTranslations("error-messages")
     const handleSubmit = async (input: GenerateDescriptionInput) => {
          try{
               const response = await generateWorkExperience(input);
               onWorkExpGenerated(response);
          } catch (error) {
               console.error(error);
               toast.error(errMsg("unknownError"))
          }
     }
     const t = useTranslations("editor.resume.generate-work-exp")
     const buttonTxt = useTranslations("buttons.ai")
     return (
          <Dialog open={open} onOpenChange={onOpenChange}>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>{t("title")}</DialogTitle>
                         <DialogDescription>{t("desc")}</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                         <form className="space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
                              <FormField
                                   control={form.control}
                                   name="description"
                                   render={({field})=>(
                                        <FormItem>
                                             <FormLabel>{t("field.label")}</FormLabel>
                                             <FormControl>
                                                  <Textarea
                                                       {...field}
                                                       placeholder={t("field.placeholder")}
                                                       autoFocus
                                                  />
                                             </FormControl>
                                             <FormMessage/>
                                        </FormItem>
                                   )}
                              />
                              <LoadingButton type="submit" loading={form.formState.isSubmitting}>
                                   {buttonTxt("generate")}
                              </LoadingButton>
                         </form>
                    </Form>
               </DialogContent> 
          </Dialog>
     )
}