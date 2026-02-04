import { ResumeFormProps } from "@/lib/types"
import EditorFormCardWrapper from "../../wrappers/card-wrapper"
import { useForm, useWatch } from "react-hook-form"
import { ResumeDetailsType } from "@/schemas/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { getResumeDetailsSchema } from "@/schemas"
import { useEffect, useMemo } from "react"
import {Form} from "@/components/ui/form"
import { useResumeDynamicField } from "@/hooks/use-resume-dynamic-field"
import { Button } from "@/components/ui/button"
import WorkExperienceField from "../dynamic-fields/work-experience-field"
import EducationField from "../dynamic-fields/education-field"
import SkillField from "../dynamic-fields/skill-field"
import LanguageField from "../dynamic-fields/language-field"
import { closestCenter, DndContext } from "@dnd-kit/core"
import {restrictToVerticalAxis} from "@dnd-kit/modifiers"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import debounce from "lodash.debounce"
import { useTranslations } from "next-intl"
import { Plus } from "lucide-react"

export default function ResumeDetailsForm({resumeData, setResumeData}: ResumeFormProps){
     const validationMsg = useTranslations("validations");
     const form = useForm<ResumeDetailsType>({
          resolver: zodResolver(getResumeDetailsSchema(validationMsg)),
          defaultValues: {
               experience: resumeData.experience || [],
               education: resumeData.education || [],
               skills: resumeData.skills || [],
               languages: resumeData.languages || []
          }
     })
     const debouncedUpdate = useMemo(()=>debounce(async (values: ResumeDetailsType) => {
          if (await form.trigger()) {
               setResumeData((prev) => ({
                    ...prev,
                    experience: values.experience || [],
                    education: values.education || [],
                    skills: values.skills || [],
                    languages: values.languages || [],
               }));
          }
     },200),[form, setResumeData]);
     const allValues = useWatch({control: form.control})
     useEffect(()=>{
          debouncedUpdate(allValues)
          return () => {
               debouncedUpdate.cancel();
          }
     },[allValues, debouncedUpdate])

     const experienceField = useResumeDynamicField(form,"experience");
     const educationField = useResumeDynamicField(form,"education");
     const skillsField = useResumeDynamicField(form,"skills");
     const languagesField = useResumeDynamicField(form,"languages");
     const t = useTranslations("editor.resume")
     return (
          <Form {...form}>
               <form className="space-y-4">
                    <EditorFormCardWrapper
                         title={t("work-exp.title")}
                         description={t("work-exp.desc")}
                         renderFooter={()=>(
                              <Button type="button" onClick={experienceField.addValue}>
                                   <Plus/>
                                   {t("work-exp.add-btn")}
                              </Button>
                         )}
                    >
                         <DndContext
                              sensors={experienceField.sensors}
                              collisionDetection={closestCenter}
                              onDragEnd={experienceField.handleDragEnd}
                              modifiers={[restrictToVerticalAxis]}
                         >
                              <SortableContext
                                   items={experienceField.fields}
                                   strategy={verticalListSortingStrategy}
                              >
                                   {experienceField.fields.map((field,i)=>(
                                        <WorkExperienceField
                                             key={field.id}
                                             id={field.id}
                                             form={form}
                                             remove={experienceField.remove}
                                             index={i}
                                        />
                                   ))}       
                              </SortableContext>   
                         </DndContext>
                    </EditorFormCardWrapper>
                    <EditorFormCardWrapper
                         title={t("education.title")}
                         description={t("education.desc")}
                         renderFooter={()=>(
                              <Button type="button" onClick={educationField.addValue}>
                                   <Plus/>
                                   {t("education.add-btn")}
                              </Button>
                         )}
                    >
                         <DndContext
                              sensors={educationField.sensors}
                              collisionDetection={closestCenter}
                              onDragEnd={educationField.handleDragEnd}
                              modifiers={[restrictToVerticalAxis]}
                         >
                              <SortableContext
                                   items={educationField.fields}
                                   strategy={verticalListSortingStrategy}
                              >
                                   {educationField.fields.map((field,i)=>(
                                        <EducationField
                                             key={field.id}
                                             id={field.id}
                                             form={form}
                                             remove={educationField.remove}
                                             index={i}
                                        />
                                   ))}
                              </SortableContext>
                         </DndContext>
                    </EditorFormCardWrapper>
                    <EditorFormCardWrapper
                         title={t("skills.title")}
                         description={t("skills.desc")}
                         renderFooter={()=>(
                              <Button type="button" onClick={skillsField.addValue}>
                                   <Plus/>
                                   {t("skills.add-btn")}
                              </Button>
                         )}
                    >
                         <DndContext
                              collisionDetection={closestCenter}
                              modifiers={[restrictToVerticalAxis]}
                              sensors={skillsField.sensors}
                              onDragEnd={skillsField.handleDragEnd}
                         >
                              <SortableContext
                                   items={skillsField.fields}
                                   strategy={verticalListSortingStrategy}
                              >
                                   {skillsField.fields.map((field,i)=>(
                                        <SkillField
                                             key={field.id}
                                             id={field.id}
                                             form={form}
                                             remove={skillsField.remove}
                                             index={i}
                                        />
                                   ))}
                              </SortableContext>
                         </DndContext>
                    </EditorFormCardWrapper>
                    <EditorFormCardWrapper
                         title={t("languages.title")}
                         description={t("languages.desc")}
                         renderFooter={()=>(
                              <Button type="button" onClick={languagesField.addValue}>
                                   <Plus/>
                                   {t("languages.add-btn")}
                              </Button>
                         )}
                    >
                         <DndContext
                              collisionDetection={closestCenter}
                              modifiers={[restrictToVerticalAxis]}
                              sensors={languagesField.sensors}
                              onDragEnd={languagesField.handleDragEnd}
                         >
                              <SortableContext
                                   items={languagesField.fields}
                                   strategy={verticalListSortingStrategy}
                              >
                                   {languagesField.fields.map((field,i)=>(
                                        <LanguageField
                                             key={field.id}
                                             id={field.id}
                                             form={form}
                                             remove={languagesField.remove}
                                             index={i}
                                        />
                                   ))}
                              </SortableContext>
                         </DndContext>
                    </EditorFormCardWrapper>
               </form>
          </Form>
     )
}