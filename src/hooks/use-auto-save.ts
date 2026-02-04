import { CoverLetterFormType, ResumeFormType } from "@/schemas/types";
import useDebounce from "./use-debounce";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { saveResume } from "@/actions/resume/save-resume";
import { fileReplacer } from "@/lib/helpers";
import { saveCoverLetter } from "@/actions/cover-letter/save-letter";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function useResumeAutoSave(resumeData: ResumeFormType, templateId?: string){
     const searchParams = useSearchParams();
     const router = useRouter();
     const debouncedData = useDebounce(resumeData,1200);
     const errMsg = useTranslations("error-messages");
     const buttonTxt = useTranslations("buttons")

     const [resumeId, setResumeId] = useState(resumeData.id)
     const [lastSaved, setLastSaved] = useState(structuredClone(resumeData))
     const [isSaving, setIsSaving] = useState(false);
     const [isError, setIsError] = useState(false)

     useEffect(()=>{
          setIsError(false);
     },[debouncedData])

     useEffect(()=>{
          async function save(){
               try{
                    setIsSaving(true);
                    setIsError(false);
                    const newData = structuredClone(debouncedData);
                    const updated = await saveResume({
                         ...newData,
                         ...(JSON.stringify(lastSaved.profileImg, fileReplacer)===JSON.stringify(newData.profileImg,fileReplacer) && {
                              profileImg: undefined
                         }),
                         id: resumeId,
                    },templateId);
                    setResumeId(updated.id);
                    setLastSaved(newData);
                    if(searchParams.get("resumeId")!==updated.id){
                         const newSearchParams = new URLSearchParams(searchParams);
                         newSearchParams.set("resumeId",updated.id);
                         router.replace(`?${newSearchParams.toString()}`)
                    }
               } catch(error){
                    setIsError(true);
                    console.error(error)
                    toast.error(errMsg("content.resumeSaveError"),{
                         action: {
                              label: buttonTxt("tryAgain"),
                              onClick: () => void save().catch(err=>{
                                   console.error(err);
                                   toast.error(errMsg("unknownError"))
                              })
                         }
                    })
               } finally {
                    setIsSaving(false)
               }
          }
          const hasUnsavedChanges = JSON.stringify(debouncedData,fileReplacer)!==JSON.stringify(lastSaved,fileReplacer);
          if(hasUnsavedChanges && debouncedData && !isSaving && !isError){
               save()
          }
     },[debouncedData, isError, isSaving, lastSaved, resumeId, router, searchParams, templateId, errMsg, buttonTxt])

     return {
          isSaving,
          hasUnsavedChanges: JSON.stringify(resumeData)!==JSON.stringify(lastSaved)
     }
}

export function useCoverLetterAutoSave(coverLetterData: CoverLetterFormType){
     const searchParams = useSearchParams();
     const router = useRouter();
     const debouncedData = useDebounce(coverLetterData,1200);
     const errMsg = useTranslations("error-messages")
     const buttonTxt = useTranslations("buttons")

     const [lastSaved, setLastSaved] = useState(structuredClone(coverLetterData))
     const [isSaving, setIsSaving] = useState(false);
     const [isError, setIsError] = useState(false)

     useEffect(()=>{
          setIsError(false);
     },[debouncedData])

     useEffect(()=>{
          async function save(){
               try{
                    setIsSaving(true);
                    setIsError(false);
                    const newData = structuredClone(debouncedData);
                    const updated = await saveCoverLetter({
                         ...newData,
                         ...(JSON.stringify(lastSaved.profileImg, fileReplacer)===JSON.stringify(newData.profileImg,fileReplacer) && {
                              profileImg: undefined
                         }),
                    });
                    setLastSaved(newData);
                    if(searchParams.get("coverLetterId")!==updated.id){
                         const newSearchParams = new URLSearchParams(searchParams);
                         newSearchParams.set("coverLetterId",updated.id);
                         router.replace(`?${newSearchParams.toString()}`)
                    }
               } catch(error){
                    setIsError(true);
                    console.error(error)
                    toast.error(errMsg("content.noCoverLetter"),{
                         action: {
                              label: buttonTxt("tryAgain"),
                              onClick: () => void save().catch(err=>{
                                   console.error(err);
                                   toast.error(errMsg("unknownError"))
                              })
                         }
                    })
               } finally {
                    setIsSaving(false)
               }
          }
          const hasUnsavedChanges = JSON.stringify(debouncedData,fileReplacer)!==JSON.stringify(lastSaved,fileReplacer);
          if(hasUnsavedChanges && debouncedData && !isSaving && !isError){
               save()
          }
     },[debouncedData, isError, isSaving, lastSaved, router, searchParams, errMsg, buttonTxt])

     return {
          isSaving,
          hasUnsavedChanges: JSON.stringify(coverLetterData)!==JSON.stringify(lastSaved)
     }
}