import { ResumeInfoFormLoader, ResumeDetailsFormLoader, ResumeOptionalDetailsFormLoader } from "@/components/loaders/form"
import { IEditorStep, ResumeFormProps } from "@/lib/types"
import { ResumeSteps } from "@/lib/types/enums"
import dynamic from "next/dynamic"

export const steps: IEditorStep<ResumeFormProps>[] = [
     {
          component: dynamic(()=>import("@/components/dashboard/resumes/forms/resume-info-form"),{
               loading: ResumeInfoFormLoader
          }),
          key: ResumeSteps.Info
     },
     {
          component: dynamic(()=>import("@/components/dashboard/resumes/forms/resume-details-form"),{
               loading: ResumeDetailsFormLoader
          }),
          key: ResumeSteps.Details
     },
     {
          component: dynamic(()=>import("@/components/dashboard/resumes/forms/resume-optional-details-form"),{
               loading: ResumeOptionalDetailsFormLoader
          }),
          key: ResumeSteps.OptionalDetails
     }
]