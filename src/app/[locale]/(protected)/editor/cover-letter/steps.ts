import {CoverLetterDetailsFormLoader, CoverLetterInfoFormLoader} from "@/components/loaders/form"
import { CoverLetterFormProps, IEditorStep} from "@/lib/types"
import { CoverLetterSteps } from "@/lib/types/enums"
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