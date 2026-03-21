import {CoverLetterDetailsFormLoader, CoverLetterInfoFormLoader} from "@/components/loaders/form"
import { IEditorStep } from "@/lib/types"
import { CoverLetterSteps } from "@/lib/types/enums"
import { CoverLetterFormProps } from "@/lib/types/resume"
import dynamic from "next/dynamic"

export const steps: IEditorStep<CoverLetterFormProps>[] = [
     {
          component: dynamic(()=>import("@/components/dashboard/cover-letters/forms/cl-info-form"),{
               loading: CoverLetterInfoFormLoader
          }),
          key: CoverLetterSteps.Info
     },
     {
          component: dynamic(()=>import("@/components/dashboard/cover-letters/forms/cl-details-form"),{
               loading: CoverLetterDetailsFormLoader
          }),
          key: CoverLetterSteps.Details
     }
]